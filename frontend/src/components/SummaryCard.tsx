import { useState, useEffect } from 'react';
import { Summary, User } from '../types';
import { generateWeeklySummary } from '../api';

interface SummaryCardProps {
  targetUser: User | null;
  userId: string;
}

export const SummaryCard = ({ targetUser, userId }: SummaryCardProps) => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!targetUser?.id) return;
    setLoading(true);
    
    const fetchSummary = async () => {
      const { data } = await generateWeeklySummary(targetUser.id, userId);
      setSummary(data);
      setLoading(false);
    };
    
    fetchSummary();
  }, [targetUser, userId]);

  if (!targetUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">
        请先选择一位家人
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">📋 {targetUser.name}的近况摘要</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">本周</span>
      </div>
      
      {loading ? (
        <div className="py-8 text-center text-gray-400">正在生成摘要...</div>
      ) : summary ? (
        <>
          <p className="text-gray-700 mb-4 leading-relaxed">{summary.content}</p>
          <div className="flex flex-wrap gap-2">
            {summary.keyPoints.map((point, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-warm-100 text-warm-700 rounded-full text-sm"
              >
                {point}
              </span>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-400">暂无摘要数据</p>
      )}
    </div>
  );
};
