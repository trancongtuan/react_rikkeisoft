import { FC } from "react";
import IconReact from "../assets/react.svg";
import { Link, useLocation } from "react-router-dom";

interface HeaderLayoutProps {
  links: {
    href: string;
    text: string;
  }[];
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ links }) => {
  const { pathname } = useLocation();

  const getLinkClassName = (linkHref: string) => {
    const isActive = pathname === linkHref;

    return `leading-6 font-semibold text-base ${
      isActive ? "text-[#7F56D9]" : "text-[#475467]"
    } rounded-lg py-2 border-none transition-colors ease-linear`;
  };

  const renderLinksMenu = (): JSX.Element => (
    <nav className="bg-white border-gray-200 ml-[50px] mr-[50px] w-full">
      <ul className="flex whitespace-nowrap flex-nowrap items-center max-w-screen-xl mx-auto py-7 pr-4 w-full">
        {links?.map((link) => (
          <li key={link.href} className="mr-8 last:mr-0">
            <Link to={link.href}>
              <span className={getLinkClassName(link.href)}>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <header className="bg-white md:px-[80px] shadow h-[80px] flex items-center justify-between w-full fixed top-0">
      <div className="px-8 flex items-center w-full">
        <div className="flex items-center cursor-pointer w-max">
          <img src={IconReact} alt="logo" />
          <span className="leading-6 font-semibold md:text-[21px] text-black ml-2 -tracking-[.02em] whitespace-nowrap">
            Test Project
          </span>
        </div>
        {renderLinksMenu()}
      </div>
    </header>
  );
};

export default HeaderLayout;
