import React from 'react';
import { twMerge } from 'tailwind-merge';

type Ref = React.ComponentRef<'div'> | null;

type Props = React.ComponentPropsWithoutRef<'div'>;

export type { Ref as PhotoItemTitleRef, Props as PhotoItemTitleProps };

export const PhotoItemTitle = React.forwardRef<Ref, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={twMerge(
          'whitespace-break-spaces text-center text-lg font-normal text-gray-700 text-nowrap text-ellipsis overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PhotoItemTitle.displayName = 'PhotoItemTitle';
