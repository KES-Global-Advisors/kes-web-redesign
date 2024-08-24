import { useState, useEffect } from 'react';
import logo from '../assets/KES-Logo-print.png';
import globe from '../assets/Globe.png';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Events } from 'react-scroll';

const navigation = [
  { name: 'Home', link: 'home' },
  { name: 'Services', link: 'services' },
  { name: 'About', link: 'about' },
  { name: 'Insights', link: 'insights' },
  { name: 'Contact', link: 'contact' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    Events.scrollEvent.register('begin', () => {
      setMobileMenuOpen(false);
    });
    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  return (
    <header className="z-50 top-0 bg-white fixed w-full">
      <div className="w-full mx-auto lg:max-w-7xl">
        <div className="px-6 pt-6 w-full lg:pl-8 lg:pr-0 max-w-3xl">
          <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
            <a href="/" className="m-1.5 p-1.5">
              <img src={logo} alt="KES Global Advisors Logo" className="h-10 w-auto" />
            </a>
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="m-2.5 p-2.5 rounded-lg text-gray-700 lg:hidden"
            >
              {mobileMenuOpen ? (
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              ) : (
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              )}
            </button>
            <div className="hidden lg:flex lg:ml-12 lg:gap-x-14">
              {navigation.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="active"
                  onSetActive={() => setActiveSection(item.link)}
                  className={`text-base font-semibold leading-6 cursor-pointer ${
                    activeSection === item.link ? 'text-indigo-600' : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src={globe}
                    className="h-10 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.link}
                        to={item.link} 
                        smooth={true} 
                        duration={600}
                        spy={true}
                        activeClass="active"
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer ${
                          activeSection === item.link ? 'bg-indigo-100' : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
