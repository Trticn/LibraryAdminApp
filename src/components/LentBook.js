import { useSelector, useDispatch } from "react-redux";
import { changeUser, useUpdateBookMutation } from "../store";


import Button from "./Button";
import { useToast } from "../context/ToastContext";


function LentBook({book,closeModal}) {
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const userId = useSelector((state) => state.lentBookForm.userId);
    const [updateBook,results] = useUpdateBookMutation()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
          showToast({ type: 'error', text: 'Morate odabrati korisnika!' });
          return;
        }
      
        try {
 
      
          // Proveri da li je korisnik pronađen
          if (!userId) {
            throw new Error(`Korisnik sa ID: ${userId} ne postoji`);
          }
          
          if(book.available <=0) {
            dispatch(changeUser(''))
            closeModal()
            throw new Error(`Knjiga ${book.title} nije dostupna`)
        }

        if(book.borrowedBy.includes(userId)){
            dispatch(changeUser(''))
            closeModal()
            throw new Error(`Knjiga ${book.title} je već izdata korisniku sa ID ${userId}`)
        }

          const updatedBorrowers = [...book.borrowedBy, userId];
      
          await updateBook({
           ...book, borrowedBy:updatedBorrowers,available:book.available - 1
          }).unwrap(); 
      


      
          showToast({ type: 'success', text: 'Knjiga je uspešno izdata!' });
          dispatch(changeUser(''));
          closeModal();
          
        } catch (err) {
         
          showToast({ type: 'error', text: err.message || 'Došlo je do greške.' });
        }
      };
      
      
      
      

    return (
        <div>
   
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">Član: </label>
                    <input
                        value={userId}
                        onChange={(e) => dispatch(changeUser(+e.target.value))}
                        name="user"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Unesite id clana..."
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button 
                        loading={results.isLoading} 
                        onClick={handleSubmit}
                        modal
                    >
                        Izdaj knjigu
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LentBook;