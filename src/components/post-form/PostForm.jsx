import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonComp, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useUploadPosts from "../../hooks/useUploadPosts";
import { setPosts } from "../../store/postsSlice";

export default function PostForm({ post }) {
  const [rteError,setRteError] = useState("")
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const rteRef = useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const submit = async (data) => {
    if (data.content === "") {
      setRteError("Minimum content should be five letters");
      return
    }else if (data.content.length > 500) {
      setRteError("Maximum content should be 254 letters");
      return;
    }
    setDisabled(true);
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          appwriteService.deleteFile(post.featuredImage);
        }

        // data.$id = data.slug

        // console.log(data)
        // const dbPost = await appwriteService.updatePost(post.$id, {
        //   ...data,
        //   featuredImage: file ? file.$id : undefined,
        // });

        // console.log(file);
        // const fileId = file ? file.$id : post.featuredImage;
        // data.featuredImage = fileId;
        const delPost = await appwriteService.deletePost(post.$id);

        if (delPost) {
          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file ? file.$id : post.featuredImage,
            title: capitalizeFirstLetter(data.title),
            userId: userData.$id,
          });

          if (dbPost) {
            console.log({ ...data });
            console.log("slug----------------", data.slug);
            console.log("db post-----------------", dbPost.$id);
            if (delPost) {
              appwriteService
                .getPosts([])
                .then((posts) => {
                  if (posts) {
                    // dispatch(addPosts(posts.documents));
                    useUploadPosts(dispatch);
                    return true;
                  }
                })
                .catch((error) => {
                  console.error("Error fetching posts:", error);
                  return false;
                });
            } else console.log("error is deliting the post while updating");
          }
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          console.log("uploading");
          const fileId = file.$id;
          console.log("uploaded");
          data.featuredImage = fileId;
          console.log("User id ", userData);
          console.log(data)
          const dbPost = await appwriteService.createPost({
            ...data,
            title: capitalizeFirstLetter(data.title),
            userId: userData.$id,
          });

          console.log(dbPost);

          if (dbPost) {
            useUploadPosts(dispatch);
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: "*Title is required" })}
          error={errors.title}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: "*Slug is required" })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          error={errors.slug}
        />
        <p role="alert" className="text-red-600 italic">
          {rteError}
        </p>
        <RTE
          label="Content :"
          name="content"
          control={control}
          ref={rteRef}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        {/* <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          error={errors.image}
        /> */}

        {post ? (
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
            error={errors.image}
          />
        ) : (
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: "*Image is required" })}
            error={errors.image}
          />
        )}

        {post && (
          <div className="w-full mb-4 h-4/6">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg object-cover  w-full h-full"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <div id="btn-div" className="flex align-middle justify-center w-full">
          <ButtonComp
            type="submit"
            className="w-64"
            bgColor={post ? "bg-green-500" : undefined}
            disabled={disabled}
          >
            {post
              ? disabled
                ? "Updating"
                : "Update"
              : disabled
              ? "Submiting"
              : "Submit"}
          </ButtonComp>
        </div>
      </div>
    </form>
  );
}
