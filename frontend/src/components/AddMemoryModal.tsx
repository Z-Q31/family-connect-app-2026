import { useState } from 'react';
import { Memory } from '../types';
import { createMemory } from '../api';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const memoryTypes: { value: Memory['type']; label: string; icon: string }[] = [
  { value: 'daily', label: '日常', icon: '📅' },
  { value: 'health', label: '健康', icon: '❤️' },
  { value: 'mood', label: '心情', icon: '😊' },
  { value: 'activity', label: '活动', icon: '🏃' },
  { value: 'preference', label: '喜好', icon: '🎯' },
];

export const AddMemoryModal = ({ isOpen, onClose, userId }: AddMemoryModalProps) => {
  const [type, setType] = useState<Memory['type']>('daily');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState<Memory['importance']>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await createMemory({ userId, type, content, importance });

    onClose();
    setContent('');
    setType('daily');
    setImportance('medium');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">记录生活点滴</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">类型</label>
            <div className="grid grid-cols-5 gap-2">
              {memoryTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    type === t.value
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="text-xl">{t.icon}</div>
                  <div className="text-xs mt-1">{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="记录今天发生的事情..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">重要程度</label>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as Memory['importance'][]).map((imp) => (
                <button
                  key={imp}
                  type="button"
                  onClick={() => setImportance(imp)}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    importance === imp
                      ? 'bg-primary-50 text-primary-700 border-2 border-primary-500'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  {imp === 'low' ? '一般' : imp === 'medium' ? '中等' : '重要'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="flex-1 py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300"
            >
              保存记录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
