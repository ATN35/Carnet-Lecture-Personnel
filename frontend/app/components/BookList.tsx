'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string | null;
}

export default function BookList({ refreshKey }: { refreshKey: number }) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(setBooks)
      .catch(() => setBooks([]));
  }, [refreshKey]);

  return (
    <div className="grid gap-4 max-w-2xl mx-auto">
      {books.length === 0 ? (
        <p className="text-gray-500 italic">La liste de vos livres apparaîtra ici une fois ajoutés.</p>
      ) : (
        books.map(book => (
          <div key={book.id} className="border p-4 rounded bg-white shadow">
            <h4 className="font-semibold text-indigo-700">{book.title}</h4>
            <p className="text-sm text-gray-500">{book.author || "Auteur inconnu"}</p>
          </div>
        ))
      )}
    </div>
  );
}
