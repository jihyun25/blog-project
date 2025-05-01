import { Navigate, Route, Routes } from "react-router-dom";
import Home from "pages/home";
import PostList from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";
import ProtectedRoute from "./ProtectedRoute";

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/new"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PostNew />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/edit/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PostEdit />
          </ProtectedRoute>
        }
      />

      {/* 나머지는 홈으로 이동 */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
