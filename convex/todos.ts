import { mutation } from "./_generated/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";

// Schema
export const todosSchema = defineTable({
  text: v.string(),
});

// Methods
export const createTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", {
      text: args.text,
    });
  },
});
