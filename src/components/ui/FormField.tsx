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
import { UI_INPUTS, UI_TYPOGRAPHY } from "../../theme";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
  type: string;
  placeholder: string;
  autoComplete?: string;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errors: FieldErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
}

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  type,
  placeholder,
  autoComplete,
  register,
  validation,
  errors,
  setValue,
}: FormFieldProps<TFieldValues>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const { colors, tokens } = useTheme();

  // Detect WebKit autofill event to dynamically overlay the autofill tint shadow
  const handleAutoFill = (
    e: AnimationEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.animationName === "onAutoFillStart") {
      setIsAutofilled(true);
      setValue(
        name,
        (e.target as HTMLInputElement | HTMLTextAreaElement)
          .value as import("react-hook-form").PathValue<
          TFieldValues,
          Path<TFieldValues>
        >,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };

  // Compose dynamic neumorphic inset shadows, focus/error rings, and autofill tints
  const getInputStyle = () => {
    const baseShadow = tokens.shadows.inset;
    const blueFocusRing = `0 0 0 1.5px ${colors.focusRing}`;
    const redErrorRing = `0 0 0 1.5px ${colors.brandRed}`;
    const autofillTint = tokens.shadows.autofillTint;

    const shadows: string[] = [baseShadow];
    if (isAutofilled) shadows.push(autofillTint);
    if (errors[name]) shadows.unshift(redErrorRing);
    if (isFocused) shadows.unshift(blueFocusRing);

    return {
      backgroundColor: colors.well,
      boxShadow: shadows.join(", "),
    };
  };

  // Register React Hook Form handlers and bind input interaction lifecycle
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

  const errorObj = errors[name];
  const errorId = `${name}-error`;

  const commonProps = {
    ...registeredProps,
    id: String(name),
    placeholder,
    autoComplete,
    "aria-label": placeholder,
    "aria-invalid": Boolean(errorObj),
    "aria-describedby": errorObj ? errorId : undefined,
    onChange: handleChange,
    onFocus: () => setIsFocused(true),
    onBlur: handleBlur,
    onAnimationStart: handleAutoFill,
    style: getInputStyle(),
  };

  return (
    <div>
      {type === "textarea" ? (
        <textarea {...commonProps} rows={4} className={UI_INPUTS.field} />
      ) : (
        <input type={type} {...commonProps} className={UI_INPUTS.field} />
      )}
      {errorObj && (
        <p id={errorId} role="alert" className={UI_TYPOGRAPHY.errorText}>
          {errorObj.message ? String(errorObj.message) : ""}
        </p>
      )}
    </div>
  );
};

export default FormField;
