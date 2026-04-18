'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Send, Flag, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function ChatRoom() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Admin Bot',
      role: 'admin',
      message: 'Welcome to your secure transaction room. Please review the guidelines below.',
      timestamp: '2:00 PM',
      system: true,
    },
    {
      id: 2,
      sender: 'You (Buyer)',
      role: 'buyer',
      message: 'Hi! I\'m interested in the account. Can you confirm it\'s still available?',
      timestamp: '2:05 PM',
    },
    {
      id: 3,
      sender: 'Seller (Alex M.)',
      role: 'seller',
      message: 'Yes, it\'s available! Account level 50, all items included. Ready to send proof of ownership.',
      timestamp: '2:07 PM',
    },
    {
      id: 4,
      sender: 'You (Buyer)',
      role: 'buyer',
      message: 'Great! I\'ll send the payment now. Process should take 5-10 minutes.',
      timestamp: '2:10 PM',
    },
  ]);

  const [messageInput, setMessageInput] = useState('');
  const [proposalOpen, setProposalOpen] = useState(true);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'You (Buyer)',
          role: 'buyer',
          message: messageInput,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setMessageInput('');
    }
  };

  const transactionStatus = {
    amount: '1,500,000 đ',
    item: 'PUBG Mobile Account Lv50',
    buyer: 'You',
    seller: 'Alex M.',
    fee: '1%',
    total: '1,515,000 đ',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar with Status */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="font-semibold text-foreground">Transaction TG-2026-001</h2>
                <p className="text-sm text-muted-foreground">Chat with buyer, seller & admin</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-[600px]">
            {/* Proposal Card - Pinned */}
            {proposalOpen && (
              <Card className="mb-6 border-2 border-accent/30 bg-accent/5 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Proposed Transaction</h3>
                    <p className="text-sm text-muted-foreground">Created by Alex M. • 2 minutes ago</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setProposalOpen(false)}>×</Button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold text-foreground">{transactionStatus.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Item</span>
                    <span className="font-semibold text-foreground">{transactionStatus.item}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-semibold text-foreground">{transactionStatus.fee}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-accent">{transactionStatus.total}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1">Confirm</Button>
                  <Button variant="outline" size="sm" className="flex-1">Decline</Button>
                  <Button variant="outline" size="sm" className="flex-1">Counter Offer</Button>
                </div>
              </Card>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.system
                      ? 'bg-muted text-muted-foreground text-sm italic'
                      : msg.role === 'buyer'
                      ? 'bg-accent text-accent-foreground'
                      : msg.role === 'admin'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-card border border-border text-foreground'
                  }`}>
                    {!msg.system && <p className="text-xs font-semibold mb-1">{msg.sender}</p>}
                    <p className="text-sm">{msg.message}</p>
                    {!msg.system && <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar - Transaction Details & Actions */}
          <div className="space-y-4">
            {/* Transaction Summary */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Transaction Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Buyer</p>
                  <p className="text-sm font-medium text-foreground">You</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Seller</p>
                  <p className="text-sm font-medium text-foreground">Alex M.</p>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="text-lg font-bold text-accent">{transactionStatus.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Item</p>
                  <p className="text-sm font-medium text-foreground">{transactionStatus.item}</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="p-6">
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  @tag seller
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Confirm Delivery
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Request Refund
                </Button>
                <Button variant="outline" size="sm" className="w-full text-destructive">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </Card>

            {/* Guidelines */}
            <Card className="p-4 bg-blue-50">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">Chat Guidelines</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Be respectful and professional</li>
                    <li>• Don't share personal info outside chat</li>
                    <li>• Report issues immediately</li>
                    <li>• Keep transaction records</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
