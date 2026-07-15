import { useState, useEffect } from 'react';
import { TopicSuggestion, User } from '../types';
import { generateTopicSuggestions } from '../api';

interface TopicSuggestionsCardProps {
  targetUser: User | null;
  userId: string;
}

export const TopicSuggestionsCard = ({ targetUser, userId }: TopicSuggestionsCardProps) => {
  const [topics, setTopics] = useState<TopicSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!targetUser?.id) return;
    setLoading(true);
    
    const fetchTopics = async () => {
      const { data } = await generateTopicSuggestions(targetUser.id, userId);
      setTopics(data);
      setLoading(false);
    };
    
    fetchTopics();
  }, [targetUser, userId]);

  if (!targetUser) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">💬 话题建议</h2>
      
      {loading ? (
        <div className="py-8 text-center text-gray-400">正在生成建议...</div>
      ) : topics.length > 0 ? (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{topic.topic}</span>
                <span className="text-xs text-gray-500">
                  推荐度: {Math.round(topic.confidence * 100)}%
                </span>
              </div>
              <p className="text-sm text-gray-500">{topic.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-4">暂无话题建议</p>
      )}
    </div>
  );
};
