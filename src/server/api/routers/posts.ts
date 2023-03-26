import { clerkClient } from "@clerk/nextjs/server";
import { type Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUser";

export const postsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: {
        createdAt: "desc",
      },
    });

    return addUserDataToPosts(posts);
  }),

  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        where: {
          authorId: input.userId,
        },
        take: 100,
        orderBy: {
          createdAt: "desc",
        },
      });

      return addUserDataToPosts(posts);
    }),

  // private procedure for creating a post
  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          content: input.content,
          authorId: ctx.currentUserId,
        },
      });

      return {
        post,
      };
    }),
});

async function addUserDataToPosts(posts: Post[]) {
  const usersUnfiltered = await clerkClient.users.getUserList({
    userId: posts.map((post) => post.authorId),
    limit: 110,
  });
  console.log("usersUnfiltered", usersUnfiltered);

  const users = usersUnfiltered.map(filterUserForClient);

  return posts.map((post) => {
    const author = users.find((user) => user.id === post.authorId);
    if (!author)
      throw new TRPCError({
        message: "Author not found",
        code: "INTERNAL_SERVER_ERROR",
      });
    return {
      post,
      author: {
        ...author,
        username: author.username,
      },
    };
  });
}
