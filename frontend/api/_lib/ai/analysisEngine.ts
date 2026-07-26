import { Memory, Insight, Summary, TopicSuggestion } from '../types';

export class AnalysisEngine {
  static analyzeEmotions(memories: Memory[]): Insight[] {
    const moodMemories = memories.filter(m => m.type === 'mood');
    const insights: Insight[] = [];
    
    if (moodMemories.length === 0) return insights;

    const positiveCount = moodMemories.filter(m => 
      ['不错', '开心', '高兴', '愉快', '好'].some(keyword => m.content.includes(keyword))
    ).length;
    
    const negativeCount = moodMemories.filter(m => 
      ['压力', '疲惫', '失眠', '孤单', '想念', '不好'].some(keyword => m.content.includes(keyword))
    ).length;

    if (negativeCount > positiveCount) {
      insights.push({
        id: `insight-${Date.now()}-emotion`,
        userId: '',
        targetUserId: memories[0].userId,
        type: 'emotion',
        content: '最近情绪偏低，可能需要更多关心和陪伴',
        confidence: Math.min(0.9, negativeCount / moodMemories.length + 0.3),
        timestamp: new Date().toISOString(),
      });
    }

    if (moodMemories.some(m => m.content.includes('想念'))) {
      insights.push({
        id: `insight-${Date.now()}-miss`,
        userId: '',
        targetUserId: memories[0].userId,
        type: 'emotion',
        content: '表达了对家人的思念，渴望与子女沟通',
        confidence: 0.85,
        timestamp: new Date().toISOString(),
      });
    }

    return insights;
  }

  static analyzeHealth(memories: Memory[]): Insight[] {
    const healthMemories = memories.filter(m => m.type === 'health');
    const insights: Insight[] = [];

    if (healthMemories.length === 0) return insights;

    if (healthMemories.some(m => m.content.includes('血压'))) {
      const highBP = healthMemories.some(m => m.content.includes('偏高') || m.content.includes('高'));
      if (highBP) {
        insights.push({
          id: `insight-${Date.now()}-bp`,
          userId: '',
          targetUserId: memories[0].userId,
          type: 'health',
          content: '血压监测显示偏高，需要关注饮食和用药情况',
          confidence: 0.92,
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (healthMemories.some(m => m.content.includes('失眠') || m.content.includes('睡眠'))) {
      insights.push({
        id: `insight-${Date.now()}-sleep`,
        userId: '',
        targetUserId: memories[0].userId,
        type: 'health',
        content: '存在睡眠问题，建议关注作息规律',
        confidence: 0.88,
        timestamp: new Date().toISOString(),
      });
    }

    return insights;
  }

  static analyzePreferences(memories: Memory[]): Insight[] {
    const prefMemories = memories.filter(m => m.type === 'preference');
    const insights: Insight[] = [];

    if (prefMemories.length === 0) return insights;

    prefMemories.forEach(memory => {
      insights.push({
        id: `insight-${Date.now()}-pref-${memory.id}`,
        userId: '',
        targetUserId: memory.userId,
        type: 'preference',
        content: `偏好记录：${memory.content}`,
        confidence: 0.90,
        timestamp: new Date().toISOString(),
      });
    });

    return insights;
  }

  static generateSummary(memories: Memory[], period: 'day' | 'week' | 'month'): Summary {
    const recentMemories = memories.slice(-7);
    const daily = recentMemories.filter(m => m.type === 'daily').map(m => m.content);
    const health = recentMemories.filter(m => m.type === 'health').map(m => m.content);
    const mood = recentMemories.filter(m => m.type === 'mood').map(m => m.content);
    const activity = recentMemories.filter(m => m.type === 'activity').map(m => m.content);

    let content = '';
    const keyPoints: string[] = [];

    if (daily.length > 0) {
      content += `日常活动：${daily.join('；')}。`;
      keyPoints.push('日常活动');
    }
    if (health.length > 0) {
      content += `健康状况：${health.join('；')}。`;
      keyPoints.push('健康状况');
    }
    if (mood.length > 0) {
      content += `心情状态：${mood.join('；')}。`;
      keyPoints.push('心情状态');
    }
    if (activity.length > 0) {
      content += `活动情况：${activity.join('；')}。`;
      keyPoints.push('活动情况');
    }

    if (content === '') {
      content = '最近没有记录，建议多关注家人的生活状态。';
    }

    return {
      id: `summary-${Date.now()}`,
      userId: '',
      targetUserId: memories[0]?.userId || '',
      period,
      content,
      keyPoints: keyPoints.length > 0 ? keyPoints : ['暂无记录'],
      timestamp: new Date().toISOString(),
    };
  }

  static generateTopicSuggestions(memories: Memory[], targetUserId: string): TopicSuggestion[] {
    const suggestions: TopicSuggestion[] = [];

    if (memories.some(m => m.type === 'health')) {
      suggestions.push({
        id: `topic-${Date.now()}-1`,
        userId: '',
        targetUserId,
        topic: '最近的身体状况',
        reason: '健康是最重要的，关心对方的身体情况',
        confidence: 0.95,
        timestamp: new Date().toISOString(),
      });
    }

    if (memories.some(m => m.type === 'activity')) {
      suggestions.push({
        id: `topic-${Date.now()}-2`,
        userId: '',
        targetUserId,
        topic: '最近的活动安排',
        reason: '了解对方的日常活动，增进交流',
        confidence: 0.80,
        timestamp: new Date().toISOString(),
      });
    }

    if (memories.some(m => m.type === 'preference')) {
      const pref = memories.find(m => m.type === 'preference');
      if (pref) {
        suggestions.push({
          id: `topic-${Date.now()}-3`,
          userId: '',
          targetUserId,
          topic: '喜欢的事物',
          reason: `对方喜欢${pref.content.replace('喜欢', '')}，可以聊聊相关话题`,
          confidence: 0.85,
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (memories.some(m => m.type === 'mood' && m.content.includes('想念'))) {
      suggestions.push({
        id: `topic-${Date.now()}-4`,
        userId: '',
        targetUserId,
        topic: '近期的心情',
        reason: '对方表达了思念之情，需要给予情感支持',
        confidence: 0.90,
        timestamp: new Date().toISOString(),
      });
    }

    suggestions.push({
      id: `topic-${Date.now()}-5`,
      userId: '',
      targetUserId,
      topic: '近期的生活趣事',
      reason: '分享生活中的趣事可以增进感情',
      confidence: 0.70,
      timestamp: new Date().toISOString(),
    });

    return suggestions;
  }

  static analyzeAll(memories: Memory[]): { insights: Insight[], summary: Summary, topics: TopicSuggestion[] } {
    const emotions = this.analyzeEmotions(memories);
    const health = this.analyzeHealth(memories);
    const preferences = this.analyzePreferences(memories);
    
    const insights = [...emotions, ...health, ...preferences];
    const summary = this.generateSummary(memories, 'week');
    const topics = this.generateTopicSuggestions(memories, memories[0]?.userId || '');

    return { insights, summary, topics };
  }
}
