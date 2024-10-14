'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="z-10 w-full font-mono text-sm">
      <div className="fixed left-0 top-0 flex w-full flex-col items-start justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="flex items-center justify-between w-full px-4 lg:px-0">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-xl"
                src="/clip.png"
                alt="Clippy Logo"
                width={40}
                height={40}
                priority
              />
              <span className="font-nunito text-lg font-bold">Clippy ICSE</span>
            </div>
            <p className="mt-2 text-left text-sm">
              Asistente de estudio (prueba beta)
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
