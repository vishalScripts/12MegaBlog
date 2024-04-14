import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { ButtonComp, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Image } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import useUploadPosts from "../hooks/useUploadPosts";

export default function Post() {
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [fullImg, setFullImg] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [postId, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        useUploadPosts(dispatch);
        navigate("/");
      }
    });
  };

  const handleImageClick = () => {
    if (post) {
      setFullImg((prevState) => !prevState);
    }
  };

  const handleMouseEnter = () => {
    setImgHover(true);
  };

  const handleMouseLeave = () => {
    setImgHover(false);
  };

  return post ? (
    <div className="py-8 shadow-2xl rounded-xl flex items-center justify-center">
      <Container>
        <div
          className={`w-full h-full flex flex-wrap flex-row items-center justify-center ${
            fullImg ? "blur-lg" : ""
          }`}
        >
          <div className="w-[68%] text-left flex justify-center flex-col mr-2">
            <div className="w-full ">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
              {post.content ? parse(post.content) : null}
            </div>
            {isAuthor && (
              <div className="flex flex-wrap-reverse gap-2 z-50 mt-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <ButtonComp bgColor="bg-green-500" className="mr-3">
                    Edit
                  </ButtonComp>
                </Link>
                <ButtonComp bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </ButtonComp>
              </div>
            )}
          </div>
          <div
            className="w-[30%] h-[30%] flex justify-center mb-4 relative border rounded-xl aspect-w-2 aspect-h-1 cursor-pointer"
            onClick={handleImageClick}
          >
            <div
              className="relative "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-full h-full bg-transparent hover:bg-slate-300 duration-300 hover:bg-opacity-40 absolute top-0 left-0 z-20 flex items-center justify-center border rounded-xl">
                {imgHover ? (
                  <svg
                    fill=""
                    height="40px"
                    width="40px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 242.133 242.133"
                    xml:space="preserve"
                    className="hover:scale-105 hover:bg-blue-200 p-2 rounded-md duration-250"
                  >
                    <path
                      id="XMLID_15_"
                      d="M227.133,83.033c8.283,0,15-6.716,15-15V15c0-8.284-6.717-15-15-15H174.1c-8.284,0-15,6.716-15,15
	s6.716,15,15,15h16.82l-69.854,69.854L51.213,30h16.82c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.717,0,0,6.716,0,15v53.033
	c0,8.284,6.717,15,15,15c8.285,0,15-6.716,15-15v-16.82l69.854,69.854L30,190.92V174.1c0-8.284-6.715-15-15-15
	c-8.283,0-15,6.716-15,15v53.033c0,8.284,6.717,15,15,15h53.033c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15h-16.82
	l69.854-69.854l69.854,69.854H174.1c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h53.033c8.283,0,15-6.716,15-15V174.1
	c0-8.284-6.717-15-15-15c-8.285,0-15,6.716-15,15v16.82l-69.854-69.854l69.854-69.854v16.82
	C212.133,76.317,218.848,83.033,227.133,83.033z"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>

              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-contain rounded-xl w-full h-full"
              />
            </div>
          </div>
        </div>
        {fullImg ? (
          <div className="bg-gray-400 duration-200 shadow-2xl bg-opacity-35 w-[95%] top-4 h-[95%]  left-[2.5%]  z-[99] fixed border rounded-xl border-gray-400 border-solid-1 flex items-center justify-center backdrop-blur-lg">
            <div className="w-[90%] h-[90%] flex items-center justify-center">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="object-contain rounded-xl w-auto h-full"
              />
            </div>
            <div
              className="top-3 hover:bg-blue-900 hover:bg-opacity-20 right-3 duration-700 absolute cursor-pointer w-[2%] aspect-square rounded-md flex items-center justify-center "
              onClick={handleImageClick}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-500 duration-200 rotate-on-hover-child rotate-45 hover:-rotate-45  "
              >
                <path
                  d="M4 12H20M12 4V20"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  ) : null;
}
