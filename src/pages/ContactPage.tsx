/**
 * @file ContactPage.tsx
 * @description Contact and networking page featuring direct communication channels,
 * social connections, community slideshow, and an accessible message dispatch form.
 */

import Section from "../components/ui/Section";
import CommunitySlideshow from "../components/ui/CommunitySlideshow";
import { Icon, ICONS } from "../components/icons";
import { UI_BUTTONS } from "../theme";
import { contactLinks, formFields } from "../data";
import FormField from "../components/ui/FormField";
import {
  useContactForm,
  type ContactFormValues,
} from "../hooks/useContactForm";

export type { ContactFormValues };

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isLoading,
    isSuccess,
    isError,
    sendEmail,
    onValidationError,
    getIconClassName,
  } = useContactForm();

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
            {/* Mapped Contact Channels */}
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

            {/* Direct Message Form */}
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
