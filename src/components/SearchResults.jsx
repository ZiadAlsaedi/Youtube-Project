import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [videosList, setVideosList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      fetchVideos(query);
    }
  }, [location]);

  const fetchVideos = async (query) => {
    const API_KEY = 'AIzaSyDCg8NcxMWNlM_RmtzELACwAu4AdeMYw3k';
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`);
    const data = await response.json();
    setVideosList(data.items);
    console.log(data.items);

  };

  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="w-32">
        <Navbar />
      </div>

      <div className="mt-20 w-full">
      <div className="flex h-16  justify-between">
            <span className="inline-block h-10 bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              ALL
            </span>
            <span className="inline-block  h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              JavaScript
            </span>
            <span className="inline-block  h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Music
            </span>
            <span className="inline-block  h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Sports
            </span>
            <span className="inline-block   h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Travel
            </span>
            <span className="inline-block  max-sm:hidden h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Gaming
            </span>
            <span className="inline-block  max-sm:hidden h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              History
            </span>
            <span className="inline-block max-sm:hidden  h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Live
            </span>
            <span className="inline-block max-sm:hidden  h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              EA Sport FC 24
            </span>
            <span className="inline-block max-sm:hidden  h-10 bg-zinc-800 rounded-lg px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              Movies
            </span>
            <IoIosArrowForward className=" h-7 w-7" />
          </div>
          <div className="flex flex-wrap gap-4 w-full p-4 overflow-y-auto">
          {videosList.map((video) => (
            <div key={video.id} className="w-full md:w-[60%] lg:w-[45%] p-2">
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800">

      </div>
      <button  onClick={() => navigate(`/Video/${video.id.videoId}`)}
      >
    <img
      class="w-full h-full"
      src={video.snippet.thumbnails.high.url}
    />
          </button>

    <div className="flex ">
         <img
        className="w-[6vw] h-[10vh] rounded-full ml-2 m-1"
        alt=""

      />
 
      <div className="flex flex-col">
        <p className="text-white text-left font-semibold text-lg ml-2">
          {video.snippet.title}
        </p>
        <p className="text-gray-400 text-left font-normal text-xs ml-2 ">
        {video.snippet.channelTitle}
        </p>
        <p className="text-gray-400 text-left font-normal text-xs ml-2">
                      {video.statistics?.viewCount || 0} views . {new Date(video.snippet.publishedAt).toLocaleDateString()}
                    </p>
      </div>
    </div>
  </div>

  

)

)



}
          
      
          </div>
  
      </div>
    </div>
  );
}

export default SearchResults;
