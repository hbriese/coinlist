import { useEffect, useState } from "react";

export const useRequest = <T,>(
  fetcher: () => Promise<T>
): [T | undefined, boolean] => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    // Prevent calling setData once the component is unmounted
    let active = true;

    fetcher().then((d) => {
      if (active) setData(d);
    });

    return () => {
      active = false;
    };
  }, [fetcher]);

  return [data, data !== undefined];
};
