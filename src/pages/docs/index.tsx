import { GrayBlock } from '@/components/GrayBlock';
import { SharedPosition, SharedSize } from '@/components/SharedElements';

const DocsPage = () => {
  return (
    <div>
      <SharedSize<HTMLDivElement> sharedId="SharedSize">
        {({ ref }) => <GrayBlock ref={ref} className="size-32" />}
      </SharedSize>
      <p>
        common began laugh space pony scientific location dinner value job hurt
        shaking broken send heavy slow quick stiff eager locate press largest
        she anyway
      </p>
      <SharedPosition<HTMLDivElement> sharedId="SharedElement">
        {({ ref }) => <GrayBlock ref={ref} />}
      </SharedPosition>
      <p>
        balance cage composition more tax tank guide easily help while color
        cutting pine brother torn draw though voyage feed musical yet finish
        around put
      </p>
      <SharedPosition<HTMLDivElement> sharedId="SharedElement2">
        {({ ref }) => <GrayBlock className="ms-8" ref={ref} />}
      </SharedPosition>
    </div>
  );
};

export default DocsPage;
