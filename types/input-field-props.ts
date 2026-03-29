import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import type { UserFormValues } from "./userSchema"; // путь к схеме

export interface InputFieldProps {
  name: keyof UserFormValues;
  label: string;
  register: UseFormRegister<UserFormValues>;
  watch: UseFormWatch<UserFormValues>;
  setValue: UseFormSetValue<UserFormValues>;
  error?: FieldErrors<UserFormValues>[keyof UserFormValues];
}
