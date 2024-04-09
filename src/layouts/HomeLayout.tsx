import { useSettings } from '@/stores/settings';
import { twJoin } from 'tailwind-merge';
import { Outlet } from 'umi';

export function HomeLayout() {
  const dark = useSettings((state) => state.dark);
  return (
    <div className={twJoin(dark && 'bg-black text-white')}>
      <Outlet />
    </div>
  );
}

export default HomeLayout;