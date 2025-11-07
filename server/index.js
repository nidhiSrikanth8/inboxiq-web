const express = require('express');
const cors = require('cors');
const db = require('./db');
const { computePriorityForConversation } = require('./priority');

const app = express();
app.use(cors());
app.use(express.json());

// Get all conversations (includes computed priority)
app.get('/api/conversations', (req, res) => {
  const rows = db.prepare('SELECT * FROM conversations ORDER BY updated_at DESC').all();
  const withScore = rows.map(r => {
    const conv = {
      id: r.id,
      name: r.name,
      preview: r.preview,
      unread_count: r.unread_count,
      last_response_hours: r.last_response_hours,
      category: r.category,
      starred: !!r.starred,
      updated_at: r.updated_at
    };
    conv.priority_score = computePriorityForConversation(conv);
    return conv;
  });
  // sort by priority desc then newest
  withScore.sort((a,b) => b.priority_score - a.priority_score || new Date(b.updated_at) - new Date(a.updated_at));
  res.json(withScore);
});

// Toggle star
app.post('/api/conversations/:id/star', (req, res) => {
  const id = req.params.id;
  const row = db.prepare('SELECT starred FROM conversations WHERE id = ?').get(id);
  if(!row) return res.status(404).send({ error: 'not found' });
  const newStar = row.starred ? 0 : 1;
  db.prepare('UPDATE conversations SET starred = ? WHERE id = ?').run(newStar, id);
  res.send({ id, starred: !!newStar });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
