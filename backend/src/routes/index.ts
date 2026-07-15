import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as memoryController from '../controllers/memoryController';
import * as analysisController from '../controllers/analysisController';
import * as reminderController from '../controllers/reminderController';
import * as communicationController from '../controllers/communicationController';

const router = Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/family/:familyId', userController.getFamilyMembers);
router.get('/users/family/:familyId/children', userController.getChildren);
router.get('/users/family/:familyId/parents', userController.getParents);
router.post('/login', userController.login);

router.get('/memories', memoryController.getAllMemories);
router.get('/memories/user/:userId', memoryController.getMemoriesByUserId);
router.get('/memories/user/:userId/type/:type', memoryController.getMemoriesByType);
router.post('/memories', memoryController.createMemory);
router.put('/memories/:id', memoryController.updateMemory);
router.delete('/memories/:id', memoryController.deleteMemory);

router.get('/insights/user/:userId', analysisController.getInsights);
router.get('/summaries/user/:userId', analysisController.getSummaries);
router.get('/topics/user/:userId', analysisController.getTopics);
router.post('/analysis/generate/:targetUserId', analysisController.generateAnalysis);
router.post('/analysis/summary/:targetUserId', analysisController.generateWeeklySummary);
router.post('/analysis/topics/:targetUserId', analysisController.generateTopicSuggestions);

router.get('/reminders', reminderController.getAllReminders);
router.get('/reminders/user/:userId', reminderController.getRemindersByUserId);
router.get('/reminders/user/:userId/pending', reminderController.getPendingReminders);
router.post('/reminders', reminderController.createReminder);
router.put('/reminders/:id/complete', reminderController.completeReminder);
router.delete('/reminders/:id', reminderController.deleteReminder);

router.get('/communications', communicationController.getAllCommunications);
router.get('/communications/user/:userId', communicationController.getCommunicationsByUserId);
router.post('/communications', communicationController.createCommunication);
router.get('/communications/stats/:userId', communicationController.getCommunicationStats);

export default router;
