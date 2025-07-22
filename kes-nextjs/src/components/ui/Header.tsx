'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getServiceSlugs } from '@/lib/services';


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prefetch all pages including service slugs
  useEffect(() => {
    // Prefetch main pages
    navigation.forEach(item => {
      router.prefetch(item.href);
    });

    // Prefetch all service detail pages
    const serviceSlugs = getServiceSlugs();
    serviceSlugs.forEach(slug => {
      router.prefetch(`/services/${slug}`);
    });
  }, [router]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="z-50 top-0 bg-white fixed w-full">
      <div className="w-full mx-auto lg:max-w-7xl">
        <div className="px-6 pt-6 w-full lg:pl-8 lg:pr-0 max-w-3xl">
          <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
            <Link href="/" className="m-1.5 p-1.5">
              <Image 
                src="/assets/KES-Logo-print.png" 
                alt="KES Global Advisors Logo" 
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
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
                  key={item.href}
                  href={item.href}
                  className={`text-base font-semibold leading-6 ${
                    isActive(item.href) ? 'text-indigo-600' : 'text-gray-900 hover:text-indigo-600'
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
                <Link href="/" className="-m-1.5 p-1.5">
                  <Image
                    alt="KES Global Advisors"
                    src="/assets/Globe.png"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
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
                        key={item.href}
                        href={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${
                          isActive(item.href) ? 'bg-indigo-100' : ''
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