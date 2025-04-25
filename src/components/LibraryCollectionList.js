// LibraryCollectionList.js
import { useSelector } from 'react-redux';
import BookItem from './BookItem';
import Skeleton from './Skeleton';
import { GoPlus } from 'react-icons/go';
import {FiBook } from 'react-icons/fi';
import Button from './Button';
import Modal from './Modal';
import BookAdd from './BookAdd';
import { useFetchLibraryCollectionQuery } from '../store';
import SearchInput from "./Search";
import useModal from '../hooks/useModal';

function LibraryCollectionList() {
  const searchTerm = useSelector(state => state.search.searchTerm);
  const { data: allBooks, error, isFetching } = useFetchLibraryCollectionQuery();

  const { isOpen, open, close } = useModal();

  const filteredBooks = allBooks?.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



    
      if (isFetching) return <Skeleton className="h-16 w-full" times={5} />;
      if (error) return;

  return (
    <div>

      <div className="p-4 md:p-5 border-b border-gray-100 bg-white">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">

    <div className="flex-1">
      <SearchInput type={"knjige"} />
    </div>


    <div className="sm:ml-4 w-full sm:w-auto">
      <Button
        onClick={open}
        primary
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
      >
        <GoPlus className="text-base" />
        <span>Dodaj knjigu</span>
      </Button>
    </div>
  </div>
</div>



      <div className="divide-y divide-gray-100">
    
        {filteredBooks.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <FiBook className="text-indigo-500 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Nema pronađenih knjiga</h3>
            <p className="text-gray-500 mt-1">Pokušajte promijeniti kriterije pretrage</p>
          </div>
        ) : (
          filteredBooks.map(book => (
            <BookItem actions={true} key={book.id} book={book} />
          ))
        )}
      </div>

      <Modal isOpen={isOpen} onClose={close} title="Dodaj novu knjigu">
        <BookAdd closeModal={close}/>
        </Modal>
    </div>
  );
}

export default LibraryCollectionList;