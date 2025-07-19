import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    const timer = setTimeout(() => {
      handleClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const baseStyles =
    'fixed bottom-6 right-6 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out';

  const animationStyles = isLeaving
    ? 'translate-x-full opacity-0'
    : isVisible
    ? 'translate-x-0 opacity-100'
    : 'translate-x-full opacity-0';

  const typeStyles =
    type === 'SUCCESS'
      ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-l-4 border-green-400'
      : 'bg-gradient-to-r from-red-500 to-rose-600 border-l-4 border-red-400';

  const Icon = type === 'SUCCESS' ? CheckCircle : XCircle;

  return (
    <div className={`${baseStyles} ${animationStyles}`}>
      <div className={`${typeStyles} rounded-lg shadow-xl backdrop-blur-sm`}>
        {/* Progress bar */}
        <div
          className='absolute top-0 left-0 h-1 bg-white/30 rounded-t-lg animate-[shrink_5s_linear_forwards]'
          style={{
            animation: 'shrink 5s linear forwards',
            transformOrigin: 'left',
          }}
        />

        <div className='p-4 text-white relative'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0'>
              <Icon size={20} className='mt-0.5' />
            </div>

            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium leading-5'>{message}</p>
            </div>

            <button
              onClick={handleClose}
              className='flex-shrink-0 ml-2 inline-flex text-white/80 hover:text-white focus:outline-none focus:text-white transition-colors duration-150'
              aria-label='Close notification'
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
