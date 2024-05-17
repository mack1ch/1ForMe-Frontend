"use client";

import { ReactNode, useState } from "react";
import { ISubMenu } from "../interface";
import styles from "./ui.module.scss";

export const HeaderSubMenu = ({
  options,
  onChange,
  defaultValue,
}: {
  options: ISubMenu[];
  defaultValue?: number;
  onChange?: (arg: ReactNode) => void;
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<
    number | undefined
  >(defaultValue);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
    if (onChange) {
      onChange(options[index].value);
    }
  };

  return (
    <>
      <div className={styles.subMenu}>
        {options.map((item, index) => (
          <nav
            className={`${styles.subMenu__item} ${
              selectedItemIndex === index ? styles.selected : ""
            } ${index}`}
            key={index}
            onClick={() => handleItemClick(index)}
          >
            {item.label}
          </nav>
        ))}
      </div>
    </>
  );
};
