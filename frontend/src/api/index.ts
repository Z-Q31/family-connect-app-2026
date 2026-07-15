import axios from 'axios';
import { User, Memory, Insight, Summary, Reminder, TopicSuggestion, CommunicationRecord, CommunicationStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = (name: string, role: 'parent' | 'child') => 
  api.post('/login', { name, role });

export const getUserById = (id: string) => 
  api.get<User>(`/users/${id}`);

export const getFamilyMembers = (familyId: string) => 
  api.get<User[]>(`/users/family/${familyId}`);

export const getChildren = (familyId: string) => 
  api.get<User[]>(`/users/family/${familyId}/children`);

export const getParents = (familyId: string) => 
  api.get<User[]>(`/users/family/${familyId}/parents`);

export const getMemoriesByUserId = (userId: string) => 
  api.get<Memory[]>(`/memories/user/${userId}`);

export const createMemory = (data: Omit<Memory, 'id' | 'timestamp'>) => 
  api.post<Memory>('/memories', data);

export const getInsights = (userId: string) => 
  api.get<Insight[]>(`/insights/user/${userId}`);

export const getSummaries = (userId: string) => 
  api.get<Summary[]>(`/summaries/user/${userId}`);

export const getTopics = (userId: string) => 
  api.get<TopicSuggestion[]>(`/topics/user/${userId}`);

export const generateAnalysis = (targetUserId: string, userId: string) => 
  api.post(`/analysis/generate/${targetUserId}`, { userId });

export const generateWeeklySummary = (targetUserId: string, userId: string) =>
  api.post(`/analysis/summary/${targetUserId}`, { userId });

export const generateTopicSuggestions = (targetUserId: string, userId: string) =>
  api.post(`/analysis/topics/${targetUserId}`, { userId });

export const getReminders = (userId: string) => 
  api.get<Reminder[]>(`/reminders/user/${userId}`);

export const getPendingReminders = (userId: string) => 
  api.get<Reminder[]>(`/reminders/user/${userId}/pending`);

export const createReminder = (data: Omit<Reminder, 'id' | 'completed' | 'createdAt' | 'notified'>) => 
  api.post<Reminder>('/reminders', data);

export const completeReminder = (id: string) => 
  api.put(`/reminders/${id}/complete`);

export const getCommunications = (userId: string) => 
  api.get<CommunicationRecord[]>(`/communications/user/${userId}`);

export const createCommunication = (data: Omit<CommunicationRecord, 'id' | 'timestamp'>) => 
  api.post<CommunicationRecord>('/communications', data);

export const getCommunicationStats = (userId: string) => 
  api.get<CommunicationStats>(`/communications/stats/${userId}`);
