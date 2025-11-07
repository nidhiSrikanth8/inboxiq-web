// priority scoring logic - explainable and simple
const HIGH_KEYWORDS = ["urgent","asap","emergency","please respond","call me"];
const MED_KEYWORDS  = ["meeting","deadline","remind","due","tomorrow"];

function containsKeyword(text, list){
  if(!text) return false;
  const t = text.toLowerCase();
  return list.some(k => t.includes(k));
}

function computePriorityForConversation({ category='other', unread_count=0, preview='', last_response_hours=0, starred=false }){
  let score = 0;
  const senderWeights = { important: 40, work: 25, friend: 15, other: 5 };
  score += (senderWeights[category] || 5);

  score += Math.min(unread_count * 5, 25);

  if(containsKeyword(preview, HIGH_KEYWORDS)) score += 30;
  else if(containsKeyword(preview, MED_KEYWORDS)) score += 15;

  if(last_response_hours > 24) score += 10;
  if(starred) score += 20;

  return Math.max(0, Math.min(100, score));
}

module.exports = { computePriorityForConversation };
