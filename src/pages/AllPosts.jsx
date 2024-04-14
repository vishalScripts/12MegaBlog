import React from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const postData = Array.from(useSelector((state) => state.posts.allPosts));

  return (
    <div className="py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {postData.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
