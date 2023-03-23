import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function CreatePostForm() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="m-4">
      <h1>Create a new post</h1>
      <div className="m-2 flex gap-3">
        <Image
          src={user.profileImageUrl}
          alt="Profile image"
          className="h-20 w-20 rounded-full border-2 border-indigo-200"
          width={80}
          height={80}
        />
        <input
          placeholder="Type something..."
          className="grow bg-transparent"
        />
      </div>
    </div>
  );
}
