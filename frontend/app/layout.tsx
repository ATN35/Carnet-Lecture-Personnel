import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import CookieBanner from './components/CookieBanner';

type RootLayoutProps = { children: ReactNode };

const Nav = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition"
      >
        📘 Carnet de Lecture
      </Link>
      <ul className="flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
        {!isAuthenticated ? (
          <>
            <li><Link href="/login">Connexion</Link></li>
            <li><Link href="/register">Inscription</Link></li>
          </>
        ) : (
          <>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li>
              <form action="/logout" method="GET">
                <button type="submit" className="hover:underline">Déconnexion</button>
              </form>
            </li>
          </>
        )}
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="mt-24 text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700">
    <p>&copy; {new Date().getFullYear()} Antoine Lelièvre. Tous droits réservés.</p>
  </footer>
);

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('token') !== undefined;

  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white font-sans min-h-screen flex flex-col">
        <Nav isAuthenticated={isAuthenticated} />
        <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 mt-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl">
          {children}
        </main>
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
