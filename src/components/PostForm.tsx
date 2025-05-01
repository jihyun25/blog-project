import React, { useCallback, useContext, useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "types/post";
import { CategoryType } from "types/category";
import { CATEGORIES } from "./PostList";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);
  const [category, setCategory] = useState<CategoryType>("");
  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (post && post.id) {
          // 만약 post 데이터가 있다면, firestore로 데이터 수정
          const postRef = doc(db, "posts", post.id);
          await updateDoc(postRef, {
            title: title,
            summary: summary,
            content: content,
            updatedAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            category: category,
          });

          toast?.success("게시글을 수정했습니다.");
          navigate(`/posts/${post.id}`);
        } else {
          await addDoc(collection(db, "posts"), {
            title: title,
            summary: summary,
            content: content,
            createAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            email: user?.email,
            uid: user?.uid,
            category: category,
          });

          toast?.success("게시글을 생성했습니다.");
          navigate("/");
        }
      } catch (e: any) {
        console.log(e);
        toast?.error(e?.code);
      }
    },
    [category, content, navigate, post, summary, title, user?.email, user?.uid]
  );

  const onChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const {
        target: { name, value },
      } = e;

      if (name === "title") {
        setTitle(value);
      }

      if (name === "summary") {
        setSummary(value);
      }

      if (name === "content") {
        setContent(value);
      }

      if (name === "category") {
        setCategory(value as CategoryType);
      }
    },
    []
  );

  const getPost = useCallback(async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  }, []);

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [getPost, params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="category">카테고리</label>
        <select name="category" id="category" onChange={onChange}>
          <option value="">카테고리를 선택해주세요.</option>
          {CATEGORIES?.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        ></textarea>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
}
