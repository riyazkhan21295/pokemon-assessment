import styled from "styled-components";

import { CardContainer as StyledCardContainer, Flex } from "@/styles";
import { CSSProperties, useState } from "react";

type IProps = {
  selectable?: boolean;
  multiple?: boolean;
  items: any[];
  labelKey: string;
  valueKey: string;
  onSelect: (items: any[] | any) => void;
  styles?: {
    container: CSSProperties;
    itemContainer: CSSProperties;
    iconContainer: CSSProperties;
    text: CSSProperties;
  };
};

export default function CardCheckbox({
  selectable = true,
  multiple = false,
  items = [],
  labelKey,
  valueKey,
  onSelect,
  styles,
}: IProps) {
  const [selectedItemsValue, setSelectedItemsValue] = useState<any[]>([]);

  const handleOnClick = (item: any) => {
    if (!selectable) return;

    const itemValue = item[valueKey];

    let newSelectedItemsValue = [itemValue];
    if (multiple) {
      newSelectedItemsValue = selectedItemsValue.includes(itemValue)
        ? selectedItemsValue.filter((selectedItem) => {
            return selectedItem !== itemValue;
          })
        : [...selectedItemsValue, itemValue];
    }

    setSelectedItemsValue(newSelectedItemsValue);

    const newSelectedItems = items.filter((item) => {
      return newSelectedItemsValue.includes(item[valueKey]);
    });

    onSelect?.(newSelectedItems);
  };

  return (
    <Container
      direction="row"
      wrap="wrap"
      gap="8px"
      style={{ ...styles?.container }}
    >
      {items.map((item: any) => {
        return (
          <ItemContainer
            key={item[valueKey]}
            onClick={() => handleOnClick(item)}
            style={{
              ...styles?.itemContainer,
              ...(selectedItemsValue.includes(item[valueKey]) && {
                border: "1px solid black",
              }),
            }}
          >
            {/* {icon && <ItemIcon>{icon}</ItemIcon>} */}
            <ItemText style={{ ...styles?.text }}>{item[labelKey]}</ItemText>
          </ItemContainer>
        );
      })}
    </Container>
  );
}

const Container = styled(Flex)``;

const ItemContainer = styled(StyledCardContainer)`
  cursor: pointer;

  padding: 8px;

  border: 1px solid transparent;

  &:hover {
    border: 1px solid red;
  }
`;

const ItemIcon = styled.div``;

const ItemText = styled.span`
  text-transform: capitalize;
`;
