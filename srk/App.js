import React, { useState, useEffect } from 'react';

// --- ИЗОБРАЖЕНИЯ ДЛЯ ПОЛНОГО ПОГРУЖЕНИЯ ---
const IMAGES = {
  castle: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&w=400&q=80",
  sawmill: "https://images.unsplash.com/photo-1516393437171-87893963495d?auto=format&fit=crop&w=400&q=80",
  quarry: "https://images.unsplash.com/photo-1515549833467-41313e993fb1?auto=format&fit=crop&w=400&q=80",
  map_bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
};

const App = () => {
  // 1. СОСТОЯНИЕ РЕСУРСОВ (Реальное время)
  const [res, setRes] = useState({ wood: 200, stone: 100, gold: 50, gems: 10 });
  const [buildings, setBuildings] = useState({ sawmill: 1, quarry: 1, barracks: 0 });
  const [army, setArmy] = useState(0);
  const [view, setView] = useState('city'); // Переключение экранов
  const [logs, setLogs] = useState(["Королевство основано. Ждем ваших приказов."]);

  // 2. АВТО-ДОБЫЧА (Game Loop) - 1 тик в 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setRes(p => ({
        ...p,
        wood: p.wood + (buildings.sawmill * 5),
        stone: p.stone + (buildings.quarry * 3)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [buildings]);

  // 3. ФУНКЦИИ УПРАВЛЕНИЯ
  const log = (msg) => setLogs(p => [msg, ...p].slice(0, 4));

  const upgrade = (type, woodCost, stoneCost) => {
    if (res.wood >= woodCost && res.stone >= stoneCost) {
      setRes(p => ({ ...p, wood: p.wood - woodCost, stone: p.stone - stoneCost }));
      setBuildings(p => ({ ...p, [type]: p[type] + 1 }));
      log(`Улучшено: ${type}. Уровень теперь: ${buildings[type] + 1}`);
    } else {
      log("❌ Недостаточно ресурсов для постройки!");
    }
  };

  const trainTroops = () => {
    if (res.gold >= 20) {
      setRes(p => ({ ...p, gold: p.gold - 20 }));
      setArmy(p => p + 10);
      log("⚔️ Сформирован новый отряд (10 воинов)");
    }
  };

  // --- ЭКРАН 1: ГОРОД ---
  const City = () => (
    <div className="space-y-4 p-4">
      <div className="relative rounded-xl overflow-hidden h-48 border-2 border-amber-900 shadow-2xl">
        <img src={IMAGES.castle} className="w-full h-full object-cover" alt="Castle" />
        <div className="absolute inset-0 bg-black/40 flex items-end p-4">
          <h2 className="text-white text-2xl font-black italic">ЦИТАДЕЛЬ УР. {buildings.sawmill + buildings.quarry}</h2>
        </div>
      </div>
      rder border-red-500 text-xs font-bold">MAX BUILDINGS</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[400px] mx-auto min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans shadow-2xl border-x border-white/10">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ РЕСУРСОВ */}
      <div className="bg-black/80 p-3 grid grid-cols-4 gap-1 text-[11px] font-bold border-b border-amber-900/30 sticky top-0 z-50">
        <div className="text-center bg-slate-900 rounded p-1">🌲 <span className="text-amber-500">{Math.floor(res.wood)}</span></div>
        <div className="text-center bg-slate-900 rounded p-1">🪨 <span className="text-amber-500">{Math.floor(res.stone)}</span></div>
        <div className="text-center bg-slate-900 rounded p-1">💰 <span className="text-amber-500">{res.gold}</span></div>
        <div className="text-center bg-cyan-950 rounded p-1 border border-cyan-500/30">💎 <span className="text-cyan-400">{res.gems}</span></div>
      </div>

      {/* КОНТЕНТ */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <div className="flex justify-between items-center p-4">
            <span className="text-xs font-black uppercase tracking-tighter text-amber-600">Сервер: #001 RUIN</span>
            <span className="text-xs bg-red-900/50 px-2 py-1 rounded text-red-200 font-bold">🛡️ Армия: {army}</span>
        </div>

        {view === 'city' && <City />}
        {view === 'map' && <WorldMap />}
        {view === 'admin' && <Admin />}
      </div>

      {/* ЛОГИ (В РЕАЛЬНОМ ВРЕМЕНИ) */}
      <div className="bg-black p-3 border-t border-slate-800 h-24 text-[10px] font-mono">
        {logs.map((m, i) => (
          <div key={i} className={i === 0 ? "text-amber-400" : "text-gray-600"}>{`> ${m}`}</div>
        ))}
      </div>

      {/* ТАБ-БАР (НАВИГАЦИЯ) */}
      <div className="bg-slate-900 grid grid-cols-3 border-t border-white/10">
        <button onClick={() => setView('city')} className={`py-4 font-black text-xs ${view === 'city' ? 'bg-amber-700 text-white' : 'text-gray-500'}`}>ГОРОД</button>
        <button onClick={() => setView('map')} className={`py-4 font-black text-xs ${view === 'map' ? 'bg-amber-700 text-white' : 'text-gray-500'}`}>КАРТА</button>
        <button onClick={() => setView('admin')} className={`py-4 font-black text-xs ${view === 'admin' ? 'bg-red-800 text-white' : 'text-gray-500'}`}>АДМИН</button>
      </div>
    </div>
  );
};

export default App;
