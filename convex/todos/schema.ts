import { defineTable } from "convex/server";
import { v } from "convex/values";

export const todosSchema = defineTable({
  text: v.string(),
});
