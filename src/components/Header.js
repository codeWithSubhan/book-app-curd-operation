import Logo from "./Logo";
import Button from "./Button";
import Modal from "./Modal";
import AddOrEditBook from "./AddOrEditBook";
import useModal from "../lib/hooks/useModal";

export default function Header() {
  const [isOpen, onClose] = useModal(false);

  return (
    <div className="flex justify-between items-center mb-4">
      <Logo />
      <Button onClick={onClose}>ADD BOOK</Button>

      <Modal isOpen={isOpen} title="ADD BOOK">
        <AddOrEditBook onClose={onClose} />
      </Modal>
    </div>
  );
}
