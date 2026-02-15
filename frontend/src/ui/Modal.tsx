import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen = true, onClose, children, title }: ModalProps) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={() => onClose?.()}
      />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl bg-card border border-border p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <button
            onClick={() => onClose?.()}
            className="rounded-full p-1 hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
