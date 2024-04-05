import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonComp } from "../components";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const navigation = useNavigation()
  const userStatus = useSelector((state) => state.auth.status);
  const userData = userStatus
    ? useSelector((state) => state.auth.userData)
    : [];
  const posts = useSelector((state) => state.posts.allPosts).filter(
    (post) => post.userId === userData.$id
  );

  console.log("userdata", userData);
  console.log("post", posts);
  console.log(
    "userPosts",
    useSelector((state) => state.posts.allPosts).filter(
      (post) => post.userId === userData.$id
    )
  );

  if (!userStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
          <p className="text-lg text-gray-700 mb-2">
            Explore a variety of articles on different topics written by our
            talented authors.
          </p>
          <p className="text-red-500 mb-1">Login/signUp to read blogs</p>
          <div className="flex gap-2 justify-center align-middle">
            <ButtonComp
              onClick={() => navigation("/login")}
              bgColor="bg-blue-500"
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-0"
            >
              Log In
            </ButtonComp>

            <ButtonComp
              onClick={() => navigation("/signup")}
              bgColor="bg-green-500"
              className="hover:bg-green-700 text-white font-bold py-2 rounded mr-0"
            >
              Sign Up
            </ButtonComp>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex m-auto align-middle justify-center w-[70%] aspect-video  h-full">
            <div className="bg-white w-full h-full flex justify-center align-middle  rounded-lg">
              <Link
                to="/add-post"
                className="flex justify-center duration-200 items-center w-full flex-col p-4 rounded-lg border border-blue-200 hover:border-blue-300 hover:bg-gray-50 rotate-on-hover-parent"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-500 mr-2 duration-200 rotate-on-hover-child "
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-blue-500 duration-200 hover:font-normal font-bold hover:underline">
                  Add Post
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
