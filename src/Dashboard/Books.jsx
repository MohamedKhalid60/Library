import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookForm() {
  // Define state for form input values
  const [bookData, setBookData] = useState({
    Title: "",
    Author: "",
    ISBN: "",
    RackNumber: 0,
    AvailableQuantity: 0,
  });
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if files are selected
    if (!e.target.Poster.files[0] || !e.target.Pdf.files[0]) {
      setError("Please select both Poster and PDF files.");
      return;
    }

    const formData = new FormData();
    formData.append("Title", bookData.Title);
    formData.append("Author", bookData.Author);
    formData.append("ISBN", bookData.ISBN);
    formData.append("RackNumber", bookData.RackNumber);
    formData.append("AvailableQuantity", bookData.AvailableQuantity);
    formData.append("Poster", e.target.Poster.files[0]);
    formData.append("Pdf", e.target.Pdf.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:5041/api/user/Books/AddOne",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use backticks here
          },
        }
      );

      if (response.status === 200) {
        setBooks([...books, response.data]);
        // Handle success
        console.log("Book added successfully:", response.data);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Function to fetch books when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5041/api/user/Books/GetAll",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to fetch books only once when component mounts

  return (
    <>
      <form className="p-2 mt-2" onSubmit={handleFormSubmit} encType="multipart" >
        <div className="mb-3">
          <label htmlFor="poster" className="form-label">
            Poster
          </label>
          <input
            type="file"
            className="form-control"
            id="poster"
            name="poster"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pdf" className="form-label">
            {" "}
            PDF{" "}
          </label>
          <input
            type="file"
            className="form-control"
            id="pdf"
            name="Pdf"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            {" "}
            Title{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="Title"
            value={bookData.Title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            {" "}
            Author{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="Author"
            value={bookData.Author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">
            {" "}
            ISBN{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            name="ISBN"
            value={bookData.ISBN}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rackNumber" className="form-label">
            Rack Number
          </label>
          <input
            type="number"
            className="form-control"
            id="rackNumber"
            name="RackNumber"
            value={bookData.RackNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Available Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="AvailableQuantity"
            value={bookData.AvailableQuantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit"  className="btn w-100 btn-primary">
          {" "}
          Add Book{" "}
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Rack Number</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.rackNumber}</td>
              <td>{book.availableQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
