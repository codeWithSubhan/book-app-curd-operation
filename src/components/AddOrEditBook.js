import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "./Button";
import { useBook } from "../provider/BookContext";

export default function AddOrEditBook({ onClose, book }) {
  const { register, handleSubmit, reset } = useForm();
  const { addBook, editBook } = useBook();

  const inputFields = [
    {
      type: "text",
      placeholder: "Book name",
      name: "title",
    },
    {
      type: "text",
      placeholder: "Author name",
      name: "author",
    },
    {
      type: "select",
      placeholder: "Select genre",
      name: "genre",
      point: ["Science", "Fiction", "Romance"],
    },
    {
      type: "select",
      placeholder: "Year of book public",
      name: "year",
      point: ["2025", "2024", "2023", "2022", "2021", "2020"],
    },
  ];

  function onSubmit(data) {
    onClose();
    if (book) return editBook(data.id, data);
    addBook(data);
  }

  function onError(err) {
    if (err.title) return toast.error(err.title.message);
    if (err.author) return toast.error(err.author.message);
    if (err.genre) return toast.error(err.genre.message);
    if (err.year) return toast.error(err.year.message);
    if (err.status) return toast.error(err.status.message);
  }

  useLayoutEffect(() => {
    if (book) reset(book);
  }, [book, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="grid grid-cols-2 gap-2">
        {inputFields.map((item) => (
          <React.Fragment key={item.name}>
            {item.type !== "select" && (
              <input
                key={item.name}
                type={item.type}
                className="p-2 border rounded-md flex-1"
                placeholder={item.placeholder}
                {...register(item.name, {
                  required: `${item.name} is required!`,
                  maxLength: {
                    value: 20,
                    message: `${item.name} max 20 chars allowed!`,
                  },
                  minLength: {
                    value: 2,
                    message: `${item.name} min 2 chars allowed!`,
                  },
                  setValueAs: (v) => v.replace(/\s+/g, " ").trim(),
                })}
              />
            )}

            {item.type === "select" && (
              <select
                className="p-2 border rounded-md w-full"
                key={item.name}
                {...register(item.name, {
                  required: `${item.name} is required!`,
                })}
              >
                <option value="" disabled selected>
                  {item.placeholder}
                </option>
                {item.point.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </React.Fragment>
        ))}
      </div>
      <select
        className="p-2 border rounded-md w-full mb-4 mt-2"
        {...register("status", { required: `Status is required!` })}
      >
        <option value="" disabled selected>
          Select Status
        </option>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
      </select>
      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button>Submit</Button>
      </div>
    </form>
  );
}
