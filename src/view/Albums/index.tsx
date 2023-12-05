import { useState } from "react";
import LeftMenu from "./Element/LeftMenu";
import { Albums } from "src/type/albums";
import { api } from "../../config/api";
import LazyLoad from "react-lazy-load";

const AlbumsContainer = () => {
  const [listPhoto, setListPhoto] = useState<Albums.IPhoto[]>([]);
  const [idPhoto, setIdPhoto] = useState(0);

  const handleSearch = (value: string) => {
    if (value) {
      setListPhoto((prev) => prev.filter((item) => item.title.includes(value)));
    } else {
      showAlbumsPhoto(idPhoto);
    }
  };

  const showAlbumsPhoto = async (id: number) => {
    setIdPhoto(id);
    const { data } = await api.get(`photos?albumId=${id}`);
    setListPhoto(data);
  };
  const renderContennt = (item: Albums.IPhoto) => (
    <>
      <img src={item.url} alt={item.title} className="w-full" />
      <span className="text-black">{item.title}</span>
    </>
  );

  return (
    <div className="mt-[80px] flex max-[875px]:flex-col w-full">
      <LeftMenu onClick={showAlbumsPhoto} />
      <div className="flex flex-col w-full">
        <div className="flex gap-x-3 mt-4 items-center justify-center w-full">
          <span className="block text-gray-700 text-sm font-bold ">
            search image
          </span>
          <input
            disabled={!idPhoto}
            onChange={({ target: { value } }) => {
              handleSearch(value);
            }}
            className="shadow disabled:bg-gray-200 disabled:cursor-not-allowed appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="grid md:grid-cols-4 gap-4 p-4">
          {listPhoto.map((item) => (
            <LazyLoad threshold={1} key={item.id}>
              {renderContennt(item)}
            </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumsContainer;
