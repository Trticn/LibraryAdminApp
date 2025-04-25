// src/components/LentBooksList.js
import BookItem from "./BookItem";
import { useFetchLibraryCollectionQuery } from '../store';
import Skeleton from './Skeleton';

function LentBooksList({ user }) {
   const { data: allBooks, error, isFetching } = useFetchLibraryCollectionQuery();

  // Filtriranje knjiga koje je korisnik pozajmio
  const lentBooks = allBooks?.filter(book => 
    book?.borrowedBy?.includes(user.id)
  );
  
  

  if (isFetching) return <Skeleton className="h-16 w-full" times={3} />;
  if (error) return <div>Error loading books.</div>;

  return (
    <div className="mt-4">
      {lentBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {lentBooks.map(book => (
            <BookItem actions={false} key={book.id} book={book} user = {user} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Korisnik nema pozajmljenih knjiga.</p>
      )}
    </div>
  );
}

export default LentBooksList;