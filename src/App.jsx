import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { setPosts } from "./store/postsSlice";
import useUploadPosts from "./hooks/useUploadPosts";
import { Spinner } from "@nextui-org/react";
// import uploadPosts from "./hooks/uploadPosts";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //  async function uploadPosts(){
  //   const posts = await appwriteService.getPosts([]);
  //   await dispatch(setPosts(posts.documents));
  //   return
  // }

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          useUploadPosts(dispatch);
        } else {
          dispatch(logout());
          return;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
      <div className="w-full block relative ">
        <Header />
        <main className="min-h-screen flex align-middle justify-center py-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className=" w-full h-screen grid items-center ">
      <div className="m-auto">
        <Spinner size="lg" />
      </div>
    </div>
  );
}

export default App;
