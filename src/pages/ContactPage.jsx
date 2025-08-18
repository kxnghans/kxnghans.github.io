import React from 'react';
import Section from '../components/ui/Section';
import CommunitySlideshow from '../components/ui/CommunitySlideshow';

const ContactPage = () => (
    <div className="h-full flex flex-col">
        <CommunitySlideshow />
        <Section title="Contact Me">
            <div className="flex flex-col md:flex-row md:space-x-12">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center"><svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg><a href="mailto:kobby.hanson97@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">kobby.hanson97@gmail.com</a></div>
                    <div className="flex items-center"><svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg><span className="text-gray-600 dark:text-gray-400">719-360-2519</span></div>
                    <div className="flex items-center"><svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a1.144 1.144 0 01-1.144-1.144c0-.629.513-1.143 1.144-1.143.63 0 1.144.514 1.144 1.143 0 .63-.514 1.144-1.144 1.144zM6.61 16.338H4.062v-8.59h2.548v8.59zM17.638 0H2.362C1.06 0 0 1.06 0 2.362v15.276C0 18.94 1.06 20 2.362 20h15.276C18.94 20 20 18.94 20 17.638V2.362C20 1.06 18.94 0 17.638 0z" clipRule="evenodd"></path></svg><a href="https://www.linkedin.com/in/kobbyhanson" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">linkedin.com/in/kobbyhanson</a></div>
                </div>
                <div className="flex-1 mt-8 md:mt-0">
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark" />
                        <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark" />
                        <textarea placeholder="Your Message" rows="4" className="w-full p-3 bg-gray-200 text-gray-800 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow bevel-light-inset dark:neumorphic-inset-dark"></textarea>
                        <button type="submit" className="w-full text-gray-800 dark:text-gray-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:opacity-80 active:scale-95 bevel-light dark:neumorphic-outset-dark">Send Message</button>
                    </form>
                </div>
            </div>
        </Section>
    </div>
);

export default ContactPage;