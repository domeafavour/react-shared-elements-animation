import { GrayBlock } from '@/components/GrayBlock';
import { SharedRect } from '@shared-elements-animation/react';
import { Link } from 'umi';

const randomTexts = [
  'supper place radio mainly process cloud else seen number flight shut fun mathematics window appearance clothes eaten blue down party cool spell black while',
  'even valley apart both hung section activity surrounded process your attached citizen different review load wing center including gate universe wrong is interest straw',
  'quick except flight beyond bush provide badly bare principal line evening never giant little spent winter am stay alphabet furniture seen wing build past',
  'breathing baby direction railroad lucky mice single little grabbed trick week aware climate operation example probably whose shaking score steep boy someone important shake',
  'rush species mixture phrase pay truth sweet become movie name correctly colony position brick game cave nest smell bicycle onto tent wood corn opposite',
];

const items = Array.from({ length: 8 }, (_, i) => ({
  sharedItemId: `SharedItem${i + 1}`,
  text: randomTexts[i % randomTexts.length],
}));

export default function HomePage() {
  return (
    <div>
      <ul className="flex flex-col space-y-2">
        {items.map((item) => (
          <li key={item.sharedItemId}>
            <Link
              to={`/docs?sharedItemId=${item.sharedItemId}`}
              className="flex flex-row space-x-2"
            >
              <div className="size-36 overflow-visible">
                <SharedRect<HTMLDivElement> sharedId={item.sharedItemId}>
                  {({ ref }) => <GrayBlock ref={ref} className="size-36" />}
                </SharedRect>
              </div>
              <div className="text-2xl">{item.text}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
