import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        lastname: true,
        createdAt: true,
      },
    });
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Token inválido o expirado' }), { status: 401 });
  }
}

export async function POST(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, name, lastname, password } = await req.json();

    if (!email || !password || !name || !lastname) {
      return new Response(JSON.stringify({ message: 'Faltan datos' }), { status: 400 });
    }

    // Dynamically import bcryptjs
    const bcrypt = await import('bcryptjs');

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { 
        email, 
        name, 
        lastname, 
        password: hashedPassword 
      },
    });

    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error al crear usuario' }), { status: 500 });
  }
}

export async function PUT(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email, name, lastname, password } = await req.json();

    if (!email || !password || !name || !lastname) {
      return new Response(JSON.stringify({ message: 'Faltan datos' }), { status: 400 });
    }

    // Dynamically import bcryptjs
    const bcrypt = await import('bcryptjs');

    // Hash the password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { 
        email, 
        name, 
        lastname, 
        password: hashedPassword 
      },
    });

    return new Response(JSON.stringify({ updatedUser }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error al actualizar usuario' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = await req.json();  // Deberías pasar el `id` en el cuerpo de la solicitud

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Usuario eliminado' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error al eliminar usuario' }), { status: 500 });
  }
}