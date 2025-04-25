import { useFetchUsersQuery } from '../store';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem';
import { useSelector } from 'react-redux';
import { GoPlus } from 'react-icons/go';
import { FiUsers } from 'react-icons/fi';
import Button from './Button';
import Modal from './Modal';
import UsersAdd from './UsersAdd';
import SearchInput from './Search';
import useModal from '../hooks/useModal';

function UsersList() {
  const { data, error, isFetching } = useFetchUsersQuery();
  const searchTerm = useSelector(state => state.search.searchTerm);
  const { isOpen, open, close } = useModal()
  const filteredUsers = data?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );


  
    
      if (isFetching) return <Skeleton className="h-16 w-full" times={5} />;
      if (error) return;
  return (
    <div>

 
      <div className="p-4 md:p-5 border-b border-gray-100 bg-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div className="flex-1">
            <SearchInput type={"članove"} />
          </div>
          <div className="sm:ml-4 w-full sm:w-auto">
            <Button
              onClick={open}
              primary
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              <GoPlus className="text-base" />
              <span>Dodaj člana</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
       
        {filteredUsers.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <FiUsers className="text-indigo-500 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">Nema pronađenih članova</h3>
            <p className="text-gray-500 mt-1">Pokušajte promijeniti kriterije pretrage</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UsersListItem key={user.id} user={user} />
          ))
        )}
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Dodaj novog člana">
        <UsersAdd closeModal={close} />
      </Modal>
    </div>
  );
}

export default UsersList;
