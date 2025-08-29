import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import React from "react";

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader="Public Library" />

      <h1 className="text-2xl font-karla">Welcome to SnapCast</h1>

      <section className="video-grid">
        <VideoCard
          id="1"
          duration={120}
          createdAt={new Date()}
          thumbnail="/assets/samples/thumbnail (1).png"
          title="Sample Video"
          userImg="/assets/images/dummy.jpg"
          username="John Doe"
          views={100}
          visibility="public"
        />
        <VideoCard
          id="1"
          duration={120}
          createdAt={new Date()}
          thumbnail="/assets/samples/thumbnail (2).png"
          title="Sample Video"
          userImg="/assets/images/dummy.jpg"
          username="John Doe"
          views={100}
          visibility="public"
        />
        <VideoCard
          id="1"
          duration={120}
          createdAt={new Date()}
          thumbnail="/assets/samples/thumbnail (3).png"
          title="Sample Video"
          userImg="/assets/images/dummy.jpg"
          username="John Doe"
          views={100}
          visibility="public"
        />
        <VideoCard
          id="1"
          duration={120}
          createdAt={new Date()}
          thumbnail="/assets/samples/thumbnail (4).png"
          title="Sample Video"
          userImg="/assets/images/dummy.jpg"
          username="John Doe"
          views={100}
          visibility="public"
        />
      </section>
    </main>
  );
};

export default Page;
