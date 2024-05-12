'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ListBook() {

    const [dataBook, setDataBook] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);
        
    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8080/books');

            if (!response.ok) {
                throw new Error(':( Error accessing data')
            }

            const data = await response.json();
            setDataBook(data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: string): Promise<void> => {    
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/books/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Livro excluido com sucesso!');
                fetchData();
            } else { 
                alert('Erro ao excluir livro');
                console.error('Erro ao excluir livro', response.status);
            }
        } catch(error) {
            console.error('Erro ao excluir livro: ', error);
        } finally {
            setLoading(false);
        }
    
    }

    return (
        
        <div className="container mx-auto px-4 py-8">
            <div className='flex justify-between items-center mb-4'>
                <h1 className="text-2xl font-bold mb-4">Lista de Livros</h1>
                <Link href={`/cadastro`}>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">Cadastrar Livro</button>
                </Link>
            </div>
            {loading ? (
                <p className="text-gray-500">Carregando...</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dataBook.map((book: any) => (
                    <div key={book.id} className="border rounded-md p-4">
                        <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
                        <p className="text-gray-600">{book.author}</p>
                        <p className="text-gray-600">{book.editora}</p>
                        <div className="mt-4 flex justify-between">
                            <Link href={`/list/${book.id}`}>
                                <button className="text-indigo-500 hover:text-indigo-700">Editar</button>
                            </Link>
                            <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(book.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>

    )
}