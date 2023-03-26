import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { type RouterOutputs } from "../utils/api";

type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];

export default function PostView(props: PostWithAuthor) {
  const { post, author } = props;

  if (!author.fullname && !author.username) console.log("hier", author);

  return (
    <div className="flex gap-3 rounded-xl bg-white/10 p-4">
      <Link href={`/@${author.username}`}>
        <Image
          src={author.profileImageUrl}
          alt="Profile image"
          className="h-14 w-14 rounded-full border-2 border-indigo-200"
          width={56}
          height={56}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex">
          <Link href={`/@${author.username}`}>
            <span className="font-semibold">{`@${author.username}`}</span>
          </Link>
          <span className="inline-flex items-center justify-center px-2">
            ·
          </span>
          <span className="font-thin">{`${formatDistanceToNow(
            post.createdAt
          )} ago`}</span>
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
