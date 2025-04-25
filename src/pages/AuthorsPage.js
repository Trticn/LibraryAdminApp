import { Helmet } from 'react-helmet';
import AuthorsList from '../components/AuthorsList';
import { getMostFrequentAuthor } from '../helpers';
import { FiUser, FiBook, FiAward } from 'react-icons/fi';
import { useFetchLibraryCollectionQuery } from '../store';
import { useMemo } from 'react';
import Skeleton from '../components/Skeleton';

const AuthorsPage = () => {
  const { data: allBooks, error, isFetching } = useFetchLibraryCollectionQuery();

  const authors = allBooks ? [...new Set(allBooks.map(book => book.author))] : [];

  const authorStats = useMemo(() => {
    if (!allBooks) return [];
    return {
      quantity: authors.length,
      mostFrequentAuthor: getMostFrequentAuthor(allBooks),
    };
  }, [allBooks]);

  let content;

  if (isFetching) {
    content = (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mb-8">
     <Skeleton className="h-20 w-full rounded-lg" times={3} />
   </div>
    );
  } else if (error) {
    content = (
      <div className="p-5 bg-red-50 text-red-600 rounded-lg m-5 text-center">
        <p className="font-medium">Došlo je do greške pri učitavanju</p>
        <p className="text-sm mt-1">Pokušajte osvježiti stranicu</p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            title: "Ukupno autora",
            value: authorStats.quantity,
            icon: <FiUser className="text-indigo-500" />,
          },
          {
            title: "Najplodniji autor",
            value: authorStats.mostFrequentAuthor || "Nema podataka",
            icon: <FiBook className="text-green-500" />,
          },
          {
            title: "Nagrađeni autori",
            value: Math.round(authorStats.quantity / 2),
            icon: <FiAward className="text-amber-500" />,
          }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border-l-4 shadow-xs hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="authors-page mx-auto container">
      <Helmet>
        <title>Autori | Biblioteka</title>
      </Helmet>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiUser className="text-indigo-600" />
              Popis autora
            </h1>
            <p className="text-gray-500 mt-2">Pregled svih autora u biblioteci</p>
          </div>
        </div>

        {/* Stats Cards */}
        {content}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <AuthorsList />
      </div>
    </div>
  );
};

export default AuthorsPage;
