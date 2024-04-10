import { GrayBlock } from '@/components/GrayBlock';
import { SharedRect } from '@/components/SharedElements';
import { useLocation } from 'umi';

function useURLSharedItemId() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('sharedItemId')!;
}

const DocsPage = () => {
  const sharedItemId = useURLSharedItemId();
  return (
    <div>
      <SharedRect<HTMLDivElement> sharedId={sharedItemId}>
        {({ ref }) => <GrayBlock ref={ref} className="w-full h-80" />}
      </SharedRect>
      <p>
        common began laugh space pony scientific location dinner value job hurt
        shaking broken send heavy slow quick stiff eager locate press largest
        she anyway
      </p>
    </div>
  );
};

export default DocsPage;
