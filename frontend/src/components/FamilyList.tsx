import { useState, useEffect } from 'react';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';
import { getFamilyMembers } from '../api';

interface FamilyListProps {
  onSelectMember: (member: User) => void;
  selectedMember: User | null;
}

export const FamilyList = ({ onSelectMember, selectedMember }: FamilyListProps) => {
  const { user } = useAuth();
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!user?.familyId) return;
      const { data } = await getFamilyMembers(user.familyId);
      setMembers(data.filter((m: User) => m.id !== user.id));
    };
    fetchMembers();
  }, [user]);

  const otherRole = user?.role === 'parent' ? 'child' : 'parent';
  const roleLabel = otherRole === 'parent' ? '父母' : '子女';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">我的{roleLabel}</h2>
      <div className="space-y-2">
        {members.map((member) => (
          <button
            key={member.id}
            onClick={() => onSelectMember(member)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              selectedMember?.id === member.id
                ? 'bg-primary-50 border-2 border-primary-200'
                : 'hover:bg-gray-50 border-2 border-transparent'
            }`}
          >
            <span className="text-3xl">{member.avatar}</span>
            <div className="text-left flex-1">
              <div className="font-medium text-gray-800">{member.name}</div>
              <div className="text-xs text-gray-500">
                {member.role === 'parent' ? '父母' : '子女'}
              </div>
            </div>
            {selectedMember?.id === member.id && (
              <span className="text-primary-500">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
