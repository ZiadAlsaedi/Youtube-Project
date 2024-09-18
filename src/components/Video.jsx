import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import Navbar from './Navbar';
import YouTubeData from './YouTubeData';
import axios from 'axios';


const Video = () => {
    const [showMore, setShowMore] = useState(false);
    const [videosList, setVideosList] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const video = videosList.find(v => v.id === id);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(null);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [userHasDisliked, setUserHasDisliked] = useState(false);
    


    const toggleDetails = () => {
        setShowMore(!showMore);
    };

    const toggleDeleteButton = (commentId) => {
      if (showDeleteButton === commentId) {
        setShowDeleteButton(null);
      } else {
        setShowDeleteButton(commentId);
      }
    };
    
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
      const userData = localStorage.getItem('isLoggedIn');
      if (userData) {
        const parsedUsers = JSON.parse(userData);
        setUsers(parsedUsers);
  
      }
    }, []);
    const handleAddComment = async () => {
      if (!users || !users.id) {
        console.error('No user data available');
        return;
      }
    
      try {
        const newComment = {
          name: users.name,
          userid: users.id,
          comment: comment,
          videoId: id,
        };
        await axios.post('https://6685d19983c983911b0019b4.mockapi.io/comment', newComment);
        setComments([...comments, newComment]);
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
    
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await axios.get('https://6685d19983c983911b0019b4.mockapi.io/comment');
          setComments(response.data.filter(comment => comment.videoId === id));
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
    
      fetchComments();
    }, [id]);
    const handleDeleteComment = async (commentId) => {
      if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`https://6685d19983c983911b0019b4.mockapi.io/comment/${commentId}`);
        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };
  
  }
  useEffect(() => {
    const fetchLikesAndDislikes = async () => {
        try {
            const response = await axios.get('https://6685d19983c983911b0019b4.mockapi.io/comment');
            const filteredComments = response.data.filter(comment => comment.videoId === id);
            setComments(filteredComments);
            setLikes(filteredComments.filter(comment => comment.type === 'like'));
            setDislikes(filteredComments.filter(comment => comment.type === 'dislike'));
            setUserHasLiked(filteredComments.some(comment => comment.userId === users.id && comment.type === 'like'));
            setUserHasDisliked(filteredComments.some(comment => comment.userId === users.id && comment.type === 'dislike'));
        } catch (error) {
            console.error('Error fetching likes and dislikes:', error);
        }
    };

    fetchLikesAndDislikes();
}, [id, users.id]);

const handleLike = async () => {
    if (!users || !users.id) {
        console.error('No user data available');
        return;
    }

    if (userHasLiked) {
        console.log('User has already liked this video');
        return;
    }

    try {
        const newLike = {
            userId: users.id,
            videoId: id,
            type: 'like',
            name: users.name
        };
        await axios.post('https://66868d6183c983911b02b8a8.mockapi.io/likesanddislikes', newLike);
        setLikes([...likes, newLike]);
        setUserHasLiked(true);
        if (userHasDisliked) {
            await handleRemoveDislike();
        }
    } catch (error) {
        console.error('Error liking the video:', error);
    }
};

const handleDislike = async () => {
    if (!users || !users.id) {
        console.error('No user data available');
        return;
    }

    if (userHasDisliked) {
        console.log('User has already disliked this video');
        return;
    }

    try {
        const newDislike = {
            userId: users.id,
            videoId: id,
            type: 'dislike',
            name: users.name
        };
        await axios.post('https://66868d6183c983911b02b8a8.mockapi.io/likesanddislikes', newDislike);
        setDislikes([...dislikes, newDislike]);
        setUserHasDisliked(true);
        if (userHasLiked) {
            await handleRemoveLike();
        }
    } catch (error) {
        console.error('Error disliking the video:', error);
    }
};

const handleRemoveLike = async () => {
    try {
        const likeToRemove = likes.find(like => like.userId === users.id && like.videoId === id);
        if (likeToRemove) {
            await axios.delete(`https://66868d6183c983911b02b8a8.mockapi.io/likesanddislikes/${likeToRemove.id}`);
            setLikes(likes.filter(like => like.id !== likeToRemove.id));
            setUserHasLiked(false);
        }
    } catch (error) {
        console.error('Error removing like:', error);
    }
};

