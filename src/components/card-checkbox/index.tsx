import styled from "styled-components";

import { CardContainer as StyledCardContainer, Flex } from "@/styles";
import { CSSProperties, useState } from "react";
import Image from "next/image";

type IProps = {
  selectable?: boolean;
  multiple?: boolean;
  items: { [key: string]: any; styles: CSSProperties }[];
  labelKey: string;
  valueKey: string;
  onSelect: (items: any[] | any) => void;
  styles?: {
    container?: CSSProperties;
    itemContainer?: CSSProperties;
    iconContainer?: CSSProperties;
    text?: CSSProperties;
  };
  icons?: { [key: string]: { imageSrc: string; styles?: any } };
};

export default function CardCheckbox({
  selectable = true,
  multiple = false,
  items = [],
  labelKey,
  valueKey,
  onSelect,
  styles,
  icons,
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
            style={{ ...styles?.itemContainer }}
            color={item.styles.backgroundColor}
            isSelected={selectedItemsValue.includes(item[valueKey])}
          >
            <ItemText style={{ ...styles?.text }}>{item[labelKey]}</ItemText>

            {icons && icons?.[item[valueKey]] && (
              <ItemIcon
                justify="center"
                align="center"
                style={{ ...icons?.[item[valueKey]]?.styles }}
              >
                <Image
                  src={icons?.[item[valueKey]]?.imageSrc}
                  width={16}
                  height={16}
                  alt={item[valueKey]}
                  loading="lazy"
                />
              </ItemIcon>
            )}
          </ItemContainer>
        );
      })}
    </Container>
  );
}

const Container = styled(Flex)``;

type TItemContainerStyledProps = {
  color?: string;
  isSelected?: boolean;
};

const ItemContainer = styled(StyledCardContainer)<TItemContainerStyledProps>`
  cursor: pointer;

  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${(props) => {
    if (props.isSelected) {
      return `
        border: 1px solid #fff;
        background-color: ${props.color};
      `;
    }

    return `
        border: 1px solid transparent;
        background-color: #fff;
      `;
  }}

  &:hover {
    background-color: ${(props) => props.color};
    border: 1px solid #fff;
  }
`;

const ItemIcon = styled(Flex)`
  padding: 4px;
  border-radius: 4px;
`;

const ItemText = styled.span`
  text-transform: capitalize;
`;
