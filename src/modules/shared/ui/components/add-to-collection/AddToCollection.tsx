"use client";

import { useState, useRef } from "react";
import { PiPlusBold } from "react-icons/pi";
// import { RiBookmarkFill } from "react-icons/ri";
// import { MdOutlineBookmarkAdd } from "react-icons/md";

export default function AddToCollection() {

  const [newCollectionValue, setNewCollectionValue] = useState<string | number>("");
  const [newCollectionField, setNewCollectionField] = useState(false);

  const inputRef = useRef(null);

  const maxChars: number = 40;

  function handleChangeChars(e: React.ChangeEvent<HTMLInputElement>) {
    const typedCharsLength = e.target.value.length;
    if (typedCharsLength <= maxChars) {
      setNewCollectionValue(typedCharsLength);
    } else {
      setNewCollectionValue(maxChars);
      e.target.value = e.target.value.substring(0, maxChars);
    }
    setNewCollectionValue(e.target.value);
  }

  //   e.preventDefault();

  //   const newCollection = {
  //     id: collections.length + 1,
  //     title: newCollectionValue,
  //     games: [gameObj],
  //   };

  //   dispatch(createNewCollection(newCollection));

  //   notify &&
  //     notify(
  //       <>
  //         <div className="flex items-start gap-2">
  //           <RiBookmarkFill className="flex-shrink-0 text-sky-500" />
  //           <div className="flex flex-col gap-1">
  //             <p className="text-[#222222]">Added to Collection:</p>
  //             <p className="font-semibold text-[#222222]">{newCollectionValue}!</p>
  //           </div>
  //         </div>
  //       </>
  //     );

  //   setNewCollectionValue("");
  //   setNewCollectionField(false);
  //   onClose();
  // }

  // const handleCheckboxChange = (id) => {
  //   dispatch(updateCollection({ id, game: gameObj }));

  //   notify &&
  //     notify(
  //       <>
  //         <div className="flex items-start justify-start gap-2">
  //           {collections.find((c) => c.id === id).games.some((game) => game.id === gameObj.id) ? (
  //             <>
  //               <MdOutlineBookmarkAdd className="flex-shrink-0 text-2xl" />
  //               <div className="flex flex-col gap-1">
  //                 <p className="text-[#222222]">Removed from Collection:</p>
  //                 <p className="font-semibold text-[#222222]">{collections.find((c) => c.id === id).title}!</p>
  //               </div>
  //             </>
  //           ) : (
  //             <>
  //               <RiBookmarkFill className="flex-shrink-0 text-2xl text-sky-500" />
  //               <div className="flex flex-col gap-1">
  //                 <p className="text-[#222222]">Added to Collection:</p>
  //                 <p className="font-semibold text-[#222222]">{collections.find((c) => c.id === id).title}</p>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       </>
  //     );

  //   onClose();
  // };

  // useEffect(() => {
  //   if (newCollectionField && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [newCollectionField]);

  return (
    <div className="flex flex-col">
      <div className="flex-1 px-4 pb-0 pt-0">
        <form>
          <p className="xs:text-2xl text-xl font-medium">Save game to...</p>
          <div className="mt-2 flex flex-col gap-5">
            <div>
              {/* {collections.length !== 0
                ? collections.map((c) => (
                    <div key={c.id} className="flex items-center gap-2">
                      <label htmlFor={`task-${c.id}`} className="flex items-center gap-2">
                        <input type="checkbox" id={`task-${c.id}`} className="h-4 w-4" checked={c.games.some((game) => game.id === gameObj.id)} onChange={() => handleCheckboxChange(c.id)} />
                        <p className="xs:text-lg font-light">{c.title}</p>
                      </label>
                    </div>
                  ))
                : null} */}
                <p>collection list</p>
            </div>
            <div id="new_collection">
              {newCollectionField ? (
                <div>
                  <input ref={inputRef} type="text" value={newCollectionValue} placeholder="Enter new collection name..." className="dark:text-drkbg block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" onChange={(e) => handleChangeChars(e)} />
                </div>
              ) : (
                <div className="flex cursor-pointer items-center gap-2" onClick={() => setNewCollectionField(true)}>
                  <PiPlusBold />
                  <p className="xs:text-xl text-lg font-light">Create new collection</p>
                </div>
              )}
            </div>
          </div>
          {newCollectionField && (
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="submit" disabled={!newCollectionValue} className={`cursor-pointer rounded-md ${newCollectionValue ? `from-gradPink to-gradOrange bg-gradient-to-r` : `bg-gray-500`} px-3 py-1.5 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                Create
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
