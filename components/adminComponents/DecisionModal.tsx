import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface DecisionModalProps {
  open: boolean;
  applicationDecisions: boolean;
  updateApplicationDecisions: () => void;
  onClose: () => void;
}

function DecisionModal({
  open,
  applicationDecisions,
  updateApplicationDecisions,
  onClose,
}: DecisionModalProps) {
  return (
    <div>
      <Transition
        appear
        show={open && applicationDecisions !== null && applicationDecisions !== undefined}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            onClose();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl  bg-secondaryDark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-primary">
                    Update Application Decisions
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-secondary">
                      {`Are you sure you want to ${
                        applicationDecisions ? 'disable' : 'enable'
                      } application decisions?`}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primaryDark px-4 py-2 text-sm font-medium text-secondary hover:bg-primaryDark/70 hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={async () => {
                        await updateApplicationDecisions();
                        onClose();
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-tertiary px-4 py-2 text-sm font-medium text-secondary hover:bg-tertiary/70 hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default DecisionModal;
