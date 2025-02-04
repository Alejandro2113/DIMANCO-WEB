// apo/pages/api/projects/[id]/route.js

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import { uploadImage } from '../../../../lib/cloudinary'; // Adjust the import for cloudinary

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    // Leer el cuerpo de la solicitud una vez
    const { id, titulo, subtitulo, descripcion, imagen, fechaInicio, fechaFinal, featured } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID de proyecto requerido' }), { status: 400 });
    }

    const updatedProject = await prisma.proyecto.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        subtitulo,
        descripcion,
        imagen,
        fechaInicio: new Date(fechaInicio),
        fechaFinal: new Date(fechaFinal),
        featured,
      },
    });

    return new Response(JSON.stringify({ message: 'Proyecto actualizado', updatedProject }), { status: 200 });
  } catch (error) {
    console.error('Error en la actualización:', error);
    return new Response(
      JSON.stringify({ message: 'Error al actualizar el proyecto', error: error.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const headersList = headers();
    const token = headersList.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener el ID del proyecto
    const { id } = params;

    // Verificar si el proyecto existe
    const existingProject = await prisma.proyecto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: 'Proyecto no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar el proyecto
    await prisma.proyecto.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: 'Proyecto eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error deleting project:', error);

    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }

    if (error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { message: 'Token expirado' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: 'Error al eliminar el proyecto',
        error: error.message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req) {
  try {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            name: true,
            lastname: true,
          }
        }
      },
    });

    return new Response(JSON.stringify({ projects: proyectos }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error al obtener proyectos' }), { status: 500 });
  }
}

export async function POST(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const { titulo, subtitulo, descripcion, imagen, fechaInicio, fechaFinal, featured, userId } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Subir imagen a Cloudinary
    let uploadedImage = imagen;
    if (imagen && imagen.startsWith('data:image')) {
      const uploadResult = await cloudinary.v2.uploader.upload(imagen, {
        folder: 'projects', // Carpeta en Cloudinary
      });
      uploadedImage = uploadResult.secure_url;
    }

    const proyecto = await prisma.proyecto.create({
      data: {
        titulo,
        subtitulo,
        descripcion,
        imagen: uploadedImage, // Usar la URL de la imagen subida
        fechaInicio: new Date(fechaInicio),
        fechaFinal: new Date(fechaFinal),
        featured,
        userId: parseInt(userId),
      },
    });

    return new Response(JSON.stringify({ message: 'Proyecto creado', proyecto }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error en el servidor', error: error.message }), { status: 500 });
  }
}
