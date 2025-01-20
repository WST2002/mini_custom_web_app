import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface ContactButtonsProps {
  phoneNumber: string;
  whatsappNumber: string;
}

export const ContactButtons: React.FC<ContactButtonsProps> = ({ phoneNumber, whatsappNumber }) => {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4">
      <button
        onClick={handleCall}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <Phone className="w-6 h-6" />
      </button>
      <button
        onClick={handleWhatsApp}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};