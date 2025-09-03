"use client";

import React, { useState } from "react";
import { VideoTableSelectType } from "@/drizzle/types";
import { updatePlayCount } from "@/lib/actions/video";

const VideoPlayer = ({
  video,
  urlEndpoint,
}: {
  video: VideoTableSelectType;
  urlEndpoint: string;
}) => {
  const [played, setPlayed] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlay = () => {
    if (played) return;
    updatePlayCount(video.id, video.views + 1);
    setPlayed(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.log("Video failed to load", e);
    setHasError(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl">
      {hasError ? (
        <div className="text-red-600 text-center py-10">
          <p>
            ⚠️ Unable to load video. It may be temporarily unavailable or access
            is restricted.
          </p>
          <p>Please try again later.</p>
        </div>
      ) : (
        <video
          src={`${urlEndpoint}/${video.videoUrl}`}
          controls
          width={500}
          height={500}
          className="w-full rounded-2xl"
          onPlay={handlePlay}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
