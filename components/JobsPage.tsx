
import React, { useState } from 'react';
import { MOCK_JOBS } from '../constants';
import { Job } from '../types';
import { Briefcase, Settings, List, MapPin, X, ChevronRight, Info } from 'lucide-react';

const JobsPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [hasApplied, setHasApplied] = useState<string[]>([]);
  const [jobsList, setJobsList] = useState(MOCK_JOBS);
  const [visibleCount, setVisibleCount] = useState(2);

  const handleApply = (jobId: string) => {
    setHasApplied([...hasApplied, jobId]);
    alert("Application submitted successfully!");
  };

  const handlePostJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJob: Job = {
      id: `j${Date.now()}`,
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      postedDate: 'Just now',
      type: 'Full-time',
      logo: 'https://picsum.photos/seed/newjob/100/100',
      description: formData.get('description') as string
    };
    setJobsList([newJob, ...jobsList]);
    setShowPostJob(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-20">
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:underline group">
              <List className="w-5 h-5" />
              <span className="text-sm font-semibold">My Jobs</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:underline">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-semibold">Preferences</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:underline">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-semibold">Interview Prep</span>
            </div>
          </div>
          <div className="border-t border-gray-100 p-4">
             <button 
              onClick={() => setShowPostJob(true)}
              className="w-full border-2 border-blue-600 text-blue-600 font-semibold rounded-full py-1.5 hover:bg-blue-50 transition-colors"
             >
               Post a free job
             </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
          <p className="text-sm text-gray-500 mb-6">Based on your profile and search history</p>
          
          <div className="flex flex-col gap-6">
            {jobsList.slice(0, visibleCount).map(job => (
              <div key={job.id} onClick={() => setSelectedJob(job)} className={`flex gap-4 group cursor-pointer p-2 rounded-lg transition-colors ${selectedJob?.id === job.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <img src={job.logo} alt={job.company} className="w-14 h-14 rounded border border-gray-100" />
                <div className="flex-1 border-b border-gray-100 pb-6">
                  <h3 className="font-bold text-blue-600 hover:underline group-hover:text-blue-800">{job.title}</h3>
                  <p className="text-sm text-gray-900 mt-0.5">{job.company}</p>
                  <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-green-700 font-bold bg-green-50 px-1 rounded">Actively hiring</span>
                    <span className="text-xs text-gray-400">{job.postedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {visibleCount < jobsList.length && (
            <button 
              onClick={() => setVisibleCount(jobsList.length)}
              className="w-full text-center text-blue-600 font-bold hover:bg-blue-50 py-3 rounded transition-colors mt-2 flex items-center justify-center gap-1"
            >
              Show more <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Job Details</h2>
              <button onClick={() => setSelectedJob(null)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex gap-4 mb-6">
                <img src={selectedJob.logo} alt={selectedJob.company} className="w-20 h-20 rounded shadow-sm border border-gray-100" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h1>
                  <p className="text-lg text-gray-700">{selectedJob.company} • {selectedJob.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedJob.postedDate} • {hasApplied.includes(selectedJob.id) ? 'Applied' : 'Over 100 applicants'}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-8">
                {hasApplied.includes(selectedJob.id) ? (
                  <button disabled className="bg-gray-400 text-white font-bold px-8 py-2 rounded-full cursor-not-allowed">Application Sent</button>
                ) : (
                  <button 
                    onClick={() => handleApply(selectedJob.id)}
                    className="bg-blue-600 text-white font-bold px-8 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Apply Now
                  </button>
                )}
                <button className="border border-blue-600 text-blue-600 font-bold px-8 py-2 rounded-full hover:bg-blue-50 transition-colors">Save</button>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">About the job</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handlePostJob} className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Post a new job</h2>
              <button type="button" onClick={() => setShowPostJob(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Job Title</label>
                <input required name="title" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior Frontend Engineer" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Company</label>
                <input required name="company" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                <input required name="location" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Remote / London, UK" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea required name="description" rows={4} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What does this role entail?" />
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow">Post for free</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
