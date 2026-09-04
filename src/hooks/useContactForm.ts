/**
 * @file useContactForm.ts
 * @description Encapsulates contact form state, React Hook Form registration,
 * anti-spam client cooldown throttling, and EmailJS REST submission lifecycle.
 */

import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const SUBMIT_COOLDOWN_MS = 60 * 1000;
export const STORAGE_KEY_LAST_SENT = "hanson_last_contact_sent";

export const useContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Validate anti-spam cooldown and dispatch contact payload via EmailJS
  const sendEmail: SubmitHandler<ContactFormValues> = (data) => {
    const lastSent = localStorage.getItem(STORAGE_KEY_LAST_SENT);
    if (lastSent) {
      const elapsed = Date.now() - Number(lastSent);
      if (elapsed < SUBMIT_COOLDOWN_MS) {
        const remainingSeconds = Math.ceil(
          (SUBMIT_COOLDOWN_MS - elapsed) / 1000,
        );
        toast.error(
          `Please wait ${remainingSeconds}s before sending another message.`,
        );
        return;
      }
    }

    setIsLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data as unknown as Record<string, unknown>,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        localStorage.setItem(STORAGE_KEY_LAST_SENT, String(Date.now()));
        toast.success("Message sent successfully!");
        reset();
        setIsSuccess(true);
        setIsLoading(false);
        setTimeout(() => setIsSuccess(false), 3000);
      })
      .catch((error) => {
        toast.error("Failed to send message. Please try again.");
        console.error("EmailJS Error:", error);
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => setIsError(false), 3000);
      });
  };

  // Surface primary form validation error to the visitor as a toast notification
  const onValidationError = (formErrors: FieldErrors<ContactFormValues>) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) {
      toast.error(String(firstError.message));
    }
  };

  // Compute dynamic icon styling corresponding to submission state
  const getIconClassName = () => {
    if (isSuccess) return "text-green-500";
    if (isError) return "text-red-500";
    if (isLoading) return "animate-spin text-blue-500";
    return "";
  };

  return {
    register,
    handleSubmit,
    reset,
    setValue,
    errors,
    isLoading,
    isSuccess,
    isError,
    sendEmail,
    onValidationError,
    getIconClassName,
  };
};
