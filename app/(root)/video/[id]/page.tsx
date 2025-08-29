import Header from "@/components/Header";
import React from "react";

const Profile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="wrapper page">
      <Header
        subHeader="info@ehtishamalik.com"
        title="Profile"
        userImg="/assets/images/dummy.jpg"
      />
      <h1 className="text-2xl font-karla">Video ID: {id}</h1>
    </div>
  );
};

export default Profile;
