import React from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';

const Header = ({ user }) => {
  return (
    <header className="flex items-center justify-between h-[80px] px-10 bg-black/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/[0.05]">
      <div className="flex flex-col">
        <h2 className="text-[20px] font-semibold tracking-tight text-white leading-tight">
          Welcome back, <span className="green-gradient">{user?.name?.split(' ')[0] || 'User'}</span>
        </h2>
        <p className="text-[13px] text-[#86868b] tracking-tight">Everything looks great today.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.05] px-4 py-2 rounded-full w-[280px] group transition-all focus-within:bg-white/[0.08] focus-within:border-white/[0.1] focus-within:w-[320px]">
          <Search size={16} className="text-[#86868b] group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-transparent border-none outline-none text-[13px] text-white placeholder-[#424245] w-full"
          />
          <kbd className="hidden sm:flex items-center gap-1 bg-white/[0.05] border border-white/[0.1] px-1.5 py-0.5 rounded text-[9px] text-[#86868b]">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-[#86868b] hover:text-white hover:bg-white/[0.05] rounded-full transition-all relative">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-[3px] border-black"></span>
          </button>
        </div>

        <div className="h-8 w-[1px] bg-white/[0.1] mx-1"></div>

        <button className="flex items-center gap-3 p-1.5 pl-1.5 pr-3 rounded-full hover:bg-white/[0.05] transition-all group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-[13px] font-bold shadow-lg ring-2 ring-white/[0.05]">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[13px] font-semibold text-white leading-none">{user?.name || 'Student'}</span>
            <span className="text-[10px] text-[#86868b] font-medium tracking-wide uppercase mt-0.5">Tier 1</span>
          </div>
          <ChevronDown size={14} className="text-[#424245] group-hover:text-[#86868b] transition-colors ml-1" />
        </button>
      </div>
    </header>
  );
};

export default Header;
