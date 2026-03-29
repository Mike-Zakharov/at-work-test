type SuccessPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessPopup = ({ isOpen, onClose }: SuccessPopupProps) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <p>Профиль успешно сохранён</p>
      <button type="button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};
