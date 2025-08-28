import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import Section from '../components/ui/Section';
import CommunitySlideshow from '../components/ui/CommunitySlideshow';
import { FaEnvelopeCircleCheck, FaPhoneVolume, FaLinkedin, FaGithub, FaGlobe, FaPaperPlane } from 'react-icons/fa6';

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [activeField, setActiveField] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        const observer = new MutationObserver(() => {
            setIsDarkMode(root.classList.contains('dark'));
        });
        observer.observe(root, { attributes: true, attributeFilter: ['class'] });
        // Set initial theme
        setIsDarkMode(root.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    const sendEmail = (data) => {
        const toastId = toast.loading('Sending your message...');
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            data,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then((result) => {
            console.log(result.text);
            toast.success('Message sent successfully!', { id: toastId });
            reset();
        }, (error) => {
            console.log(error.text);
            toast.error('Failed to send message. Please try again.', { id: toastId });
        });
    };

    const getInputStyle = (fieldName) => {
        const baseShadowLight = 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)';
        const baseShadowDark = 'inset 6px 6px 12px #1a1b1e, inset -6px -6px 12px #2e2f34';
        const blueFocusRing = '0 0 0 1.5px #3b82f6'; // blue-500
        const redErrorRing = '0 0 0 1.5px #ef4444'; // red-500

        const lightBg = '#e5e7eb'; // gray-200
        const darkBg = '#242529'; // dark-card color from index.css

        let style = {
            backgroundColor: isDarkMode ? darkBg : lightBg,
            boxShadow: isDarkMode ? baseShadowDark : baseShadowLight,
        };

        if (errors[fieldName]) {
            style.boxShadow = `${redErrorRing}, ${style.boxShadow}`;
        }

        if (activeField === fieldName) {
            style.boxShadow = `${blueFocusRing}, ${style.boxShadow}`;
        }

        return style;
    };

    return (
        <div className="h-full flex flex-col">
            <CommunitySlideshow />
            <Section title="Contact Me">
                <div className="flex flex-col md:flex-row md:space-x-12">
                    <div className="flex-1 space-y-4">
                        {/* Contact Info */}
                        <a href="mailto:kobby.hanson97@gmail.com" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <FaEnvelopeCircleCheck className="w-6 h-6 mr-3 text-red-500" />
                            kobby.hanson97@gmail.com
                        </a>
                        <a href="tel:719-360-2519" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <FaPhoneVolume className="w-6 h-6 mr-3 text-red-500" />
                            719-360-2519
                        </a>
                        <a href="https://www.linkedin.com/in/kobbyhanson" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <FaLinkedin className="w-6 h-6 mr-3 text-red-500" />
                            linkedin.com/in/kobbyhanson
                        </a>
                        <a href="https://github.com/kxnghans" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <FaGithub className="w-6 h-6 mr-3 text-red-500" />
                            github.com/kxnghans
                        </a>
                        <a href="https://hansondeck.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <FaGlobe className="w-6 h-6 mr-3 text-red-500" />
                            hansondeck.com
                        </a>
                    </div>
                    <div className="flex-1 mt-8 md:mt-0">
                        <form onSubmit={handleSubmit(sendEmail)} noValidate className="space-y-4">
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    {...register("name", { required: "Full Name is required." })}
                                    onFocus={() => setActiveField('name')}
                                    onBlur={() => setActiveField('')}
                                    style={getInputStyle('name')}
                                    className="w-full p-3 text-gray-800 dark:text-gray-300 rounded-lg transition-shadow outline-none"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    {...register("email", { 
                                        required: "Email is required.", 
                                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address." }
                                    })}
                                    onFocus={() => setActiveField('email')}
                                    onBlur={() => setActiveField('')}
                                    style={getInputStyle('email')}
                                    className="w-full p-3 text-gray-800 dark:text-gray-300 rounded-lg transition-shadow outline-none"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Subject" 
                                    {...register("subject", { required: "Subject is required." })}
                                    onFocus={() => setActiveField('subject')}
                                    onBlur={() => setActiveField('')}
                                    style={getInputStyle('subject')}
                                    className="w-full p-3 text-gray-800 dark:text-gray-300 rounded-lg transition-shadow outline-none"
                                />
                                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                            </div>
                            <div>
                                <textarea 
                                    placeholder="Your Message" 
                                    rows="4" 
                                    {...register("message", { required: "Message is required." })}
                                    onFocus={() => setActiveField('message')}
                                    onBlur={() => setActiveField('')}
                                    style={getInputStyle('message')}
                                    className="w-full p-3 text-gray-800 dark:text-gray-300 rounded-lg transition-shadow outline-none"
                                ></textarea>
                                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full text-gray-800 dark:text-gray-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:opacity-80 active:scale-95 bevel-light dark:neumorphic-outset-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : <>Send Message <FaPaperPlane style={{ display: 'inline' }} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ContactPage;
