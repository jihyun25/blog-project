import ThemeContext from "context/ThemeContext";
import React, { useCallback, useContext, useRef } from "react";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

export default function Header() {
  const headerMenuRef = useRef<HTMLDivElement | null>(null);
  const context = useContext(ThemeContext);
  const SunIcon = BsSun as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const MoonIcon = BsMoonFill as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const onClickOpenMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (headerMenuRef.current) {
        if (headerMenuRef.current.classList.contains("open")) {
          e.currentTarget.classList.remove("open");
          headerMenuRef.current.classList.remove("open");
        } else {
          e.currentTarget.classList.add("open");
          headerMenuRef.current.classList.add("open");
        }
      }
    },
    []
  );

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="" />
      </Link>

      <div className="header__menu__wrap">
        <div className="header__dark_theme">
          <div className="dark__theme">
            {context.theme === "light" ? (
              <SunIcon
                onClick={context.toggleMode}
                className="dark__theme-btn"
              />
            ) : (
              <MoonIcon
                onClick={context.toggleMode}
                className="dark__theme-btn"
              />
            )}
          </div>
          <button className="header__menu__btn" onClick={onClickOpenMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="header__menu" ref={headerMenuRef}>
          <Link to="/posts/new">글쓰기</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/profile">프로필</Link>
        </div>
      </div>
    </header>
  );
}
