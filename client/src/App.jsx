import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileBarChart2, Settings, Zap, Search, Bell, Globe, Blocks, CreditCard, 
  Check, Shield, Key, Mail, Lock, Terminal, AlertTriangle, Download, Plus, ChevronDown, ChevronUp, Filter, 
  CheckCircle2, XCircle, AlertCircle, Save, Smartphone, ChevronRight, Slack, Github, Database, Cloud, Link as LinkIcon, Code, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, YAxis, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';

// --- MOCK DATABASE (SABİT VERİLER) ---
const chartData = [ 
  { name: 'Mon', score: 65, active: 120 }, { name: 'Tue', score: 59, active: 132 }, 
  { name: 'Wed', score: 80, active: 101 }, { name: 'Thu', score: 81, active: 154 }, 
  { name: 'Fri', score: 56, active: 90 }, { name: 'Sat', score: 95, active: 230 }, 
  { name: 'Sun', score: 88, active: 210 } 
];

const invoiceData = [ 
  { id: 'INV-2025-001', date: 'Dec 01, 2025', amount: '$49.00', status: 'Paid', plan: 'Pro Business' }, 
  { id: 'INV-2025-002', date: 'Nov 01, 2025', amount: '$49.00', status: 'Paid', plan: 'Pro Business' }, 
  { id: 'INV-2025-003', date: 'Oct 01, 2025', amount: '$49.00', status: 'Paid', plan: 'Pro Business' }
];

const reportsData = [
  { id: 1, domain: 'quebec-law.ca', date: 'Dec 12, 14:30', score: 98, status: 'Compliant', issues: 0, region: 'QC' },
  { id: 2, domain: 'shop-local.mtl', date: 'Dec 11, 09:15', score: 45, status: 'Non-Compliant', issues: 12, region: 'QC' },
  { id: 3, domain: 'startup.io', date: 'Dec 10, 16:45', score: 78, status: 'Warning', issues: 3, region: 'ON' },
  { id: 4, domain: 'agency-group.com', date: 'Dec 09, 11:20', score: 92, status: 'Compliant', issues: 1, region: 'QC' }
];

const integrationData = [
  { id: 1, name: 'Slack', desc: 'Receive audit alerts directly in your channels.', connected: true, icon: <Slack size={24}/>, color: '#E01E5A' },
  { id: 2, name: 'GitHub', desc: 'Sync issues with your repositories.', connected: false, icon: <Github size={24}/>, color: '#333' },
  { id: 3, name: 'Shopify', desc: 'Automatically scan product descriptions.', connected: true, icon: <Blocks size={24}/>, color: '#96bf48' },
  { id: 4, name: 'WordPress', desc: 'Plugin for real-time content checking.', connected: false, icon: <Globe size={24}/>, color: '#21759b' }
];

const apiLogs = [
  { method: 'POST', path: '/v1/audit/scan', status: 200, time: '2m ago', size: '1.2kb' },
  { method: 'GET', path: '/v1/compliance/score', status: 200, time: '15m ago', size: '450b' },
  { method: 'POST', path: '/v1/hooks/test', status: 401, time: '1h ago', size: '0b' }
];

