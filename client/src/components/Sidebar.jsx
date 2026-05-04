import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  Gift, 
  Activity, 
  Trophy, 
  MapPin, 
  History, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  Recycle
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Scan, label: 'Scan Bin' },
    { icon: Gift, label: 'Rewards' },
    { icon: Activity, label: 'Activity' },
    { icon: Trophy, label: 'Leaderboard' },
    { icon: MapPin, label: 'Locations' },
    { icon: History, label: 'History' },
    { icon: Bell, label: 'Alerts' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="w-[260px] h-screen bg-black border-r border-white/[0.05] flex flex-col p-5 sticky top-0 z-50">
      <div className="flex items-center gap-3 mb-12 px-3 mt-4">
        <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
          <Recycle className="text-primary w-6 h-6" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white leading-none">Trash to Treasure</h1>
          <p className="text-[10px] text-[#424245] uppercase tracking-[0.1em] font-bold mt-1">Smart Systems</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
              item.active 
                ? 'bg-white/[0.08] text-white shadow-sm' 
                : 'text-[#86868b] hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} className={item.active ? 'text-primary' : 'text-[#86868b] group-hover:text-white'} />
            <span className="text-[14px] font-medium tracking-tight">{item.label}</span>
            {item.active && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>}
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/[0.05]">
        <button 
          onClick={() => { localStorage.clear(); window.location.href='/auth'; }}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[#86868b] hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-[14px] font-medium tracking-tight">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
