'use client';

import { useState } from 'react';
import AddBookForm from './AddBookForm';
import BookList from './BookList';

export default function HomeContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
          ➕ Ajouter un nouveau livre
        </h2>
        <AddBookForm onBookAdded={() => setRefreshKey(prev => prev + 1)} />
      </div>

      <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📖 Vos lectures
        </h3>
        <BookList refreshKey={refreshKey} />
      </div>
    </>
  );
}
