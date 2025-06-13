import { useState } from "react";

export default function useModal(initialState) {
  const [isOpen, setIsOpen] = useState(initialState);

  function onClose() {
    setIsOpen((prev) => !prev);
  }
  return [isOpen, onClose];
}
