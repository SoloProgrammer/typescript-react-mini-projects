import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 300) => {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedVal as T;
};
