import React, { useState, useEffect, useRef } from "react";
import styles from "./dropdown.module.scss";
import { Icon } from "../../icons/icon";

type UserStatus = "active" | "archive" | "hidden";
type UserAction = "edit" | "archive" | "hide" | "activate";

type DropdownMenuProps = {
  userId: number;
  status: UserStatus;
  onAction: (action: UserAction, userId: number) => void;
};

export const Dropdown: React.FC<DropdownMenuProps> = ({
  userId,
  status,
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAction = (action: UserAction) => {
    onAction(action, userId);
    setIsOpen(false);
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
        type="button"
      >
        <Icon name="menu-dots" />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="menu">
          {status === "archive" ? (
            <li role="none">
              <button
                role="menuitem"
                onClick={() => handleAction("activate")}
                className={styles.menuItem}
                type="button"
              >
                Активировать
              </button>
            </li>
          ) : (
            <>
              <li role="none">
                <button
                  role="menuitem"
                  onClick={() => handleAction("edit")}
                  className={styles.menuItem}
                  type="button"
                >
                  Редактировать
                </button>
              </li>
              <li role="none">
                <button
                  role="menuitem"
                  onClick={() => handleAction("archive")}
                  className={styles.menuItem}
                  type="button"
                >
                  Архивировать
                </button>
              </li>
              <li role="none">
                <button
                  role="menuitem"
                  onClick={() => handleAction("hide")}
                  className={styles.menuItem}
                  type="button"
                >
                  Скрыть
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

