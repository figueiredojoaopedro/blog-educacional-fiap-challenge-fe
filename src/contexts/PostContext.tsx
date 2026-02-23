import React, { createContext, useContext, useState, useCallback } from "react";
import type { Post } from "../types";
import api from "../services/api";

interface PostContextData {
  posts: Post[];
  loading: boolean;
  getPosts: (search?: string) => Promise<void>;
  getPost: (id: string) => Promise<Post | undefined>;
  createPost: (
    post: Omit<Post, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextData>({} as PostContextData);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async (search?: string) => {
    setLoading(true);
    try {
      const response = await api.get("/posts", { params: { search } });
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      // For testing/initial setup, use mock data if API fails
      setPosts([
        {
          id: "1",
          title: "Bem-vindo ao Blog FIAP",
          summary: "Este é o primeiro post do blog educacional.",
          content: "Conteúdo completo do post de boas-vindas.",
          author: "Prof. João",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "React Hooks na prática",
          summary: "Aprenda a usar hooks básicos.",
          content: "Neste post vamos explorar useState e useEffect.",
          author: "Prof. Maria",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPost = async (id: string) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch post ${id}:`, error);
      return posts.find((p) => p.id === id);
    }
  };

  const createPost = async (
    post: Omit<Post, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      await api.post("/posts", post);
      await getPosts();
    } catch (error) {
      console.error("Failed to create post:", error);
      // Mock update
      const newPost: Post = {
        ...post,
        id: Math.random().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPosts((prev) => [...prev, newPost]);
    }
  };

  const updatePost = async (id: string, post: Partial<Post>) => {
    try {
      await api.put(`/posts/${id}`, post);
      await getPosts();
    } catch (error) {
      console.error(`Failed to update post ${id}:`, error);
      // Mock update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, ...post, updatedAt: new Date().toISOString() }
            : p,
        ),
      );
    }
  };

  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      await getPosts();
    } catch (error) {
      console.error(`Failed to delete post ${id}:`, error);
      // Mock delete
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        getPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
