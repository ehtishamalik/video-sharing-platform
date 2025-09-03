import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { like, video } from "./schema";

export type VideoTableSelectType = InferSelectModel<typeof video>;
export type VideoTableInsertType = InferInsertModel<typeof video>;

export type LikeTableSelectType = InferSelectModel<typeof like>;
export type LikeTableInsertType = InferInsertModel<typeof like>;
