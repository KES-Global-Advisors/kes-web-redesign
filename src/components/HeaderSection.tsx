// import React from 'react';
import logo from '../assets/KES-Logo-print.png';

const HeaderSection = () => {
    return (
      <header className="z-50 top-0 lg:right-[16%] left-0 right-0 absolute">
        <div className="max-w-5xl mx-auto">
          <div className="px-6 pt-6 lg:max-w-5xl lg:pl-8 lg:pr-0">
            <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
              <a href="#" className="m-1.5 p-1.5">
                <img src={logo} alt="KES Global Advisors" className="h-10 w-auto" />
              </a>
              <button type="button" className="m-2.5 p-2.5 rounded-lg text-gray-700 lg:hidden">
                <span className="absolute w-px h-px p-0 m-px overflow-hidden clip-rect">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="hidden lg:flex lg:ml-12 lg:gap-x-14">
                <a href="#" className="text-base font-semibold leading-6 text-gray-900">Home</a>
                <a href="#" className="text-base font-semibold leading-6 text-gray-900">About</a>
                <a href="#" className="text-base font-semibold leading-6 text-gray-900">Services</a>
                <a href="#" className="text-base font-semibold leading-6 text-gray-900">Insights</a>
                <a href="#" className="text-base font-semibold leading-6 text-gray-900">Contact</a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  };
  
  export default HeaderSection;
  