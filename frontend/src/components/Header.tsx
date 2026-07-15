import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">❤️</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">亲情沟通系统</h1>
            <p className="text-sm text-gray-500">
              {user?.role === 'parent' ? '父母端' : '子女端'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{user?.avatar}</span>
            <span className="font-medium text-gray-700">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all"
          >
            退出登录
          </button>
        </div>
      </div>
    </header>
  );
};
