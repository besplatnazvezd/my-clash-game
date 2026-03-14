import React, { useState, useEffect } from 'react';
import { Sword, Shield, Gem, Home, Map as MapIcon, Zap, Coins, Skull, Pickaxe, Users, Trophy, Target, Crown, Beaker, Briefcase, ChevronRight } from 'lucide-react';

// РЕАЛЬНЫЕ АССЕТЫ ВЫСОКОГО КАЧЕСТВА
const ASSETS = {
  castle: "https://images.unsplash.com/photo-1599408162172-8982c0394183?auto=format&fit=crop&q=80&w=1000",
  hero: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  map: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?auto=format&fit=crop&q=80&w=1600",
  artifact: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=400",
  battleBg: "https://images.unsplash.com/photo-1519074063912-ad2f662a1994?auto=format&fit=crop&q=80&w=1000"
};

export default function App() {
  const [res, setRes] = useState({ gold: 50000, wood: 20000, stone: 15000, rubies: 2500, army: 1200, power: 8500 });
  const [hero, setHero] = useState({ lvl: 42, name: "Александр Великий", xp: 85, atk: 450, def: 320 });
  const [view, setView] = useState('city');
  const [activeBattle, setActiveBattle] = useState(null);
  const [inventory, setInventory] = useState([
    { id: 1, name: "Меч Короля", bonus: "+50 Атака", img: ASSETS.artifact },
    { id: 2, name: "Щит Титана", bonus: "+30 Защита", img: ASSETS.artifact }
  ]);

  // Пассивный доход и налоги
  useEffect(() => {
    const timer = setInterval(() => {
      setRes(prev => ({
        ...prev,
        gold: prev.gold + 150,
        wood: prev.wood + 80,
        stone: prev.stone + 40
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#050505] text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* ПРЕМИУМ ХЕДЕР */}
      <div className="bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] border-b border-yellow-600/30 p-3 grid grid-cols-4 gap-2 z-50 shadow-2xl">
        <ResItem icon={<Coins className="text-yellow-500" size={14}/>} val={res.gold} color="text-yellow-500" />
        <ResItem icon={<Zap className="text-orange-400" size={14}/>} val={res.wood} color="text-orange-400" />
        <ResItem icon={<Users className="text-blue-400" size={14}/>} val={res.army} color="text-blue-400" />
        <ResItem icon={<Gem className="text-cyan-400" size={14}/>} val={res.rubies} color="text-cyan-400" />
      </div>

      <main className="flex-1 relative overflow-hidden">
                {/* ВИД: ЦИТАДЕЛЬ */}
        {view === 'city' && (
          <div className="h-full w-full relative animate-in fade-in duration-1000">
            <img src={ASSETS.castle} className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="relative z-10 p-6 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-5xl font-black italic uppercase tracking-tighter drop-shadow-2xl">Эпоха Лордов</h1>
                  <p className="text-yellow-500 font-black flex items-center gap-2"><Crown size={18}/> УРОВЕНЬ ИМПЕРИИ: 150</p>
                </div>
                <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-yellow-600/40 text-right">
                  <p className="text-[10px] text-gray-400 font-black uppercase">Общая мощь</p>
                  <p className="text-3xl font-black italic text-yellow-500">{res.power.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-4 pb-24">
                <MainAction title="Военный Штаб" info="Найм элитных юнитов" icon={<Sword/>} color="from-red-600" />
                <MainAction title="Магическая Башня" info="Изучение заклинаний" icon={<Beaker/>} color="from-purple-600" />
                <MainAction title="Королевский Рынок" info="Торговля ресурсами" icon={<Briefcase/>} color="from-yellow-600" />
              </div>
            </div>
          </div>
        )}

        {/* ВИД: ГЕРОЙ */}
        {view === 'hero' && (
          <div className="h-full p-6 bg-zinc-950 overflow-y-auto animate-in slide-in-from-right duration-500">
            <div className="flex gap-6 items-center mb-8">
               <div className="w-32 h-32 rounded-3xl border-4 border-yellow-600 overflow-hidden shadow-[0_0_30px_rgba(202,138,4,0.4)]">
                  <img src={ASSETS.hero} className="w-full h-full object-cover" />
               </div>
               <div>
                                   <h2 className="text-3xl font-black italic uppercase">{hero.name}</h2>
                  <div className="flex gap-4 mt-2">
                    <HeroStat label="АТК" val={hero.atk} color="text-red-500" />
                    <HeroStat label="ЗАЩ" val={hero.def} color="text-blue-500" />
                  </div>
               </div>
            </div>
            
            <h3 className="text-xl font-black italic mb-4 text-yellow-500 uppercase">Снаряжение</h3>
            <div className="grid grid-cols-2 gap-4">
              {inventory.map(item => (
                <div key={item.id} className="bg-zinc-900 p-4 rounded-2xl border border-white/5 flex gap-3 items-center">
                   <img src={item.img} className="w-12 h-12 rounded-lg" />
                   <div>
                      <p className="text-xs font-black uppercase">{item.name}</p>
                      <p className="text-[10px] text-green-500 font-bold">{item.bonus}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ВИД: КАРТА МИРА (РЕАЛИЗМ) */}
        {view === 'map' && (
          <div className="h-full w-full bg-[#0a0a0b] relative">
             <div className="absolute inset-0 opacity-40 bg-repeat bg-center" style={{backgroundImage: `url(${ASSETS.map})`, backgroundSize: '800px'}} />
             
             {/* Замки на карте */}
             <MapPoint x="20%" y="30%" name="Башня Смерти" lvl="80" type="enemy" onClick={() => setActiveBattle({name: "Башня Смерти", hp: 1000})} />
             <MapPoint x="70%" y="20%" name="Золотая Жила" lvl="45" type="mine" onClick={() => alert("Добыча начата!")} />
             <MapPoint x="50%" y="50%" name="ВАШ ЗАМОК" lvl="150" type="home" />
             <MapPoint x="40%" y="80%" name="Деревня Эльфов" lvl="12" type="village" />

             <div className="absolute bottom-24 left-6 right-6 bg-black/80 backdrop-blur-xl border border-yellow-600/30 p-4 rounded-3xl">
                <div className="flex justify-between items-center">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Координаты</p>
                      <p className="text-lg font-black italic text-white">X: 1452 / Y: 8842</p>
                   </div>
                   <button className="bg-yellow-600 text-black px-6 py-2 rounded-xl font-black italic text-xs">ПОИСК ЦЕЛИ</button>
                </div>
             </div>
          </div>
        )}

        {/* ЭКРАН БИТВЫ (AAA КАЧЕСТВО) */}
        {activeBattle && (
          <div className="fixed inset-0 z-[100] bg-black animate-in zoom-in duration-300">
             <img src={ASSETS.battleBg} className="absolute inset-0 w-full h-full object-cover opacity-40" />
             <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                <h2 className="text-4xl font-black italic text-red-600 uppercase mb-16 tracking-tighter shadow-red-900/50 drop-shadow-lg">Осада: {activeBattle.name}</h2>
                
                <div className="w-full max-w-md space-y-12">
                   <BattleProgress label="ВАША АРМИЯ" val={75} color="bg-blue-600" />
                   <div className="flex justify-center animate-pulse"><Skull className="text-white" size={80} /></div>
                   <BattleProgress label="ВРАЖЕСКИЙ ГАРНИЗОН" val={45} color="bg-red-600" />
                </div>

                <div className="mt-12 bg-black/80 border border-white/10 w-full max-w-md p-4 rounded-2xl h-32 overflow-hidden font-mono text-[10px] text-gray-400">
                   <p className="text-yellow-500 italic font-bold">>>> Александр Великий наносит критический удар (1450)!</p>
                   <p>>>> Легион теней атакует ваш правый фланг...</p>
                   <p className="text-red-500">>>> Вы потеряли 12 всадников.</p>
                </div>

                <button onClick={() => setActiveBattle(null)} className="mt-10 bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest shadow-2xl active:scale-90 transition">ОТСТУПИТЬ</button>
             </div>
          </div>
        )}
      </main>

      {/* ПРЕМИУМ НАВИГАЦИЯ */}
      <nav className="fixed bottom-4 left-4 right-4 h-20 bg-[#111]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 flex justify-around items-center px-6 shadow-2xl">
        <NavIcon active={view === 'city'} onClick={() => setView('city')} icon={<Home size={28}/>} />
        <NavIcon active={view === 'map'} onClick={() => setView('map')} icon={<MapIcon size={28}/>} />
        <NavIcon active={view === 'hero'} onClick={() => setView('hero')} icon={<Crown size={28}/>} />
        <NavIcon active={view === 'shop'} onClick={() => setView('shop')} icon={<Gem size={28}/>} />
      </nav>
    </div>
  );
}

// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
function ResItem({ icon, val, color }) {
  return (
    <div className="bg-black/40 p-2 rounded-xl flex items-center gap-2 border border-white/5">
      {icon}
      <span className={`text-xs font-black italic ${color}`}>{val.toLocaleString()}</span>
    </div>
  );
}

function MainAction({ title, info, icon, color }) {
  return (
    <div className={`bg-gradient-to-r ${color} to-zinc-900/40 p-5 rounded-3xl border border-white/5 flex justify-between items-center group cursor-pointer active:scale-95 transition`}>
      <div className="flex gap-4 items-center">
        <div className="bg-black/50 p-4 rounded-2xl text-white">{icon}</div>
        <div className="text-left">
          <p className="font-black italic text-white uppercase leading-none">{title}</p>
          <p className="text-[10px] text-white/60 font-bold uppercase mt-1 tracking-tighter">{info}</p>
        </div>
      </div>
      <ChevronRight className="text-white/40 group-hover:text-white transition" />
    </div>
  );
}

function NavIcon({ active, onClick, icon }) {
  return (
    <button onClick={onClick} className={`p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-yellow-600 text-black shadow-[0_0_30px_rgba(202,138,4,0.5)] scale-110' : 'text-gray-500 hover:text-white'}`}>
      {icon}
    </button>
  );
}

function HeroStat({ label, val, color }) {
  return (
    <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-white/5">
      <p className="text-[8px] font-black text-gray-500 uppercase">{label}</p>
      <p className={`text-lg font-black italic ${color}`}>{val}</p>
    </div>
  );
}

function MapPoint({ x, y, name, lvl, type, onClick }) {
  const icon = {
    enemy: <Skull className="text-red-500" />,
    mine: <Pickaxe className="text-yellow-500" />,
    home: <Home className="text-blue-500" />,
    village: <Target className="text-green-500" />
  }[type];

  return (
    <div onClick={onClick} className="absolute flex flex-col items-center cursor-pointer group" style={{left: x, top: y}}>
       <div className={`p-3 rounded-xl bg-black border-2 transition group-hover:scale-125 ${type === 'enemy' ? 'border-red-600 shadow-[0_0_15px_red]' : 'border-white/20 shadow-xl'}`}>
          {icon}
       </div>
       <div className="mt-2 bg-black/80 px-2 py-1 rounded text-[10px] font-black italic whitespace-nowrap border border-white/10 uppercase">
         {name} <span className="text-yellow-500">v.{lvl}</span>
       </div>
    </div>
  );
}

function BattleProgress({ label, val, color }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] font-black uppercase mb-2 tracking-widest text-white/70">
        <span>{label}</span>
        <span>{val}%</span>
      </div>
      <div className="h-4 w-full bg-zinc-900 rounded-full border border-white/10 overflow-hidden shadow-inner">
        <div className={`h-full ${color} transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.2)]`} style={{width: `${val}%`}} />
      </div>
    </div>
  );
}
