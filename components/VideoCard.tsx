import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Image as ImageKit } from "@imagekit/next";
import CopyButton from "./CopyButton";

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
    <section className="video-card overflow-clip isolate">
      <Link href={`/video/${id}`} className="absolute inset-0" />
      <ImageKit
        urlEndpoint={process.env.IMAGEKIT_URL!}
        src={thumbnail}
        width={290}
        height={160}
        alt="Picture of the author"
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
      <CopyButton id={id} size={18} />
      {duration && (
        <div className="duration">{Math.ceil(duration / 60)}min</div>
      )}
    </section>
  );
};

export default VideoCard;
