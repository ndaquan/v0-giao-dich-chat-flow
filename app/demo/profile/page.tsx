'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit2, Trash2, Bank, User, Clock, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const [tab, setTab] = useState('profile');
  const [banks, setBanks] = useState([
    { id: 1, name: 'BIDV', account: '123456789', accountName: 'Nguyễn Văn A', last4: '6789', isDefault: true },
    { id: 2, name: 'Vietcombank', account: '987654321', accountName: 'Nguyễn Văn A', last4: '4321', isDefault: false },
  ]);
  const [showAddBank, setShowAddBank] = useState(false);
  const [editingBank, setEditingBank] = useState<any>(null);
  const [newBank, setNewBank] = useState({ name: '', account: '', accountName: '' });

  const handleAddBank = () => {
    if (newBank.name && newBank.account && newBank.accountName) {
      if (editingBank) {
        setBanks(banks.map(b => b.id === editingBank.id 
          ? { ...b, ...newBank }
          : b
        ));
        setEditingBank(null);
      } else {
        setBanks([...banks, {
          id: Math.max(...banks.map(b => b.id)) + 1,
          ...newBank,
          last4: newBank.account.slice(-4),
          isDefault: banks.length === 0
        }]);
      }
      setNewBank({ name: '', account: '', accountName: '' });
      setShowAddBank(false);
    }
  };

  const handleDeleteBank = (id: number) => {
    setBanks(banks.filter(b => b.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setBanks(banks.map(b => ({
      ...b,
      isDefault: b.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <Link href="/demo" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">User Profile</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">Nguyễn Văn A</h2>
              <p className="text-muted-foreground">buyer@example.com</p>
              <p className="text-sm text-muted-foreground mt-1">Member since April 2026</p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-xs text-muted-foreground">Completed Trades</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">98.5%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">⭐ 4.8</div>
              <div className="text-xs text-muted-foreground">Average Rating</div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold text-foreground text-sm">KYC Verified</div>
                <div className="text-xs text-muted-foreground">CCCD Confirmed</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {[
            { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
            { id: 'banks', label: 'Bank Accounts', icon: <Bank className="h-4 w-4" /> },
            { id: 'kyc', label: 'KYC Status', icon: <CheckCircle className="h-4 w-4" /> },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-accent text-accent font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === 'profile' && (
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-6">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                <Input defaultValue="Nguyễn Văn A" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                <Input type="email" defaultValue="buyer@example.com" disabled />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
                <Input type="tel" defaultValue="+84 912 345 678" />
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Bank Accounts Tab */}
        {tab === 'banks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Saved Bank Accounts</h3>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={() => {
                  setEditingBank(null);
                  setNewBank({ name: '', account: '', accountName: '' });
                  setShowAddBank(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </div>

            <div className="space-y-3">
              {banks.map(bank => (
                <Card key={bank.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Bank className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold text-foreground">{bank.name}</h4>
                        {bank.isDefault && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{bank.accountName}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        ••••••••{bank.last4}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingBank(bank);
                          setNewBank({
                            name: bank.name,
                            account: bank.account,
                            accountName: bank.accountName
                          });
                          setShowAddBank(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {!bank.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBank(bank.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {!bank.isDefault && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSetDefault(bank.id)}
                      >
                        Set as Default
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* KYC Tab */}
        {tab === 'kyc' && (
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Verified</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your identity has been verified. You can trade up to 500 million VND per month.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-green-900 mb-2">Verification Details</p>
              <ul className="space-y-1 text-xs text-green-800">
                <li>✓ ID Verified: Nguyễn Văn A</li>
                <li>✓ Verified on: April 15, 2026</li>
                <li>✓ Status: Active (valid until April 15, 2027)</li>
              </ul>
            </div>

            <Button variant="outline">Update Information</Button>
          </Card>
        )}
      </div>

      {/* Add/Edit Bank Dialog */}
      <Dialog open={showAddBank} onOpenChange={setShowAddBank}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBank ? 'Edit Bank Account' : 'Add Bank Account'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Bank Name</label>
              <Input
                placeholder="e.g., BIDV, Vietcombank, Techcombank"
                value={newBank.name}
                onChange={(e) => setNewBank({...newBank, name: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Account Number</label>
              <Input
                placeholder="Enter your bank account number"
                value={newBank.account}
                onChange={(e) => setNewBank({...newBank, account: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Account Holder Name</label>
              <Input
                placeholder="Full name on the account"
                value={newBank.accountName}
                onChange={(e) => setNewBank({...newBank, accountName: e.target.value})}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
              <p className="font-medium mb-1">Security Note</p>
              <p>Your bank information is encrypted and securely stored. We never share it with other users.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setShowAddBank(false);
                setEditingBank(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              onClick={handleAddBank}
              disabled={!newBank.name || !newBank.account || !newBank.accountName}
            >
              {editingBank ? 'Update Account' : 'Add Account'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
