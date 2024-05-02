import Link from  'next/link';

export default function Home() {
  return (
    
      <div className="flex flex-row min-h-screen justify-center items-center">
      <Link href="/cadastro">
        <button className="
              bg-indigo-500 hover:bg-indigo-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center
               "
              >Cadastrar Livro</button>
      </Link>
      
    </div>
    
  );
}
