
import React, { useState, useEffect, useRef } from 'react';
import { CURRENT_USER } from '../constants';
import { Experience, User as UserType } from '../types';
import { geminiService } from '../services/geminiService';
import { Camera, Edit2, Plus, Sparkles, Loader2, MapPin, Briefcase, X, Trash2 } from 'lucide-react';
import { storage, STORAGE_KEYS } from '../services/storage';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserType>(storage.load<UserType>(STORAGE_KEYS.USER, CURRENT_USER));
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditAbout, setShowEditAbout] = useState(false);
  const [showEditExperience, setShowEditExperience] = useState<Experience | null>(null);
  const [showAddExperience, setShowAddExperience] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    storage.save(STORAGE_KEYS.USER, user);
  }, [user]);

  const generateAIAbout = async () => {
    setIsGenerating(true);
    const result = await geminiService.generateProfileSummary(user.headline);
    setUser({ ...user, about: result });
    setIsGenerating(false);
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({
      ...user,
      name: formData.get('name') as string,
      headline: formData.get('headline') as string
    });
    setShowEditProfile(false);
  };

  const handleUpdateAbout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({ ...user, about: formData.get('about') as string });
    setShowEditAbout(false);
  };

  const handleAddExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExp: Experience = {
      id: `e${Date.now()}`,
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      type: formData.get('type') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      description: formData.get('description') as string,
    };
    setUser({ ...user, experiences: [newExp, ...user.experiences] });
    setShowAddExperience(false);
  };

  const handleEditExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated = user.experiences.map(exp => exp.id === showEditExperience?.id ? {
      ...exp,
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      type: formData.get('type') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      description: formData.get('description') as string,
    } : exp);
    setUser({ ...user, experiences: updated });
    setShowEditExperience(null);
  };

  const deleteExperience = (id: string) => {
    setUser({ ...user, experiences: user.experiences.filter(e => e.id !== id) });
    setShowEditExperience(null);
  };

  const handleImageChange = (type: 'avatar' | 'cover') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, [type === 'avatar' ? 'avatar' : 'coverImage']: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 animate-in fade-in duration-700">
      <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleImageChange('avatar')} />
      <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleImageChange('cover')} />

      {/* Hero Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm relative">
        <div className="h-48 relative bg-gradient-to-r from-slate-200 to-blue-200">
           <img src={user.coverImage} className="w-full h-full object-cover" alt="Cover" />
           <button onClick={() => coverInputRef.current?.click()} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100">
             <Camera className="w-5 h-5 text-blue-600" />
           </button>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="relative -mt-24 inline-block">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover bg-white"
            />
            <button onClick={() => avatarInputRef.current?.click()} className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow border border-gray-200 hover:bg-gray-50">
               <Camera className="w-4 h-4 text-blue-600" />
            </button>
          </div>
          
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <button onClick={() => setShowEditProfile(true)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><Edit2 className="w-4 h-4 text-gray-600" /></button>
              </div>
              <p className="text-lg text-gray-700 mt-1">{user.headline}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco Bay Area</span>
                <span>•</span>
                <button className="text-blue-600 font-bold hover:underline">Contact info</button>
              </div>
              <p className="text-sm text-blue-600 font-bold mt-2 hover:underline cursor-pointer">
                {user.connections} connections
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">About</h2>
          <div className="flex gap-2">
            <button 
              onClick={generateAIAbout}
              disabled={isGenerating}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full text-sm font-bold border border-blue-200 disabled:opacity-50 transition-all active:scale-95"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              AI Polish
            </button>
            <button onClick={() => setShowEditAbout(true)} className="p-2 hover:bg-gray-100 rounded-full"><Edit2 className="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {user.about}
        </p>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Experience</h2>
          <div className="flex gap-2">
            <button onClick={() => setShowAddExperience(true)} className="p-2 hover:bg-gray-100 rounded-full"><Plus className="w-6 h-6 text-gray-600" /></button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {user.experiences.map(exp => (
            <div key={exp.id} className="flex gap-4 group">
              <div className="w-12 h-12 bg-gray-100 rounded shrink-0 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 relative">
                <button onClick={() => setShowEditExperience(exp)} className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-full transition-opacity"><Edit2 className="w-4 h-4 text-gray-600" /></button>
                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                <p className="text-sm text-gray-800">{exp.company} • {exp.type}</p>
                <p className="text-xs text-gray-500 mt-1">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm text-gray-700 mt-3 whitespace-pre-wrap">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit About Modal */}
      {showEditAbout && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleUpdateAbout} className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Edit About</h2>
              <button type="button" onClick={() => setShowEditAbout(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-bold text-gray-700 mb-1">About Summary</label>
              <textarea required name="about" defaultValue={user.about} rows={8} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="p-4 border-t flex justify-end">
              <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Add/Edit Experience Modal */}
      {(showAddExperience || showEditExperience) && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={showAddExperience ? handleAddExperience : handleEditExperience} className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">{showAddExperience ? 'Add Experience' : 'Edit Experience'}</h2>
              <button type="button" onClick={() => { setShowAddExperience(false); setShowEditExperience(null); }} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                <input required name="role" defaultValue={showEditExperience?.role} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Company</label>
                <input required name="company" defaultValue={showEditExperience?.company} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Type (e.g. Full-time)</label>
                <input required name="type" defaultValue={showEditExperience?.type} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                  <input required name="startDate" defaultValue={showEditExperience?.startDate} placeholder="MM-YYYY" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                  <input required name="endDate" defaultValue={showEditExperience?.endDate} placeholder="MM-YYYY or Present" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea name="description" defaultValue={showEditExperience?.description} rows={4} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div className="p-4 border-t flex justify-between">
              {showEditExperience && (
                <button type="button" onClick={() => deleteExperience(showEditExperience.id)} className="text-red-600 font-bold flex items-center gap-1 px-4 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-4 h-4" /> Delete</button>
              )}
              <div className="flex-1 flex justify-end gap-2">
                 <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow">Save</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Edit Intro Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleUpdateProfile} className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Edit Intro</h2>
              <button type="button" onClick={() => setShowEditProfile(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input required name="name" defaultValue={user.name} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Headline</label>
                <textarea required name="headline" defaultValue={user.headline} rows={3} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
