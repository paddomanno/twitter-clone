import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import PostView from "~/components/PostView";

import { api } from "~/utils/api";
import CreatePostForm from "../components/CreatePostForm";

const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Failed to load</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-indigo-200 md:max-w-5xl">
          <div className="border-b border-indigo-200 p-4">
            {!user.isSignedIn ? (
              <>
                <h1> Not logged in </h1>
                <SignInButton />
              </>
            ) : (
              <>
                <h1> Logged in as {user.user?.firstName} </h1>
                <SignOutButton />
              </>
            )}
          </div>
          <CreatePostForm />
          <div>
            {data?.map((postWithAuthor) => (
              <PostView {...postWithAuthor} key={postWithAuthor.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
