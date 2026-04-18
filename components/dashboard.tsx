'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export function Dashboard() {
  const transactions = [
    {
      id: 1,
      buyer: 'John D.',
      seller: 'Alex M.',
      amount: '500,000 đ',
      status: 'Completed',
      item: 'PUBG Account Lv50',
      date: '2 hours ago',
    },
    {
      id: 2,
      buyer: 'Sarah P.',
      seller: 'You',
      amount: '1,200,000 đ',
      status: 'Processing',
      item: 'Mobile Legends Diamonds',
      date: '30 minutes ago',
    },
    {
      id: 3,
      buyer: 'You',
      seller: 'Game Master',
      amount: '750,000 đ',
      status: 'Awaiting',
      item: 'Lost Ark Gold Bundle',
      date: '1 hour ago',
    },
  ];

  const stats = [
    { label: 'Completed Trades', value: '24', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Total Volume', value: '₫12.5M', icon: TrendingUp, color: 'text-accent' },
    { label: 'Trust Score', value: '98%', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Pending', value: '2', icon: AlertCircle, color: 'text-orange-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Awaiting':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your trading overview.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <Card>
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
              <Button variant="outline" size="sm">View all</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Item</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Parties</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{tx.item}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{tx.buyer} ↔ {tx.seller}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(tx.status)} variant="outline">
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
