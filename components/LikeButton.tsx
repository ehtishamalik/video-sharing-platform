"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { Ban, LoaderCircle, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SessionType } from "@/types";
import {
  addVideoLike,
  getLikesCountByVideoId,
  getUserLike,
  removeVideoLike,
} from "@/lib/actions/like";

const LikeButton = ({ videoId }: { videoId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLikeByUser, setIsLikeByUser] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [session, setSession] = useState<SessionType>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [animateLike, setAnimateLike] = useState<boolean>(false);

  const handleLike = async () => {
    if (isLoading || !session) return;

    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 500); // Reset animation state

    try {
      if (isLikeByUser) {
        setLikesCount((prev) => prev - 1);
        setIsLikeByUser(true);
        const response = await removeVideoLike(videoId, session.user.id);
        if (!response) {
          setLikesCount((prev) => prev + 1);
          console.error("Failed to remove like");
        } else {
          setIsLikeByUser(false);
        }
      } else {
        setLikesCount((prev) => prev + 1);
        setIsLikeByUser(false);
        const response = await addVideoLike(videoId, session.user.id);
        if (!response) {
          setLikesCount((prev) => prev - 1);
          console.error("Failed to add like");
        } else {
          setIsLikeByUser(true);
        }
      }
      setIsLikeByUser(!isLikeByUser);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data || !data.user.id) {
          router.push("/login");
          return;
        }
        setSession(data);

        const countResult = await getLikesCountByVideoId(videoId);
        if (!countResult) {
          setError(true);
          return;
        }
        setLikesCount(countResult.count as number);

        const userLikeResult = await getUserLike(videoId, data.user.id);
        if (!userLikeResult) {
          setError(true);
          return;
        }

        setIsLikeByUser(userLikeResult.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in LikeButton initial load:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    initialLoad();
  }, [router, videoId]);

  if (error) {
    return (
      <div className="flex gap-2 border border-pink-100 rounded-2xl px-2 py-0.5 items-center">
        <Ban size={16} className="text-pink-100" />
      </div>
    );
  }

  return (
    <div className="border border-pink-100 rounded-2xl px-2 py-0.5">
      {isLoading ? (
        <LoaderCircle size={16} className="animate-spin text-pink-100" />
      ) : (
        <button
          onClick={handleLike}
          className="flex gap-2 items-center flex-row-reverse"
        >
          <ThumbsUp
            size={16}
            className={clsx("text-pink-100 transition-transform", {
              "animate-ping": animateLike,
              "fill-pink-100": isLikeByUser,
            })}
          />
          <p className="text-pink-100">{likesCount}</p>
        </button>
      )}
    </div>
  );
};

export default LikeButton;
