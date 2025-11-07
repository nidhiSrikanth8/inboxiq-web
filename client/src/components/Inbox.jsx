// client/src/components/Inbox.jsx
import React, { useEffect, useState, useMemo } from 'react'
import { fetchConversations, toggleStar } from '../api'
import ConversationCard from './ConversationCard'

export default function Inbox(){
  const [convs, setConvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all'); // all | high | medium | low

  const load = async ()=>{
    setLoading(true);
    try{
      const data = await fetchConversations();
      setConvs(data);
    }catch(e){
      console.error(e);
    }finally{setLoading(false)}
  }

  useEffect(()=>{
    load();
    const id = setInterval(load, 5000);
    return ()=>clearInterval(id);
  }, []);

  const onStar = async (id)=>{
    try{ await toggleStar(id); await load(); }catch(e){ console.error(e) }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return convs.filter(c => {
      if(priorityFilter !== 'all'){
        if(priorityFilter === 'high' && c.priority_score < 60) return false;
        if(priorityFilter === 'medium' && (c.priority_score < 30 || c.priority_score >= 60)) return false;
        if(priorityFilter === 'low' && c.priority_score >= 30) return false;
      }
      if(!q) return true;
      const name = (c.name || '').toLowerCase();
      const preview = (c.preview || '').toLowerCase();
      return name.includes(q) || preview.includes(q);
    }).sort((a,b) => b.priority_score - a.priority_score || new Date(b.updated_at) - new Date(a.updated_at));
  }, [convs, query, priorityFilter]);

  return (
    <div>
      <div className="controls">
        <input
          aria-label="Search conversations"
          className="search"
          placeholder="Search by name or message..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          aria-label="Filter by priority"
          className="filter"
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="clear" onClick={() => { setQuery(''); setPriorityFilter('all'); }}>
          Clear
        </button>
      </div>

      {loading ? <div className="loading">Loading...</div> : null}

      {filtered.length === 0 && !loading ? (
        <div className="empty">No conversations match your search/filter.</div>
      ) : (
        filtered.map(c => <ConversationCard key={c.id} c={c} onStar={onStar} />)
      )}
    </div>
  )
}
