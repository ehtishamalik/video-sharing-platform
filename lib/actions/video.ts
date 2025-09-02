"use server";

import { db } from "@/drizzle";
import { user, video } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { VideoTableInsertType } from "@/drizzle/types";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { doesTitleMatch, getOrderByClause } from "../utils";

const buildVideoWithUserQuery = () => {
  return db
    .select({
      video,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(video)
    .leftJoin(user, eq(video.userId, user.id));
};

export async function addVideoDetails(
  videoData: Omit<VideoTableInsertType, "userId">
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }

    const completeVideoData: VideoTableInsertType = {
      ...videoData,
      userId: session.user.id,
    };

    const result = await db.insert(video).values(completeVideoData).returning();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding video details:", error);
    return { success: false, error: (error as Error).message };
  }
}

interface GetAllVideos {
  searchQuery: string;
  sortFilter?: string;
  pageNumber?: number;
  pageSize?: number;
}

export async function getAllVideos({
  searchQuery,
  sortFilter,
  pageNumber = 1,
  pageSize = 8,
}: GetAllVideos) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const currentUserId = session?.user.id;

    if (!currentUserId) {
      throw new Error("Unauthorized");
    }

    const canSeeTheVideos = or(
      eq(video.userId, currentUserId),
      eq(video.visibility, "public")
    );

    const whereConditions = searchQuery.trim()
      ? and(canSeeTheVideos, doesTitleMatch(video, searchQuery.trim()))
      : canSeeTheVideos;

    const [{ totalCount }] = await db
      .select({ totalCount: sql`count(*)` })
      .from(video)
      .where(whereConditions);

    const totalVideos = Number(totalCount || 0);

    const totalPages = Math.ceil(totalVideos / pageSize);

    const videoRecords = await buildVideoWithUserQuery()
      .where(whereConditions)
      .orderBy(
        sortFilter ? getOrderByClause(sortFilter) : sql`${video.createdAt} DESC`
      )
      .limit(pageSize)
      .offset((pageNumber - 1) * pageSize);

    return {
      videos: videoRecords,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalVideos,
        pageSize,
      },
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      videos: [],
      pagination: { currentPage: 1, totalPages: 0, totalVideos: 0, pageSize },
    };
  }
}

export async function getVideoById(videoId: string) {
  try {
    const [videoRecord] = await buildVideoWithUserQuery().where(
      eq(video.id, videoId)
    );
    return videoRecord;
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    return null;
  }
}

interface GetAllVideosByUser {
  userIdParameter: string;
  searchQuery?: string;
  sortFilter?: string;
}

export async function GetAllVideosByUser({
  userIdParameter,
  searchQuery = "",
  sortFilter,
}: GetAllVideosByUser) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const currentUserId = session?.user.id;

    if (!currentUserId) {
      throw new Error("Unauthorized");
    }

    const isOwner = currentUserId === userIdParameter;

    const [userInfo] = await db
      .select()
      .from(user)
      .where(eq(user.id, userIdParameter));

    if (!userInfo) throw new Error("User not found");

    const conditions = [
      eq(video.userId, userIdParameter),
      !isOwner && eq(video.visibility, "public"),
      searchQuery.trim() && ilike(video.title, `%${searchQuery.trim()}%`),
    ].filter(Boolean);

    const userVideos = await buildVideoWithUserQuery()
      .where(and(...(conditions as any[])))
      .orderBy(
        sortFilter ? getOrderByClause(sortFilter) : sql`${video.createdAt} DESC`
      );

    return {
      user: userInfo,
      videos: userVideos,
      count: userVideos.length,
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      user: null,
      videos: [],
      count: 0,
    };
  }
}

export async function updatePlayCount(videoId: string, views: number) {
  try {
    await db.update(video).set({ views }).where(eq(video.id, videoId));
  } catch (error) {
    console.error("Error updating play count:", error);
  }
}
