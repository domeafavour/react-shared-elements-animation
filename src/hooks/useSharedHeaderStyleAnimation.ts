import {
  useSharedRectAnimation,
  useSharedStyleAnimation,
} from '@/components/SharedElements';
import { useComposedRef } from './useComposedRef';

const sharedId = 'SharedHeader';

export function useSharedHeaderStyleAnimation() {
  const [rectAnimationRef] = useSharedRectAnimation<HTMLDivElement>(sharedId);
  const [styleAnimationRef] = useSharedStyleAnimation<HTMLDivElement>(
    sharedId,
    ['backgroundColor', 'borderRadius']
  );
  return useComposedRef(rectAnimationRef, styleAnimationRef);
}
