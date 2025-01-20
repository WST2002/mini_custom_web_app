import React from 'react';
import { Template1 } from '@/templates/Template1';
import { Template2 } from '@/templates/Template2';
import { Template3 } from '@/templates/Template3';
import { Template4 } from '@/templates/Template4';
import { Template5 } from '@/templates/Template5';
import { useBusinessStore } from '@/store/businessStore';
import { Template6 } from '@/templates/Template6';
import { Template7 } from '@/templates/Template7';
import { Template8 } from '@/templates/Template8';
import { Template9 } from '@/templates/Template9';
import { Template10 } from '@/templates/Template10';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, currentIndex }) => {
  if (!isOpen) return null;

  // Switch statement to conditionally render the templates
  const renderTemplate = () => {
    switch (currentIndex) {
      case 0:
        return <Template1 data={useBusinessStore((state) => state.data)} />;
      case 1:
        return <Template2 data={useBusinessStore((state) => state.data)} />;
      case 2:
        return <Template3 data={useBusinessStore((state) => state.data)} />;
      case 3:
        return <Template4 data={useBusinessStore((state) => state.data)} />;
      case 4:
        return <Template5 data={useBusinessStore((state) => state.data)} />;
      case 5:
        return <Template6 data={useBusinessStore((state) => state.data)} />;
      case 6:
        return <Template7 data={useBusinessStore((state) => state.data)} />;
      case 7:
        return <Template8 data={useBusinessStore((state) => state.data)} />;
      case 8:
        return <Template9 data={useBusinessStore((state) => state.data)} />;
      case 9:
        return <Template10 data={useBusinessStore((state) => state.data)} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50">
      <div className="bg-black relative rounded-lg p-6 w-[80%] h-[80%] overflow-auto">
        <button onClick={onClose} className="absolute z-[51] top-2 right-2 text-gray-600">
          &times;
        </button>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Modal;