import { Request, Response } from 'express';
import { mockReminders } from '../data/mockData';
import { Reminder } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const getAllReminders = (req: Request, res: Response) => {
  res.json(mockReminders);
};

export const getRemindersByUserId = (req: Request, res: Response) => {
  const { userId } = req.params;
  const reminders = mockReminders.filter(r => r.userId === userId);
  res.json(reminders);
};

export const getPendingReminders = (req: Request, res: Response) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split('T')[0];
  const pending = mockReminders.filter(
    r => r.userId === userId && !r.completed && r.dueDate >= today
  );
  res.json(pending);
};

export const createReminder = (req: Request, res: Response) => {
  const { userId, targetUserId, type, message, dueDate } = req.body;
  
  const newReminder: Reminder = {
    id: uuidv4(),
    userId,
    targetUserId,
    type: type as Reminder['type'],
    message,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString().split('T')[0],
  };
  
  mockReminders.push(newReminder);
  res.status(201).json(newReminder);
};

export const completeReminder = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const reminderIndex = mockReminders.findIndex(r => r.id === id);
  if (reminderIndex !== -1) {
    mockReminders[reminderIndex].completed = true;
    res.json(mockReminders[reminderIndex]);
  } else {
    res.status(404).json({ message: '提醒不存在' });
  }
};

export const deleteReminder = (req: Request, res: Response) => {
  const { id } = req.params;
  const reminderIndex = mockReminders.findIndex(r => r.id === id);
  
  if (reminderIndex !== -1) {
    const deleted = mockReminders.splice(reminderIndex, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: '提醒不存在' });
  }
};
