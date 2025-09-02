import React from "react";
import Image from "next/image";
import CopyButton from "./CopyButton";
import Link from "next/link";

import { daysAgo } from "@/lib/utils";

const VideoDetailHeader = ({
  title,
  username,
  videoId,
  userImg,
  ownerId,
  createdAt,
}: VideoDetailHeaderProps) => {
  return (
    <header className="detail-header">
      <aside className="user-info">
        <h1>{title}</h1>
        <figure>
          <Link href={`/profile/${ownerId}`} className="user-link">
            <Image
              src={userImg || "/assets/images/dummy.jpg"}
              alt={username || "user"}
              width={24}
              height={24}
              className="rounded-full"
            />
            <h2>{username || "Guest"}</h2>
          </Link>
          <figcaption>
            <span>-</span>
            <p>{daysAgo(createdAt)}</p>
          </figcaption>
        </figure>
      </aside>
      <aside className="cta">
        <CopyButton id={videoId} size={24} />
      </aside>
    </header>
  );
};

export default VideoDetailHeader;
