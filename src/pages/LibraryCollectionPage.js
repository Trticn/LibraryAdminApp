import { Helmet } from 'react-helmet';
import { useMemo } from 'react';
import { useFetchLibraryCollectionQuery } from '../store';
import { FiBook, FiTrendingUp, FiArchive } from 'react-icons/fi';
import { getMostFrequentBook } from '../helpers';
import LibraryCollectionList from '../components/LibraryCollectionList';
import Skeleton from '../components/Skeleton';

const LibraryCollectionPage = () => {
  const { data: allBooks, error, isFetching } = useFetchLibraryCollectionQuery();

    const bookStats = useMemo(() => {
      if (!allBooks) return [];
      return {
        quantity: allBooks.length,
        mostFrequentBook: getMostFrequentBook(allBooks),
        borrowCount: allBooks.reduce((sum, book) => sum + book.borrowCount, 0),
    
      };
    }, [allBooks]);

    console.log(bookStats.mostFrequentBook)
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
            title: "Ukupno knjiga",
            value: bookStats.quantity,
            icon: <FiBook className="text-indigo-500" />,
          },
      
          {
            title: 'Najplodnija knjiga',
            value: bookStats.mostFrequentBook.title,
            icon: <FiArchive className="text-amber-500" />,
          },
          {
            title: "Ukupno iznajmljivanja",
            value: bookStats.borrowCount,
            icon: <FiTrendingUp className="text-green-500" />,
          },
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
    <div className="library-page container mx-auto">
      <Helmet>
        <title>Kolekcija knjiga | Biblioteka</title>
      </Helmet>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiBook className="text-indigo-600" />
              Kolekcija knjiga
            </h1>
            <p className="text-gray-500 mt-2">Pregled svih knjiga u biblioteci</p>
          </div>
        </div>

        {/* Stats Cards */}
        {content}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <LibraryCollectionList />
      </div>
    </div>
  );
};

export default LibraryCollectionPage;
