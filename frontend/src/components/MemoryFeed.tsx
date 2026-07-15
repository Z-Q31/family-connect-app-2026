import { useState, useEffect } from 'react';
import { Memory, User } from '../types';
import { getMemoriesByUserId } from '../api';

interface MemoryFeedProps {
  targetUser: User | null;
}

const memoryIcons: Record<string, string> = {
  daily: '📅',
  health: '❤️',
  mood: '😊',
  activity: '🏃',
  preference: '🎯',
};

const memoryColors: Record<string, string> = {
  daily: 'bg-blue-50 border-blue-200',
  health: 'bg-red-50 border-red-200',
  mood: 'bg-yellow-50 border-yellow-200',
  activity: 'bg-green-50 border-green-200',
  preference: 'bg-purple-50 border-purple-200',
};

const importanceColors: Record<string, string> = {
  low: 'text-gray-500',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export const MemoryFeed = ({ targetUser }: MemoryFeedProps) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    if (!targetUser?.id) return;
    
    const fetchMemories = async () => {
      const { data } = await getMemoriesByUserId(targetUser.id);
      setMemories(data.sort((a: Memory, b: Memory) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    };
    
    fetchMemories();
  }, [targetUser]);

  if (!targetUser) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">📝 {targetUser.name}的生活记录</h2>
      
      {memories.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className={`p-4 rounded-lg border ${memoryColors[memory.type] || 'bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{memoryIcons[memory.type] || '📌'}</span>
                <div className="flex-1">
                  <p className="text-gray-800">{memory.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{new Date(memory.timestamp).toLocaleDateString()}</span>
                    <span className={importanceColors[memory.importance]}>
                      {memory.importance === 'high' ? '重要' : memory.importance === 'medium' ? '中等' : '一般'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">暂无生活记录</p>
      )}
    </div>
  );
};
