"use client";

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', name: '', lastname: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const emptyUser = { email: '', name: '', lastname: '', password: '' };

  // All fetch and handler functions remain the same
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const res = await axios.get('/pages/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateOrUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingUser ? `/pages/api/users/${editingUser.id}` : '/pages/api/users';
    const method = editingUser ? 'PUT' : 'POST';
    
    try {
      const res = await axios({
        method,
        url,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: editingUser || newUser,
      });

      if (res.status === 200 || res.status === 201) {
        setNewUser(emptyUser);
        setEditingUser(null);
        setIsFormOpen(false);
        fetchUsers();
      }
    } catch (error) {
      setError('Error al guardar el usuario');
      console.error(error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
    // Scroll to form when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem('token');
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;

    try {
      await axios.delete(`/pages/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleForm = () => {
    if (isFormOpen) {
      // Reset both newUser and editingUser when closing the form
      setNewUser(emptyUser);
      setEditingUser(null);
    }
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Enhanced Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Panel de Usuarios
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={toggleForm}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium"
              >
                {isFormOpen ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                {isFormOpen ? 'Cerrar Formulario' : 'Nuevo Usuario'}
              </button>
              <button
                onClick={() => router.push('/projects')}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Ir a Proyectos
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same... */}
        {/* Error message section */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Form Section */}
        {isFormOpen && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </h2>
            </div>
            <form onSubmit={handleCreateOrUpdateUser} className="text-black p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editingUser?.email || newUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={editingUser?.name || newUser.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  value={editingUser?.lastname || newUser.lastname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={editingUser?.password || newUser.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  required
                />
              </div>
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
                >
                  {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Enhanced Users List Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de Usuarios
            </h2>
          </div>
          {users.length === 0 ? (
            <div className="p-4 sm:p-6 text-center text-gray-500">
              No hay usuarios disponibles
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                          {user.name} {user.lastname}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="ml-2 hidden sm:inline">Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="ml-2 hidden sm:inline">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;