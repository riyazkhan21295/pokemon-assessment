import { useState } from "react";

type TProps = {
  multiple: boolean;
};

export default function useCheckbox({ multiple = false }: TProps) {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const onSelect = (value: any) => {
    setSelectedItems((previousValue) => {
      let newSelectedItems = [value];
      if (multiple) {
        newSelectedItems = previousValue.includes(value)
          ? previousValue.filter((item) => item !== value)
          : [...selectedItems, value];
      }

      return newSelectedItems;
    });
  };

  return { selectedItems, onSelect };
}
