import { useFetchLibraryCollectionQuery } from '../store';
import Skeleton from "./Skeleton";
import AuthorListItem from "./AuthorListItem";
import { useSelector } from "react-redux";
import { FiUser } from 'react-icons/fi';
import SearchInput from "./Search";

function AuthorsList() {
  const { data: allBooks, error, isFetching } = useFetchLibraryCollectionQuery();
  const searchTerm = useSelector(state => state.search.searchTerm);

  const authors = [...new Set(allBooks?.map(book => book.author))];
  const filteredAuthors = authors.filter(author =>
    author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
    if (isFetching) return <Skeleton className="h-16 w-full" times={5} />;
    if (error) return;
  return (
    <div>

      {/* Gornji deo sa pretragom */}
      <div className="p-4 md:p-5 border-b border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="flex-1">
            <SearchInput type={"autore"} />
          </div>
        </div>
      </div>

      {/* Lista autora */}
      <div className="divide-y divide-gray-100">
        {filteredAuthors.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <FiUser className="text-indigo-500 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Nema pronađenih autora</h3>
            <p className="text-gray-500 mt-1">Pokušajte promijeniti kriterije pretrage</p>
          </div>
        ) : (
          filteredAuthors.map(author => (
            <AuthorListItem key={author} author={author} />
          ))
        )}
      </div>
    </div>
  );
}

export default AuthorsList;
