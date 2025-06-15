'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data || null))
      .catch(() => setUser(null));
  }, []);

  const deleteAccount = async () => {
    if (confirm("Supprimer votre compte ? Cette action est irréversible.")) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete`, {
        method: 'DELETE',
        credentials: 'include',
      });
      router.push('/');
      router.refresh();
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password: newPassword }),
    });
    alert("Mot de passe mis à jour.");
    setNewPassword('');
  };

  return (
    <section className="space-y-10">
      <h1 className="text-3xl font-bold text-indigo-600">👤 Mon Compte</h1>

      {user ? (
        <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-200"><strong>Email :</strong> {user.email}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Date de création :</strong> {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
        </div>
      ) : (
        <p className="text-red-500">Impossible de charger vos informations.</p>
      )}

      <form onSubmit={changePassword} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 max-w-md">
        <h2 className="text-lg font-semibold text-indigo-600">🔑 Changer le mot de passe</h2>
        <input
          type="password"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">Mettre à jour</button>
      </form>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={deleteAccount} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto">
          🗑️ Supprimer le compte
        </button>
      </div>
    </section>
  );
}
