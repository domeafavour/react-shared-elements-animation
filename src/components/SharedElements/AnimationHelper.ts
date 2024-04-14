import { BaseSharedNode, SharedDOMElementNode } from './SharedNode';
import { SnapshotManager } from './SnapshotManager';
import { defaultKeyframeAnimationOptions } from './constants';
import { createSharedIdPattern } from './createSharedIdPattern';
import { AnimationOptions, AnimationValue } from './typings';

export abstract class BaseAnimationHelper<N extends BaseSharedNode<any>> {
  public abstract fromSnapshot(
    sharedNode: N | null,
    sharedId: string,
    options?: AnimationOptions
  ): void;

  public abstract makeSnapshot(sharedNode: N | null, sharedId: string): void;

  public abstract hasSnapshot(sharedId: string): boolean;
}

export class SharedElementAnimationHelper extends BaseAnimationHelper<SharedDOMElementNode> {
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

  protected clearSnapshots() {
    this.snapshotManager.clear();
  }
}

export const sharedElementAnimationHelper = new SharedElementAnimationHelper();

export class PatternSharedElementAnimationHelper<
  P extends object = object,
> extends SharedElementAnimationHelper {
  private sharedIdPattern: ReturnType<typeof createSharedIdPattern>;

  constructor(pattern: string) {
    super();
    this.sharedIdPattern = createSharedIdPattern(pattern);
  }

  public generateSharedId(params: P) {
    return this.sharedIdPattern.generate(params);
  }

  public makeSnapshot(
    sharedNode: SharedDOMElementNode | null,
    sharedId: string
  ): void {
    if (this.sharedIdPattern.isMatched(sharedId)) {
      super.clearSnapshots();
    }
    super.makeSnapshot(sharedNode, sharedId);
  }
}
