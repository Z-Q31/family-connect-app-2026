import { useState, useEffect } from 'react';
import { Reminder } from '../types';
import { getPendingReminders, completeReminder } from '../api';

interface RemindersCardProps {
  userId: string;
  onAddReminder?: () => void;
}

const reminderIcons: Record<string, string> = {
  birthday: '🎂',
  anniversary: '🎉',
  health: '💊',
  communication: '📞',
  custom: '📝',
};

const reminderColors: Record<string, string> = {
  birthday: 'bg-pink-50 text-pink-700',
  anniversary: 'bg-purple-50 text-purple-700',
  health: 'bg-red-50 text-red-700',
  communication: 'bg-blue-50 text-blue-700',
  custom: 'bg-gray-50 text-gray-700',
};

export const RemindersCard = ({ userId, onAddReminder }: RemindersCardProps) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const fetchReminders = async () => {
      const { data } = await getPendingReminders(userId);
      setReminders(data);
    };
    
    fetchReminders();
  }, [userId]);

  const handleComplete = async (id: string) => {
    await completeReminder(id);
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">🔔 待办提醒</h2>
        {onAddReminder && (
          <button
            onClick={onAddReminder}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            + 添加
          </button>
        )}
      </div>
      
      {reminders.length > 0 ? (
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg ${reminderColors[reminder.type] || 'bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{reminderIcons[reminder.type] || '📌'}</span>
                <div className="flex-1">
                  <p className="font-medium">{reminder.message}</p>
                  <p className="text-sm mt-1">日期: {reminder.dueDate}</p>
                  {reminder.remindTime && (
                    <p className="text-sm">时间: {reminder.remindTime}</p>
                  )}
                </div>
                <button
                  onClick={() => handleComplete(reminder.id)}
                  className="px-3 py-1 bg-white/50 rounded-full text-sm hover:bg-white transition-all"
                >
                  完成
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-400">暂无待办提醒</p>
          {onAddReminder && (
            <button
              onClick={onAddReminder}
              className="mt-2 text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              添加新提醒
            </button>
          )}
        </div>
      )}
    </div>
  );
};
