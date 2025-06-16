'use client';

import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string | null;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  created_at: string;
}

export default function BookList({ refreshKey }: { refreshKey: number }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [newComments, setNewComments] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(async booksData => {
        // Pour chaque livre, on récupère ses commentaires
        const booksWithComments = await Promise.all(
          booksData.map(async (book: Book) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/book/${book.id}`, {
              credentials: 'include',
            });
            const comments = await res.json();
            return { ...book, comments };
          })
        );
        setBooks(booksWithComments);
      })
      .catch(() => setBooks([]));
  }, [refreshKey]);

  const handleDelete = async (bookId: number) => {
    const confirmed = window.confirm("Supprimer ce livre ?");
    if (!confirmed) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setBooks(prev => prev.filter(book => book.id !== bookId));
    } else {
      alert("Erreur lors de la suppression.");
    }
  };

  const handleAddComment = async (bookId: number) => {
    const content = newComments[bookId];
    if (!content) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${bookId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      const comment = await res.json();
      setBooks(prev =>
        prev.map(book =>
          book.id === bookId ? { ...book, comments: [...book.comments, comment] } : book
        )
      );
      setNewComments(prev => ({ ...prev, [bookId]: '' }));
    } else {
      alert("❌ Échec de l'ajout du commentaire.");
    }
  };

  return (
    <div className="grid gap-4 max-w-2xl mx-auto">
      {books.length === 0 ? (
        <p className="text-gray-500 italic">La liste de vos livres apparaîtra ici une fois ajoutés.</p>
      ) : (
        books.map(book => (
          <div key={book.id} className="border p-4 rounded bg-white shadow">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-indigo-700">{book.title}</h4>
                <p className="text-sm text-gray-500">{book.author || "Auteur inconnu"}</p>
              </div>
              <button
                onClick={() => handleDelete(book.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Supprimer
              </button>
            </div>

            {/* Section Commentaires */}
            <div className="mt-4">
              <h5 className="font-medium mb-2">💬 Commentaires :</h5>
              {book.comments.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucun commentaire pour ce livre.</p>
              ) : (
                <ul className="text-sm text-gray-700 space-y-1">
                  {book.comments.map(comment => (
                    <li key={comment.id} className="border-b pb-1">
                      {comment.content}
                    </li>
                  ))}
                </ul>
              )}

              {/* Formulaire d'ajout de commentaire */}
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newComments[book.id] || ''}
                  onChange={e => setNewComments(prev => ({ ...prev, [book.id]: e.target.value }))}
                  placeholder="Ajouter un commentaire"
                  className="flex-1 border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleAddComment(book.id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
