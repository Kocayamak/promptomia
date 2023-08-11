"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoogedIn = true;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promtopia logo"
          width={30}
          height={30}
          className="object-contain"
        />

        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {isUserLoogedIn ? (
          <>
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Post Oluştur
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Çıkış Yap
              </button>

              <Link href="/profile">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Profile"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </Link>
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Giriş Yap
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {isUserLoogedIn ? (
          <>
            <div className="flex">
              <Image
                src="/assets/images/logo.svg"
                alt="Profile"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;