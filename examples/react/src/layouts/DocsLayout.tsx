import { Outlet } from 'umi';

export default function DocsLayout() {
  return (
    <div className="bg-blue-400">
      <Outlet />
    </div>
  );
}
