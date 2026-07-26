export interface User {
  id: string;
  name: string;
  role: 'parent' | 'child';
  avatar: string;
  familyId: string;
  createdAt: string;
}

export interface Memory {
  id: string;
  userId: string;
  type: 'daily' | 'health' | 'mood' | 'activity' | 'preference';
  content: string;
  timestamp: string;
  importance: 'low' | 'medium' | 'high';
}

export interface Family {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
}

export interface Insight {
  id: string;
  userId: string;
  targetUserId: string;
  type: 'emotion' | 'health' | 'activity' | 'preference' | 'relationship';
  content: string;
  confidence: number;
  timestamp: string;
}

export interface Summary {
  id: string;
  userId: string;
  targetUserId: string;
  period: 'day' | 'week' | 'month';
  content: string;
  keyPoints: string[];
  timestamp: string;
}

export interface Reminder {
  id: string;
  userId: string;
  targetUserId: string;
  type: 'birthday' | 'anniversary' | 'health' | 'communication' | 'custom';
  message: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface TopicSuggestion {
  id: string;
  userId: string;
  targetUserId: string;
  topic: string;
  reason: string;
  confidence: number;
  timestamp: string;
}

export interface CommunicationRecord {
  id: string;
  userId: string;
  targetUserId: string;
  type: 'call' | 'message' | 'video';
  duration?: number;
  content?: string;
  timestamp: string;
}
