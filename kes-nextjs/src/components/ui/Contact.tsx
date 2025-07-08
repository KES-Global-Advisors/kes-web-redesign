'use client'

import { useEffect, useRef, useState } from 'react';

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = ({ id }) => {
  const sectionRef = useRef(null);
  const [status, setStatus] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (window.location.hash === '#contact' && sectionRef.current) {
      (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validation logic
    const validationErrors: string[] = [];
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (preferredContact === 'email' && !email) {
      validationErrors.push('Please provide your email address.');
    }
    if (preferredContact === 'phone' && !phone) {
      validationErrors.push('Please provide your phone number.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    
    // Handle form submission (e.g., send data to backend)
    try {
      const response = await fetch('https://formspree.io/f/mldrvaey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset(); // Clear the form fields
        setPreferredContact(null); // Reset preferred contact
      } else {
        setStatus('ERROR');
      }
    } catch {
      setStatus('ERROR');
    }
  };

  return (
    <div
      id={id}
      ref={sectionRef}
      className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative"
      style={{
        backgroundImage: `url('/assets/Globe.png')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '45%',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly more opaque for better readability
      }}
    >
      {/* Optional: Add a subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h1>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/90"
                  required
                />
              </div>
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/90"
                  required
                />
              </div>
            </div>
            {/* Company */}
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/90"
                />
              </div>
            </div>
            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/90"
                />
              </div>
              {preferredContact === 'email' && errors.includes('Please provide your email address.') && (
                <p className="text-red-500 text-sm mt-1">Please provide your email address.</p>
              )}
            </div>
            {/* Phone */}
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2.5">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/90"
                />
              </div>
              {preferredContact === 'phone' && errors.includes('Please provide your phone number.') && (
                <p className="text-red-500 text-sm mt-1">Please provide your phone number.</p>
              )}
            </div>
            {/* Preferred Contact Method */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Preferred Method of Contact
              </label>
              <div className="mt-2.5">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="preferred-contact"
                    value="email"
                    onChange={() => setPreferredContact('email')}
                    className="form-radio rounded text-indigo-600"
                  />
                  <span className="ml-2 text-gray-900">Email</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="preferred-contact"
                    value="phone"
                    onChange={() => setPreferredContact('phone')}
                    className="form-radio rounded text-indigo-600"
                  />
                  <span className="ml-2 text-gray-900">Phone</span>
                </label>
              </div>
            </div>
            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/90"
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-[rgb(55,134,181)] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
          {status === 'SUCCESS' && <p className="text-center text-green-600 mt-4">Thanks for your message!</p>}
          {status === 'ERROR' && <p className="text-center text-red-600 mt-4">Oops! There was an error sending your message.</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;