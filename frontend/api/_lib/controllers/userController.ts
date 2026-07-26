import { Request, Response } from 'express';
import { mockUsers } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (req: Request, res: Response) => {
  res.json(mockUsers);
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = mockUsers.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: '用户不存在' });
  }
};

export const getFamilyMembers = (req: Request, res: Response) => {
  const { familyId } = req.params;
  const members = mockUsers.filter(u => u.familyId === familyId);
  res.json(members);
};

export const getChildren = (req: Request, res: Response) => {
  const { familyId } = req.params;
  const children = mockUsers.filter(u => u.familyId === familyId && u.role === 'child');
  res.json(children);
};

export const getParents = (req: Request, res: Response) => {
  const { familyId } = req.params;
  const parents = mockUsers.filter(u => u.familyId === familyId && u.role === 'parent');
  res.json(parents);
};

export const login = (req: Request, res: Response) => {
  const { name, role } = req.body;
  const user = mockUsers.find(u => u.name === name && u.role === role);
  if (user) {
    res.json({ user, token: uuidv4() });
  } else {
    res.status(401).json({ message: '用户名或角色不正确' });
  }
};
