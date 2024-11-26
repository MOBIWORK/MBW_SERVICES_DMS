/** @format */

import { useState, useEffect } from "react";
import useDebounce from "./useDebount";

interface UpdateParams {
  indexRow?: number;
  index?: number;
  value: any;
  field: string;
  [key: string]: any;
}

/**
 * Custom hook để xử lý debounce khi update dữ liệu
 * @param updateFn Hàm update dữ liệu (thường là action của redux)
 * @param delay Thời gian delay (ms)
 * @returns Tuple chứa hàm setValue và giá trị đang được lưu tạm
 */
const useDebounceUpdate = (
  updateFn: (params: UpdateParams) => void,
  delay: number = 300
) => {
  const [inputValues, setInputValues] = useState<UpdateParams | null>(null);
  const debouncedValues = useDebounce(inputValues, delay);

  useEffect(() => {
    if (debouncedValues && Object.keys(debouncedValues).length) {
      updateFn(debouncedValues);
    }
  }, [debouncedValues]);

  return [setInputValues, inputValues] as const;
};

export default useDebounceUpdate;
