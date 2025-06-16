'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeContent from './HomeContent';

export default function HomeContentWrapper() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.role === 'admin') {
          router.replace('/admin');
        } else {
          setIsReady(true);
        }
      })
      .catch(() => setIsReady(true)); 
  }, []);

  return isReady ? <HomeContent /> : <p className="text-center mt-10">Chargement...</p>;
}
