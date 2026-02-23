import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import type { Post } from '../types';

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createPost, updatePost, getPost } = usePosts();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    content: ''
  });

  useEffect(() => {
    if (id) {
      getPost(id).then(post => {
        if (post) {
          setFormData({
            title: post.title,
            author: post.author,
            summary: post.summary,
            content: post.content
          });
        }
        setInitialLoading(false);
      });
    }
  }, [id, getPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Erro ao salvar postagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {id ? 'Editar Postagem' : 'Nova Postagem'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Título</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Digite o título do post"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700">Autor</label>
          <input
            id="author"
            name="author"
            type="text"
            required
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Nome do autor"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="summary" className="block text-sm font-semibold text-gray-700">Resumo (breve descrição)</label>
          <textarea
            id="summary"
            name="summary"
            required
            rows={2}
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Uma breve introdução sobre o que é o post"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Conteúdo Completo</label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            value={formData.content}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Escreva o conteúdo completo do seu post aqui..."
          />
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {id ? 'Salvar Alterações' : 'Publicar Postagem'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
