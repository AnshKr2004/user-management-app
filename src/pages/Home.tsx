import React, { useState } from 'react';
import UserList from '../components/UserList.tsx';
import UserForm from '../components/UserForm.tsx';

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
      <h1 className="text-3xl font-bold">User Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
        >
          Add User
        </button>
      </div>

      {/* User List Component */}
      <UserList onEdit={handleEdit} />

      {/* User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser ? 'Edit User' : 'Add New User'}
            </h2>
            <UserForm selectedUser={selectedUser} onFormSubmit={handleFormSubmit} />
            <button
              className="mt-4 text-red-500"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
