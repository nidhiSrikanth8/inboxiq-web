import React from 'react'

function PriorityPill({score}){
  const bucket = score >= 60 ? 'High' : score >= 30 ? 'Medium' : 'Low';
  const color = bucket === 'High' ? 'var(--red)' : bucket === 'Medium' ? 'var(--amber)' : 'var(--green)';
  return (
    <span className="priority-pill" style={{borderColor: color, color}}>
      <strong>{bucket}</strong> · {score}
    </span>
  );
}

export default function ConversationCard({ c, onStar }){
  return (
    <article className="card" title={c.preview}>
      <div className="card-left">
        <div className="avatar" aria-hidden>{(c.name||'?').charAt(0).toUpperCase()}</div>
      </div>

      <div className="card-body">
        <div className="card-top">
          <div className="title-group">
            <div className="name">{c.name}</div>
            <div className="meta small">{new Date(c.updated_at).toLocaleString()}</div>
          </div>
          <div className="actions">
            <button className={c.starred ? 'star starred' : 'star'} onClick={() => onStar(c.id)} aria-pressed={c.starred}>
              {c.starred ? '★' : '☆'}
            </button>
          </div>
        </div>

        <div className="preview-line">{c.preview}</div>

        <div className="card-foot">
          <div className="left-foot">
            <span className="badge unread">{c.unread_count} unread</span>
            <PriorityPill score={c.priority_score} />
          </div>
          <div className="right-foot small">category: <strong>{c.category}</strong></div>
        </div>
      </div>
    </article>
  )
}
