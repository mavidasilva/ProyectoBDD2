import { useState } from "react";

const CommentModal = ({ show, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(comment);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold mb-4">Comentarios del producto</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
          placeholder="Preferencias, alergias o tus comentarios"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-red-600 text-white p-2 rounded"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
