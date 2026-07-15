import { useState, useEffect, useCallback } from 'react';
import { User, Reminder } from '../types';
import { useAuth } from '../context/AuthContext';
import { Header } from './Header';
import { FamilyList } from './FamilyList';
import { SummaryCard } from './SummaryCard';
import { InsightsCard } from './InsightsCard';
import { TopicSuggestionsCard } from './TopicSuggestionsCard';
import { RemindersCard } from './RemindersCard';
import { MemoryFeed } from './MemoryFeed';
import { AddMemoryModal } from './AddMemoryModal';
import { AddReminderModal } from './AddReminderModal';
import { ReminderNotification } from './ReminderNotification';
import { getPendingReminders, completeReminder } from '../api';

export const Dashboard = () => {
  const { user } = useAuth();
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notifiedReminders, setNotifiedReminders] = useState<Set<string>>(new Set());
  const [currentNotification, setCurrentNotification] = useState<Reminder | null>(null);

  const checkReminders = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data } = await getPendingReminders(user.id);
      setReminders(data);

      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const currentDate = now.toISOString().split('T')[0];

      for (const reminder of data) {
        if (notifiedReminders.has(reminder.id)) continue;
        
        const isDueDate = reminder.dueDate === currentDate;
        const isDueTime = reminder.remindTime ? reminder.remindTime === currentTime : true;
        
        if (isDueDate && isDueTime) {
          setCurrentNotification(reminder);
          setNotifiedReminders(prev => new Set(prev).add(reminder.id));
          break;
        }
      }
    } catch (error) {
      console.error('Failed to check reminders:', error);
    }
  }, [user, notifiedReminders]);

  useEffect(() => {
    checkReminders();
    const interval = setInterval(checkReminders, 30000);
    
    return () => clearInterval(interval);
  }, [checkReminders]);

  const handleCompleteNotification = async () => {
    if (currentNotification) {
      try {
        await completeReminder(currentNotification.id);
      } catch (error) {
        console.error('Failed to complete reminder:', error);
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {user.role === 'parent' ? '我的子女' : '我的父母'}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddReminder(true)}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center gap-2"
            >
              <span>🔔</span>
              <span>添加提醒</span>
            </button>
            <button
              onClick={() => setShowAddMemory(true)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all flex items-center gap-2"
            >
              <span>📝</span>
              <span>记录生活</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FamilyList
              onSelectMember={setSelectedMember}
              selectedMember={selectedMember}
            />
            {user.role === 'child' && (
              <div className="mt-4">
                <RemindersCard userId={user.id} onAddReminder={() => setShowAddReminder(true)} />
              </div>
            )}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <SummaryCard targetUser={selectedMember} userId={user.id} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightsCard targetUser={selectedMember} />
              <TopicSuggestionsCard targetUser={selectedMember} userId={user.id} />
            </div>

            <MemoryFeed targetUser={selectedMember} />

            {user.role === 'parent' && (
              <RemindersCard userId={user.id} onAddReminder={() => setShowAddReminder(true)} />
            )}
          </div>
        </div>
      </main>

      <AddMemoryModal
        isOpen={showAddMemory}
        onClose={() => setShowAddMemory(false)}
        userId={user.id}
      />

      <AddReminderModal
        isOpen={showAddReminder}
        onClose={() => setShowAddReminder(false)}
      />

      {currentNotification && (
        <ReminderNotification
          reminder={currentNotification}
          onClose={() => setCurrentNotification(null)}
          onComplete={handleCompleteNotification}
        />
      )}
    </div>
  );
};
