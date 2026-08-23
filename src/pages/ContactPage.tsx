import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import Section from "../components/ui/Section";
import CommunitySlideshow from "../components/ui/CommunitySlideshow";
import { FaPaperPlane } from "react-icons/fa6";
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
        setTimeout(() => setIsSuccess(false), 10000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onValidationError = (
    validationErrors: FieldErrors<ContactFormValues>,
  ) => {
    console.error("Form Validation Errors:", validationErrors);
    setIsError(true);
    setTimeout(() => setIsError(false), 3000);
  };

  const getIconClassName = () => {
    if (isLoading) {
      return "text-amber-500 dark:text-yellow-400";
    }
    if (isSuccess) {
      return "text-green-600 dark:text-green-500";
    }
    if (isError) {
      return "text-red-600 dark:text-red-500";
    }
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
              {contactLinks.map(({ href, icon: Icon, text }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Icon className="mr-3 h-6 w-6 text-red-500" />
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
                  className="bevel-light dark:neumorphic-outset-dark dark:bg-dark-card flex w-full transform items-center justify-center rounded-lg bg-gray-100 px-4 py-3 font-bold text-gray-800 transition-all duration-200 hover:opacity-80 active:scale-95 disabled:cursor-not-allowed dark:text-gray-300"
                >
                  Send Message
                  <FaPaperPlane
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
