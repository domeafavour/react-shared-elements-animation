import { SnapshotManager } from './SnapshotManager';

describe('SnapshotManager', () => {
  it('clear by pattern', () => {
    const snapshotManager = new SnapshotManager<string>();
    snapshotManager.set('photo/1', '1');
    snapshotManager.set('photo/2', '2');
    snapshotManager.set('photo/2/title', '2 title');
    snapshotManager.set('photos', 'photos');

    snapshotManager.set('post/1', '1');

    snapshotManager.clear('photo/:id');

    expect(snapshotManager.has('photo/1')).toBe(false);
    expect(snapshotManager.has('photo/2')).toBe(false);
    expect(snapshotManager.has('photo/2/title')).toBe(true);
    expect(snapshotManager.has('photos')).toBe(true);
    expect(snapshotManager.has('post/1')).toBe(true);
  });

  it('clear all', () => {
    const snapshotManager = new SnapshotManager<string>();
    snapshotManager.set('photo/1', '1');
    snapshotManager.set('photo/2', '2');
    snapshotManager.set('photo/2/title', '2 title');
    snapshotManager.set('photos', 'photos');
    snapshotManager.set('post/1', '1');

    snapshotManager.clear();

    expect(snapshotManager.has('photo/1')).toBe(false);
    expect(snapshotManager.has('photo/2')).toBe(false);
    expect(snapshotManager.has('photo/2/title')).toBe(false);
    expect(snapshotManager.has('photos')).toBe(false);
    expect(snapshotManager.has('post/1')).toBe(false);
  });
});
