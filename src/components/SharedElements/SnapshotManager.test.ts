import { SnapshotManager } from './SnapshotManager';

describe('SnapshotManager', () => {
  it('clear by pattern', () => {
    const snapshotManager = new SnapshotManager<string>();
    snapshotManager.set('photo/1', '1');
    snapshotManager.set('photo/2', '2');
    snapshotManager.set('photo/2/title', '2 title');
    snapshotManager.set('photos', 'photos');

    expect(snapshotManager.keys().length).toBe(4);

    snapshotManager.clear('photo/:id');

    expect(snapshotManager.has('photo/1')).toBe(false);
    expect(snapshotManager.has('photo/2')).toBe(false);
    expect(snapshotManager.has('photo/2/title')).toBe(true);
    expect(snapshotManager.has('photos')).toBe(true);
  });
});
