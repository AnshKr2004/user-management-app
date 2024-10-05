import React from 'react';
import { useParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
  };
  company?: {
    name: string;
  };
}

const UserDetail: React.FC<{ user: User | null }> = ({ user }) => {
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Detail</h2>
      <div className="border p-4 rounded-lg shadow">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Address</h3>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>City:</strong> {user.address.city}</p>
        </div>
        {user.company && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Company</h3>
            <p><strong>Company Name:</strong> {user.company.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      <UserDetail user={user} />
    </div>
  );
};

export default UserDetailPage;
