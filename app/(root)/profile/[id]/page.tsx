import React from "react";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";

import { GetAllVideosByUser } from "@/lib/actions/video";
import { redirect } from "next/navigation";

const Profile = async ({ params, searchParams }: ParamsWithSearch) => {
  const { id } = await params;
  const { query, filter } = await searchParams;

  const { user, videos } = await GetAllVideosByUser({
    userIdParameter: id,
    searchQuery: query || "",
    sortFilter: filter || "",
  });

  if (!user) redirect("/404");

  return (
    <div className="wrapper page">
      <Header
        subHeader={user.email}
        title={user.name}
        userImg={user.image || "/assets/images/dummy.jpg"}
      />

      {videos.length > 0 ? (
        <section className="video-grid">
          {videos.map(({ video, user }) => (
            <VideoCard
              key={video.id}
              id={video.id}
              duration={video.duration}
              createdAt={video.createdAt}
              thumbnail={video.thumbnailUrl}
              title={video.title}
              userImg={user?.image || "/assets/images/avatar.png"}
              username={user?.name || "Guest"}
              views={video.views}
              visibility={video.visibility}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="/assets/icons/video.svg"
          title="No Videos available yet."
          description="Videos will show up once you upload them."
        />
      )}
    </div>
  );
};

export default Profile;
