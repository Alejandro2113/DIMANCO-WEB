"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Plus, X, Check, ChevronDown, Search } from 'lucide-react';

export default function ProjectManager() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const formRef = useRef(null);
  // Nuevos estados para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const emptyProject = {
    titulo: '',
    subtitulo: '',
    descripcion: '',
    imagen: '',
    fechaInicio: '',
    fechaFinal: '',
    featured: false,
    userId: '',
  };

  const [project, setProject] = useState(emptyProject);

  // Efecto para filtrar proyectos
  useEffect(() => {
    const filtered = projects.filter(project => 
      project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toString().includes(searchTerm)
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('/pages/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setName(data.name);
        } else {
          setError('Error en el servidor');
        }
      } catch (error) {
        setError(`Error en el servidor: ${error.message}`);
      }
    };

    fetchUser();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/pages/api/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      } else {
        setProjects([]);
      }
    } catch (error) {
      setProjects([]);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/pages/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setUsers([]);
      }
    };

    fetchUsers();
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const url = editingProject
        ? `/pages/api/projects/${editingProject.id}`
        : '/pages/api/projects';

      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });

      if (res.ok) {
        setProject(emptyProject);
        setEditingProject(null);
        setIsFormOpen(false);
        await fetchProjects();
        alert(editingProject ? 'Proyecto actualizado exitosamente' : 'Proyecto agregado exitosamente');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Error en el servidor');
    }
  };

  const handleEdit = (proj) => {
    setProject({
      ...proj,
      fechaInicio: new Date(proj.fechaInicio).toISOString().split('T')[0],
      fechaFinal: new Date(proj.fechaFinal).toISOString().split('T')[0],
    });
    setEditingProject(proj);
    setIsFormOpen(true);

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Está seguro de eliminar este proyecto?')) return;

    try {
      const res = await fetch(`/pages/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        await fetchProjects();
        alert('Proyecto eliminado exitosamente');
      } else {
        setError('Error al eliminar el proyecto');
      }
    } catch (error) {
      setError('Error en el servidor');
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file' && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProject(prev => ({
          ...prev,
          imagen: reader.result
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setProject(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 w-full sm:w-auto">
            Welcome {name}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setIsFormOpen(!isFormOpen);
                if (!isFormOpen) {
                  setProject(emptyProject);
                  setEditingProject(null);
                }
              }}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto"
            >
              {isFormOpen ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
              {isFormOpen ? 'Cerrar Formulario' : 'Nuevo Proyecto'}
            </button>
            <button
              onClick={() => router.push('/users')}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              Ir a Users
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full sm:w-auto"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar por título o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {isFormOpen && (
            <div ref={formRef} className="w-full">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                {/* El contenido del formulario se mantiene igual */}
                {/* ... código del formulario ... */}
                <h2 className="text-black text-xl font-semibold mb-4">
                  {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h2>
                <form onSubmit={handleSubmit} className="text-black grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600">Título</label>
                    <input
                      type="text"
                      name="titulo"
                      value={project.titulo}
                      onChange={handleChange}
                      className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600">Subtítulo</label>
                    <input
                      type="text"
                      name="subtitulo"
                      value={project.subtitulo}
                      onChange={handleChange}
                      className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-600">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={project.descripcion}
                      onChange={handleChange}
                      rows="3"
                      className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    ></textarea>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600">Imagen</label>
                    <input
                      type="file"
                      name="imagen"
                      accept="image/*"
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600">Autor</label>
                    <select
                      name="userId"
                      value={project.userId}
                      onChange={handleChange}
                      className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Seleccionar autor</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.email}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600">Fecha Inicio</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={project.fechaInicio}
                      onChange={handleChange}
                      className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-600">Fecha Final</label>
                    <input
                      type="date"
                      name="fechaFinal"
                      value={project.fechaFinal}
                      onChange={handleChange}
                      className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={project.featured}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2">Proyecto destacado</span>
                    </label>
                  </div>

                  <div className="col-span-full">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {editingProject ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredProjects.map((proj) => (
                  <div key={proj.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                        <img
                          src={proj.imagen || '/placeholder.png'}
                          alt={proj.titulo}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {proj.titulo}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(proj)}
                              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(proj.id)}
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{proj.subtitulo}</p>
                        <p className="mt-2 text-sm text-gray-600">{proj.descripcion}</p>
                        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                          <span className="inline-flex items-center">
                            Autor: {proj.usuario.email}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="inline-flex items-center">
                            Inicio: {new Date(proj.fechaInicio).toLocaleDateString()}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="inline-flex items-center">
                            Final: {new Date(proj.fechaFinal).toLocaleDateString()}
                          </span>
                          {proj.featured && (
                            <>
                              <span className="hidden sm:inline">•</span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Destacado
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="p-4 sm:p-6 text-center text-gray-500">
                    {projects.length === 0 ? "No hay proyectos disponibles" : "No se encontraron proyectos"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}