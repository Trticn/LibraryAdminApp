import { useSelector, useDispatch } from "react-redux";
import {
  changeAuthor,
  changeQuantity,
  changeTitle,
  useUpdateBookMutation,
} from "../store";
import Button from "./Button";
import { useToast } from "../context/ToastContext";

function BookEdit({ book, closeModal }) {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.bookForm.title);
  const author = useSelector((state) => state.bookForm.author);
  const quantity = useSelector((state) => state.bookForm.quantity);
  const { showToast } = useToast();
  const [updateBook, results] = useUpdateBookMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !quantity) {
      showToast({ type: "error", text: "Molimo popunite sve potrebne informacije!" });
      return;
    }

    try {
      await updateBook({
        ...book,
        title,
        author,
        available: quantity,
      }).unwrap();

      showToast({ type: "success", text: "Knjiga je uspešno izmenjena!" });
      closeModal();
    } catch (err) {
      showToast({ type: "error", text: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Naslov:
        </label>
        <input
          value={title}
          onChange={(e) => dispatch(changeTitle(e.target.value))}
          name="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Unesite naslov knjige"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Autor:
        </label>
        <input
          value={author}
          onChange={(e) => dispatch(changeAuthor(e.target.value))}
          name="author"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Unesite autora"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Količina:
        </label>
        <input
          type="number"
          min="1"
          value={quantity || ""}
          onChange={(e) => dispatch(changeQuantity(Number(e.target.value) || 0))}
          name="quantity"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Unesite količinu"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button loading={results.isLoading} onClick={handleSubmit} modal>
          Izmeni knjigu
        </Button>
      </div>
    </form>
  );
}

export default BookEdit;
