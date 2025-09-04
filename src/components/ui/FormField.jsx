import React, { useState, useEffect } from "react";

// You can create a custom hook for theme detection to make it even cleaner
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const root = window.document.documentElement;
    const observer = new MutationObserver(() =>
      setIsDarkMode(root.classList.contains("dark")),
    );
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setIsDarkMode(root.classList.contains("dark")); // Initial check
    return () => observer.disconnect();
  }, []);
  return isDarkMode;
};

const FormField = ({
  name,
  type,
  placeholder,
  register,
  validation,
  errors,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const isDarkMode = useTheme();

  const handleAutoFill = (e) => {
    if (e.animationName === "onAutoFillStart") {
      setIsAutofilled(true);
      setValue(name, e.target.value, {
        shouldValidate: true,
        shouldDirty: true,
      });
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

    let shadows = [isDarkMode ? baseShadowDark : baseShadowLight];
    if (isAutofilled) shadows.push(autofillTint);
    if (errors[name]) shadows.unshift(redErrorRing);
    if (isFocused) shadows.unshift(blueFocusRing);

    return {
      backgroundColor: isDarkMode ? "#242529" : "#e5e7eb",
      boxShadow: shadows.join(", "),
    };
  };

  const registeredProps = register(name, validation);

  const handleChange = (e) => {
    setIsAutofilled(false);
    registeredProps.onChange(e);
  };

  const handleBlur = (e) => {
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

  return (
    <div>
      {type === "textarea" ? (
        <textarea
          {...commonProps}
          rows="4"
          className="detect-autofill w-full rounded-lg p-3 text-gray-800 outline-none transition-shadow placeholder:text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-400"
        ></textarea>
      ) : (
        <input
          type={type}
          {...commonProps}
          className="detect-autofill w-full rounded-lg p-3 text-gray-800 outline-none transition-shadow placeholder:text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-400"
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormField;
