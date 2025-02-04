// pages/api/projects/route.js

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import cloudinary from '../../../lib/cloudinary';
import { uploadImage } from '../../../lib/cloudinary';

const prisma = new PrismaClient();

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
  
      // Upload image to Cloudinary if it exists
      let imageUrl = imagen;
      try {
        if (imagen && imagen.startsWith('data:image')) {
          imageUrl = await uploadImage(imagen);
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary Error Details:', cloudinaryError);
        return new Response(
          JSON.stringify({
            message: 'Error al subir la imagen',
            error: cloudinaryError.message,
            details: 'Verifique la configuración de Cloudinary'
          }),
          { status: 500 }
        );
      }
  
      const proyecto = await prisma.proyecto.create({
        data: {
          titulo,
          subtitulo,
          descripcion,
          imagen: imageUrl,
          fechaInicio: new Date(fechaInicio),
          fechaFinal: new Date(fechaFinal),
          featured,
          userId: parseInt(userId),
        },
      });
  
      return new Response(JSON.stringify({ message: 'Proyecto creado', proyecto }), { status: 201 });
    } catch (error) {
      console.error('Error completo:', error);
      return new Response(
        JSON.stringify({
          message: 'Error en el servidor',
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }),
        { status: 500 }
      );
    }
  }