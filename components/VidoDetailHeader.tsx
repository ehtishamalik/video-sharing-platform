"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { daysAgo } from "@/lib/utils";

const VidoDetailHeader = ({
  title,
  username,
  videoId,
  userImg,
  ownerId,
  createdAt,
}: VideoDetailHeaderProps) => {
  const router = useRouter();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${videoId}`);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <header className="detail-header">
      <aside className="user-info">
        <h1>{title}</h1>
        <figure>
          <button
            onClick={() => {
              router.push(`/profile/${ownerId}`);
            }}
          >
            <Image
              src={userImg || "/assets/images/dummy.jpg"}
              alt={username || "user"}
              width={24}
              height={24}
              className="rounded-full"
            />
            <h2>{username || "Guest"}</h2>
          </button>
          <figcaption>
            <span>-</span>
            <p>{daysAgo(createdAt)}</p>
          </figcaption>
        </figure>
      </aside>
      <aside className="cta">
        <button onClick={handleCopyLink}>
          <Image
            src={
              copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"
            }
            alt="copy link"
            width={24}
            height={24}
          />
        </button>
      </aside>
    </header>
  );
};

export default VidoDetailHeader;
