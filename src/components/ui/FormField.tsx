import {
  useState,
  type AnimationEvent,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  type: string;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errors: FieldErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
}

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  type,
  placeholder,
  register,
  validation,
  errors,
  setValue,
}: FormFieldProps<TFieldValues>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const { isDarkMode } = useTheme();

  const handleAutoFill = (
    e: AnimationEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.animationName === "onAutoFillStart") {
      setIsAutofilled(true);
      setValue(
        name,
        (e.target as HTMLInputElement | HTMLTextAreaElement).value as never,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };

  const getInputStyle = () => {
    const baseShadowLight =
      "inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)";
    const baseShadowDark =
      "inset 6px 6px 12px #1a1b1e, inset -6px -6px 12px #2e2f34";
    const blueFocusRing = "0 0 0 1.5px #3b82f6";
    const redErrorRing = "0 0 0 1.5px #ef4444";
    const autofillTint = "inset 0 0 0 1000px rgba(59, 130, 246, 0.1)";

    const shadows = [isDarkMode ? baseShadowDark : baseShadowLight];
    if (isAutofilled) shadows.push(autofillTint);
    if (errors[name]) shadows.unshift(redErrorRing);
    if (isFocused) shadows.unshift(blueFocusRing);

    return {
      backgroundColor: isDarkMode ? "#242529" : "#e5e7eb",
      boxShadow: shadows.join(", "),
    };
  };

  const registeredProps = register(name, validation);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsAutofilled(false);
    registeredProps.onChange(e);
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(false);
    registeredProps.onBlur(e);
  };

  const commonProps = {
    ...registeredProps,
    placeholder,
    onChange: handleChange,
    onFocus: () => setIsFocused(true),
    onBlur: handleBlur,
    onAnimationStart: handleAutoFill,
    style: getInputStyle(),
  };

  const errorObj = errors[name];

  return (
    <div>
      {type === "textarea" ? (
        <textarea
          {...commonProps}
          rows={4}
          className="detect-autofill w-full rounded-lg p-3 text-gray-800 transition-shadow outline-none placeholder:text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-400"
        />
      ) : (
        <input
          type={type}
          {...commonProps}
          className="detect-autofill w-full rounded-lg p-3 text-gray-800 transition-shadow outline-none placeholder:text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-400"
        />
      )}
      {errorObj && (
        <p className="mt-1 text-xs text-red-500">
          {errorObj.message ? String(errorObj.message) : ""}
        </p>
      )}
    </div>
  );
};

export default FormField;
