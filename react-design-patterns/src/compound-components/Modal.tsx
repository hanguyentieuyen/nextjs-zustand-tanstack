import { createContext, PropsWithChildren, useContext } from "react";

type ModalProps = {
  title: string;
  content?: string;
};

type ModalProviderProps = {
  modal: ModalProps;
};

type ModalCardProps = PropsWithChildren & {
  modal: ModalProps;
};

// context
const ModalContext = createContext<ModalProviderProps | undefined>(undefined);

// hook
function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContent must be used within Provider");
  }
  return context;
}

export default function Modal({ modal, children }: ModalCardProps) {
  return (
    <ModalContext.Provider value={{ modal }}>
      <div className=" p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {children}
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

// child components

Modal.Title = function ModalTitle({ subTitle }: { subTitle?: string }) {
  const { modal } = useModalContext();
  return (
    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      {subTitle}. {modal.title}
    </h3>
  );
};

Modal.Content = function ModalContent() {
  const { modal } = useModalContext();
  return <p className="text-gray-500 mb-3">{modal.content}</p>;
};

Modal.FooterButton = function ModalFooterButton() {
  return (
    <>
      <button
        data-modal-hide="popup-modal"
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
      >
        Yes, I'm sure
      </button>
      <button
        data-modal-hide="popup-modal"
        type="button"
        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        No, cancel
      </button>
    </>
  );
};
