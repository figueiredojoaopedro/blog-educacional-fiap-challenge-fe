import React, { useEffect } from 'react';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader2, LogOut, ArrowLeft } from 'lucide-react';

const Admin: React.FC = () => {
  const { posts, loading, getPosts, deletePost } = usePosts();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
      await deletePost(id);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-800">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">Painel Administrativo</h1>
            <p className="text-gray-500 font-medium">Bem-vindo, <span className="text-blue-600">{user?.name}</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            to="/admin/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center gap-2"
          >
            <Plus size={20} />
            Nova Postagem
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Título</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Autor</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider">Data</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-gray-900 font-semibold line-clamp-1">{post.title}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-gray-600 font-medium">{post.author}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-gray-500 font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/admin/edit/${post.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Excluir"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="p-20 text-center text-gray-500 font-medium">
              Nenhuma postagem encontrada. Comece criando uma nova!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
