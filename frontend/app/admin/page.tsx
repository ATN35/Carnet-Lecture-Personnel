'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          router.replace('/');
          return;
        }

        const data = await res.json();

        if (data?.role !== 'admin') {
          router.replace('/');
          return;
        }

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
          credentials: 'include',
        });

        if (!userRes.ok) {
          console.error("Erreur de récupération des utilisateurs");
          return;
        }

        const users = await userRes.json();
        setUsers(users);
        setLoading(false);
      } catch (err) {
        console.error("Erreur réseau :", err);
        router.replace('/');
      }
    };

    fetchAdminData();
  }, [router]);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setUsers(prev => prev.filter(user => user.id !== id));
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <section className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700">🛠️ Tableau de Bord Admin</h1>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">👥 Comptes utilisateurs</h2>
          <ul className="divide-y border rounded bg-white shadow">
            {users.map(user => (
              <li key={user.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.role} • {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                {user.role !== 'admin' && (
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Supprimer
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
