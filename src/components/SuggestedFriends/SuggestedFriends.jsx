import React, { useEffect, useRef, useState } from "react";
import useGetSuggestedFriends from "./getSuggestedFriends";
import FriendCard from "../FriendCard/FriendCard";
import LoadFriendCard from "../FriendCard/LoadFriendCard";

export default function SuggestedFriends() {


  const { data, isLoading } = useGetSuggestedFriends();
  const [isOpen, setOpen] = useState(true); 
  const searchInput = useRef(null);
  const [searchedFriend, setSearchedFriend] = useState(data?.data?.data?.suggestions);
  const [searchTrem , setSearchTrem]=useState('')
  function toggleMenu() {
    setOpen(!isOpen);
  }

  function searchFriends() {
    const trem = searchInput.current.value.toLowerCase();
    setSearchTrem(trem)
    if(!trem){
      setSearchedFriend(data?.data?.data?.suggestions)
    }
     setSearchedFriend(
      data?.data?.data?.suggestions?.filter((friend) =>
        friend?.name.toLowerCase().includes(trem)
      ) 
    );
 
  } 
  const displayedFriends = searchTrem
    ? searchedFriend                 
    : searchedFriend?.slice(0, 5); 
 
  useEffect(() => {
        setSearchedFriend(data?.data?.data?.suggestions)
      }, [data]);


  return (
    <>
      <div className="bg-white rounded-xl shadow-md shadow-gray-300 p-4 xl:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-user text-md text-blue-500"></i>
            <p className="font-bold">Suggested Friends</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-5 font-semibold rounded-full bg-gray-300 flex items-center justify-center text-xs">
              {displayedFriends?.length || 5}
            </div>
            <button
              onClick={toggleMenu}
              className="text-blue-500 text-xs cursor-pointer font-bold focus:outline-none focus:border-none xl:hidden"
            >
              {isOpen ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} xl:block bg-white rounded-xl shadow-md shadow-gray-300 p-4 `}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-user text-md text-blue-500"></i>
            <p className="font-bold">Suggested Friends</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-5 font-semibold rounded-full bg-gray-300 flex items-center justify-center text-xs">
              {data?.data?.data?.suggestions?.length || 5}
            </div>
          </div>
        </div>
        <div className="relative">
          <input
          onChange={searchFriends}
            ref={searchInput}
            type="search"
            placeholder="Search Friends ..."
            className="w-full rounded-xl bg-gray-100 py-2 px-7 border border-gray-300 placeholder:text-sm placeholder:font-light focus:outline-none focus:bg-white  focus:border-blue-600"
          />
          <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm font-light absolute top-1/2 -translate-y-1/2 left-2"></i>
        </div>
        <div className="mt-2">
          {isLoading ? (
            <LoadFriendCard />
          ) : (
            displayedFriends?.map((friend) => (
                <FriendCard friend={friend} key={friend?._id} />
              ))
          )}
        </div>
        <button class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
          View more
        </button>
      </div>
    </>
  );
}
