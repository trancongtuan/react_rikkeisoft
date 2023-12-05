import { FC } from "react";

interface BaseTabTitleProps {
  list: { name: string; id: number }[];
  onClick: (_item: number) => void;
  activeTab: number;
}

const BaseTabTitle: FC<BaseTabTitleProps> = ({ list, onClick, activeTab }) => {
  return (
    <div className="flex gap-x-4 mt-6">
      {list?.map((label) => (
        <span
          key={label.id}
          onClick={() => onClick(label.id)}
          className={`leading-5 font-semibold text-sm px-1 cursor-pointer ${
            activeTab === label.id
              ? `border-b-2 border-[#6941c6] pb-[10px] text-[#6941c6] ${
                  label.id === 0 ? "" : "text-[#667085]"
                }`
              : "text-[#667085]"
          }`}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};

export default BaseTabTitle;
