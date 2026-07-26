import { Request, Response } from 'express';
import { mockCommunications } from '../data/mockData';
import { CommunicationRecord } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const getAllCommunications = (req: Request, res: Response) => {
  res.json(mockCommunications);
};

export const getCommunicationsByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  const communications = mockCommunications.filter(
    c => c.userId === userId || c.targetUserId === userId
  );
  res.json(communications);
};

export const createCommunication = (req: Request, res: Response) => {
  const { userId, targetUserId, type, duration, content } = req.body;
  
  const newRecord: CommunicationRecord = {
    id: uuidv4(),
    userId,
    targetUserId,
    type: type as CommunicationRecord['type'],
    duration,
    content,
    timestamp: new Date().toISOString(),
  };
  
  mockCommunications.push(newRecord);
  res.status(201).json(newRecord);
};

export const getCommunicationStats = (req: Request, res: Response) => {
  const { userId } = req.params;
  const communications = mockCommunications.filter(
    c => c.userId === userId || c.targetUserId === userId
  );
  
  const stats = {
    totalCalls: communications.filter(c => c.type === 'call').length,
    totalMessages: communications.filter(c => c.type === 'message').length,
    totalVideos: communications.filter(c => c.type === 'video').length,
    totalDuration: communications.reduce((sum, c) => sum + (c.duration || 0), 0),
    lastCommunication: communications.length > 0 
      ? communications[communications.length - 1].timestamp 
      : null,
  };
  
  res.json(stats);
};
