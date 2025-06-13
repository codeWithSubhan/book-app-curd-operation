import { createPortal } from "react-dom";

export default function Modal({ children, title, isOpen }) {
  if (!isOpen) return;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-[600px] w-full shadow-xl m-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  );
}
