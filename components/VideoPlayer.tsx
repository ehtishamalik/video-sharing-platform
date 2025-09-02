"use client";

import React, { useState } from "react";

import { Video } from "@imagekit/next";
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

  const handlePlay = () => {
    if (played) return;
    updatePlayCount(video.id, video.views + 1);
    try {
      setPlayed(true);
    } catch (error) {
      console.error("Error updating play count:", error);
    }
  };

  return (
    <Video
      urlEndpoint={urlEndpoint}
      src={video.videoUrl}
      controls
      width={500}
      height={500}
      className="w-full max-w-4xl mx-auto rounded-2xl"
      onPlay={handlePlay}
    />
  );
};

export default VideoPlayer;
