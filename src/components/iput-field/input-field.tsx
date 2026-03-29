import { Icon } from "../../icons/icon";
import styles from "./iput-field.module.scss";
import type { InputFieldProps } from "../../../types/input-field-props";

export const InputField = ({
  name,
  label,
  register,
  watch,
  setValue,
  error,
}: InputFieldProps) => {
  const value = watch(name);

  const clearField = () => {
    setValue(name, "");
  };

  return (
    <label>
      <span>
        {label} <br />
      </span>
      <div className={styles.inputWrapper}>
        <input {...register(name)} className={styles.input} />
        {value && value.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={clearField}
          >
            <Icon name="cross" />
          </button>
        )}
      </div>
      {error && <p>{error.message}</p>}
    </label>
  );
};
