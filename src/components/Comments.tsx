import React, { useCallback, useContext, useState } from "react";

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CommentsInterface } from "types/comment";
import { PostProps } from "types/post";

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (post && post?.id) {
          const postRef = doc(db, "posts", post.id);

          if (user?.uid) {
            const commentObj = {
              content: comment,
              uid: user.uid,
              email: user.email,
              createAt: new Date()?.toLocaleDateString("ko", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            };

            await updateDoc(postRef, {
              comments: arrayUnion(commentObj),
              updateDated: new Date()?.toLocaleDateString("ko", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }),
            });

            // 문서 업데이트
            await getPost(post.id);
          } else {
            navigate("/login");
          }
        }

        toast.success("댓글을 생성했습니다.");
        setComment("");
      } catch (e: any) {
        console.log(e);
        toast.error(e?.code);
      }
    },
    [comment, getPost, navigate, post, user?.email, user?.uid]
  );

  const handleDeleteComment = useCallback(
    async (data: CommentsInterface) => {
      const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

      if (confirm && post.id) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast.success("댓글을 삭제했습니다.");
        // 문서 업데이트
        await getPost(post.id);
      }
    },
    [getPost, post.id]
  );

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">
            댓글 ({post.comments ? post.comments.length : "0"})
          </label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {post?.comments &&
          post?.comments
            ?.slice(0)
            ?.reverse()
            ?.map((comment) => {
              const date = comment.createAt.match(
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
                <div key={comment.createAt} className="comment__box">
                  <div className="comment__profile-box">
                    <div className="comment__email">{comment?.email}</div>
                    <div className="comment__date">{formattedDate}</div>
                  </div>
                  <div className="comment__text">{comment?.content}</div>
                  {comment.uid === user?.uid && (
                    <div
                      className="comment__delete"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      삭제
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
