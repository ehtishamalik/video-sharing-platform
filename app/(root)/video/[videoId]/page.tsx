import React from "react";
import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";

import { redirect } from "next/navigation";
import { getVideoById } from "@/lib/actions/video";

const Profile = async ({ params }: Params) => {
  const { videoId } = await params;
  if (!videoId) redirect("/404");

  const video = await getVideoById(videoId);

  if (!video) redirect("/404");

  return (
    <main className="wrapper page">
      <VideoDetailHeader
        username={video.user?.name}
        visibility={video.video.visibility}
        createdAt={video.video.createdAt}
        ownerId={video.user?.id || ""}
        thumbnailUrl={video.video.thumbnailUrl}
        title={video.video.title}
        userImg={video.user?.image || ""}
        videoId={video.video.id}
      />

      <section className="video-details">
        <div className="content">
          <VideoPlayer
            video={video.video}
            urlEndpoint={process.env.IMAGEKIT_URL!}
          />
        </div>
      </section>
    </main>
  );
};

export default Profile;
