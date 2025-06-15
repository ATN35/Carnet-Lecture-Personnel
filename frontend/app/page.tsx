import { cookies } from 'next/headers';
import AddBookForm from './components/AddBookForm';
import Link from 'next/link';

export default async function HomePage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('token') !== undefined;

  return (
    <section className="space-y-16 text-center">
      {/* 💬 Accueil public */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 dark:text-indigo-300">
          📚 Bienvenue dans votre Carnet de Lecture Personnel
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Ajoutez, consultez, modifiez et organisez vos lectures préférées avec notes, avis et dates.
        </p>
      </div>

      {!isAuthenticated && (
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="border border-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-300 px-6 py-2 rounded-lg transition"
          >
            Inscription
          </Link>
        </div>
      )}

      {/* ✍️ Formulaire d'ajout de livre */}
      {isAuthenticated && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
              ➕ Ajouter un nouveau livre
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Titre, auteur, avis, note et plus</p>
          </div>
          <AddBookForm />
        </div>
      )}

      {/* 📖 Liste à venir */}
      {isAuthenticated && (
        <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            📖 Vos lectures
          </h3>
          <p className="text-gray-500 dark:text-gray-400 italic">
            La liste de vos livres apparaîtra ici une fois ajoutés.
          </p>
        </div>
      )}
    </section>
  );
}
