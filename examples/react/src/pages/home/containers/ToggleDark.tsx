import { useSettings } from '@/stores/settings';
import { twMerge } from 'tailwind-merge';

type Props = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'children' | 'onClick'
>;

export function ToggleDark({ className, ...props }: Props) {
  const toggleDark = useSettings((state) => state.toggleDark);
  return (
    <button
      type="button"
      onClick={toggleDark}
      className={twMerge(
        'rounded-md border border-solid border-slate-500',
        'px-2',
        className
      )}
      {...props}
    >
      toggle dark
    </button>
  );
}
