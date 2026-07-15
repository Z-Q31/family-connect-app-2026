import { useEffect, useRef } from 'react';
import { Reminder } from '../types';

interface ReminderNotificationProps {
  reminder: Reminder;
  onClose: () => void;
  onComplete: () => void;
}

const reminderIcons: Record<string, string> = {
  birthday: '🎂',
  anniversary: '🎉',
  health: '💊',
  communication: '📞',
  custom: '📝',
};

export const ReminderNotification = ({ reminder, onClose, onComplete }: ReminderNotificationProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6lF1fdJivrJBhNjVgodDbq2EcBj+a2teleRq3E6');
    
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
      }
    };

    playSound();
    const interval = setInterval(playSound, 3000);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleComplete = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onComplete();
    onClose();
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🔔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">提醒时间到！</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">{reminderIcons[reminder.type] || '📌'}</span>
            <span className="text-lg font-medium text-gray-600">
              {reminder.type === 'birthday' && '生日提醒'}
              {reminder.type === 'anniversary' && '纪念日提醒'}
              {reminder.type === 'health' && '健康提醒'}
              {reminder.type === 'communication' && '沟通提醒'}
              {reminder.type === 'custom' && '自定义提醒'}
            </span>
          </div>
          
          <div className="bg-primary-50 rounded-xl p-4 mb-6">
            <p className="text-lg text-gray-800 font-medium">{reminder.message}</p>
            {reminder.dueDate && (
              <p className="text-sm text-gray-500 mt-2">日期: {reminder.dueDate}</p>
            )}
            {reminder.remindTime && (
              <p className="text-sm text-gray-500">时间: {reminder.remindTime}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              稍后提醒
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all font-medium"
            >
              完成
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};