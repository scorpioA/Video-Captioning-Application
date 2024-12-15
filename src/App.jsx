import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import CaptionEditor from "./components/CaptionEditor";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleCaptionsChange = (newCaptions) => {
    setCaptions(newCaptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-600 text-white p-4">
      <h1 className="text-5xl font-extrabold text-center pb-10 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500 drop-shadow-md">
        Video Captioning App
      </h1>

      {/* --------------- Video URL input ---------------*/}
      <div className="mb-4">
        <div className="w-full text-black p-2 text-lg font-bold shadow-sm" >
          Enter a valid hosted video URL to see the magic happen.
          (Suggestion: Enter a youtube video URL.)
        </div>
        <input
          type="url"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={handleVideoUrlChange}
          className="w-full text-black p-2 border rounded-lg shadow-sm"
        />
      </div>

      {videoUrl && (
        <div className="flex flex-col items-center">
          <VideoPlayer videoUrl={videoUrl} captions={captions} />
          <CaptionEditor captions={captions} onCaptionsChange={handleCaptionsChange} />
        </div>
      )}
    </div>
  );
};

export default App;
