import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import Section from "../components/ui/Section";
import CommunitySlideshow from "../components/ui/CommunitySlideshow";
import { Icon, ICONS } from "../components/icons";
import { UI_BUTTONS } from "../theme";
import { contactLinks, formFields } from "../data";
import FormField from "../components/ui/FormField";

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBMIT_COOLDOWN_MS = 60 * 1000;
const STORAGE_KEY_LAST_SENT = "hanson_last_contact_sent";

const ContactPage = () => {
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

  const onValidationError = (formErrors: FieldErrors<ContactFormValues>) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) {
      toast.error(String(firstError.message));
    }
  };

  const getIconClassName = () => {
    if (isSuccess) return "text-green-500";
    if (isError) return "text-red-500";
    if (isLoading) return "animate-spin text-blue-500";
    return "";
  };

  return (
    <>
      <title>Contact | Hanson-Tube</title>
      <meta
        name="description"
        content="Contact Kobby Hanson for systems engineering, data science, or software projects."
      />
      <div className="flex h-full flex-col">
        <CommunitySlideshow />
        <Section title="Contact Me">
          <div className="flex flex-col md:flex-row md:space-x-12">
            {/* Mapped Contact Info */}
            <div className="flex-1 space-y-4">
              {contactLinks.map(({ href, icon: iconName, text }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Icon
                    name={iconName}
                    className="mr-3 h-6 w-6 text-red-600 dark:text-red-400"
                  />
                  {text}
                </a>
              ))}
            </div>

            {/* Mapped Form */}
            <div className="mt-8 flex-1 md:mt-0">
              <form
                onSubmit={handleSubmit(sendEmail, onValidationError)}
                noValidate
                className="space-y-4"
              >
                {formFields.map((field) => (
                  <FormField<ContactFormValues>
                    key={field.name}
                    {...field}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                  />
                ))}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess || isError}
                  className={UI_BUTTONS.secondary}
                >
                  Send Message
                  <Icon
                    name={ICONS.SEND}
                    className={`ml-2 inline transition-colors duration-300 ${getIconClassName()}`}
                  />
                </button>
              </form>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default ContactPage;