const Header = ({ title, action }) => (
  <header className="top-bar">
    <h1 style={{fontSize:'1.5rem'}}>{title}</h1>
    <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
      {action}
      <div style={{position:'relative'}}>
        <Search size={18} style={{position:'absolute', left:12, top:10, color:'#9ca3af'}} />
        <input type="text" placeholder="Search..." style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--glass-border)', padding:'10px 10px 10px 40px', borderRadius:'20px', color:'white', outline:'none', minWidth: 250}}/>
      </div>
      <button style={{background:'transparent', border:'none', color:'#9ca3af', cursor:'pointer'}}><Bell size={20}/></button>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
         <div style={{textAlign:'right', display:'none', '@media (min-width: 768px)': {display:'block'}}}>
             <div style={{fontSize:'0.85rem', fontWeight:'bold'}}>Demo Admin</div>
             <div style={{fontSize:'0.7rem', color:'#9ca3af'}}>Enterprise Plan</div>
         </div>
         <div style={{width:35, height:35, borderRadius:'50%', background:'linear-gradient(135deg, #6366f1, #a855f7)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'0.9rem'}}>
            DA
         </div>
      </div>
    </div>
  </header>
);

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <aside className="sidebar">
      <div className="brand">
        <div style={{width:30, height:30, background:'var(--primary)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>Q</div>
        QuebecReady
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><LayoutDashboard size={20} /> {t('sidebar.dashboard')}</NavLink>
        <NavLink to="/reports" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><FileBarChart2 size={20} /> {t('sidebar.reports')}</NavLink>
        <NavLink to="/scan" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Zap size={20} /> {t('sidebar.scan')}</NavLink>
        <NavLink to="/compliance" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Shield size={20} /> {t('sidebar.compliance')}</NavLink>
        <div style={{height:1, background:'var(--glass-border)', margin:'10px 0'}}></div>
        <NavLink to="/integrations" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Blocks size={20} /> {t('sidebar.integrations')}</NavLink>
        <NavLink to="/developers" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Code size={20} /> {t('sidebar.developers')}</NavLink>
        <NavLink to="/billing" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><CreditCard size={20} /> {t('sidebar.billing')}</NavLink>
        <NavLink to="/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Settings size={20} /> {t('sidebar.settings')}</NavLink>
      </nav>
    </aside>
  );
};

const Dashboard = ({ currentUser }) => {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
            <Header title="Dashboard" currentUser={currentUser} />
            <div className="dashboard-grid" style={{marginTop:'30px'}}>
                <div className="glass-card"><div className="metric-value" style={{color:'#6366f1'}}>82%</div><span>Overall Score</span></div>
                <div className="glass-card"><div className="metric-value" style={{color:'#fbbf24'}}>Medium</div><span>Risk Level</span></div>
                <div className="glass-card"><div className="metric-value">1,402</div><span>Scanned Assets</span></div>
                <div className="glass-card"><div className="metric-value" style={{color:'#fb7185'}}>12</div><span>Critical Issues</span></div>
            </div>
            <div className="dashboard-grid" style={{gridTemplateColumns:'2fr 1fr'}}>
                <div className="glass-card" style={{height:'400px'}}>
                    <h3>Compliance Traffic Analysis</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <AreaChart data={chartData}>
                            <defs><linearGradient id="colorT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/><stop offset="95%" stopColor="#818cf8" stopOpacity={0}/></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip contentStyle={{background:'#111827', border:'none'}} itemStyle={{color:'white'}}/>
                            <Area type="monotone" dataKey="score" stroke="#818cf8" fill="url(#colorT)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="glass-card">
                    <h3>System Activity</h3>
                    <div style={{display:'flex', flexDirection:'column', gap:15, marginTop:15}}>
                        <div style={{display:'flex', gap:10}}><div style={{width:8, height:8, borderRadius:'50%', background:'#2dd4bf', marginTop:6}}></div><div><div style={{fontSize:'0.9rem'}}>Scan completed</div><div style={{fontSize:'0.75rem', color:'#9ca3af'}}>quebec-law.ca • 2m ago</div></div></div>
                        <div style={{display:'flex', gap:10}}><div style={{width:8, height:8, borderRadius:'50%', background:'#fb7185', marginTop:6}}></div><div><div style={{fontSize:'0.9rem'}}>Critical issue found</div><div style={{fontSize:'0.75rem', color:'#9ca3af'}}>shop-local.mtl • 15m ago</div></div></div>
                        <div style={{display:'flex', gap:10}}><div style={{width:8, height:8, borderRadius:'50%', background:'#6366f1', marginTop:6}}></div><div><div style={{fontSize:'0.9rem'}}>New team member added</div><div style={{fontSize:'0.75rem', color:'#9ca3af'}}>Sarah Connor • 1h ago</div></div></div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const AuditReports = ({ currentUser }) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
      <Header title="Audit Reports" currentUser={currentUser} action={<button className="auth-btn" style={{width:'auto', padding:'8px 16px', display:'flex', gap:5}}><Filter size={16}/> Filter</button>} />
      <div className="glass-card" style={{padding:0, overflow:'hidden', marginTop:30}}>
        <table className="glass-table">
          <thead><tr><th>Domain</th><th>Date</th><th>Region</th><th>Score</th><th>Status</th><th>Issues</th><th>Action</th></tr></thead>
          <tbody>
            {reportsData.map((row) => (
              <tr key={row.id}>
                <td style={{fontWeight:600, color:'white'}}>{row.domain}</td>
                <td style={{color:'#9ca3af'}}>{row.date}</td>
                <td><span style={{background:'rgba(255,255,255,0.05)', padding:'2px 6px', borderRadius:4, fontSize:'0.75rem'}}>{row.region}</span></td>
                <td><div style={{display:'flex', alignItems:'center', gap:5}}><div style={{width:30, height:4, background:'#334155', borderRadius:2}}><div style={{width:`${row.score}%`, height:'100%', background: row.score > 80 ? '#2dd4bf' : row.score > 50 ? '#fbbf24' : '#fb7185'}}></div></div><span style={{fontSize:'0.8rem'}}>{row.score}%</span></div></td>
                <td><span className={`badge ${row.status === 'Compliant' ? 'active' : row.status === 'Warning' ? 'pending' : 'critical'}`} style={{display:'inline-flex', alignItems:'center', gap:5}}>{row.status}</span></td>
                <td>{row.issues > 0 ? <span style={{color:'#fb7185'}}>{row.issues} Issues</span> : <span style={{color:'#9ca3af'}}>-</span>}</td>
                <td><button style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--glass-border)', padding:'6px 12px', borderRadius:6, color:'white', cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:'0.8rem'}}><Download size={14}/> PDF</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const LiveInspector = ({ currentUser }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);
  const startScan = () => {
    if(scanning) return;
    setScanning(true); setProgress(0); setLogs([]);
    const messages = [
      { msg: "> Initializing QuebecReady Engine...", type: "info", delay: 100 },
      { msg: "> Resolving DNS for target domain...", type: "info", delay: 800 },
      { msg: "> Handshake successful. TLS 1.3 established.", type: "success", delay: 1500 },
      { msg: "> Crawling DOM structure (Depth: 3)...", type: "info", delay: 2200 },
      { msg: "> [WARN] Found unlocalized images", type: "warn", delay: 3000 },
      { msg: "> Checking Bill 96 metadata compliance...", type: "info", delay: 4000 },
      { msg: "> [ERR] Navbar item 'Contact' missing 'fr'", type: "error", delay: 6500 },
      { msg: "> Generating final report...", type: "success", delay: 7500 },
      { msg: "> Scan Complete.", type: "success", delay: 8000 },
    ];
    messages.forEach((item) => { setTimeout(() => { setLogs(prev => [...prev, item]); setProgress(p => Math.min(p + 12, 100)); }, item.delay); });
    setTimeout(() => { setScanning(false); setProgress(100); }, 8500);
  };
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
      <Header title="Live Inspector" currentUser={currentUser} />
      <div className="glass-card" style={{marginTop:30, padding:40, textAlign:'center'}}>
        <h2 style={{fontSize:'2rem', marginBottom:10}}>{scanning ? 'Scanning Target...' : 'Ready to Inspect'}</h2>
        <div style={{display:'flex', maxWidth:600, margin:'0 auto', gap:10}}>
          <div style={{position:'relative', flex:1}}><Globe size={20} style={{position:'absolute', top:15, left:15, color:'#9ca3af'}}/><input type="text" placeholder="https://example.com" className="custom-input" style={{paddingLeft:45, height:50}} disabled={scanning}/></div>
          <button className="auth-btn" style={{width:'auto', padding:'0 30px', background: scanning ? '#334155' : 'var(--primary)'}} onClick={startScan} disabled={scanning}>{scanning ? 'Analyzing...' : 'Start Scan'}</button>
        </div>
        {scanning && (<div style={{maxWidth:600, margin:'20px auto', height:4, background:'rgba(255,255,255,0.1)', borderRadius:2}}><motion.div initial={{width:0}} animate={{width: `${progress}%`}} style={{height:'100%', background:'#2dd4bf', borderRadius:2}} /></div>)}
      </div>
      <div className="terminal-window" style={{marginTop:30, height:350, border:'1px solid var(--glass-border)', background:'#020617'}}>
         <div style={{fontFamily:'monospace', fontSize:'0.9rem', lineHeight:'1.6', padding:20}}>
            {logs.length === 0 && <span style={{color:'#475569'}}>_ Waiting for input...</span>}
            {logs.map((log, i) => (<div key={i} className={`log-line ${log.type}`}><span style={{opacity:0.5, marginRight:10}}>[{new Date().toLocaleTimeString()}]</span>{log.msg}</div>))}
            <div ref={logsEndRef} />
         </div>
      </div>
    </motion.div>
  );
};

const Compliance = ({ currentUser }) => {
  const [categories, setCategories] = useState([
    { id: 'website', title: 'Public Website & Marketing', isOpen: true, tasks: [{ id: 1, text: "Homepage navigation available in French", done: true }, { id: 2, text: "Product descriptions translated", done: false }, { id: 3, text: "Checkout process fully localized", done: false }, { id: 4, text: "Error messages & tooltips in French", done: true }] },
    { id: 'contracts', title: 'Contracts & Legal', isOpen: false, tasks: [{ id: 5, text: "Terms of Service available in French", done: true }, { id: 6, text: "Standard employment contracts localized", done: true }, { id: 7, text: "Invoices generated in French by default", done: false }] },
    { id: 'hiring', title: 'Hiring & Internal', isOpen: false, tasks: [{ id: 8, text: "Job postings published in French", done: true }, { id: 9, text: "Internal communication software supports French", done: true }] }
  ]);
  const toggleTask = (catId, taskId) => { setCategories(cats => cats.map(cat => cat.id !== catId ? cat : { ...cat, tasks: cat.tasks.map(t => t.id === taskId ? {...t, done: !t.done} : t) })); };
  const toggleCategory = (catId) => { setCategories(cats => cats.map(c => c.id === catId ? {...c, isOpen: !c.isOpen} : c)); };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
      <Header title="Compliance Center" currentUser={currentUser} />
      <div className="compliance-grid" style={{marginTop:30}}>
        {categories.map(cat => {
          const completed = cat.tasks.filter(t => t.done).length;
          const percentage = Math.round((completed / cat.tasks.length) * 100);
          const color = percentage === 100 ? '#10b981' : percentage > 50 ? '#fbbf24' : '#ef4444';
          return (
            <motion.div key={cat.id} className="compliance-category">
              <div className="cat-header" onClick={() => toggleCategory(cat.id)}>
                <div style={{flex:1}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5}}>
                    <h3 style={{margin:0, fontSize:'1.1rem'}}>{cat.title}</h3>
                    <div style={{display:'flex', alignItems:'center', gap:10}}><span style={{fontSize:'0.9rem', color: color, fontWeight:'bold'}}>{percentage}%</span>{cat.isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</div>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{width: `${percentage}%`, background: color}}></div></div>
                </div>
              </div>
              <AnimatePresence>{cat.isOpen && (<motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="cat-body">{cat.tasks.map(task => (<div key={task.id} className="task-item" onClick={() => toggleTask(cat.id, task.id)}><div className={`checkbox-box ${task.done ? 'checked' : ''}`}>{task.done && <Check size={14} color="white"/>}</div><span style={{color: task.done ? '#9ca3af' : 'white', textDecoration: task.done ? 'line-through' : 'none'}}>{task.text}</span></div>))}</motion.div>)}</AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
};

const Integrations = ({ currentUser }) => {
    const [integrations, setIntegrations] = useState(integrationData);
    const toggleInt = (id) => { setIntegrations(prev => prev.map(item => item.id === id ? {...item, connected: !item.connected} : item)); }
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
            <Header title="Integrations" currentUser={currentUser} />
            <div className="integration-grid">
                {integrations.map(item => (
                    <div key={item.id} className="glass-card integration-card">
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'flex-start'}}>
                             <div className="icon-box" style={{background: item.color}}>{item.icon}</div>
                             <div className="switch" onClick={() => toggleInt(item.id)}><input type="checkbox" checked={item.connected} readOnly /><span className="slider"></span></div>
                        </div>
                        <div><h3 style={{margin:'10px 0 5px 0', fontSize:'1.2rem', color:'white'}}>{item.name}</h3><p style={{fontSize:'0.9rem', color:'#9ca3af', lineHeight:'1.5'}}>{item.desc}</p></div>
                        <div style={{marginTop:'auto', paddingTop:10, width:'100%'}}><div style={{display:'flex', alignItems:'center', gap:5, fontSize:'0.8rem', color: item.connected ? '#10b981' : '#9ca3af'}}>{item.connected ? <CheckCircle2 size={14}/> : <LinkIcon size={14}/>}{item.connected ? 'Connected' : 'Click to connect'}</div></div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const Developers = ({ currentUser }) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
      <Header title="API & Developers" currentUser={currentUser} />
      <div className="dashboard-grid" style={{gridTemplateColumns: '1fr 1fr', marginTop:30}}>
        <div className="glass-card">
          <h3>Your API Key</h3><p style={{color:'#9ca3af', fontSize:'0.9rem', marginBottom:20}}>Use this key to authenticate requests.</p>
          <div className="api-key-box"><span>sk_live_51Mz...9s2x</span><Copy size={16} style={{cursor:'pointer'}}/></div>
          <button className="auth-btn" style={{marginTop:20, width:'auto', padding:'8px 16px', fontSize:'0.9rem'}}>Roll Key</button>
        </div>
        <div className="glass-card">
          <h3>Webhook Status</h3><div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}><div style={{width:10, height:10, borderRadius:'50%', background:'#2dd4bf', boxShadow:'0 0 10px #2dd4bf'}}></div><span style={{fontWeight:600}}>Operational</span></div>
          <div className="input-group"><label className="input-label">Endpoint URL</label><input defaultValue="https://api.mysite.com/webhooks" className="custom-input"/></div>
        </div>
      </div>
      <div className="glass-card" style={{marginTop:20}}><h3>Recent API Calls</h3><table className="glass-table" style={{marginTop:10}}><thead><tr><th>Method</th><th>Endpoint</th><th>Status</th><th>Time</th><th>Size</th></tr></thead><tbody>{apiLogs.map((log, i) => (<tr key={i}><td><span style={{color: log.method==='POST'?'#6366f1':log.method==='GET'?'#fbbf24':'#fb7185', fontWeight:'bold'}}>{log.method}</span></td><td style={{fontFamily:'monospace'}}>{log.path}</td><td><span style={{color: log.status===200?'#2dd4bf':'#fb7185'}}>{log.status}</span></td><td style={{color:'#9ca3af'}}>{log.time}</td><td style={{color:'#9ca3af'}}>{log.size}</td></tr>))}</tbody></table></div>
    </motion.div>
  );
};

const Billing = ({ currentUser }) => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
      <Header title="Billing & Invoices" currentUser={currentUser} />
      <div className="dashboard-grid" style={{gridTemplateColumns:'1fr 1fr', marginTop:30}}>
        <div className="credit-card" style={{maxWidth:'100%'}}>
           <div style={{display:'flex', justifyContent:'space-between', marginBottom:40}}><span style={{opacity:0.8, letterSpacing:1}}>BUSINESS PRO</span><Zap fill="white"/></div>
           <div style={{fontSize:'1.8rem', fontFamily:'monospace', letterSpacing:3, marginBottom:25}}>•••• •••• •••• 4242</div>
           <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', textTransform:'uppercase', opacity:0.9}}><div>Card Holder<br/><span style={{fontSize:'1rem', fontWeight:'bold'}}>Demo Admin</span></div><div>Expires<br/><span style={{fontSize:'1rem', fontWeight:'bold'}}>12/28</span></div></div>
        </div>
        <div className="glass-card">
           <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}><h3>Current Plan</h3><span className="badge active">Active</span></div>
           <div style={{fontSize:'2.5rem', fontWeight:'bold', marginBottom:5}}>$49<span style={{fontSize:'1rem', color:'#9ca3af', fontWeight:'normal'}}>/mo</span></div>
           <p style={{color:'#9ca3af', fontSize:'0.9rem', marginBottom:20}}>Next billing date: <strong>Jan 12, 2026</strong></p>
           <button style={{width:'100%', padding:10, borderRadius:8, border:'1px solid var(--glass-border)', background:'transparent', color:'white', cursor:'pointer'}}>Upgrade Plan</button>
        </div>
      </div>
      <div className="glass-card" style={{marginTop:30, padding:0, overflow:'hidden'}}>
         <div style={{padding:20, borderBottom:'1px solid var(--glass-border)', fontWeight:'bold'}}>Invoice History</div>
         <table className="glass-table"><thead><tr><th>Invoice ID</th><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th><th>Download</th></tr></thead><tbody>{invoiceData.map((inv) => (<tr key={inv.id}><td style={{fontWeight:'bold'}}>{inv.id}</td><td style={{color:'#9ca3af'}}>{inv.date}</td><td>{inv.plan}</td><td>{inv.amount}</td><td><span className="badge active">{inv.status}</span></td><td><Download size={16} style={{cursor:'pointer', color:'#9ca3af'}}/></td></tr>))}</tbody></table>
      </div>
    </motion.div>
  );
};

const SettingsPage = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="content-scrollable">
      <Header title="Account Settings" currentUser={currentUser} />
      <div className="glass-card" style={{marginTop:30, padding:0, overflow:'hidden', minHeight:500, display:'flex'}}>
         <div style={{width:200, borderRight:'1px solid var(--glass-border)', background:'rgba(0,0,0,0.2)'}}>
            {['profile', 'security', 'notifications'].map(tab => (
               <div key={tab} onClick={() => setActiveTab(tab)} style={{padding:'15px 20px', cursor:'pointer', color: activeTab === tab ? 'white' : '#9ca3af', background: activeTab === tab ? 'rgba(255,255,255,0.05)' : 'transparent', borderLeft: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent', fontWeight: activeTab === tab ? 600 : 400, textTransform:'capitalize'}}>{tab}</div>
            ))}
         </div>
         <div style={{flex:1, padding:30}}>
            {activeTab === 'profile' && (
               <motion.div initial={{opacity:0, x:10}} animate={{opacity:1, x:0}}>
                  <h3 style={{marginBottom:20}}>Public Profile</h3>
                  <div style={{display:'flex', alignItems:'center', gap:20, marginBottom:30}}>
                     <div style={{width:80, height:80, borderRadius:'50%', background:'#334155', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem'}}>DA</div>
                     <div><button style={{background:'#334155', border:'1px solid #475569', color:'white', padding:'8px 16px', borderRadius:8, cursor:'pointer', marginRight:10}}>Change Avatar</button></div>
                  </div>
                  <div className="input-group"><label className="input-label">Display Name</label><input className="custom-input" defaultValue="Demo Admin"/></div>
                  <div className="input-group"><label className="input-label">Email</label><input className="custom-input" defaultValue="admin@quebec.com"/></div>
                  <button className="auth-btn" style={{width:'auto', marginTop:10}}><Save size={16} style={{marginRight:5}}/> Save Changes</button>
               </motion.div>
            )}
            {activeTab === 'security' && (
               <motion.div initial={{opacity:0, x:10}} animate={{opacity:1, x:0}}>
                  <h3 style={{marginBottom:20}}>Security & Auth</h3>
                  <div className="input-group"><label className="input-label">Current Password</label><input type="password" class="custom-input"/></div>
                  <div className="input-group"><label className="input-label">New Password</label><input type="password" class="custom-input"/></div>
                  <button className="auth-btn" style={{width:'auto'}}>Update Password</button>
               </motion.div>
            )}
            {activeTab === 'notifications' && (
               <motion.div initial={{opacity:0, x:10}} animate={{opacity:1, x:0}}>
                  <h3 style={{marginBottom:20}}>Notification Preferences</h3>
                  {['Email me when scan completes', 'Weekly report summary', 'Security alerts', 'Marketing updates'].map((item, i) => (<div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 0', borderBottom:'1px solid rgba(255,255,255,0.05)'}}><span>{item}</span><div className="switch"><input type="checkbox" defaultChecked={i<3}/><span className="slider"></span></div></div>))}
               </motion.div>
            )}
         </div>
      </div>
    </motion.div>
  );
};

const AppLayout = ({ currentUser }) => (
  <div className="app-shell">
    <Sidebar />
    <main className="main-area">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Dashboard currentUser={currentUser} />} />
          <Route path="/reports" element={<AuditReports currentUser={currentUser} />} />
          <Route path="/scan" element={<LiveInspector currentUser={currentUser} />} />
          <Route path="/compliance" element={<Compliance currentUser={currentUser} />} />
          <Route path="/integrations" element={<Integrations currentUser={currentUser} />} />
          <Route path="/developers" element={<Developers currentUser={currentUser} />} />
          <Route path="/billing" element={<Billing currentUser={currentUser} />} />
          <Route path="/settings" element={<SettingsPage currentUser={currentUser} />} />
        </Routes>
      </AnimatePresence>
    </main>
  </div>
);

function App() {
  const [langSelected, setLangSelected] = useState(false);
  const { i18n } = useTranslation();
  const currentUser = { name: 'Demo Admin', email: 'admin@quebec.com' };

  const LanguageSplash = ({ onSelect }) => (
    <motion.div className="language-splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -100 }}>
        <h1 style={{fontSize:'3rem', marginBottom:'20px'}}>QuebecReady.</h1>
        <p style={{color:'#9ca3af', marginBottom:40}}>Select your language / Choisissez votre langue</p>
        <div className="lang-cards">
            <motion.div className="lang-card" whileHover={{scale:1.05}} onClick={() => onSelect('en')}><span className="lang-flag">🇬🇧</span><span className="lang-name">English</span></motion.div>
            <motion.div className="lang-card" whileHover={{scale:1.05}} onClick={() => onSelect('fr')}><span className="lang-flag">🇫🇷</span><span className="lang-name">Français</span></motion.div>
        </div>
    </motion.div>
  );

  const handleLanguage = (lang) => { i18n.changeLanguage(lang); setLangSelected(true); };

  return (
    <BrowserRouter>
      <AnimatePresence>
        {!langSelected && <LanguageSplash onSelect={handleLanguage} />}
      </AnimatePresence>
      <AppLayout currentUser={currentUser} />
    </BrowserRouter>
  );
}

export default App;