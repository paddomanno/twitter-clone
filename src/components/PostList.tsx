import React from "react";
import PostView, { type PostWithAuthor } from "./PostView";

export default function PostList({ posts }: { posts: PostWithAuthor[] }) {
  return (
    <div className="mx-2 flex flex-col gap-2">
      {posts.map((postWithAuthor) => (
        <PostView {...postWithAuthor} key={postWithAuthor.post.id} />
      ))}
    </div>
  );
}
