// AuthorListItem.js
import ExpandablePanel from "./ExpandablePanel";
import AuthorBooksList from "./AuthorBooksList";
import { FiUser, FiBook } from 'react-icons/fi';

function AuthorListItem({ author }) {
  const header = (
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
        <FiUser className="text-indigo-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{author}</h3>
        <p className="text-gray-500 text-sm flex items-center">
          <FiBook className="mr-1" /> Autor
        </p>
      </div>
    </div>
  );
  
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <ExpandablePanel header={header}>
        <AuthorBooksList author={author} />
      </ExpandablePanel>
    </div>
  );
}

export default AuthorListItem;