'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { AlertCircle, Shield, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

export function UserProfile() {
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bank: 'VietcomBank',
      accountName: 'Nguyen Van A',
      accountNumber: '****2341',
      isDefault: true,
    },
    {
      id: 2,
      bank: 'Techcombank',
      accountName: 'Nguyen Van A',
      accountNumber: '****5678',
      isDefault: false,
    },
  ]);

  const profile = {
    name: 'Nguyen Van A',
    email: 'user@example.com',
    phone: '+84 912 345 678',
    avatar: '👤',
    trustScore: 98,
    completedTrades: 24,
    successRate: '100%',
    kycStatus: 'verified',
    joinDate: 'Jan 2024',
  };

  const transactions = [
    { id: 1, item: 'PUBG Account', partner: 'John D.', amount: '500,000 đ', status: 'Completed', date: '2 days ago' },
    { id: 2, item: 'ML Diamonds', partner: 'Sarah P.', amount: '1,200,000 đ', status: 'Completed', date: '1 week ago' },
    { id: 3, item: 'Lost Ark Gold', partner: 'Mike T.', amount: '750,000 đ', status: 'Completed', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6">
        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <div className="text-6xl">{profile.avatar}</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h2>
                <p className="text-muted-foreground mb-4">{profile.email}</p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Trust Score</p>
                    <p className="font-bold text-accent text-lg">{profile.trustScore}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed Trades</p>
                    <p className="font-bold text-foreground text-lg">{profile.completedTrades}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-bold text-emerald-600 text-lg">{profile.successRate}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="mb-3 bg-emerald-100 text-emerald-800">
                <Shield className="h-3 w-3 mr-1" />
                KYC Verified
              </Badge>
              <p className="text-sm text-muted-foreground">Member since {profile.joinDate}</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="banking" className="space-y-6">
          <TabsList>
            <TabsTrigger value="banking">Banking Info</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Banking Tab */}
          <TabsContent value="banking" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Bank Accounts</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>

            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <Card key={account.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{account.bank}</h4>
                        {account.isDefault && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{account.accountName}</p>
                      <p className="text-sm font-mono text-muted-foreground">{account.accountNumber}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Account Form */}
            <Card className="p-6 bg-muted/30">
              <h4 className="font-semibold text-foreground mb-4">Add New Account</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Bank Name</label>
                  <Input placeholder="Select your bank" className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Account Owner</label>
                  <Input placeholder="Full name as on bank account" className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Account Number</label>
                  <Input placeholder="10-16 digits" className="mt-2" />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1">Save Account</Button>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Item</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Partner</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{tx.item}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{tx.partner}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.amount}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-emerald-100 text-emerald-800">{tx.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input value={profile.email} disabled className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <Input value={profile.phone} className="mt-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Security</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-2">KYC Information</p>
                  <p className="text-sm text-blue-800 mb-3">Your identity has been verified with CCCD. This allows you to trade up to ₫50M per transaction.</p>
                  <Button size="sm" variant="outline">View KYC Details</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
