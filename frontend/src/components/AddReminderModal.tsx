import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFamilyMembers, createReminder } from '../api';
import { User } from '../types';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reminderTypes = [
  { value: 'birthday', label: '🎂 生日', color: 'text-pink-600' },
  { value: 'anniversary', label: '🎉 纪念日', color: 'text-purple-600' },
  { value: 'health', label: '💊 健康', color: 'text-red-600' },
  { value: 'communication', label: '📞 沟通', color: 'text-blue-600' },
  { value: 'custom', label: '📝 自定义', color: 'text-gray-600' },
];

export const AddReminderModal = ({ isOpen, onClose }: AddReminderModalProps) => {
  const { user } = useAuth();
  const [familyMembers, setFamilyMembers] = useState<User[]>([]);
  const [type, setType] = useState('custom');
  const [targetUserId, setTargetUserId] = useState('');
  const [message, setMessage] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [remindTime, setRemindTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      getFamilyMembers(user.familyId).then(res => {
        setFamilyMembers(res.data.filter(m => m.id !== user.id));
      });
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!targetUserId) {
      setError('请选择提醒对象');
      return;
    }
    if (!message.trim()) {
      setError('请输入提醒内容');
      return;
    }
    if (!dueDate) {
      setError('请选择日期');
      return;
    }

    setLoading(true);
    try {
      await createReminder({
        userId: user?.id || '',
        targetUserId,
        type: type as any,
        message: message.trim(),
        dueDate,
        remindTime,
      });
      onClose();
    } catch {
      setError('创建提醒失败');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">📝 添加待办提醒</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">提醒对象</label>
            <select
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">请选择</option>
              {familyMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.avatar} {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">提醒类型</label>
            <div className="flex flex-wrap gap-2">
              {reminderTypes.map((reminderType) => (
                <button
                  key={reminderType.value}
                  type="button"
                  onClick={() => setType(reminderType.value)}
                  className={`px-3 py-2 rounded-lg border-2 transition-all ${
                    type === reminderType.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={reminderType.color}>{reminderType.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">提醒内容</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入提醒内容..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">时间（可选）</label>
              <input
                type="time"
                value={remindTime}
                onChange={(e) => setRemindTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 transition-all"
            >
              {loading ? '添加中...' : '添加提醒'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};