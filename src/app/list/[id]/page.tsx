'use client'

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EditBook() {
   
  const pathname = usePathname();
  const id = pathname.split('/').slice(-1)[0];  

  const [dataBook, setDataBook] = useState({
    name: '',
    author: '',
    editora: ''
  });

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [editora, setEditora] = useState('');  

  
  useEffect(() => {
    getBookById(id);
    handleChange;
    
  }, []);


  const getBookById = async (id: string): Promise<void> => {
    //Buscando o o Livro pela ID e trazendo suas informacoes  
    try {
      const response = await fetch(`http://localhost:8080/books/${id}`, {
        method: 'GET',
      });

      if(!response.ok) {
        throw new Error(':( Error accessing ID');
      }

      const data = await response.json();
      setDataBook(data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = async (event: any): Promise<void> => {
    //atualizando o objeto databook, para carregar o forms com os dados do livro selecionado
    event.preventDefault();

    setDataBook({
      ...dataBook, 
      [event.target.name]: event.target.value
    });
    
  };

  const handleSubmitChange = async (event: any): Promise<void> => {
    event.preventDefault();

    const data = { name, author, editora};
    try {

      const response = await fetch(`http://localhost:8080/books/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      
      if(response.ok) {
        console.log(':) Change submitted successfully!');
  
        setName('');
        setAuthor('');
        setEditora('');
      } 
    } catch {
      console.error(':( Error submitting changes');
    }

  }

  return (
    
    <form onSubmit={handleSubmitChange} className="max-w-sm mx-auto">

      <div>
        <h1 className='mt-5 text-2xl font-bold mb-4'>Editar Livro</h1>
      </div>

      <div className="pb-6 pt-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do Livro</label>
        <input type="text" name="name" id="name" value={dataBook.name} onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />    
      </div>

      <div className="pb-6">
        <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Autor</label>
        <input type="text" name="author" id="author" value={dataBook.author} onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />    
      </div>

      <div className="pb-6">
        <label htmlFor="editora" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Editora</label>
        <input type="text" name="editora" id="editora" value={dataBook.editora} onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />    
      </div>

      <div className='flex justify-between'>
        <button type="submit" className=" bg-indigo-500 hover:bg-indigo-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Salvar</button>
    
        <Link href="/list">
          <button className="bg-indigo-500 hover:bg-indigo-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Voltar</button>
        </Link>
      </div>

      </form>
  );
}
