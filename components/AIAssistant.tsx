
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Sparkles, Loader2, Send } from 'lucide-react';

interface AIAssistantProps {
  initialContent?: string;
  onApply: (content: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ initialContent = '', onApply }) => {
  const [prompt, setPrompt] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleImprove = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await geminiService.generatePostImprovement(prompt);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-blue-600 w-5 h-5" />
        <h3 className="font-semibold text-blue-900">AI Post Assistant</h3>
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What's on your mind? Type a rough draft here..."
        className="w-full bg-white border border-gray-200 rounded p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-3 min-h-[100px]"
      />

      <div className="flex justify-end">
        <button
          onClick={handleImprove}
          disabled={loading || !prompt.trim()}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-300"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Improve Draft
        </button>
      </div>

      {suggestion && (
        <div className="mt-4 p-3 bg-white border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2">
          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Suggested Post Content</p>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{suggestion}</p>
          <button
            onClick={() => onApply(suggestion)}
            className="mt-3 text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
          >
            Apply This Version
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
