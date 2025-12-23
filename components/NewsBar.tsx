
import React from 'react';
import { Info } from 'lucide-react';

const NewsBar: React.FC = () => {
  const news = [
    { id: 1, title: "The tech world's latest pivot", readers: "3d ago • 12,432 readers" },
    { id: 2, title: "Is the 4-day week working?", readers: "2d ago • 8,921 readers" },
    { id: 3, title: "Gemini 3 Pro performance gains", readers: "5h ago • 5,612 readers" },
    { id: 4, title: "Remote work trends in 2025", readers: "12h ago • 21,908 readers" },
    { id: 5, title: "Investing in soft skills", readers: "1d ago • 7,543 readers" }
  ];

  return (
    <aside className="hidden xl:flex flex-col gap-2 w-72 shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">LinkedIn News</h3>
          <Info className="w-4 h-4 text-gray-600" />
        </div>
        <ul className="flex flex-col gap-3">
          {news.map(item => (
            <li key={item.id} className="cursor-pointer hover:bg-gray-100 p-1 -mx-1 rounded transition-colors group">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 group-hover:bg-blue-600" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.readers}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="text-sm font-semibold text-gray-500 mt-4 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
          Show more
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm sticky top-20">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-2 mt-2">
          {['About', 'Accessibility', 'Help Center', 'Privacy & Terms', 'Ad Choices', 'Advertising', 'Business Services', 'Get the LinkedIn app', 'More'].map(link => (
            <a key={link} href="#" className="text-[10px] text-gray-500 hover:text-blue-600 hover:underline">{link}</a>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          <span className="text-blue-600 font-bold text-xs">Linked</span>
          <div className="bg-blue-600 text-white rounded px-0.5 font-bold text-[10px]">in</div>
          <span className="text-[10px] text-gray-500">Corporation © 2025</span>
        </div>
      </div>
    </aside>
  );
};

export default NewsBar;
