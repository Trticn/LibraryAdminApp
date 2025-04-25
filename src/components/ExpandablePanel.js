import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div 
        className="flex p-4 justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        onClick={handleClick}
      >
        <div className="flex-1">
          {header}
        </div>
        <div className="text-gray-500">
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

export default ExpandablePanel;
