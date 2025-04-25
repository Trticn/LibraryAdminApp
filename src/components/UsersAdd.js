import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUsername, changeStatus } from "../store";
import { useAddUserMutation } from "../store";
import Button from "./Button";
import { useToast } from "../context/ToastContext";

function UsersAdd({ closeModal }) {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.userForm.username);
    const status = useSelector((state) => state.userForm.active);

    const [addUser, results] = useAddUserMutation();
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            showToast({ type: 'error', text: 'Molimo popunite sve potrebne informacije!' });
            return;
        }

        try {
            await addUser({
                username,
                active: status,
                date: new Date().toLocaleDateString()
            }).unwrap();

            showToast({ type: 'success', text: 'Korisnik je uspešno dodat!' });
            dispatch(changeUsername(''));
            closeModal();
  
 
        } catch (err) {
            showToast({ type: 'error', text: err.message });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Ime i prezime
                    </label>
                    <input
                        value={username}
                        onChange={(e) => dispatch(changeUsername(e.target.value))}
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Unesite ime i prezime novog člana"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status:
                    </label>
                    <input
                        type="checkbox"
                        checked={status}
                        onChange={() => dispatch(changeStatus(!status))}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button loading={results.isLoading} onClick={handleSubmit} modal>
                        Dodaj člana
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UsersAdd;