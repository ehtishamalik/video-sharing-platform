"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const VideoCard = ({
  id,
  duration,
  createdAt,
  thumbnail,
  title,
  userImg,
  username,
  views,
  visibility,
}: VideoCardProps) => {
  return (
    <Link href={`/video/${id}`} className="video-card overflow-clip">
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={290}
        height={160}
        className="w-full"
      />
      <article>
        <div>
          <figure>
            <Image
              src={userImg}
              alt="user image"
              width={34}
              height={34}
              className="rounded-full"
            />
            <figcaption>
              <h3>{username}</h3>
              <p>{visibility}</p>
            </figcaption>
          </figure>
          <aside>
            <Image
              src="/assets/icons/eye.svg"
              alt="views"
              width={16}
              height={16}
            />
            <span>{views}</span>
          </aside>
        </div>
        <h2>
          {title} -{" "}
          {createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </article>
      <button className="copy-btn">
        <Image src="/assets/icons/link.svg" alt="copy" width={18} height={18} />
      </button>
      {duration && (
        <div className="duration">{Math.ceil(duration / 60)}min</div>
      )}
    </Link>
  );
};

export default VideoCard;
