import React, { useState, useEffect, useRef } from "react";
import styles from "./dropdown.module.scss";
import { Icon } from "../../icons/icon";

type UserAction = "edit" | "archive" | "hide";

type DropdownMenuProps = {
  userId: number;
  onAction: (action: UserAction, userId: number) => void;
};

export const Dropdown: React.FC<DropdownMenuProps> = ({
  userId,
  onAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log('toggle clicked')
  };

  const handleAction = (action: UserAction) => {
    onAction(action, userId);
  };

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={styles.toggleButton}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Icon name="menu-dots" />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="menu">
          <li role="none">
            <button
              role="menuitem"
              onClick={() => handleAction("edit")}
              className={styles.menuItem}
            >
              Редактировать
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              onClick={() => handleAction("archive")}
              className={styles.menuItem}
            >
              Архивировать
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              onClick={() => handleAction("hide")}
              className={styles.menuItem}
            >
              Скрыть
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
