import { GrayBlock } from '@/components/GrayBlock';
import {
  SharedPosition,
  SharedRect,
  SharedSize,
} from '@/components/SharedElements';

export default function HomePage() {
  return (
    <div>
      <SharedSize<HTMLDivElement> sharedId="SharedSize">
        {({ ref }) => <GrayBlock ref={ref} />}
      </SharedSize>
      <div className="mt-80" />
      <SharedRect<HTMLDivElement> sharedId="SharedRect">
        {({ ref }) => <GrayBlock ref={ref} />}
      </SharedRect>
      <SharedPosition<HTMLDivElement> sharedId="SharedElement">
        {({ ref }) => <GrayBlock className="ms-16" ref={ref} />}
      </SharedPosition>
      <div className="mt-10" />
      <SharedPosition<HTMLDivElement> sharedId="SharedElement2">
        {({ ref }) => <GrayBlock className="ms-16" ref={ref} />}
      </SharedPosition>
    </div>
  );
}
