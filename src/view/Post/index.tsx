import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";
import { api } from "../../config/api";
import { Post } from "../../type/post";
import { subText } from "../../helper";
import LoadingSpinner from "../../components/BaseLoading";
import CommentModal from "./Elelement/CommentModal";

const PostContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataPost, setDataPost] = useState<{
    list: Post.IList[];
    commentId: number;
    comments: Post.IComment[];
  }>({
    list: [],
    commentId: 0,
    comments: [],
  });

  const onSubmitComment = async (value: Post.IComment) => {
    setDataPost((prev) => {
      setIsOpenModal(false);
      return { ...prev, comments: prev.comments.concat(value) };
    });
  };

  const fetchPost = async () => {
    setIsLoading(true);
    const { data } = await api.get("/posts");
    setDataPost((prev) => ({ ...prev, list: data }));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderHeader = () => (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col md:gap-y-3 items-center">
        <span className="text-base font-semibold text-[#3e4784]">
          Custom Post Type UI
        </span>
        <span className="md:text-5xl text-4xl leading-[60px] text-[#101828] font-semibold tracking-tight md:pb-3 max-[875px]:m-[12px 0 16px 0]">
          Post
        </span>
      </div>
    </div>
  );

  const renderIcon = () => (
    <div className="flex gap-x-4 justify-center">
      <img
        src="/src/assets/image/icon-plus-circle.svg"
        width={30}
        className="cursor-pointer"
        alt="add comment"
        onClick={() => setIsOpenModal(true)}
      />
      <img
        onClick={() => setDataPost((prev) => ({ ...prev, commentId: 0 }))}
        src="/src/assets/image/icon-x-close-2.svg"
        width={30}
        className="cursor-pointer"
        alt="add comment"
      />
    </div>
  );

  const renderComment = () => (
    <>
      <div className="border-t w-full my-4" />
      <div className="flex flex-col overflow-hidden w-3/4 gap-y-4">
        {dataPost?.comments?.map((item) => (
          <div key={item.id}>
            <span className="text-[14px] font-bold leading-5 text-black">
              {item.email}
            </span>
            <div className=" text-gray-600 border p-2 rounded-md shadow-lg">
              {item.body}
            </div>
          </div>
        ))}
        {renderIcon()}
      </div>
    </>
  );

  const renderContentPost = (data: Post.IList) => (
    <div
      className="flex flex-col items-center border rounded-xl overflow-hidden py-4 shadow"
      key={data.id}
    >
      <img
        src="/src/assets/image/blog-computer.png"
        alt="data"
        className="cursor-pointer"
      />
      <span className="text-2xl leading-[32px] font-semibold text-[#101828] text-center cursor-pointer">
        {subText(data.title, 20)}
      </span>
      <span
        className="text-sm font-semibold text-[#3e4784] mt-2 px-[60px] cursor-pointer"
        onClick={() => onShowComment(data.id)}
      >
        {data.body}
      </span>
      {dataPost.commentId !== data.id && (
        <div
          className="flex gap-x-4 items-end cursor-pointer"
          onClick={() => onShowComment(data.id)}
        >
          <span className="text-sm text-black font-medium">view comments</span>
          <img
            src="/src/assets/image/enter.svg"
            width={30}
            className="cursor-pointer mt-4"
          />
        </div>
      )}
      {data.id === dataPost.commentId && renderComment()}
    </div>
  );

  const onShowComment = async (id: number) => {
    setIsLoading(true);
    const { data } = await api.get(`/posts/${id}/comments`);
    setDataPost((prev) => ({ ...prev, commentId: id, comments: data }));
    setIsLoading(false);
  };

  return (
    <div className="md:mt-[176px] mt-[148px] md:px-[112px] md:mb-[96px] max-[875px]:px-4 flex flex-col w-full">
      {renderHeader()}
      <div className="grid md:grid-cols-3 gap-y-12 md:gap-y-16 md:gap-x-16 mt-10">
        {dataPost?.list?.map((item) => (
          <LazyLoad key={item.id} threshold={1}>
            {renderContentPost(item)}
          </LazyLoad>
        ))}
        {(dataPost?.list.length === 0 || isLoading) && <LoadingSpinner />}
      </div>
      <CommentModal
        isOpen={isOpenModal}
        onSubmit={onSubmitComment}
        onClose={() => setIsOpenModal(false)}
        id={dataPost.commentId}
      />
    </div>
  );
};

export default PostContainer;
