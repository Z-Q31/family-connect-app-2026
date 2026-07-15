import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'parent' | 'child'>('child');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(name, role);
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const presetUsers = role === 'parent' 
    ? [{ name: '张爸爸', role: 'parent' as const }, { name: '李妈妈', role: 'parent' as const }]
    : [{ name: '张小华', role: 'child' as const }, { name: '张小美', role: 'child' as const }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-primary-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">❤️</div>
          <h1 className="text-2xl font-bold text-gray-800">亲情沟通系统</h1>
          <p className="text-gray-500 mt-2">连接家人，温暖心灵</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">选择角色</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-3 px-4 rounded-xl border-2 transition-all ${
                  role === 'parent'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">👨‍🦳</div>
                <div className="font-medium">我是父母</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('child')}
                className={`py-3 px-4 rounded-xl border-2 transition-all ${
                  role === 'child'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">👨‍💼</div>
                <div className="font-medium">我是子女</div>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">选择账号</label>
            <div className="grid grid-cols-2 gap-3">
              {presetUsers.map((user) => (
                <button
                  key={user.name}
                  type="button"
                  onClick={() => setName(user.name)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all ${
                    name === user.name
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !name}
            className="w-full py-3 px-4 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '登录中...' : '进入系统'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Demo版本，选择预设账号即可体验
        </p>
      </div>
    </div>
  );
};
