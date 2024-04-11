import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <Card
        className="py-4 px-2 h-full shadow-md  hover:border-1 border-1  duration-300  hover:border-blue-500"
        style={{
          background: "linear-gradient(to top, #c9c9c975, #fff)",
        }}
      >
        <CardBody className="overflow-visible flex align-middle justify-center py-2 h-4/5 ">
          <div className="flex align-middle justify-center w-full h-full">
            <Image
              alt={title}
              className="object-cover w-full rounded-xl h-full"
              src={appwriteService.getFilePreview(featuredImage)}
              width={270}
            />
          </div>
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center h-1/5">
          <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default PostCard;
