"use client";

import { assets, blog_data } from "@/assets/assets";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const Page = ({ params: { id } = { id: "1" } }) => {
  // safer
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("No id provided");
        }

        const foundData = blog_data.find((item) => item.id === Number(id));

        if (!foundData) {
          throw new Error(`No data found for id: ${id}`);
        }

        setData(foundData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading blog post...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error}
        <br />
        <Link href="/" className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Return Home
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        Blog post not found
        <br />
        <Link href="/" className="mt-4 px-4 py-2 bg-gray-200 rounded">
          View All Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt="logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] ">
            Get started <Image src={assets.arrow} alt="get-started" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.author_img}
            alt="author"
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />{" "}
          {/*how did this get centered with these properties? */}
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt="image"
        />
        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            Share this on social media
          </p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} alt="facebook" width={35} />
            <Image src={assets.googleplus_icon} alt="googleplus" width={35} />
            <Image src={assets.twitter_icon} alt="twitter" width={35} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
