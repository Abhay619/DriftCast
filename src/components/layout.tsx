import { type PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
  <div className="bg-gradient-to-br from-background to-muted">
    <Header/>
    <main className="min-h-screen container mx-auto px-4 py-8">
      {children}
    </main>
    <footer className="border-t backdrop-blur py-6 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 text-center text-gray-200">
        <p className='dark:text-zinc-200 text-zinc-800 mt-3 text-md'>
        © 2025 All Rights Reserved
        </p>
        <p className='text-zinc-400 text-md'>
            Made with ❤️ by <a href="" className='text-pink-600 hover:underline'>Abhay</a> | Look at some of my projects on <a href="https://github.com/Abhay619" className='text-green-400'>Github</a>
        </p>
      </div>
    </footer>
    </div>
    )
};

export default Layout;
