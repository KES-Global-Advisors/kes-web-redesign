'use client'

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-white border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <Image 
                src="https://i.postimg.cc/4dnBSWYW/KES-Logo-print.png"
                alt="KES Global Advisors" 
                className="h-10 w-auto" 
                width={120}
                height={40}
              />
            </div>
            <nav className="mt-11 flex gap-8">
              <Link 
                href="/"
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                <span className="relative z-10">Home</span>
              </Link>
              <Link 
                href="/about"
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                <span className="relative z-10">About</span>
              </Link>
              <Link 
                href="/services"
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                <span className="relative z-10">Services</span>
              </Link>
              <Link 
                href="/insights"
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                <span className="relative z-10">Insights</span>
              </Link>
              <Link 
                href="/contact"
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                <span className="relative z-10">Contact</span>
              </Link>
            </nav>
          </div>
        </div>
        <div className=" text-center  border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <p className="mt-6 text-sm text-gray-500 md:mt-0">© Copyright 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;