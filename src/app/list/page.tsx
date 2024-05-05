'use client'

import React, { useState, useEffect } from 'react';

export default function List() {

    const [dataBook, setDataBook] = useState([]);

    useEffect(() => {
        const fetchData = async (type: any): Promise<void> => {
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

        fetchData('someType');

    }, []);


    return (
        <div>
            <h1>Aqui vou listar</h1>
            <ul>
                {dataBook.map((book: any) => (
                    <li key={book.id}>Livro: {book.name} Autor: {book.author}</li>
                ))}
            </ul>
        </div>
    )
}