import React from 'react';
import Section from '../components/ui/Section';
import CommunitySlideshow from '../components/ui/CommunitySlideshow';

const ContactPage = () => (
    <div className="h-full flex flex-col">
        <CommunitySlideshow />
        <Section title="Contact Me">
            <div className="flex flex-col md:flex-row md:space-x-12">
                <div className="flex-1 space-y-4">
                    {/* Email */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        <a href="mailto:kobby.hanson97@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">kobby.hanson97@gmail.com</a>
                    </div>
                    
                    {/* Phone Number (Corrected for consistency) */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                        </svg>
                        <a href="tel:719-360-2519" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">719-360-2519</a>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a1.144 1.144 0 01-1.144-1.144c0-.629.513-1.143 1.144-1.143.63 0 1.144.514 1.144 1.143 0 .63-.514 1.144-1.144 1.144zM6.61 16.338H4.062v-8.59h2.548v8.59zM17.638 0H2.362C1.06 0 0 1.06 0 2.362v15.276C0 18.94 1.06 20 2.362 20h15.276C18.94 20 20 18.94 20 17.638V2.362C20 1.06 18.94 0 17.638 0z" clipRule="evenodd"></path></svg>
                        <a href="https://www.linkedin.com/in/kobbyhanson" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">linkedin.com/in/kobbyhanson</a>
                    </div>
                    
                    {/* GitHub */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
                        <a href="https://github.com/kxnghans" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">kxnghans.github.io</a>
                    </div>

                    {/* Website */}
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>
                        <a href="https://hansondeck.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">hansondeck.com</a>
                    </div>
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