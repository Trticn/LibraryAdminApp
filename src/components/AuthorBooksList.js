// AuthorBooksList.js
import BookItem from "./BookItem";
import { useFetchLibraryCollectionQuery } from '../store';
import Skeleton from './Skeleton';
import { FiBookOpen } from 'react-icons/fi';

function AuthorBooksList({ author }) {
  const { data: allBooks, error, isFetching } = useFetchLibraryCollectionQuery();
  const authorBooks = allBooks?.filter(book => book.author === author);

  if (isFetching) return (
    <div className="space-y-3">
      <Skeleton className="h-14 w-full rounded-lg" times={3} />
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 text-red-600 p-4 rounded-lg">
      Greška pri učitavanju knjiga
    </div>
  );

  return (
    <div className="mt-4">
      {authorBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {authorBooks.map(book => (
            <BookItem actions={true} key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <FiBookOpen className="mx-auto text-2xl mb-2" />
          <p>Autor nema knjiga u kolekciji</p>
        </div>
      )}
    </div>
  );
}

export default AuthorBooksList;