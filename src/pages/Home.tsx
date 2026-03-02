import React, { useEffect, useState } from "react";
import { usePosts } from "../contexts/PostContext";
import { Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { posts, loading, getPosts } = usePosts();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Home: useEffect firing to call getPosts");
    getPosts();
  }, [getPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getPosts(search);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Blog Educacional FIAP
      </h1>

      <form onSubmit={handleSearch} className="mb-8 relative">
        <input
          type="text"
          placeholder="Buscar posts por palavra-chave..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Link to={`/post/${post.id}`}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 mb-4">
                  Por <span className="font-medium">{post.author}</span> •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:underline">
                  Ler mais →
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              Nenhum post encontrado para "{search}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
