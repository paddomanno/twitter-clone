import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Link from "next/link";
import LoadingPage from "~/components/LoadingSpinner";
import { PageLayout } from "~/components/MyLayout";
import PostList from "~/components/PostList";

import { api } from "~/utils/api";
import CreatePostForm from "../components/CreatePostForm";

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>Failed to load</div>;

  return <PostList posts={data} />;
};

const Home: NextPage = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // call query to fetch as early as possible
  api.posts.getAll.useQuery();

  if (!user || !userLoaded) return <div />;

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
              <div className="inline-flex flex-1 flex-row justify-end gap-2">
                <span>
                  {`Hey there, ${
                    user.firstName && user.firstName.length > 0
                      ? user.firstName
                      : user.username || ""
                  }!`}
                </span>
                <Link href={`/@${user.username || ""}`}>
                  <span className="underline underline-offset-2">
                    My profile
                  </span>
                </Link>
              </div>
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
