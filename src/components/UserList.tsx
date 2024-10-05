import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api.ts';
import { Link } from 'react-router-dom';

const UserList: React.FC<{ onEdit: (user: any) => void }> = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then(res => setUsers(res.data))
      .catch(err => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete?')) {
      deleteUser(id)
        .then(() => setUsers(users.filter((user: any) => user.id !== id)))
        .catch(err => setError('Failed to delete user'));
    }
  };

  return (
    <div className="overflow-x-auto">
      {loading ? <p>Loading...</p> : null}
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index: number) => (
            <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="text-blue-500"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <Link to={`/user/${user.id}`} className="ml-2 text-green-500">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
