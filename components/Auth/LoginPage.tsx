
import React, { useState } from 'react';
import { storage, STORAGE_KEYS } from '../../services/storage';
import { CURRENT_USER } from '../../constants';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = storage.load<any[]>(STORAGE_KEYS.USERS_LIST, [
      { ...CURRENT_USER, email: 'test@example.com', password: 'password123' }
    ]);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      storage.save(STORAGE_KEYS.USER, user);
      storage.save(STORAGE_KEYS.AUTH_TOKEN, true);
      onLoginSuccess();
    } else {
      setError('Invalid email or password. Hint: test@example.com / password123');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-4">
      <div className="flex items-center gap-1 mb-8">
        <span className="text-blue-600 font-bold text-3xl">Linked</span>
        <div className="bg-blue-600 text-white rounded px-1 font-bold text-2xl">in</div>
      </div>

      <div className="w-full max-w-[400px] bg-white p-8 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Sign in</h1>
        <p className="text-sm text-gray-600 mb-6">Stay updated on your professional world</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-100">{error}</div>}
          
          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email or Phone"
              className="border border-gray-400 rounded p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 rounded p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="text-blue-600 font-bold text-sm hover:underline w-fit mt-1">
            Forgot password?
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-colors mt-2"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <button className="w-full border border-gray-500 text-gray-600 font-semibold py-2.5 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-4">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
          Sign in with Google
        </button>

        <p className="text-center text-gray-900">
          New to LinkedIn?{' '}
          <button 
            onClick={onSwitchToRegister}
            className="text-blue-600 font-bold hover:underline"
          >
            Join now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
