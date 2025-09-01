import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { video } from "./schema";

export type VideoTableSelectType = InferSelectModel<typeof video>;
export type VideoTableInsertType = InferInsertModel<typeof video>;
