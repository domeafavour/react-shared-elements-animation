import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type Ref = React.ComponentRef<'div'> | null;

type Props = React.ComponentPropsWithoutRef<'div'>;

export type { Props as GrayBlockProps, Ref as GrayBlockRef };

export const GrayBlock = React.forwardRef<Ref, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={twMerge(
          'size-20 border border-solid border-gray-500 rounded-md bg-gray-400',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GrayBlock.displayName = 'GrayBlock';
