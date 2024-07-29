// import React from 'react';
import logo from '../assets/KES-Logo-print.png';

const Header = () => {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <a aria-label="Home" href="#">
            <img src={logo} alt="KES Global Advisors" className="h-10 w-auto" />
          </a>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:flex md:gap-x-6">
              <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#features">
                Home
              </a>
              <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#testimonials">
                About
              </a>
              <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">
                Services
              </a>
              <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">
                Insights
              </a>
              <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">
                Contact
              </a>
            </div>

            <div className="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button
                  className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                  aria-label="Toggle Navigation"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:r2:"
                >
                  <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth="2" strokeLinecap="round">
                    <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition"></path>
                    <path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0"></path>
                  </svg>
                </button>
              </div>
              <div style={{ position: 'fixed', top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0, display: 'none' }}></div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
