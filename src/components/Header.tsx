import { useState } from 'react';
import logo from '../assets/KES-Logo-print.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-scroll';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="z-50 top-0 lg:right-[16%] left-0 right-0 lg:absolute bg-white fixed lg:bg-transparent">
            <div className="max-w-5xl mx-auto">
                <div className="px-6 pt-6 lg:max-w-5xl lg:pl-8 lg:pr-0">
                    <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
                        <a href="#" className="m-1.5 p-1.5">
                            <img src={logo} alt="KES Global Advisors" className="h-10 w-auto" />
                        </a>
                        <button 
                            type="button" 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="m-2.5 p-2.5 rounded-lg text-gray-700 lg:hidden"
                        >
                            <span className="absolute w-px h-px p-0 m-px overflow-hidden clip-rect">
                              {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
                            </span>
                            {mobileMenuOpen ? (
                              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            ) : (
                              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            )}
                        </button>
                        <div className="hidden lg:flex lg:ml-12 lg:gap-x-14">
                            <Link to="home" smooth={true} duration={500}>
                                <p className="text-base font-semibold leading-6 text-gray-900 cursor-pointer">Home</p>
                            </Link>
                            <Link to="services" smooth={true} duration={400}>
                                <p className="text-base font-semibold leading-6 text-gray-900 cursor-pointer">Services</p>
                            </Link>
                            <Link to="about" smooth={true} duration={500}>
                                <p className="text-base font-semibold leading-6 text-gray-900 cursor-pointer">About</p>
                            </Link>
                            <Link to="insights" smooth={true} duration={600}>
                                <p className="text-base font-semibold leading-6 text-gray-900 cursor-pointer">Insights</p>
                            </Link>
                            <Link to="contact" smooth={true} duration={700}>
                                <p className="text-base font-semibold leading-6 text-gray-900 cursor-pointer">Contact</p>
                            </Link>
                        </div>
                    </nav>
                    {mobileMenuOpen && (
                        <div className="lg:hidden absolute top-16 right-0 w-full bg-white shadow-lg p-6 z-50">
                            <div className="space-y-4">
                                <Link to="home" smooth={true} duration={500} onClick={() => setMobileMenuOpen(false)}>
                                    <p className="text-end font-semibold leading-6 text-gray-900 cursor-pointer">Home</p>
                                </Link>
                                <Link to="services" smooth={true} duration={400} onClick={() => setMobileMenuOpen(false)}>
                                    <p className="text-end font-semibold leading-6 text-gray-900 cursor-pointer">Services</p>
                                </Link>
                                <Link to="about" smooth={true} duration={500} onClick={() => setMobileMenuOpen(false)}>
                                    <p className="text-end font-semibold leading-6 text-gray-900 cursor-pointer">About</p>
                                </Link>
                                <Link to="insights" smooth={true} duration={600} onClick={() => setMobileMenuOpen(false)}>
                                    <p className="text-end font-semibold leading-6 text-gray-900 cursor-pointer">Insights</p>
                                </Link>
                                <Link to="contact" smooth={true} duration={700} onClick={() => setMobileMenuOpen(false)}>
                                    <p className="text-end font-semibold leading-6 text-gray-900 cursor-pointer">Contact</p>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
