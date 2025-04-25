import { useDispatch, useSelector } from 'react-redux';
import { changeSearchTerm } from '../store';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchInput({ fullWidth = false, type }) {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.search.searchTerm);

  const handleChange = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(changeSearchTerm(''));
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'w-full sm:max-w-lg'} transition-all`}>
      <div className="relative">
      <input
  type="text"
  placeholder={`Pretraži ${type}...`}
  value={searchTerm}
  onChange={handleChange}
  className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-indigo-200 shadow-sm 
  bg-white text-gray-800 placeholder-gray-400 
  transition-all duration-300 ease-in-out 
  hover:border-indigo-400 hover:shadow-md
  outline-none focus:outline-none focus:border-indigo-400 focus:shadow-none focus:ring-0"
/>


        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

        {searchTerm.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full transition duration-200"
            aria-label="Obriši pretragu"
          >
            <FiX className="text-lg" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
