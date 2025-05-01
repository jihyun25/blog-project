import { IoDocumentTextOutline } from "react-icons/io5";

export default function MainBanner() {
  const IoDocumentTextOutlineIcon =
    IoDocumentTextOutline as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="main__banner">
      <div className="main__banner__icon">
        <IoDocumentTextOutlineIcon />
      </div>
      <h1>codiary25</h1>
    </div>
  );
}
