import logo from '../assets/KES-Logo-print.png';
import kevin from '../assets/kevin.jpeg';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="border-t bg-white border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <img src={logo} alt="KES Global Advisors" className="h-10 w-auto" />
            </div>
            <nav className="mt-11 flex gap-8">
              <Link to="home" smooth={true} duration={500}>
                <button className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0">
                  <span className="relative z-10">Home</span>
                </button>
              </Link>
              <Link to="about" smooth={true} duration={500}>
                <button className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0">
                  <span className="relative z-10">About</span>
                </button>
              </Link>
              <Link to="services" smooth={true} duration={400}>
                <button className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0">
                  <span className="relative z-10">Services</span>
                </button>
              </Link>
              <Link to="insights" smooth={true} duration={600}>
                <button className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0">
                  <span className="relative z-10">Insights</span>
                </button>
              </Link>
            </nav>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <img alt="Kevin Smith CEO" loading="lazy" decoding="async" data-nimg="1" style={{ color: 'transparent', borderRadius: '20%' }} src={kevin} />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-gray-900">
                  <span className="absolute inset-0 sm:rounded-2xl"></span>
                  Kevin Smith
              </p>
              <p className="mt-1 text-sm text-gray-700">President and Founder</p>
            </div>
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
