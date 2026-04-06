'use client';

import { useState, FormEvent } from 'react';
import { SITE } from '@/app/lib/constants';
import { SectionHeader, FormField, StatusMessage, ContactInfoItem } from '@/app/components/ui';
import { EnvelopeIcon, PhoneIcon, LocationIcon, InstagramIcon } from '@/app/components/icons';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus('success');
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al enviar el mensaje'
      );
    }
  };

  return (
    <section id="contacto" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader subtitle="Hablemos" title="Contacto" />
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-playfair text-2xl mb-6">
              ¿Quieres ponerte en contacto conmigo?
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              No dudes en contactarme para cualquier consulta.
            </p>
            <div className="space-y-4">
              <ContactInfoItem icon={<EnvelopeIcon className="w-5 h-5" />}>
                <a href={`mailto:${SITE.email}`} className="hover:text-gray-600 transition-colors">
                  {SITE.email}
                </a>
              </ContactInfoItem>
              <ContactInfoItem icon={<PhoneIcon className="w-5 h-5" />}>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-gray-600 transition-colors">
                  {SITE.phone}
                </a>
              </ContactInfoItem>
              <ContactInfoItem icon={<LocationIcon className="w-5 h-5" />}>
                <span>{SITE.location}</span>
              </ContactInfoItem>
            </div>
            <div className="flex gap-4 mt-8">
              <a href={SITE.instagram} className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'success' && (
              <StatusMessage variant="success">
                ¡Mensaje enviado correctamente! Te responderé pronto.
              </StatusMessage>
            )}
            {status === 'error' && (
              <StatusMessage variant="error">
                {errorMessage}
              </StatusMessage>
            )}
            <FormField
              label="Nombre"
              id="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: (e.target as HTMLInputElement).value })}
              placeholder="Tu nombre"
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: (e.target as HTMLInputElement).value })}
              placeholder="tu@email.com"
            />
            <FormField
              as="textarea"
              label="Mensaje"
              id="mensaje"
              rows={4}
              required
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: (e.target as HTMLTextAreaElement).value })}
              placeholder="Cuéntame..."
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-8 py-4 bg-black text-white hover:bg-gray-800 hover:cursor-pointer transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
