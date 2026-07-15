import { User, Memory, Insight, Summary, Reminder, TopicSuggestion, CommunicationRecord } from '../types';

export const mockUsers: User[] = [
  { id: 'user1', name: '张爸爸', role: 'parent', avatar: '👨‍🦳', familyId: 'family1', createdAt: '2024-01-01' },
  { id: 'user2', name: '李妈妈', role: 'parent', avatar: '👩‍🦳', familyId: 'family1', createdAt: '2024-01-01' },
  { id: 'user3', name: '张小华', role: 'child', avatar: '👨‍💼', familyId: 'family1', createdAt: '2024-01-01' },
  { id: 'user4', name: '张小美', role: 'child', avatar: '👩‍💼', familyId: 'family1', createdAt: '2024-01-01' },
];

export const mockMemories: Memory[] = [
  { id: 'm1', userId: 'user3', type: 'daily', content: '今天加班到晚上9点，项目进度不错', timestamp: '2024-07-06T21:00:00', importance: 'medium' },
  { id: 'm2', userId: 'user3', type: 'mood', content: '最近工作压力有点大，感觉有些疲惫', timestamp: '2024-07-05T20:00:00', importance: 'high' },
  { id: 'm3', userId: 'user3', type: 'activity', content: '周末去健身房锻炼了2小时', timestamp: '2024-07-07T10:00:00', importance: 'low' },
  { id: 'm4', userId: 'user3', type: 'preference', content: '喜欢吃川菜，尤其是麻婆豆腐', timestamp: '2024-07-04T12:00:00', importance: 'medium' },
  { id: 'm5', userId: 'user1', type: 'daily', content: '今天去公园散步，遇到了老同事', timestamp: '2024-07-06T09:00:00', importance: 'medium' },
  { id: 'm6', userId: 'user1', type: 'health', content: '血压最近有点偏高，医生建议少吃盐', timestamp: '2024-07-05T14:00:00', importance: 'high' },
  { id: 'm7', userId: 'user1', type: 'mood', content: '今天心情不错，孙子打电话来了', timestamp: '2024-07-07T11:00:00', importance: 'high' },
  { id: 'm8', userId: 'user1', type: 'activity', content: '每天早上都会打太极拳', timestamp: '2024-07-04T06:00:00', importance: 'medium' },
  { id: 'm9', userId: 'user2', type: 'daily', content: '今天去超市买了很多新鲜蔬菜', timestamp: '2024-07-06T15:00:00', importance: 'low' },
  { id: 'm10', userId: 'user2', type: 'health', content: '最近睡眠不太好，经常失眠', timestamp: '2024-07-05T22:00:00', importance: 'high' },
  { id: 'm11', userId: 'user2', type: 'preference', content: '喜欢看电视剧，尤其是家庭伦理剧', timestamp: '2024-07-04T19:00:00', importance: 'medium' },
  { id: 'm12', userId: 'user2', type: 'mood', content: '想念女儿，希望她能常回家看看', timestamp: '2024-07-07T14:00:00', importance: 'high' },
];

export const mockInsights: Insight[] = [
  { id: 'i1', userId: 'user1', targetUserId: 'user3', type: 'emotion', content: '小华最近工作压力较大，可能需要关心他的休息情况', confidence: 0.85, timestamp: '2024-07-07T00:00:00' },
  { id: 'i2', userId: 'user3', targetUserId: 'user1', type: 'health', content: '爸爸血压偏高，需要提醒他注意饮食', confidence: 0.90, timestamp: '2024-07-07T00:00:00' },
  { id: 'i3', userId: 'user3', targetUserId: 'user2', type: 'emotion', content: '妈妈最近有些孤单，想念子女', confidence: 0.80, timestamp: '2024-07-07T00:00:00' },
];

export const mockSummaries: Summary[] = [
  { id: 's1', userId: 'user1', targetUserId: 'user3', period: 'week', content: '小华本周工作比较忙，经常加班。但周末有去健身房锻炼，整体状态还不错。', keyPoints: ['工作繁忙', '坚持锻炼', '压力适中'], timestamp: '2024-07-07T00:00:00' },
  { id: 's2', userId: 'user3', targetUserId: 'user1', period: 'week', content: '爸爸本周血压有些偏高，医生建议调整饮食。每天坚持打太极拳，精神状态不错。', keyPoints: ['血压偏高', '坚持锻炼', '心情良好'], timestamp: '2024-07-07T00:00:00' },
  { id: 's3', userId: 'user3', targetUserId: 'user2', period: 'week', content: '妈妈本周去超市购物，喜欢看电视剧。但最近睡眠不太好，需要关注。', keyPoints: ['购物', '追剧', '睡眠问题'], timestamp: '2024-07-07T00:00:00' },
];

export const mockReminders: Reminder[] = [
  { id: 'r1', userId: 'user3', targetUserId: 'user1', type: 'health', message: '爸爸的血压药快吃完了，记得提醒他去药店购买', dueDate: '2024-07-10', completed: false, createdAt: '2024-07-06' },
  { id: 'r2', userId: 'user3', targetUserId: 'user2', type: 'birthday', message: '妈妈的生日快到了，准备礼物', dueDate: '2024-07-20', completed: false, createdAt: '2024-07-05' },
  { id: 'r3', userId: 'user3', targetUserId: 'user1', type: 'communication', message: '已经三天没和爸爸通话了', dueDate: '2024-07-07', completed: false, createdAt: '2024-07-07' },
];

export const mockTopics: TopicSuggestion[] = [
  { id: 't1', userId: 'user3', targetUserId: 'user1', topic: '最近的血压控制情况', reason: '爸爸血压偏高，关心他的健康状况', confidence: 0.95, timestamp: '2024-07-07T00:00:00' },
  { id: 't2', userId: 'user3', targetUserId: 'user1', topic: '太极拳练习心得', reason: '爸爸每天练习太极拳，可以交流锻炼体会', confidence: 0.75, timestamp: '2024-07-07T00:00:00' },
  { id: 't3', userId: 'user3', targetUserId: 'user2', topic: '最近看的电视剧', reason: '妈妈喜欢看家庭伦理剧，可以聊聊剧情', confidence: 0.80, timestamp: '2024-07-07T00:00:00' },
  { id: 't4', userId: 'user3', targetUserId: 'user2', topic: '睡眠改善方法', reason: '妈妈最近睡眠不好，可以分享一些助眠技巧', confidence: 0.85, timestamp: '2024-07-07T00:00:00' },
];

export const mockCommunications: CommunicationRecord[] = [
  { id: 'c1', userId: 'user3', targetUserId: 'user1', type: 'call', duration: 15, timestamp: '2024-07-04T20:00:00' },
  { id: 'c2', userId: 'user3', targetUserId: 'user2', type: 'message', content: '妈，最近身体还好吗？', timestamp: '2024-07-05T10:00:00' },
  { id: 'c3', userId: 'user1', targetUserId: 'user3', type: 'video', duration: 30, timestamp: '2024-07-03T19:00:00' },
];
