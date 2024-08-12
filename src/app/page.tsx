import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="font-serif font-extrabold text-5xl text-center">
        Compelete Next.JS Authentication
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Home</h1>
        <hr />
        <p>Home page</p>
        <Link
          href="/login"
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </Link>
      </div>
    </main>
  );
}
