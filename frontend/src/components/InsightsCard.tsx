import { useState, useEffect } from 'react';
import { Insight, User } from '../types';
import { getInsights } from '../api';

interface InsightsCardProps {
  targetUser: User | null;
}

const insightIcons: Record<string, string> = {
  emotion: '😊',
  health: '❤️',
  activity: '🏃',
  preference: '🎯',
  relationship: '🤝',
};

const insightColors: Record<string, string> = {
  emotion: 'bg-blue-50 border-blue-200 text-blue-700',
  health: 'bg-red-50 border-red-200 text-red-700',
  activity: 'bg-green-50 border-green-200 text-green-700',
  preference: 'bg-purple-50 border-purple-200 text-purple-700',
  relationship: 'bg-pink-50 border-pink-200 text-pink-700',
};

export const InsightsCard = ({ targetUser }: InsightsCardProps) => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (!targetUser?.id) return;
    
    const fetchInsights = async () => {
      const { data } = await getInsights(targetUser.id);
      setInsights(data);
    };
    
    fetchInsights();
  }, [targetUser]);

  if (!targetUser) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">🔍 AI深度洞察</h2>
      
      {insights.length > 0 ? (
        <div className="space-y-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${insightColors[insight.type] || 'bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{insightIcons[insight.type] || '💡'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{insight.content}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-white/50 px-2 py-0.5 rounded">
                      置信度: {Math.round(insight.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">暂无AI洞察数据</p>
      )}
    </div>
  );
};
