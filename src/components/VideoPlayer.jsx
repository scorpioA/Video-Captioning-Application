import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl, captions }) => {
    const [currentCaption, setCurrentCaption] = useState("");

    const handleProgress = ({ playedSeconds }) => {
        console.log("Current video time:", playedSeconds);
        const activeCaption = captions.find(
            (caption) =>
                playedSeconds >= caption.startTime && playedSeconds <= caption.endTime
        );
        setCurrentCaption(activeCaption ? activeCaption.text : "");
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-6">
            <div className="relative">
                <ReactPlayer
                    url={videoUrl}
                    controls
                    playing={false}
                    width="100%"
                    height="480px"
                    onProgress={handleProgress}
                    config={{
                        youtube: {
                            playerVars: {
                                cc_load_policy: 0, 
                            },
                        },
                    }}
                />

                {/*--------------- Caption Overlay -----------------*/}
                {currentCaption && (
                    <div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-lg px-4 py-2 rounded-lg"
                        style={{ whiteSpace: "pre-wrap" }}
                    >
                        {currentCaption}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
