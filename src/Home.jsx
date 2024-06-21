import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookForm() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

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
        setError("Error fetching books. Please try again later.");
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to fetch books only once when component mounts

  // Function to handle borrowing a book
  const handleBorrowBook = async (bookId) => {
    try {
      const response = await axios.post(
        "http://localhost:5041/api/BorrowBook/borrow-book",
        {
          bookId: bookId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Handle success response
      console.log("Book borrowed successfully:", response.data);
    } catch (error) {
      console.error("Error borrowing book:", error);
      // Handle error response
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <section className="book-list m-50">
        <div className="container">
          <div className="row">
            {books.map((book, index) => (
              <div className="col-lg-2 col-md-6 col-sm-12" key={index}>
                <div className="card text-center">
                  <img
                    src={book.poster} // Assuming the API response contains a "Poster" field with the image URL
                    alt={book.title}
                  />
                  <div className="card-text">
                    <h4>{book.title}</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBorrowBook(book.bookId)}
                    >
                      Borrow Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
