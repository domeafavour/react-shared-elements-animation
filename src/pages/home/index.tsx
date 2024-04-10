import { GrayBlock } from '@/components/GrayBlock';
import { SharedPosition, SharedSize } from '@/components/SharedElements';

export default function HomePage() {
  return (
    <div>
      <SharedSize<HTMLDivElement> sharedId="SharedSize">
        {({ ref }) => <GrayBlock ref={ref} />}
      </SharedSize>
      <div className="mt-80" />
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
