import React from "react";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";

import { getAllVideos } from "@/lib/actions/video";

const RootPage = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = await searchParams;
  const { videos } = await getAllVideos({
    searchQuery: query || "",
    pageNumber: Number(page) || 1,
    sortFilter: filter,
  });

  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />

      <h1 className="text-2xl font-karla">Welcome to SnapCast</h1>

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
          title="No Videos Found"
          description="Try adjusting your search or filter settings."
        />
      )}
    </main>
  );
};

export default RootPage;
