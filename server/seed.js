const db = require('./db');

const insert = db.prepare('INSERT OR REPLACE INTO conversations (id,name,preview,unread_count,last_response_hours,category,starred,updated_at) VALUES (?,?,?,?,?,?,?,?)');

const now = new Date().toISOString();
const sample = [
  ['c1','Boss','Please respond asap about the report',3,48,'work',0,now],
  ['c2','Mom','Are you coming home tomorrow?',1,2,'important',0,now],
  ['c3','Project Group','Meeting at 5pm about the release',2,6,'work',0,now],
  ['c4','Friend',"let's watch a movie tonight",1,72,'friend',0,now],
  ['c5','Service','Your bill is due tomorrow',1,0,'other',0,now]
];

for(const row of sample){
  insert.run(...row);
}

console.log('✅ Seeded sample conversations');
