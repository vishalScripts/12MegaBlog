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
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  console.log("isAuthor", isAuthor);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        useUploadPosts(dispatch);
        navigate("/");
      }
    });
  };
  console.log(post);
  console.log();

  return post ? (
    <div className="py-8 shadow-2xl rounded-xl">
      <Container>
        <div className="w-full  flex justify-center mb-4 relative border rounded-xl aspect-w-2 aspect-h-1">
          <div className="relative">
            <Image
              isZoomed
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>

          {isAuthor && (
            <div className="absolute flex flex-wrap-reverse gap-1  z-50 right-6 top-6">
              <Link>
                <ButtonComp
                  bgColor="bg-green-500"
                  className="mr-3"
                  onClick={() => navigate(`/edit-post/${post.$id}`)}
                >
                  Edit
                </ButtonComp>
              </Link>
              <ButtonComp bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </ButtonComp>
            </div>
          )}
        </div>
        <div className="w-full ">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
        <div>
          <p>
            <span className="font-semibold">Admin:- </span>
            {userData.name}
          </p>
        </div>
      </Container>
    </div>
  ) : null;
}
