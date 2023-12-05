import { Post } from "../../../type/post";
import BaseModal from "../../../components/BaseModal";
import { api } from "../../../config/api";
import { FC, useState } from "react";

interface ICommentModal {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (value: Post.IComment) => void;
  id: number;
}

const CommentModal: FC<ICommentModal> = ({ isOpen, onClose, onSubmit, id }) => {
  const [values, setValues] = useState({ name: "", email: "", body: "" });

  const renderButtonGroup = () => (
    <div className="flex flex-col-reverse md:flex-row justify-end gap-3 px-4 pb-4 md:px-6 md:pb-6">
      <button
        className="bg-white py-2.5 px-4 rounded-lg border text-sm leading-5 md:basis-1/2"
        onClick={onClose}
      >
        <span className="text-sm font-[600] text-gray-700">Cancel</span>
      </button>
      <button
        type="submit"
        className="bg-[#7F56D9] py-2.5 px-4 rounded-lg border text-sm leading-5 md:basis-1/2"
      >
        <span className="text-sm font-[600] text-white bg-transparent">
          Submit
        </span>
      </button>
    </div>
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("comments", {
        postId: id,
        ...values,
      });

      console.log("Comment added:", response.data);
      onSubmit?.(response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add Comment</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="body"
          >
            Comment:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="body"
            name="body"
            value={values.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-end">
          {renderButtonGroup()}
        </div>
      </form>
    </BaseModal>
  );
};

export default CommentModal;
