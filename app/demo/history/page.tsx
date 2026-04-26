'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ChevronRight, Filter } from 'lucide-react';

const transactions = [
  {
    id: 'TG-2026-001245',
    partner: 'John Seller',
    item: 'Game Account',
    amount: 5000000,
    status: 'completed',
    date: '2026-04-26',
    rating: 5,
    fee: 50000
  },
  {
    id: 'TG-2026-001244',
    partner: 'Alex Buyer',
    item: 'Game Item Bundle',
    amount: 2000000,
    status: 'completed',
    date: '2026-04-25',
    rating: 4.5,
    fee: 20000
  },
  {
    id: 'TG-2026-001243',
    partner: 'Mike Seller',
    item: 'Account with Skins',
    amount: 3500000,
    status: 'completed',
    date: '2026-04-23',
    rating: 5,
    fee: 35000
  },
  {
    id: 'TG-2026-001242',
    partner: 'Sarah Buyer',
    item: 'In-game Currency',
    amount: 1000000,
    status: 'completed',
    date: '2026-04-20',
    rating: 4,
    fee: 10000
  },
  {
    id: 'TG-2026-001241',
    partner: 'Tom Seller',
    item: 'Rare NFT',
    amount: 8000000,
    status: 'disputed',
    date: '2026-04-18',
    rating: null,
    fee: 80000
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const filteredTx = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.status === filter;
  });

  const statusConfig: any = {
    completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: '✓' },
    disputed: { label: 'Disputed', color: 'bg-red-100 text-red-800', icon: '⚠' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  };

  const stats = {
    totalTransactions: transactions.length,
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
    completionRate: Math.round((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100),
    averageRating: (transactions.filter(t => t.rating).reduce((sum, t) => sum + t.rating!, 0) / transactions.filter(t => t.rating).length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-4">
          <Link href="/demo" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Transaction History</h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{stats.totalTransactions}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Transactions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{(stats.totalVolume / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground mt-1">Total Volume</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{stats.completionRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">Completion Rate</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">⭐ {stats.averageRating}</div>
            <div className="text-xs text-muted-foreground mt-1">Average Rating</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {['all', 'completed', 'disputed', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-accent text-accent-foreground'
                  : 'border border-border text-muted-foreground hover:border-accent hover:text-foreground'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'all' && ` (${transactions.length})`}
              {status !== 'all' && ` (${transactions.filter(t => t.status === status).length})`}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTx.map(tx => {
            const config = statusConfig[tx.status];
            return (
              <Card 
                key={tx.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{tx.partner}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{tx.item}</p>
                    <div className="flex gap-6 text-xs text-muted-foreground">
                      <span>ID: {tx.id}</span>
                      <span>{tx.date}</span>
                      {tx.rating && <span>⭐ {tx.rating}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">
                      {(tx.amount / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-xs text-muted-foreground">VND</p>
                    <ChevronRight className="h-5 w-5 text-muted-foreground mt-2 ml-auto" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Transaction Details</h2>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                <p className="font-mono text-sm text-foreground">{selectedTx.id}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Partner</p>
                <p className="text-sm text-foreground">{selectedTx.partner}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Item</p>
                <p className="text-sm text-foreground">{selectedTx.item}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-lg font-bold text-accent">
                  {(selectedTx.amount / 1000000).toFixed(1)}M VND
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Service Fee</p>
                <p className="text-sm text-foreground">
                  -{(selectedTx.fee / 1000000).toFixed(3)}M VND
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">You Received</p>
                <p className="text-lg font-bold text-green-600">
                  {((selectedTx.amount - selectedTx.fee) / 1000000).toFixed(2)}M VND
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="text-sm text-foreground">{selectedTx.date}</p>
              </div>

              {selectedTx.rating && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rating</p>
                  <p className="text-sm text-foreground">
                    {'⭐'.repeat(Math.floor(selectedTx.rating))} {selectedTx.rating}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedTx(null)}
              >
                Close
              </Button>
              <Button className="flex-1">
                View Chat (Deleted)
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
