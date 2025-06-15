'use client';

import { useState } from 'react';

export default function AddBookForm() {
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
      alert("📚 Livre ajouté avec succès !");
    } else {
      const data = await res.json();
      alert(`❌ Erreur : ${data.error || "Impossible d'ajouter le livre."}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Titre *</label>
        <input
          required
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Auteur</label>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full">
        ➕ Ajouter le livre
      </button>
    </form>
  );
}
