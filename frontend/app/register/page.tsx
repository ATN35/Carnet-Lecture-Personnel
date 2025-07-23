'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        if (loginRes.ok) {
          router.push("/");
          router.refresh();
        } else {
          setMessage("Inscription réussie, mais connexion échouée.");
        }
      } else {
        setMessage("Erreur lors de l'inscription.");
      }
    } catch {
      setMessage("Erreur réseau.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <form
        onSubmit={handleRegister}
        className="bg-white px-8 py-10 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-600">Créer un compte</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          M’inscrire
        </button>

        {message && (
          <p className="text-sm text-center text-red-600">{message}</p>
        )}
      </form>
    </section>
  );
}
