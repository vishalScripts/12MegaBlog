import React, { useEffect } from "react";
import { deletePosts } from "../store/postsSlice";

async function useDeletePosts(dispatch) {
  dispatch(deletePosts())
}

export default useDeletePosts;
