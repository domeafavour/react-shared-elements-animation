import { fireEvent } from '@testing-library/react';
import { PatternSharedElementAnimationHelper } from './AnimationHelper';
import { createSharedDOMElementNode } from './useSharedElementAnimation';

describe('AnimationHelper - DynamicSharedElementAnimationHelper', () => {
  const photoTitleHelper = new PatternSharedElementAnimationHelper<{
    id: string;
  }>('photo-title/:id');

  function createSharedElement(sharedId: string) {
    const domNode = document.createElement('div');
    domNode.animate = jest.fn();

    const sharedNode = createSharedDOMElementNode(domNode, []);
    domNode.onclick = () => {
      photoTitleHelper.makeSnapshot(sharedNode, sharedId);
    };

    return [domNode, sharedNode] as const;
  }

  it('should keep only one shared node matched the pattern given', () => {
    let [itemDomNode1, itemSharedNode1] = createSharedElement('photo-title/1');
    let [itemDomNode2, itemPhotoTitle2] = createSharedElement('photo-title/2');

    // leave list for photo detail 1
    fireEvent.click(itemDomNode1);

    // enter photo detail 1
    const [detailDomNode1, detailSharedNode1] =
      createSharedElement('photo-title/1');
    photoTitleHelper.fromSnapshot(detailSharedNode1, 'photo-title/1');
    expect(detailDomNode1.animate).toHaveBeenCalledTimes(1);

    // leave photo detail 1
    fireEvent.click(detailDomNode1);

    // back to list, recreate dom nodes and shared nodes
    [itemDomNode1, itemSharedNode1] = createSharedElement('photo-title/1');
    [itemDomNode2, itemPhotoTitle2] = createSharedElement('photo-title/2');

    photoTitleHelper.fromSnapshot(itemSharedNode1, 'photo-title/1');
    photoTitleHelper.fromSnapshot(itemPhotoTitle2, 'photo-title/2');

    expect(itemDomNode1.animate).toHaveBeenCalledTimes(1);
    expect(itemDomNode2.animate).not.toHaveBeenCalled();

    // click photo detail 2

    fireEvent.click(itemDomNode2);

    // enter photo detail 2
    let [detailDomNode2, detailSharedNode2] =
      createSharedElement('photo-title/2');
    photoTitleHelper.fromSnapshot(detailSharedNode2, 'photo-title/2');
    expect(detailDomNode2.animate).toHaveBeenCalledTimes(1);

    // leave photo detail 2
    fireEvent.click(detailDomNode2);

    // should auto remove the cache of photo detail 1
    expect(photoTitleHelper.hasSnapshot('photo-title/1')).toBe(false);

    // back to list again, recreate dom nodes and shared nodes
    [itemDomNode1, itemSharedNode1] = createSharedElement('photo-title/1');
    [itemDomNode2, itemPhotoTitle2] = createSharedElement('photo-title/2');

    photoTitleHelper.fromSnapshot(itemSharedNode1, 'photo-title/1');
    photoTitleHelper.fromSnapshot(itemPhotoTitle2, 'photo-title/2');

    // expect(itemDomNode1.animate).not.toHaveBeenCalled();
    expect(itemDomNode2.animate).toHaveBeenCalledTimes(1);
  });
});
