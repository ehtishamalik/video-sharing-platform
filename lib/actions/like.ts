"use server";

import { db } from "@/drizzle";
import { like } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { nanoid } from "../utils";

export const getLikesCountByVideoId = async (videoId: string) => {
  try {
    const [results] = await db
      .select({ count: sql`count(*)` })
      .from(like)
      .where(eq(like.videoId, videoId));
    return results;
  } catch (error) {
    console.error("Error fetching likes by video ID:", error);
    return null;
  }
};

export const getUserLike = async (videoId: string, userId: string) => {
  try {
    const results = await db
      .select()
      .from(like)
      .where(and(eq(like.videoId, videoId), eq(like.userId, userId)));
    return results;
  } catch (error) {
    console.error("Error fetching user like:", error);
    return null;
  }
};

export const addVideoLike = async (videoId: string, userId: string) => {
  try {
    const results = await db
      .insert(like)
      .values({
        id: nanoid(),
        userId,
        videoId,
      })
      .returning();
    return results;
  } catch (error) {
    console.error("Error adding video like:", error);
    return null;
  }
};

export const removeVideoLike = async (videoId: string, userId: string) => {
  try {
    const results = await db
      .delete(like)
      .where(and(eq(like.videoId, videoId), eq(like.userId, userId)))
      .returning();
    return results;
  } catch (error) {
    console.error("Error removing video like:", error);
    return null;
  }
};
