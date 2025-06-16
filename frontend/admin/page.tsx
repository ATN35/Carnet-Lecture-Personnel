'use client';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const deleteUser = async (id: number) => {
    if (confirm('Supprimer ce compte ?')) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <section className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-indigo-600">👑 Administration</h1>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Rôle:</strong> {user.role}</p>
              <p><strong>Créé le:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="text-red-600 font-semibold hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
