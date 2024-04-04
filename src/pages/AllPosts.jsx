import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   appwriteService.getPosts([]).then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //       console.log(posts);
  //     }
  //   });
  // }, []);

  const postData = Array.from(useSelector((state) => state.posts.allPosts));
  console.log(postData);

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {postData.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
