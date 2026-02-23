import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import type { Post } from '../types';
import { Loader2, ArrowLeft, Calendar, User } from 'lucide-react';

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = usePosts();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost(id).then(p => {
        setPost(p);
        setLoading(false);
      });
    }
  }, [id, getPost]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Post não encontrado</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Voltar para a página inicial</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Voltar para a lista
      </Link>
      
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-6 text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-400" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Comentários (em breve)</h3>
        <p className="text-gray-500 italic">O sistema de comentários será implementado em breve.</p>
      </footer>
    </article>
  );
};

export default PostView;
