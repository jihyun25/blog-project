import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryType, TabType } from "types/category";
import { PostProps } from "types/post";

export const CATEGORIES: CategoryType[] = ["Frontend", "Backend", "Code Test"];

export interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = useCallback(async () => {
    setPosts([]);

    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      // 나의 글 필터링
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createAt", "desc")
      );
    } else if (activeTab === "all") {
      // 모든 글 보여주기
      postsQuery = query(postsRef, orderBy("createAt", "desc"));
    } else {
      // 카테고리 글 보여주기
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createAt", "desc")
      );
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  }, [activeTab, user]);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirm = window.confirm("해당 게시글을 삭제하시겠습니다?");

      if (confirm && id) {
        await deleteDoc(doc(db, "posts", id));
        toast.success("게시글을 삭제했습니다.");
        getPosts(); // 변경된 post 리스트를 다시 가져옴
      }
    },
    [getPosts]
  );

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation__wrap">
          <div className="post__navigation">
            <div
              role="presentation"
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "post__navigation--active" : ""}
            >
              전체
            </div>
            <div
              role="presentation"
              onClick={() => setActiveTab("my")}
              className={activeTab === "my" ? "post__navigation--active" : ""}
            >
              나의 글
            </div>
            {CATEGORIES?.map((category) => {
              return (
                <div
                  key={category}
                  role="presentation"
                  onClick={() => setActiveTab(category)}
                  className={
                    activeTab === category ? "post__navigation--active" : ""
                  }
                >
                  {category}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="post__list">
        {Array.isArray(posts) && posts?.length > 0 ? (
          posts.map((post, index) => {
            const date = post.createAt.match(
              /(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/
            );
            let formattedDate;

            if (date) {
              const year = date[1];
              const month = String(date[2]).padStart(2, "0");
              const day = String(date[3]).padStart(2, "0");

              const dashDate = `${year}-${month}-${day}`;

              formattedDate = new Date(dashDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            } else {
              formattedDate = "";
              console.log("날짜 형식을 인식할 수 없습니다.");
            }

            return (
              <div key={post?.id} className="post__box">
                <Link to={`/posts/${post?.id}`}>
                  <div className="post__title">{post?.title}</div>
                  <div className="post__text">{post?.summary}</div>
                  <div className="post__profile-box">
                    {/* <div className="post__author-name">{post?.email}</div> */}
                    {formattedDate.length > 0 && (
                      <div className="post__date">{formattedDate}</div>
                    )}
                    {post.category && post.category.length > 0 && (
                      <div className="post__category">{post.category}</div>
                    )}
                  </div>
                </Link>
                {post?.email === user?.email && (
                  <div className="post__utils-box">
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={() => handleDelete(post.id as string)}
                    >
                      삭제
                    </div>
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
