import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", error = null, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
          {error && (
            <p role="alert" className="text-red-600 italic">
              {error.message || "This field is required"}
            </p>
          )}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${
          error ? "border-red-400" : "border-gray-200"
        } w-full ${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default Input;
