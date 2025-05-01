import Header from "components/Header";
import Footer from "components/Footer";
import PostList from "components/PostList";
import MainBanner from "components/MainBanner";

export default function Home() {
  return (
    <>
      <Header />
      <MainBanner />
      <PostList />
      <Footer />
    </>
  );
}
