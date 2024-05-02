'use client';

import React, { useState } from 'react';

function SubmitForm() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [editora, setEditora] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = { name, author, editora };

    const response = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(':) Form submitted successfully!');
      console.log(data);

      setName('');
      setAuthor('');
      setEditora('');
    } else {
      console.error(':( Error submitting form!')
    }

  }


  return (
    
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">

        <div className="pb-6 pt-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do Livro</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />    
        </div>

        <div className="pb-6">
            <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Autor</label>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />    
        </div>

        <div className="pb-6">
            <label htmlFor="editora" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Editora</label>
            <input type="text" id="editora" value={editora} onChange={(e) => setEditora(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />    
        </div>

        <button type="submit" className=" bg-indigo-500 hover:bg-indigo-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cadastrar</button>

      </form>


    
  );

};

export default SubmitForm;