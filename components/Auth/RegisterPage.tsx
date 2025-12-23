
import React, { useState } from 'react';
import { storage, STORAGE_KEYS } from '../../services/storage';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const users = storage.load<any[]>(STORAGE_KEYS.USERS_LIST, []);
    
    if (users.some(u => u.email === email)) {
      setError('Email already exists. Please login instead.');
      return;
    }

    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      headline: 'New Member at LinkedIn Clone',
      avatar: `https://picsum.photos/seed/${Date.now()}/150/150`,
      coverImage: 'https://picsum.photos/seed/bg/800/200',
      connections: 0,
      profileViews: 0,
      about: "I'm new here! Just joined the community.",
      experiences: []
    };

    const updatedUsers = [...users, newUser];
    storage.save(STORAGE_KEYS.USERS_LIST, updatedUsers);
    storage.save(STORAGE_KEYS.USER, newUser);
    storage.save(STORAGE_KEYS.AUTH_TOKEN, true);
    onRegisterSuccess();
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex flex-col items-center pt-8 px-4">
      <div className="flex items-center gap-1 mb-6">
        <span className="text-blue-600 font-bold text-3xl">Linked</span>
        <div className="bg-blue-600 text-white rounded px-1 font-bold text-2xl">in</div>
      </div>
      
      <h1 className="text-3xl text-center mb-8 font-light text-gray-800">Make the most of your professional life</h1>

      <div className="w-full max-w-[400px] bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-100">{error}</div>}
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Full name</label>
            <input
              type="text"
              className="border border-gray-400 rounded p-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="border border-gray-400 rounded p-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Password (6 or more characters)</label>
            <input
              type="password"
              className="border border-gray-400 rounded p-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-xs text-center text-gray-500 leading-relaxed px-4">
            By clicking Agree & Join, you agree to the LinkedIn <span className="text-blue-600 font-bold cursor-pointer">User Agreement</span>, <span className="text-blue-600 font-bold cursor-pointer">Privacy Policy</span>, and <span className="text-blue-600 font-bold cursor-pointer">Cookie Policy</span>.
          </p>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-colors mt-2"
          >
            Agree & Join
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        <button className="w-full border border-gray-500 text-gray-600 font-semibold py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-4">
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <p className="text-center text-gray-900 mt-4">
          Already on LinkedIn?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-blue-600 font-bold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>

      <p className="mt-8 text-sm text-gray-800">
        Looking to create a page for a business? <span className="text-blue-600 font-bold hover:underline cursor-pointer">Get help</span>
      </p>
    </div>
  );
};

export default RegisterPage;
