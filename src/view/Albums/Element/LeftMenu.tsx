import { useEffect, useState } from "react";
import iconSidebar from "../../../assets/image/icon-sidebar.svg";
import iconClose from "../../../assets/image/icon-x-close-2.svg";
import { Albums } from "src/type/albums";
import { api } from "../../../config/api";
import LazyLoad from "react-lazy-load";

const LeftMenu = ({ onClick }: { onClick: (id: number) => void }) => {
  const [isHideMenu, setIsHideMenu] = useState(true);
  const [listAlbum, setListAlbum] = useState<Albums.IList[]>([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const { data } = await api.get("albums");
    setListAlbum((prev) => prev.concat(data));
  };

  return (
    <>
      <div className="dark:bg-gray-800 text-white w-full md:w-[300px] p-4 shadow-md overflow-auto border rounded-lg md:h-screen">
        <div className="flex justify-between bg-transparent items-baseline">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 bg-transparent">
            List Album
          </h1>
          <img
            src={isHideMenu ? iconClose : iconSidebar}
            onClick={() => setIsHideMenu((prev) => !prev)}
            width={20}
            className="cursor-pointer bg-transparent block"
          />
        </div>
        {isHideMenu && (
          <ul className={`space-y-2 font-medium border-t mb-4`}>
            {listAlbum.map((item) => (
              <LazyLoad key={item.id} threshold={1}>
                <li key={item.id}>
                  <a
                    onClick={() => onClick(item.id)}
                    className="flex mt-3 cursor-pointer items-center p-2 rounded-lg font-bold border bg-blue-400 hover:bg-blue-500 shadow text-white hover:text-yellow-200"
                  >
                    <span className="ms-3 bg-transparent">{item.title}</span>
                  </a>
                </li>
              </LazyLoad>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default LeftMenu;
