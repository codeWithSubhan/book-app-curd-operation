import { useState } from "react";
import AddOrEditBook from "./AddOrEditBook";
import Modal from "./Modal";
import Button from "./Button";
import { useBook } from "../provider/BookContext";
import useModal from "../lib/hooks/useModal";

export default function BookTable() {
  const { filterData } = useBook();
  const [curPage, setCurPage] = useState(1);
  const PAGE = 10;

  const totalPages = Math.ceil(filterData.length / PAGE);
  const displayedBooks = filterData.slice((curPage - 1) * PAGE, curPage * PAGE);

  function handleNext() {
    if (curPage < totalPages) setCurPage((prev) => prev + 1);
  }

  function handlePrev() {
    if (curPage > 1) setCurPage((prev) => prev - 1);
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-[700px] text-left border-collapse w-full">
        <thead>
          <tr className="bg-gray-100 text-sm text-gray-700">
            <th className="p-3">S NO</th>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Genre</th>
            <th className="p-3">Published</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {displayedBooks.map((book, i) => (
            <Book key={book.id} book={book} i={(curPage - 1) * PAGE + i + 1} />
          ))}

          {!filterData.length && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No book found!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filterData.length > PAGE && (
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-600">
          <span>
            {(curPage - 1) * PAGE + 1} to{" "}
            {Math.min(curPage * PAGE, filterData.length)} of {filterData.length}{" "}
            books
          </span>

          <div className="space-x-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={handlePrev}
              disabled={curPage === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={curPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Book({ book, i }) {
  const [isOpenEdit, toggleEdit] = useModal(false);
  const [isOpenDelete, toggleDelete] = useModal(false);
  const { deleteBook } = useBook();

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3">{i.toString().padStart(2, "0")}</td>
      <td className="p-3">{book.title}</td>
      <td className="p-3">{book.author}</td>
      <td className="p-3">{book.genre}</td>
      <td className="p-3">{book.year}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            book.status === "Available"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {book.status}
        </span>
      </td>
      <td className="p-3 space-x-2">
        <button
          className="text-indigo-600 hover:underline"
          onClick={toggleEdit}
        >
          Edit
        </button>
        <button className="text-red-600 hover:underline" onClick={toggleDelete}>
          Delete
        </button>
      </td>

      {/* Edit Modal */}
      <Modal isOpen={isOpenEdit} title="Edit Book">
        <AddOrEditBook onClose={toggleEdit} book={book} />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isOpenDelete}
        title={`⚠️ Are you sure you want to delete "${book.title}"?`}
      >
        <div className="flex justify-end gap-2">
          <Button onClick={toggleDelete}>Cancel</Button>
          <Button
            onClick={() => {
              deleteBook(book.id);
              toggleDelete();
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </tr>
  );
}
