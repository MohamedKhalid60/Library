import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookList() {
  const [userBooks, setUserBooks] = useState([]);
  const [error, setError] = useState("");

  const handleReturnBook = async (bookId) => {
    try {
      const response = await axios.post(
        "http://localhost:5041/api/BorrowBook/return-book",
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
      console.log("Book Returned successfully:", response.data);
      // Refresh the list of borrowed books
      fetchUserBooks();
    } catch (error) {
      console.error("Error return book:", error);
      // Handle error response
    }
  };

  // Define the fetchUserBooks function separately
  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5041/api/BorrowBook/GetUserBooks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserBooks(response.data);
    } catch (error) {
      console.error("Error fetching user books:", error);
      setError("Error fetching user books. Please try again later.");
    }
  };

  useEffect(() => {
    // Call fetchUserBooks within the useEffect hook
    fetchUserBooks();
  }, []);

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <section className="booklist m-50">
        <div className="container">
          <div className="row align-items-center text-center justify-content-between">
            <table className="bg-light text-dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Book Name</th>
                  <th>Poster</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>
                      <div className="img-card">
                        <img src={book.poster} alt={book.title} />
                      </div>
                    </td>
                    <td>
                      <button className="delete btn btn-info m-2" onClick={() => handleReturnBook(book.bookId)}>Return</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
