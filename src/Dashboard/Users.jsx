import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  
  const handleUserAction = async (id=users.id, action) => {
    console.log(id);
    const endpoint = action === 'accept' ? 'AcceptUser' : 'RejectUser';
    try {
      await axios.post(`http://localhost:5041/api/AdminAccount/${endpoint}/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Refresh users list after action
      const response = await axios.get("http://localhost:5041/api/AdminAccount/GetUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5041/api/AdminAccount/GetUsers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <table className="table text-center m-50 table-primary">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="tbody text-center">
          {users.map((user, count) => (
            <tr key={user.id}>
              <td>{count + 1}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td className="text-center">
                <button
                  className="btn btn-success m-2"
                  onClick={() => handleUserAction(user.id, 'accept')}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleUserAction(user.id, 'reject')}
                >
                  Reject
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
