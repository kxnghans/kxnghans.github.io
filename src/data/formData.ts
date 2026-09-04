import type { FormFieldItem } from "../types/data";

export const formFields: FormFieldItem[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Full Name",
    autoComplete: "name",
    validation: { required: "Full Name is required." },
  },
  {
    name: "email",
    type: "email",
    placeholder: "Your Email",
    autoComplete: "email",
    validation: {
      required: "Email is required.",
      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address." },
    },
  },
  {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    autoComplete: "off",
    validation: { required: "Subject is required." },
  },
  {
    name: "message",
    type: "textarea",
    placeholder: "Message",
    autoComplete: "off",
    validation: { required: "Message is required." },
  },
];
