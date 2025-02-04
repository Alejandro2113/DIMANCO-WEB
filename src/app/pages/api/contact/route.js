// app/pages/api/contact/route.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, phone, message } = await request.json();

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER o EMAIL_PASS no están configuradas en el entorno.');
    return NextResponse.json({ message: 'Error en la configuración del servidor' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'consultas@dimanco.net', // Cambia aquí el destinatario
      subject: `Nuevo mensaje de contacto`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #f59e0b; text-align: center;">Nuevo Mensaje de Contacto</h2>
              <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="margin: 0; font-size: 16px;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0; font-size: 16px;"><strong>Teléfono:</strong> ${phone || 'No especificado'}</p>
              <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
              <h3 style="color: #333;">Mensaje:</h3>
              <p style="font-size: 16px; color: #555; line-height: 1.6;">${message}</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ message: 'Error al enviar el mensaje' }, { status: 500 });
  }
}
