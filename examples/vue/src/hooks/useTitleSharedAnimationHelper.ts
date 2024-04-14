import { usePatternSharedElementAnimationHelper } from '@shared-elements-animation/vue';

export function useTitleSharedAnimationHelper(id: string) {
  return usePatternSharedElementAnimationHelper(
    'title/:id',
    { id },
    { styleKeys: ['fontSize', 'fontWeight', 'color'] }
  );
}
