import CountProvider, { useCountStore } from "./CountProvider";

type CountProps = {
  initialCount: number;
};
export default function Count({ initialCount = 1 }): CountProps {
  return (
    <CountProvider initialCount={initialCount}>
      <SubComponentCount />
    </CountProvider>
  );
}

function SubComponentCount() {
  const count = useCountStore((state) => state.count);
  console.log(count);
  return null;
}
