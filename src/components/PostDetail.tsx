import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Comments from "./Comments";
import AuthContext from "context/AuthContext";
import { PostProps } from "types/post";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const date = useMemo(
    () => post?.createAt.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/),
    [post?.createAt]
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

  const getPost = useCallback(async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  }, []);

  const handleDelete = useCallback(async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니다?");

    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  }, [navigate, post]);

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [getPost, params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__date">{formattedDate}</div>
              <div className="post__title">{post?.title}</div>
              <div className="post__profile-box">
                <div className="post__author-name">{post?.email}</div>
                {post?.email === user?.email && (
                  <div className="post__utils-box">
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={handleDelete}
                    >
                      삭제
                    </div>
                    <div className="post__edit">
                      <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="post__text post__text--pre-wrap">
                {post?.content}
              </div>
            </div>
            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
