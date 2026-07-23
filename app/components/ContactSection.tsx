import { SITE } from '@/app/lib/constants';
import { InstagramIcon } from '@/app/components/icons';

// Contact form (sends email via Resend through /api/contact) temporarily disabled.
// To re-enable: restore the 'use client' directive, the useState/handleSubmit logic,
// and the <form> below, following app/api/contact/route.ts.
//
// 'use client';
// import { useState, FormEvent } from 'react';
// import { SectionHeader, FormField, StatusMessage, ContactInfoItem } from '@/app/components/ui';
// import { EnvelopeIcon, PhoneIcon, LocationIcon } from '@/app/components/icons';
//
// type FormStatus = 'idle' | 'loading' | 'success' | 'error';
//
// const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
// const [status, setStatus] = useState<FormStatus>('idle');
// const [errorMessage, setErrorMessage] = useState('');
//
// const handleSubmit = async (e: FormEvent) => {
//   e.preventDefault();
//   setStatus('loading');
//   setErrorMessage('');
//   try {
//     const response = await fetch('/api/contact', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.error || 'Error al enviar el mensaje');
//     setStatus('success');
//     setFormData({ nombre: '', email: '', mensaje: '' });
//   } catch (error) {
//     setStatus('error');
//     setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el mensaje');
//   }
// };
//
// <form onSubmit={handleSubmit} className="space-y-6">
//   {status === 'success' && (
//     <StatusMessage variant="success">¡Mensaje enviado correctamente! Te responderé pronto.</StatusMessage>
//   )}
//   {status === 'error' && <StatusMessage variant="error">{errorMessage}</StatusMessage>}
//   <FormField label="Nombre" id="nombre" type="text" required value={formData.nombre}
//     onChange={(e) => setFormData({ ...formData, nombre: (e.target as HTMLInputElement).value })}
//     placeholder="Tu nombre" />
//   <FormField label="Email" id="email" type="email" required value={formData.email}
//     onChange={(e) => setFormData({ ...formData, email: (e.target as HTMLInputElement).value })}
//     placeholder="tu@email.com" />
//   <FormField as="textarea" label="Mensaje" id="mensaje" rows={4} required value={formData.mensaje}
//     onChange={(e) => setFormData({ ...formData, mensaje: (e.target as HTMLTextAreaElement).value })}
//     placeholder="Cuéntame..." />
//   <button type="submit" disabled={status === 'loading'}
//     className="w-full px-8 py-4 bg-black text-white hover:bg-gray-800 hover:cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
//     {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
//   </button>
// </form>

export default function ContactSection() {
  return (
    <section id="contacto" className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-8">Contacto</h2>
        <div className="flex justify-center gap-4">
          <a
            href={SITE.instagram}
            className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
