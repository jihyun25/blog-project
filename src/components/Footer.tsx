import { Link } from "react-router-dom";
import { RxGithubLogo } from "react-icons/rx";
import { IoIosDocument } from "react-icons/io";
import { RiNpmjsFill } from "react-icons/ri";
import logo from "../assets/img/logo.png";

export default function Footer() {
  const RxGithubLogoIcon = RxGithubLogo as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const IoIosDocumentIcon = IoIosDocument as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const RiNpmjsFillIcon = RiNpmjsFill as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <footer>
      <div className="footer__logo">
        <Link to="/" className="header__logo">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="footer__content">
        <div>이 블로그는 React, Firebase를 이용해 만들었습니다</div>
        <div>Copyright © 2025 이지현</div>
      </div>
      <div className="footer__Link">
        <div>
          <Link to="/">
            <IoIosDocumentIcon />
            Blog
          </Link>
        </div>
        <div>
          <a href="https://github.com/jihyun25/">
            <RxGithubLogoIcon />
            GitHub
          </a>
        </div>
        <div>
          <a href="https://www.npmjs.com/~jh25">
            <RiNpmjsFillIcon />
            Npm
          </a>
        </div>
      </div>
    </footer>
  );
}
