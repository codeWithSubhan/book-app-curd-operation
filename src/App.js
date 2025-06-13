import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Filter from "./components/Filter";
import BookTable from "./components/BookTable";
import Loading from "./components/Loading";

import "./App.css";
import { useBook } from "./provider/BookContext";

export default function App() {
  const { bookData, isLoading } = useBook();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <Filter />
        {!isLoading && <BookTable bookData={bookData} />}
        {isLoading && <Loading />}
      </div>
      <Toaster />
    </div>
  );
}
