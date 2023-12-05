import { LegacyRef } from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  classWrapper?: string;
  bgClass?: string;
  ref?: LegacyRef<HTMLDivElement>;
}

const BaseModal: React.FC<ModalProps> = ({
  isOpen,
  children,
  classWrapper = "bg-white",
  bgClass = "bg-gray-500",
  ref,
}) => {
  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-[#8080806e]"
        >
          <div className={`absolute inset-0 ${bgClass} opacity-75`}></div>
          <div
            className={`base-modal w-100 relative ${classWrapper} rounded-xl`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default BaseModal;
