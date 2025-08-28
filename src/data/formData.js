export const formFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Full Name",
    validation: { required: "Full Name is required." },
  },
  {
    name: "email",
    type: "email",
    placeholder: "Your Email",
    validation: {
      required: "Email is required.",
      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address." },
    },
  },
  {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    validation: { required: "Subject is required." },
  },
  {
    name: "message",
    type: "textarea",
    placeholder: "Your Message",
    validation: { required: "Message is required." },
  },
];
