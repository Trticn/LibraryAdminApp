import { GoBook } from 'react-icons/go';
import Modal from './Modal';
import LentBooksList from './LentBooksList';
import { setUserForEdit } from '../store';
import { FiUser } from 'react-icons/fi';
import { GoPencil } from 'react-icons/go';
import useModal from '../hooks/useModal';
import Button from './Button';
import UsersEdit from './UsersEdit';
import { useDispatch } from 'react-redux';

function UsersListItem({ user }) {
  const dispatch = useDispatch();
  const { isOpen, open, close } = useModal();
  const {
    isOpen: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useModal();

  const handleEditClick = () => {
    dispatch(setUserForEdit(user));
    openEdit();
  };

  return (
    <div className="border-b border-gray-200 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 hover:bg-indigo-50 transition-all duration-300 rounded-lg shadow-md">
        {/* Leva strana */}
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
            <span className="text-indigo-600 text-lg">
              <FiUser />
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-xl">{user.username}</h3>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>

        {/* Desna strana */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span
            className={`px-4 py-1 text-xs rounded-full text-center font-medium ${
              user.active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {user.active ? 'Aktivan' : 'Neaktivan'}
          </span>

          <Button secondary onClick={handleEditClick} className="w-full justify-center sm:w-auto">
            <GoPencil />
          </Button>

          <button
            onClick={open}
            className="flex items-center justify-center gap-3 px-4 py-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm w-full sm:w-auto"
          >
            <GoBook />
            Knjige
          </button>
        </div>
      </div>

      {/* Modal za knjige */}
      <Modal isOpen={isOpen} onClose={close} title={`Pozajmljene knjige - ${user.username}`}>
        <LentBooksList user={user} />
      </Modal>

      {/* Modal za izmenu */}
      <Modal isOpen={isEditOpen} onClose={closeEdit} title={`Izmeni člana - ${user.username}`}>
        <UsersEdit user={user} closeModal={closeEdit} />
      </Modal>
    </div>
  );
}

export default UsersListItem;
