import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../lib/constant";
import toast from "react-hot-toast";

const BookContext = createContext();

export default function BookProvider({ children }) {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);

  async function fetchBooks() {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL);
      setBookData(res.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addBook(data) {
    try {
      setIsLoading(true);
      const res = await axios.post(BASE_URL, data);
      setBookData((prev) => [...prev, res.data]);
      toast.success("Successfully added book!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function editBook(id, data) {
    try {
      setIsLoading(true);
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      const updatedData = bookData.map((book) =>
        book.id === id ? res.data : book
      );
      setBookData(updatedData);
      toast.success("Successfully added book!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBook(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/${id}`);
      const updatedData = bookData.filter((book) => book.id !== id);
      setBookData(updatedData);
      toast.success("Successfully deleted book!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        bookData,
        setBookData,
        isLoading,
        addBook,
        editBook,
        deleteBook,
        filterData,
        setFilterData,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (context === undefined)
    return new Error("BookContext is used outside the provider");
  return context;
}
