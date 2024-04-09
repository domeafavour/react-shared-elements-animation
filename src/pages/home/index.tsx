import { ToggleDark } from './containers/ToggleDark';
import { useHelloQuery } from './useHelloQuery';

export default function HomePage() {
  const { data, isLoading } = useHelloQuery();
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return <div>no data.</div>;
  }
  return (
    <div>
      <p>{data}</p>
      <ToggleDark className="text-red-400 px-4" />
    </div>
  );
}
