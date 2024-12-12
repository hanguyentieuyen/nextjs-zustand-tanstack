import { createContext, PropsWithChildren, useContext, useState } from "react";

type CountStore = {
  inc: () => void;
};

type CountProviderProps = PropsWithChildren & {
  initialCount: number;
};

const CountContext = createContext<StoreApi<CountStore> | undefined>(undefined);

export default function CountProvider({
  children,
  initialCount,
}: CountProviderProps) {
  const [store] = useState(() =>
    createStore<CountStore>((set) => ({
      count: initialCount,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }))
  );
  return (
    <CountContext.Provider value={store}>{children}</CountContext.Provider>
  );
}

export function useCountStore<T>(selector: (state: CountStore) => T) {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("CountContext.Provider is missing");
  }
  return useContext(context, selector);
}
