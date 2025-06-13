import { useEffect, useState } from "react";
import { useBook } from "../provider/BookContext";

export default function Filter() {
  const { bookData, setFilterData } = useBook();
  const [genre, setGenre] = useState("Genre");
  const [status, setStaus] = useState("Status");
  const [query, setQuery] = useState("");

  function handlefilter() {
    let data = [...bookData];

    if (genre !== "Genre") data = data.filter((item) => item.genre === genre);

    if (status !== "Status")
      data = data.filter((item) => item.status === status);

    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q)
      );
    }

    setFilterData(data);
  }

  useEffect(handlefilter, [genre, bookData, status, query, setFilterData]);

  return (
    <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center">
      <select
        className="p-2 border rounded-md w-full md:w-40"
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="Genre">Genre</option>
        <option value="Science">Science</option>
        <option value="Fiction">Fiction</option>
        <option value="Romance">Romance</option>
      </select>

      <select
        className="p-2 border rounded-md w-full md:w-40"
        onChange={(e) => setStaus(e.target.value)}
      >
        <option value="Status">Status</option>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
      </select>

      <input
        type="text"
        className="p-2 border rounded-md w-full"
        placeholder="Search by title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
