// /app/pages/api/users/[id]/route.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Faltan datos' }), { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { email, password }, // Asegúrate de cifrar el password antes de actualizarlo
    });

    return new Response(JSON.stringify({ updatedUser }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error al actualizar usuario' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });
    return new Response(JSON.stringify({ message: 'Usuario eliminado' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error al eliminar usuario' }), { status: 500 });
  }
}
 