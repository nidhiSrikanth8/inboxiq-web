const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'data.sqlite'));

// create table if not exists
db.prepare(`CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  name TEXT,
  preview TEXT,
  unread_count INTEGER,
  last_response_hours INTEGER,
  category TEXT,
  starred INTEGER DEFAULT 0,
  updated_at TEXT
)`).run();

module.exports = db;
