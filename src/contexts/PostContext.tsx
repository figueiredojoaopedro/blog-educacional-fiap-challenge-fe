import React, { createContext, useContext, useState, useCallback } from "react";
import type { Post } from "../types";
import api from "../services/api";

interface PostContextData {
  posts: Post[];
  loading: boolean;
  getPosts: (search?: string) => Promise<Post[] | void>;
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
    console.log("PostContext: getPosts called", { search });
    setLoading(true);
    try {
      const url = search ? "/posts/search" : "/posts";
      const params = search ? { q: search } : { limit: 10, page: 1 };

      console.log(`PostContext: making API request to ${url}`, { params });
      const response = await api.get(url, { params });
      
      console.log("PostContext: API response received", response.data);
      // Map _id to id if necessary (handling both potential array formats)
      const data = Array.isArray(response.data) ? response.data : response.data.posts || [];
      const mappedPosts = data.map((post: any) => ({
        ...post,
        id: post.id || post._id,
      }));
      setPosts(mappedPosts);
    } catch (error) {
      console.error("PostContext: Failed to fetch posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPost = async (id: string) => {
    try {
      const response = await api.get(`/posts/${id}`);
      const post = response.data;
      return { ...post, id: post.id || post._id };
    } catch (error) {
      console.error(`Failed to fetch post ${id}:`, error);
      return undefined;
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
      throw error;
    }
  };

  const updatePost = async (id: string, post: Partial<Post>) => {
    try {
      await api.put(`/posts/${id}`, post);
      await getPosts();
    } catch (error) {
      console.error(`Failed to update post ${id}:`, error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      await getPosts();
    } catch (error) {
      console.error(`Failed to delete post ${id}:`, error);
      throw error;
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
