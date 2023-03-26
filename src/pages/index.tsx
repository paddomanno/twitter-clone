import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import LoadingPage from "~/components/LoadingSpinner";
import { PageLayout } from "~/components/MyLayout";
import PostView from "~/components/PostView";

import { api } from "~/utils/api";
import CreatePostForm from "../components/CreatePostForm";

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>Failed to load</div>;

  return (
    <div className="mx-2 flex flex-col gap-2">
      {data?.map((postWithAuthor) => (
        <PostView {...postWithAuthor} key={postWithAuthor.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // call query to fetch as early as possible
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="pt-4 shadow-inner shadow-black/50">
        <nav className="inline-flex w-full items-center justify-start gap-4 border-b border-black/50 p-4 ">
          {!isSignedIn ? (
            <>
              <SignInButton>
                <button className="rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:shadow-md hover:shadow-white/80 focus:outline-none focus:ring-4 focus:ring-pink-200">
                  Sign In
                </button>
              </SignInButton>
              <span> Not logged in </span>
            </>
          ) : (
            <>
              <SignOutButton>
                <button className="rounded-lg border-2 border-slate-200 bg-indigo-900  px-5 py-2.5 text-center text-sm font-medium text-white transition hover:shadow-md hover:shadow-white/80 focus:outline-none focus:ring-4 focus:ring-pink-200">
                  Sign Out
                </button>
              </SignOutButton>
              <span>
                {`Logged in as 
                  ${
                    user.firstName && user.firstName.length > 0
                      ? user.firstName
                      : user.username
                  }`}
              </span>
            </>
          )}
        </nav>
        <CreatePostForm />
        <div className="my-2 border-b border-black/50"></div>
        <Feed />
      </div>
    </PageLayout>
  );
};

export default Home;
