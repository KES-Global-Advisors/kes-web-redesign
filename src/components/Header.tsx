// import React from 'react';

const Header = () => {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a aria-label="Home" href="#">
                <span className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                    </svg>
                    <h1 className="text-blue-600 font-extrabold text-3xl">KES</h1>
                </span>
            </a>
          </div>

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
