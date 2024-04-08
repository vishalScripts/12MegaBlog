import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  const [characterCount, setCharacterCount] = useState(defaultValue.length);

  useEffect(() => {
    // Update character count when defaultValue changes
    setCharacterCount(defaultValue.length);
  }, [defaultValue]);

  const handleEditorChange = (content, editor) => {
    const newCharacterCount = content.length;
    setCharacterCount(newCharacterCount);
  };

  return (
    <div className="w-full relative">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceApiKey}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "letters",
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "letters | undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
            }}
            onEditorChange={(content, editor) => {
              onChange(content); // Update react-hook-form value
              handleEditorChange(content, editor); // Update character count
            }}
          />
        )}
      />
      <p
        className={`absolute bottom-[25.75rem] w-[20%] text-center right-2  ${
          characterCount > 500
            ? "text-red-500 border-red-500"
            : "text-[#222f3e]"
        }  text-base font-medium  border-1 border-solid border-b-0 px-2 border-[#e3e3e3] z-50`}
      >
        {characterCount > 500 ? "!" : ""} {characterCount} / 500
      </p>
    </div>
  );
};

export default RTE;
