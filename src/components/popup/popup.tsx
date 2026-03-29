import { useEffect } from "react";
import styles from "./popup.module.scss";
import { Icon } from "../../icons/icon";
import success from "../img/Checked-box.png";
type SuccessPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessPopup = ({ isOpen, onClose }: SuccessPopupProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        >
          <Icon name="cross" />
        </button>

        <div className={styles.iconWrapper}>
          <img src={success} alt="success" />
        </div>

        <p className={styles.message}>Изменения сохранены!</p>
      </div>
    </div>
  );
};
