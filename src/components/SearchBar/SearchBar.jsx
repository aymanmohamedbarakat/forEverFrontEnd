import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircleX, Search } from "lucide-react";
import { useSearchStore } from "../../store";

export default function SearchBar() {
  const { search, setSearch, showSearch, closeSearch } = useSearchStore();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("shopping")) {
        setVisible(true);
        } else {
        setVisible(false);
        }
    }, [location.pathname]);

  return (
    <>
      {showSearch && visible ? (
        <div className="bg-gray-50 py-3 px-4">
          <div className="flex items-center max-w-2xl mx-auto">
            <div className="relative flex-grow flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent pr-2"
                type="text"
                placeholder="Search products..."
              />
              <Search size={20} strokeWidth={1.5} className="text-gray-500" />
            </div>
            <button
              onClick={closeSearch}
              className="ml-3 p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close search"
            >
              <CircleX size={24} strokeWidth={1.5} className="text-gray-500" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

// claudi code
/////////////////////////



// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useSearchStore } from "../../Hooks/uiStore";
// import { CircleX, Search } from "lucide-react";

// export default function SearchBar() {
//   const { search, setSearch, showSearch, closeSearch } = useSearchStore();
//   const [visible, setVisible] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     console.log(location.pathname);
//     setVisible(location.pathname.includes("shopping"));
//   }, [location.pathname]);

  
  
//   if (!showSearch || !visible) return null;

//   return (
//     <div className="bg-gray-50 py-3 px-4">
//       <div className="flex items-center max-w-2xl mx-auto">
//         <div className="relative flex-grow flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 outline-none text-sm bg-transparent pr-2"
//             type="text"
//             placeholder="Search products..."
//           />
//           <Search size={20} strokeWidth={1.5} className="text-gray-500" />
//         </div>
//         <button
//           onClick={closeSearch}
//           className="ml-3 p-2 rounded-full hover:bg-gray-200 transition-colors"
//           aria-label="Close search"
//         >
//           <CircleX size={24} strokeWidth={1.5} className="text-gray-500" />
//         </button>
//       </div>
//     </div>
//   );
// }




// chatgpt code
/////////////////////////