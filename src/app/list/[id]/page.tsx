'use client'

import { usePathname } from 'next/navigation';

export default function EditBook() {
   
  const pathname = usePathname();
  const id = pathname.split('/').slice(-1)[0];  

  console.log(id);

  const getBookById = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/books/${id}`);

      if (response.ok) {
        console.log(await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  }

  getBookById(id);

  return (
    <div>
      <h1>Edit Book</h1>            
    </div>
  );
}