const handleRemoveDislike = async () => {
    try {
        const dislikeToRemove = dislikes.find(dislike => dislike.userId === users.id && dislike.videoId === id);
        if (dislikeToRemove) {
            await axios.delete(`https://66868d6183c983911b02b8a8.mockapi.io/likesanddislikes/${dislikeToRemove.id}`);
            setDislikes(dislikes.filter(dislike => dislike.id !== dislikeToRemove.id));
            setUserHasDisliked(false);
        }
    } catch (error) {
        console.error('Error removing dislike:', error);
    }
};

    
    return (
<div className="flex flex-wrap">
  <div className="w-full md:w-1/12">
    <Navbar />
  </div>

  <div className="flex flex-col md:flex-row w-full" key={video?.id || video?.id.videoId}>
    <div className="flex flex-col w-[640px] max-sm:w-[400px] mt-20 ml-5">
                    <iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${id}`}
                        title="YouTube video player"
                        allowFullScreen
                        onMouseOver={event => event.target.play()}
                        onMouseOut={event => event.target.pause()}
                        className='max-sm:w-[400px]'
                    ></iframe>
      <p className="mt-4 mb-3 text-white text-2xl font-bold">
        {video?.snippet.title}
      </p>
      <div className="flex flex-wrap">
        <div className="flex w-full md:w-[70vw]">
          <img className="w-[6vw] h-[10vh] rounded-full ml-2 mr-1 max-sm:w-14 max-sm:h-14" src="https://pbs.twimg.com/semantic_core_img/1806377928504012800/LfXwmqlz?format=jpg&name=360x360" alt="" />
          <div className="flex flex-col w-40 ">
            <p className="text-white font-semibold text-base">{video?.snippet.channelTitle}</p>
            <p className="text-gray-400 font-normal text-xs">8.86K subscribers</p>
          </div>
        </div>
        <button className="w-[10vw] px-2 bg-white h-9 text-stone-800 rounded-full ml-9 max-sm:ml-0 max-sm:mr-10 max-sm:w-20">
          Subscribe
        </button>
        <div className="flex ml-4 md:ml-16 h-10 shadow-sm justify-between rounded-full items-center">
        <button className="bg-stone-800 w-16 h-9 text-white rounded-l-full flex items-center justify-center" onClick={handleLike} disabled={userHasLiked}>
                                <AiOutlineLike />
                                {userHasLiked ? "Liked" : "Like"}
                            </button>
                            <div className="border-l border-white h-7"></div>
                            <button className="bg-stone-800 w-16 h-9 text-white rounded-r-full flex items-center justify-center" onClick={handleDislike} disabled={userHasDisliked}>
                                <AiOutlineDislike />
                                {userHasDisliked ? "Disliked" : "Dislike"}
                            </button>
        </div>
        <button className="px-3 bg-stone-800 h-9 text-white rounded-full flex items-center justify-center ml-5">
          <FaShare className="mr-2" />
          Share
        </button>
        <button className="bg-white max-sm:hidden  w-14 h-6 mt-2 rounded-full flex items-center justify-center ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-6 w-6 text-white">
            <path fill="#000000" fillRule="evenodd" clipRule="evenodd" d="M56.086,31.96c0,2.207 -1.793,4 -4,4c-2.208,0 -4,-1.793 -4,-4c0,-2.208 1.792,-4 4,-4c2.207,0 4,1.792 4,4Z"/>
            <path fill="#000000" fillRule="evenodd" clipRule="evenodd" d="M16.086,31.96c0,2.207 -1.793,4 -4,4c-2.208,0 -4,-1.793 -4,-4c0,-2.208 1.792,-4 4,-4c2.207,0 4,1.792 4,4Z"/>
            <path fill="#000000" fillRule="evenodd" clipRule="evenodd" d="M36.086,31.96c0,2.207 -1.793,4 -4,4c-2.208,0 -4,-1.793 -4,-4c0,-2.208 1.792,-4 4,-4c2.207,0 4,1.792 4,4Z"/>
          </svg>
        </button>
      </div>
      <div className="w-full h-auto bg-stone-800 mt-2 rounded-xl p-5 text-white ">
        <div>
          <p>     {video?.statistics.viewCount} views . {video?.snippet.publishedAt} 
          </p>
        </div>
        {!showMore && (
          <button className="text-blue-500 mt-2" onClick={toggleDetails}>
            More
          </button>
        )}
        {showMore && (
          <div className="mt-3 max-sm:w-72">
            <p className=" max-sm:w-72">
              {video?.snippet.description}
            </p>
            <button className="text-blue-500 mt-2" onClick={toggleDetails}>
              Show Less
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col mt-3'>
        <div className='flex'>
          <p className='text-white font-semibold text-lg'><span>{video?.statistics.viewCount} </span> Comments</p>
          <BiMenuAltLeft className='ml-7 w-6 h-9 mr-2'/>
          <p className='font-semibold text-lg'>Sort by</p>
        </div>
      </div>
      <div className='flex w-full md:w-[640px]'>
        <svg
          height="40px"
          width="40px"
          className="ml-2 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 461.001 461.001"
          xmlSpace="preserve"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            fillRule: "evenodd",
            clipRule: "evenodd",
          }}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="230.5" cy="230.5" r="200" fill="#4A249D" />
            <text x="50%" y="50%"  textAnchor="middle" dy=".3em" fontSize="150" fontFamily="Arial" fill="#ffffff">
              Z
            </text>
          </g>
        </svg>
        <div className='flex flex-col w-full justify-end items-end'>
          <input type="text" className='w-full h-10 bg-base-100' placeholder='Add a comment...' 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          />
          <hr />
          <div className='flex'>
            <button className="px-3 w-24 h-10 mt-2 text-white rounded-full flex items-center justify-center">
              Cancel
            </button>
            <button      onClick={handleAddComment} className="px-3 w-24 h-10 bg-stone-800 mt-2 text-white rounded-full flex items-center justify-center ml-5">
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-5 '>
      {comments.map((comment, index) => (
   <div key={index} className="flex mb-4">
   <svg
          height="40px"
          width="40px"
          className="ml-2 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 461.001 461.001"
          xmlSpace="preserve"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            fillRule: "evenodd",
            clipRule: "evenodd",
          }}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="230.5" cy="230.5" r="200" fill="#4A249D" />
            <text x="50%" y="50%"  textAnchor="middle" dy=".3em" fontSize="150" fontFamily="Arial" fill="#ffffff">
              Z
            </text>
          </g>
        </svg>
   <div className="flex flex-col w-full">
     <div className="flex justify-between">
      <div className='flex flex-col'>
      <p className="text-white font-semibold">{comment.name}</p>

      <p className="text-gray-400 text-sm mt-1">{comment.comment}</p>

      </div>
       <div className='flex flex-col'>
       <button
         type="button"
         className="ml-auto"
         onClick={() => toggleDeleteButton(comment.id)}
       >
         <CiMenuKebab />
       </button>
       {showDeleteButton === comment.id && comment.userid === users.id && (
         <button
           className="px-2 py-1 bg-red-500 text-white rounded-full ml-2 mt-1"
           onClick={() => handleDeleteComment(comment.id)}
         >
           Delete
         </button>
       )}
       </div>
     
     </div>
   </div>
 </div>
                ))}

     
      </div>
    </div>
    <div className="flex flex-col w-full">
    <div className="card bg-neutral text-neutral-content w-96 mt-20 max-sm:mt-5 max-sm: ml-4">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Ziad Alsaedi</h2>
    <p>Raect Developer | Java Script</p>
    <a href="http://www.linkedin.com/in/ZiadAlsaedi" target="_blank" className="btn btn-linkedin mt-4 btn-primary">Follow me on LinkedIn</a>
  </div>
</div>

      <p className="text-white font-semibold text-lg ml-7 mt-5">More videos</p>
      
      {videosList
        .filter((v) => v.id !== id)
        .map((v) => (
          <div
            className="flex w-[350px] mb-3 cursor-pointer"
            onClick={() => navigate(`/video/${v.id}`)}
            key={v.id}
          >
            <img
              src={v.snippet.thumbnails.default.url}
              alt={v.snippet.title}
              className="w-[168px] h-[94px] ml-6"
            />
            <div className="flex flex-col ml-3">
              <p className="text-white font-semibold text-sm">{v.snippet.title}</p>
              <p className="text-gray-400 text-xs mt-1">{v.snippet.channelTitle}</p>
              <p className="text-gray-400 text-xs mt-1">{v.statistics.viewCount} </p>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>

    );
};

export default Video;
