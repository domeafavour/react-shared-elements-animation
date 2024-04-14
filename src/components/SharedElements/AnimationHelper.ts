import { BaseSharedNode, SharedDOMElementNode } from './SharedNode';
import { SnapshotManager } from './SnapshotManager';
import { defaultKeyframeAnimationOptions } from './constants';
import { AnimationOptions, AnimationValue } from './typings';

export interface BaseAnimationHelper<N extends BaseSharedNode<any>> {
  fromSnapshot(
    sharedNode: N | null,
    sharedId: string,
    options?: AnimationOptions
  ): void;

  makeSnapshot(sharedNode: N | null, sharedId: string): void;

  hasSnapshot(sharedId: string): boolean;

  clearSnapshots(pattern?: string): void;
}

export class SharedElementAnimationHelper
  implements BaseAnimationHelper<SharedDOMElementNode>
{
  protected snapshotManager = new SnapshotManager<AnimationValue>();

  public fromSnapshot(
    sharedNode: SharedDOMElementNode | null,
    sharedId: string,
    options = defaultKeyframeAnimationOptions
  ): void {
    const previousValue = this.snapshotManager.get(sharedId);
    if (sharedNode && previousValue) {
      sharedNode.animate(previousValue, options);
    }
  }

  public makeSnapshot(
    sharedNode: SharedDOMElementNode | null,
    sharedId: string
  ): void {
    if (sharedNode) {
      this.snapshotManager.set(sharedId, {
        rect: sharedNode.getNodeRect(),
        style: sharedNode.getStyle(),
      });
    }
  }

  public hasSnapshot(sharedId: string) {
    return this.snapshotManager.has(sharedId);
  }

  public clearSnapshots(pattern?: string) {
    this.snapshotManager.clear(pattern);
  }
}

export const sharedElementAnimationHelper = new SharedElementAnimationHelper();

export class PatternSharedElementAnimationHelper extends SharedElementAnimationHelper {
  constructor(private pattern: string) {
    super();
  }

  public makeSnapshot(
    sharedNode: SharedDOMElementNode | null,
    sharedId: string
  ): void {
    super.clearSnapshots(this.pattern);
    super.makeSnapshot(sharedNode, sharedId);
  }
}
