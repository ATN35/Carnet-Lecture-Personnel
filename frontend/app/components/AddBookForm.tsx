'use client';

import { useState } from 'react';

export default function AddBookForm({ onBookAdded }: { onBookAdded: () => void }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, author }),
    });

    if (res.ok) {
      setTitle('');
      setAuthor('');
      onBookAdded();
    } else {
      const data = await res.json();
      alert(`❌ ${data.error || "Erreur lors de l'ajout."}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Titre *</label>
        <input
          required
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Auteur</label>
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full transition font-semibold"
      >
        ➕ Ajouter le livre
      </button>
    </form>
  );
}
