import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import Section from '../components/ui/Section';
import CommunitySlideshow from '../components/ui/CommunitySlideshow';
import { FaPaperPlane } from 'react-icons/fa6';

// Import your new creations
import { contactLinks } from '../data/contactData';
import { formFields } from '../data/formData';
import FormField from '../components/ui/FormField';

const ContactPage = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendEmail = (data) => {
    setIsLoading(true);
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      data,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      toast.success('Message sent successfully!');
      reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 10000);
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const onValidationError = (validationErrors) => {
    console.error('Form Validation Errors:', validationErrors);
    setIsError(true);
    setTimeout(() => setIsError(false), 3000);
  };

  const getIconClassName = () => {
    if (isLoading) {
      return 'text-amber-500 dark:text-yellow-400';
    }
    if (isSuccess) {
      return 'text-green-600 dark:text-green-500';
    }
    if (isError) {
      return 'text-red-600 dark:text-red-500';
    }
    return '';
  };

  return (
    <div className="h-full flex flex-col">
      <CommunitySlideshow />
      <Section title="Contact Me">
        <div className="flex flex-col md:flex-row md:space-x-12">
          
          {/* Mapped Contact Info */}
          <div className="flex-1 space-y-4">
            {contactLinks.map(({ href, icon: Icon, text }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                <Icon className="w-6 h-6 mr-3 text-red-500" />
                {text}
              </a>
            ))}
          </div>

          {/* Mapped Form */}
          <div className="flex-1 mt-8 md:mt-0">
            <form onSubmit={handleSubmit(sendEmail, onValidationError)} noValidate className="space-y-4">
              {formFields.map((field) => (
                <FormField
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
                className="w-full text-gray-800 dark:text-gray-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:opacity-80 active:scale-95 bevel-light dark:neumorphic-outset-dark disabled:cursor-not-allowed flex items-center justify-center"
              >
                Send Message
                <FaPaperPlane className={`inline ml-2 transition-colors duration-300 ${getIconClassName()}`} />
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;