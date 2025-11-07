import React from 'react'
import Inbox from './components/Inbox'

export default function App(){
  return (
    <div className="container">
      <header><h1>InboxIQ — Unified Priority Inbox</h1></header>
      <main>
        <Inbox />
      </main>
    </div>
  )
}
