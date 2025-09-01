import React from "react";
import Header from "@/components/Header";

import { redirect } from "next/navigation";
import { Video } from "@imagekit/next";
import { getVideoById } from "@/lib/actions/video";
import VidoDetailHeader from "@/components/VidoDetailHeader";

const Profile = async ({ params }: Params) => {
  const { videoId } = await params;
  if (!videoId) redirect("/404");

  const video = await getVideoById(videoId);

  if (!video) redirect("/404");

  return (
    <main className="wrapper page">
      <Header
        subHeader="info@ehtishamalik.com"
        title="Profile"
        userImg="/assets/images/dummy.jpg"
      />
      <VidoDetailHeader
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
          <Video
            urlEndpoint={process.env.IMAGEKIT_URL!}
            src={video.video.videoUrl}
            controls
            width={500}
            height={500}
            className="w-full max-w-4xl mx-auto rounded-2xl"
          />
        </div>
      </section>
    </main>
  );
};

export default Profile;
