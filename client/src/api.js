const API = 'http://localhost:4000/api';

export async function fetchConversations(){
  const res = await fetch(`${API}/conversations`);
  if(!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function toggleStar(id){
  const res = await fetch(`${API}/conversations/${id}/star`, { method: 'POST' });
  if(!res.ok) throw new Error('Failed toggle');
  return res.json();
}
