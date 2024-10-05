import React, { useState } from 'react';
import { createUser, updateUser } from '../services/api.ts';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  username: '',
  address: {
    street: '',
    city: ''
  },
  company: {
    name: ''
  },
  website: ''
};

const UserForm: React.FC<{ selectedUser: any, onFormSubmit: () => void }> = ({ selectedUser, onFormSubmit }) => {
  const [formState, setFormState] = useState(selectedUser || initialFormState);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name || formState.name.length < 3) {
      setError('Name must be at least 3 characters');
      return;
    }
    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) {
      setError('Invalid email format');
      return;
    }
    
    const apiCall = selectedUser ? updateUser(selectedUser.id, formState) : createUser(formState);

    apiCall
      .then(() => onFormSubmit())
      .catch(err => setError('Failed to submit form'));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label>Name</label>
        <input type="text" name="name" value={formState.name} onChange={handleChange} className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input type="email" name="email" value={formState.email} onChange={handleChange} className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label>Phone</label>
        <input type="text" name="phone" value={formState.phone} onChange={handleChange} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default UserForm;
