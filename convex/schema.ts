import { defineSchema, defineTable } from "convex/server";
import { todosSchema } from "./todos/schema";

export default defineSchema({
  todos: todosSchema,
});
