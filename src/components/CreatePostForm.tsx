import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function CreatePostForm() {
  const { user } = useUser();

  const ctx = api.useContext();

  const [input, setInput] = useState("");
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
  });

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
        <textarea
          cols={64}
          rows={4}
          placeholder="Type something..."
          className="grow bg-transparent p-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button
          onClick={() => mutate({ content: input })}
          disabled={isPosting}
          className="group m-2 h-16 w-28 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-center text-sm font-medium transition hover:scale-110 focus:scale-95 focus:outline-none focus:ring-1 focus-visible:ring-slate-100 disabled:from-gray-800/30 disabled:to-gray-900/20 "
        >
          <span className="relative inline-flex h-full w-full items-center justify-center rounded-2xl bg-indigo-700 transition-all duration-150 ease-in group-hover:bg-opacity-0 group-focus:bg-opacity-0 group-disabled:bg-opacity-0">
            Post
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
