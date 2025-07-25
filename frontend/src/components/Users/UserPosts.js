import React from "react";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const UserPosts = ({ posts }) => {
  return (
    <section className="relative py-24 bg-white">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
        }}
      />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="mx-auto mb-8 text-center md:max-w-5xl md:mb-16">
          <span className="inline-block px-2 py-px mb-4 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm">
            Your Posts
          </span>
          <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900">
            Top Posts [{posts?.length}]
          </h3>
          <p className="mb-10 text-lg font-medium md:text-xl text-coolGray-500">
              With our integrated CMS, you can manage your blogs in one secure platform.
          </p>
        </div>

        <div className="flex flex-wrap mb-12 -mx-4 md:mb-20">
          {posts?.map((post) => {
            return (
              <>
                <div className="w-full px-4 mb-8 md:w-1/2">
                  <a className="block mb-6 overflow-hidden rounded-md" href="#">
                    <img
                      className="w-full"
                      src={post?.image}
                      alt={post?.tile}
                    />
                  </a>
                  <div className="mb-4">
                    <a
                      className="inline-block px-3 py-1 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm hover:text-green-600 hover:bg-green-200"
                      href="#"
                    >
                      {post?.category?.name}
                    </a>
                    {/* Schedule post link */}
                    <Link
                      to={`/posts/schedule/${post?._id}`}
                      className="flex w-1/2 items-center px-6 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                    >
                      <FiCalendar className="mr-2" /> Schedule Post
                    </Link>
                  </div>
                  <p className="mb-2 font-medium text-coolGray-500">
                    {new Date(post?.createdAt).toDateString()}
                  </p>
                  <a
                    className="inline-block mb-4 text-2xl font-bold leading-tight md:text-3xl text-coolGray-800 hover:text-coolGray-900 hover:underline"
                    href="#"
                  >
                    {post?.title}
                  </a>
                  <p className="mb-6 text-lg font-medium text-coolGray-500">
                    {post?.content}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserPosts;
