import { FC } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Service {
  tagline: string;
  name: string;
  imgSrc: string;
  description: Array<string> | string;
  subContentTitle1: string;
  subContentDescription1: string;
  subContentTitle2: string;
  subContentDescription2: string;
  subContentTitle3: string;
  subContentDescription3: string;
}

interface ServiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const ServiceDrawer: FC<ServiceDrawerProps> = ({ isOpen, onClose, service }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[1000]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0 z-[999]"
      />

      <div className="fixed inset-0 overflow-hidden z-[1000]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 z-[1000]"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <p className="text-gray-700 text-sm font-semibold mb-2">
                        {service?.tagline}
                  </p>
                  <DialogTitle className="text-2xl font-semibold leading-6 text-gray-900">
                    {service?.name}
                  </DialogTitle>
                </div>


                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className=''>
                        <img src={service?.imgSrc} alt="Service" className="w-full h-64 object-cover" />
                    </div>
                  <div className='mt-10'>
                    <h1 className="text-lg font-semibold leading-6 text-gray-900">Description</h1>
                    {Array.isArray(service?.description) ? (
                      service?.description.map((line, index) => (
                        <p key={index} className="mt-2">{line}</p>
                      ))
                    ) : (
                      <p className="mt-2">{service?.description}</p>
                    )}

                    <h1 className="text-lg font-semibold leading-6 text-gray-900 mt-6">{service?.subContentTitle1}</h1>
                    <p className='mt-2'>{service?.subContentDescription1}</p>

                    <h1 className="text-lg font-semibold leading-6 text-gray-900 mt-6">{service?.subContentTitle2}</h1>
                    <p className='mt-2'>{service?.subContentDescription2}</p>

                    <h1 className="text-lg font-semibold leading-6 text-gray-900 mt-6">{service?.subContentTitle3}</h1>
                    <p className='mt-2'>{service?.subContentDescription3}</p>
                  </div>  
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ServiceDrawer;
