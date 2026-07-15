import { Request, Response } from 'express';
import { mockMemories } from '../data/mockData';
import { Memory } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const getAllMemories = (req: Request, res: Response) => {
  res.json(mockMemories);
};

export const getMemoriesByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  const memories = mockMemories.filter(m => m.userId === userId);
  res.json(memories);
};

export const getMemoriesByType = (req: Request, res: Response) => {
  const { userId, type } = req.params;
  const memories = mockMemories.filter(m => m.userId === userId && m.type === type);
  res.json(memories);
};

export const createMemory = (req: Request, res: Response) => {
  const { userId, type, content, importance } = req.body;
  
  const newMemory: Memory = {
    id: uuidv4(),
    userId,
    type: type as Memory['type'],
    content,
    timestamp: new Date().toISOString(),
    importance: (importance || 'medium') as Memory['importance'],
  };
  
  mockMemories.push(newMemory);
  res.status(201).json(newMemory);
};

export const updateMemory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, importance } = req.body;
  
  const memoryIndex = mockMemories.findIndex(m => m.id === id);
  if (memoryIndex !== -1) {
    mockMemories[memoryIndex] = {
      ...mockMemories[memoryIndex],
      content: content || mockMemories[memoryIndex].content,
      importance: (importance || mockMemories[memoryIndex].importance) as Memory['importance'],
    };
    res.json(mockMemories[memoryIndex]);
  } else {
    res.status(404).json({ message: '记忆记录不存在' });
  }
};

export const deleteMemory = (req: Request, res: Response) => {
  const { id } = req.params;
  const memoryIndex = mockMemories.findIndex(m => m.id === id);
  
  if (memoryIndex !== -1) {
    const deleted = mockMemories.splice(memoryIndex, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: '记忆记录不存在' });
  }
};
