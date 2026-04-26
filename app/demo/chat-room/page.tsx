'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowLeft, Send, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ChatRoomPage() {
  const [messages, setMessages] = useState([
    { id: 1, author: 'System', content: '📋 Welcome to escrow chat. Follow these rules:\n1. No payment outside this room\n2. Provide proof/evidence for disputes\n3. Both must confirm before payout', timestamp: '10:00' },
    { id: 2, author: 'John Seller', content: 'Hi! I have the game account you\'re looking for', timestamp: '10:05' },
    { id: 3, author: 'You (Buyer)', content: 'Great! Can you show me some proof it\'s legit?', timestamp: '10:06' },
    { id: 4, author: 'John Seller', content: 'Of course, here\'s a video of the account', timestamp: '10:07' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showProposal, setShowProposal] = useState(false);
  const [proposalAmount, setProposalAmount] = useState('5000000');
  const [proposalDescription, setProposalDescription] = useState('Game Account - Full Access');
  const [proposalFeePayer, setProposalFeePayer] = useState('buyer');
  const [proposalCreated, setProposalCreated] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        author: 'You (Buyer)',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  const handleCreateProposal = () => {
    setProposalCreated(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/demo" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Chat with John Seller</h1>
              <p className="text-xs text-muted-foreground">Transaction #TG-2026-001245</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Active</span>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      {proposalCreated && (
        <div className="bg-accent/10 border-b border-accent/20 px-6 py-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium text-accent">
              ✓ Proposal created and waiting for seller confirmation
            </p>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-6 py-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.author === 'You (Buyer)' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-3 rounded-lg ${
                msg.author === 'System' 
                  ? 'bg-muted text-muted-foreground text-sm' 
                  : msg.author === 'You (Buyer)'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border text-foreground'
              }`}>
                {msg.author !== 'System' && msg.author !== 'You (Buyer)' && (
                  <p className="text-xs font-medium mb-1 opacity-70">{msg.author}</p>
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.author === 'You (Buyer)' ? 'opacity-70' : 'text-muted-foreground'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Pinned Proposal Card */}
          {proposalCreated && (
            <div className="sticky top-0 my-6">
              <Card className="border-accent/30 bg-accent/5 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">📌 Proposal Card (Pinned)</h3>
                    <p className="text-xs text-muted-foreground mt-1">Waiting for seller to confirm</p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                    Pending
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold text-accent">5,000,000 VND</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Item</p>
                    <p className="text-foreground">{proposalDescription}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fee Payer</p>
                    <p className="text-foreground capitalize">{proposalFeePayer}</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Waiting for seller to accept or counter proposal...
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card sticky bottom-0">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex gap-3 mb-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowProposal(true)}
              disabled={proposalCreated}
            >
              <Plus className="h-4 w-4" />
              Create Proposal
            </Button>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              onClick={handleSendMessage}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Proposal Dialog */}
      <Dialog open={showProposal} onOpenChange={setShowProposal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Transaction Proposal</DialogTitle>
            <DialogDescription>
              Define the payment terms and item details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Amount (VND)</label>
              <Input
                type="number"
                value={proposalAmount}
                onChange={(e) => setProposalAmount(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Item Description</label>
              <Input
                value={proposalDescription}
                onChange={(e) => setProposalDescription(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Who pays the fee?</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="buyer"
                    checked={proposalFeePayer === 'buyer'}
                    onChange={(e) => setProposalFeePayer(e.target.value)}
                  />
                  <span className="text-sm text-foreground">Buyer (me)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="seller"
                    checked={proposalFeePayer === 'seller'}
                    onChange={(e) => setProposalFeePayer(e.target.value)}
                  />
                  <span className="text-sm text-foreground">Seller</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowProposal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => { handleCreateProposal(); setShowProposal(false); }} className="flex-1">
              Create & Pin
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
