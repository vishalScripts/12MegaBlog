import React from 'react'
import { setPosts } from "../store/postsSlice";
import appwriteService from "../appwrite/config"


async function uploadPosts(dispatch) {
  try {
    const posts = await appwriteService.getPosts([]);

    dispatch(setPosts(posts.documents));
    return true;
  } catch (error) {
    console.error("Error uploading posts:", error);
    return false;
  }
}

export default uploadPosts

