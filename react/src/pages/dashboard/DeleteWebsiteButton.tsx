import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

interface DeleteWebsiteButtonProps {
  params: string;
}

export function DeleteWebsiteButton({ params }: DeleteWebsiteButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/delete-mini-website/${params}`, {
        method: 'DELETE',
        headers: {'access-key': `bearer ${token}`}
      });
      console.log(response)
      alert("Please refresh the page to see your updated websites.")
      if (!response.ok) {
        throw new Error('Failed to delete website');
      }
    } catch (error) {
      console.error('Error deleting website:', error);
      alert('Failed to delete website. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
        title="Delete Website"
      >
        <Trash2 size={18} />
      </button>

      <DeleteConfirmationModal
        isOpen={showModal}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}