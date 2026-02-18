import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, email, mensaje } = await request.json();

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Formulario Web <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contacto@alejandrovega.art'],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong>Nombre:</strong> ${nombre}
            </p>
            <p style="margin: 10px 0;">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </p>
            <p style="margin: 10px 0;">
              <strong>Mensaje:</strong>
            </p>
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 3px solid #333;">
              ${mensaje.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
