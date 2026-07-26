import { Request, Response } from 'express';
import { mockMemories, mockInsights, mockSummaries, mockTopics } from '../data/mockData';
import { AnalysisEngine } from '../ai/analysisEngine';

export const getInsights = (req: Request, res: Response) => {
  const { userId } = req.params;
  const insights = mockInsights.filter(i => i.userId === userId || i.targetUserId === userId);
  res.json(insights);
};

export const getSummaries = (req: Request, res: Response) => {
  const { userId } = req.params;
  const summaries = mockSummaries.filter(s => s.userId === userId || s.targetUserId === userId);
  res.json(summaries);
};

export const getTopics = (req: Request, res: Response) => {
  const { userId } = req.params;
  const topics = mockTopics.filter(t => t.userId === userId || t.targetUserId === userId);
  res.json(topics);
};

export const generateAnalysis = (req: Request, res: Response) => {
  const { targetUserId } = req.params;
  const memories = mockMemories.filter(m => m.userId === targetUserId);
  
  const { insights, summary, topics } = AnalysisEngine.analyzeAll(memories);
  
  res.json({
    insights: insights.map(i => ({ ...i, userId: req.body.userId || '' })),
    summary: { ...summary, userId: req.body.userId || '' },
    topics: topics.map(t => ({ ...t, userId: req.body.userId || '' })),
  });
};

export const generateWeeklySummary = (req: Request, res: Response) => {
  const { targetUserId } = req.params;
  const memories = mockMemories.filter(m => m.userId === targetUserId);
  const summary = AnalysisEngine.generateSummary(memories, 'week');
  
  res.json({ ...summary, userId: req.body.userId || '' });
};

export const generateTopicSuggestions = (req: Request, res: Response) => {
  const { targetUserId } = req.params;
  const memories = mockMemories.filter(m => m.userId === targetUserId);
  const topics = AnalysisEngine.generateTopicSuggestions(memories, targetUserId);
  
  res.json(topics.map(t => ({ ...t, userId: req.body.userId || '' })));
};
