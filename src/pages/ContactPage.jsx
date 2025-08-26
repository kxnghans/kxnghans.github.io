import React from 'react';
import Section from '../components/ui/Section';
import CommunitySlideshow from '../components/ui/CommunitySlideshow';
import { FaEnvelopeCircleCheck, FaPhoneVolume, FaLinkedin, FaGithub, FaGlobe, FaPaperPlane } from 'react-icons/fa6';

const ContactPage = () => (
    <div className="h-full flex flex-col">
        <CommunitySlideshow />
        <Section title="Contact Me">
            <div className="flex flex-col md:flex-row md:space-x-12">
                <div className="flex-1 space-y-4">
                    {/* Email */}
                    <a href="mailto:kobby.hanson97@gmail.com" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <FaEnvelopeCircleCheck className="w-6 h-6 mr-3 text-red-500" />
                        kobby.hanson97@gmail.com
                    </a>
                    
                    {/* Phone Number (Corrected for consistency) */}
                    <a href="tel:719-360-2519" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <FaPhoneVolume className="w-6 h-6 mr-3 text-red-500" />
                        719-360-2519
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/kobbyhanson" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <FaLinkedin className="w-6 h-6 mr-3 text-red-500" />
                        linkedin.com/in/kobbyhanson
                    </a>
                    
                    {/* GitHub */}
                    <a href="https://github.com/kxnghans" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <FaGithub className="w-6 h-6 mr-3 text-red-500" />
                        github.com/kxnghans
                    </a>

                    {/* Website */}
                    <a href="https://hansondeck.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <FaGlobe className="w-6 h-6 mr-3 text-red-500" />
                        hansondeck.com
                    </a>
                </div>
                <div className="flex-1 mt-8 md:mt-0">
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark" />
                        <input type="email" placeholder="Email (From)" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark" />
                        <input type="text" placeholder="Subject" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark" />
                        <textarea placeholder="Your Message" rows="4" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark"></textarea>
                        <button type="submit" className="w-full text-gray-800 dark:text-gray-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:opacity-80 active:scale-95 bevel-light dark:neumorphic-outset-dark">Send Message <FaPaperPlane style={{ display: 'inline' }} /></button>
                    </form>
                </div>
            </div>
        </Section>
    </div>
);

export default ContactPage;