'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeContentWrapper() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          console.error("Erreur lors de la requête /api/me");
          setIsReady(true);
          return;
        }

        const data = await res.json();

        if (data?.role === 'admin') {
          router.replace('/admin');
        } else {
          setIsReady(true);
        }
      } catch (err) {
        console.error("Erreur réseau", err);
        setIsReady(true);
      }
    };

    checkRole();
  }, [router]);

  if (!isReady) return <p className="text-center mt-10">Chargement...</p>;

  return <p className="text-center mt-10">Bienvenue utilisateur connecté (non admin)</p>;
}
