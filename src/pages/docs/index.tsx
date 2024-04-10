import { GrayBlock } from '@/components/GrayBlock';
import { SharedRect } from '@/components/SharedElements';
import { useSharedHeaderStyleAnimation } from '@/hooks/useSharedHeaderStyleAnimation';
import { useLocation } from 'umi';

function useURLSharedItemId() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('sharedItemId')!;
}

const DocsPage = () => {
  const sharedItemId = useURLSharedItemId();
  const headerRef = useSharedHeaderStyleAnimation();
  return (
    <div>
      <GrayBlock ref={headerRef} className="rounded-none w-full bg-gray-800" />
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
