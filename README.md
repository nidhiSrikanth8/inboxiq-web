# inboxiq-web
Hi there 👋  
I’m **Nidhi Srikanth**, and this is **InboxIQ** — my attempt to rethink how an inbox should *feel*.  
We get hundreds of messages every day, but not all of them deserve equal attention.  
So I built a web app that **analyzes unread conversations and surfaces what truly matters first** —  
in a UI that looks like it came straight from the future 🚀

---

## ✨ What it does

InboxIQ isn’t just a mock inbox — it’s a **priority engine** that scores messages based on:

- who sent it (boss? friend? random service?)  
- how many messages you’ve ignored 😅  
- keywords like *“urgent”*, *“asap”*, *“meeting”*  
- how long it’s been since you last replied  
- whether you starred it manually  

Everything gets ranked using a simple, transparent algorithm so you can see exactly *why* something’s important.

---

## 🎨 The vibe

I wanted the app to **look and feel alienic** — like a command center from a sci-fi ship.  
So instead of a plain inbox, I went with:

- a **full-width gradient background** (purple-teal cosmic energy ⚡)  
- **glassmorphic cards** with light reflections  
- **neon hover glows** that make interactions feel alive  
- minimal typography and lots of breathing space  

The result? A clean, futuristic workspace that feels bold yet calm.

---

## 🧠 Tech under the hood

| Layer | Stack |
|-------|-------|
| Frontend | React (Vite) + plain CSS (custom glassmorphic styling) |
| Backend | Node.js + Express |
| Database | SQLite using `better-sqlite3` |
| Other tools | CORS, REST APIs, modular structure for scalability |

## ⚙️ How to run it locally

```bash
# clone the repo
git clone https://github.com/nidhiSrikanth8/inboxiq-web.git
cd inboxiq-web
