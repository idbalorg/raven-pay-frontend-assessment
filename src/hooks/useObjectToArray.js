import { useMemo } from "react";

function useObjectToArray(object = {}) {
  return useMemo(() => {
    return Object.entries(object).map(([key, value]) => ({
      key,
      value,
    }));
  }, [object]);
}

export default useObjectToArray;
