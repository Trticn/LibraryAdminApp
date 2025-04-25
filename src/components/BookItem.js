import { useRemoveBookMutation, useUpdateBookMutation } from "../store";
import { FiBook } from "react-icons/fi";
import { GoTrashcan, GoPlus, GoReply, GoPencil } from "react-icons/go";
import { setBookForEdit } from "../store";
import LentBook from "./LentBook";
import Button from "./Button";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import { useToast } from "../context/ToastContext";
import BookEdit from "./BookEdit";
import { useDispatch } from "react-redux";

function BookItem({ book, actions, user }) {
  const dispatch = useDispatch();
  const [removeBook, results] = useRemoveBookMutation();
  const [updateBook, bookResults] = useUpdateBookMutation();
  const { showToast } = useToast();

  const { isOpen, open, close } = useModal();
  const {
    isOpen: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useModal();

  const handleRemoveBook = async () => {
    await removeBook(book);
  };

  const handleEditClick = () => {
    dispatch(setBookForEdit(book));
    openEdit();
  };

  const handleReturnBook = async () => {
    if (!book) {
      showToast({ type: "error", text: "Nepostojeca knjiga." });
      return;
    }

    try {
      if (!user) {
        throw new Error(`Korisnik sa ID: ${user.id} ne postoji`);
      }

      const updatedBorrowers = book.borrowedBy.filter(
        (borrower) => borrower !== user.id
      );

      await updateBook({
        ...book,
        borrowedBy: updatedBorrowers,
        available: book.available + 1,
      }).unwrap();

      showToast({ type: "success", text: "Knjiga je uspešno vraćena!" });
      close();
    } catch (err) {
      showToast({ type: "error", text: err.message || "Došlo je do greške." });
    }
  };

  const actionButtons = function () {
    if (!actions) {
      return (
        <Button loading={bookResults.isLoading} success onClick={handleReturnBook} className="w-full sm:w-auto">
          <GoReply />
        </Button>
      );
    }

    return (
      <>
        <Button secondary onClick={handleEditClick} className="w-full sm:w-auto">
          <GoPencil />
        </Button>
        <Button danger loading={results.isLoading} onClick={handleRemoveBook} className="w-full sm:w-auto">
          <GoTrashcan />
        </Button>
        <Button success onClick={open} className="w-full sm:w-auto">
          <GoPlus />
        </Button>
      </>
    );
  };

  return (
    <div className="border-b border-gray-200 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 hover:bg-indigo-50 transition-all duration-300 rounded-lg shadow-md">
        
        {/* Leva strana: Ikonica + naslov i autor */}
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
            <span className="text-indigo-600 text-lg">
              <FiBook />
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-xl break-words">{book.title}</h3>
            <p className="text-sm text-gray-500 break-words">Autor: {book.author}</p>
          </div>
        </div>

        {/* Desna strana: Akcione dugmiće */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span className={`px-4 py-1 text-xs rounded-full text-center font-medium ${
            book.available > 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {book.available > 0 ? `Dostupno: ${book.available}` : "Nema na stanju"}
          </span>

          {actionButtons()}
        </div>
      </div>

      {/* Modal za pozajmljivanje */}
      <Modal isOpen={isOpen} onClose={close} title={`Pozajmi knjigu - ${book.title}`}>
        <LentBook user={user} closeModal={close} book={book} />
      </Modal>

      {/* Modal za izmenu */}
      <Modal isOpen={isEditOpen} onClose={closeEdit} title={`Izmeni knjigu - ${book.title}`}>
        <BookEdit book={book} closeModal={closeEdit} />
      </Modal>
    </div>
  );
}

export default BookItem;
