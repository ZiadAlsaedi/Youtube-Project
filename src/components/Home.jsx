import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoIosArrowForward } from "react-icons/io";
import YouTubeData from "./YouTubeData";
import { useNavigate } from "react-router-dom";
import { useState,useEffect  } from "react";
import axios from 'axios';




const Home = () => {
  const [videosList, setVideosList] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&regionCode=Sa&chart=mostPopular&maxResults=10&key=AIzaSyDCg8NcxMWNlM_RmtzELACwAu4AdeMYw3k'
        );
        setVideosList(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate(`/`);
    }
  }, [navigate]);

  return (
    <div className="h-screen flex">
              <Sidebar  />

      <div className=" w-32 ">
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
      <button  onClick={() => navigate(`/Video/${video.id}`)}
      >
    <img
      class="w-full h-full"
      src={video.snippet.thumbnails.standard.url}
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
        <p className="text-gray-400 text-left font-normal text-xs ml-2 ">
        {video.statistics.viewCount} views . {video.snippet.publishedAt} 
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
};

export default Home;
