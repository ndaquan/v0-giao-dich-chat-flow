'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function FindSellerPage() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);
  const [searching, setSearching] = useState(false);
  const [sellerFound, setSellerFound] = useState<any>(null);

  const handleSearch = async () => {
    setSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email === 'seller@example.com') {
      setSellerFound({
        email: 'seller@example.com',
        name: 'John Seller',
        successRate: 98.5,
        completedTrades: 156,
        trustScore: 4.8,
        avatar: '👤'
      });
    } else {
      setSellerFound(null);
    }
    setSearching(false);
    setStep(2);
  };

  const handleSendInvite = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <Link href="/demo" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Find Seller & Create Transaction</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Step 1: Search */}
        {step >= 1 && (
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white ${step >= 1 ? 'bg-accent' : 'bg-muted'}`}>
                1
              </div>
              <h2 className="text-2xl font-bold text-foreground">Find Seller by Email</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Seller Email
                </label>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="seller@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={step > 2}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearch}
                    disabled={!email || searching || step > 2}
                    className="gap-2"
                  >
                    {searching && <Loader2 className="h-4 w-4 animate-spin" />}
                    {searching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: <code className="bg-muted px-2 py-1 rounded">seller@example.com</code>
                </p>
              </div>

              {step >= 2 && !searching && (
                <div className="mt-6">
                  {sellerFound ? (
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-accent/5">
                      <div className="text-3xl">{sellerFound.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{sellerFound.name}</h3>
                          <CheckCircle className="h-4 w-4 text-accent" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{sellerFound.email}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-semibold text-accent">{sellerFound.successRate}%</div>
                            <div className="text-muted-foreground">Success Rate</div>
                          </div>
                          <div>
                            <div className="font-semibold text-accent">{sellerFound.completedTrades}</div>
                            <div className="text-muted-foreground">Completed Trades</div>
                          </div>
                          <div>
                            <div className="font-semibold text-accent">⭐ {sellerFound.trustScore}</div>
                            <div className="text-muted-foreground">Trust Score</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">User not found</p>
                        <p className="text-sm text-muted-foreground">Try with a different email</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 2: Transaction Details */}
        {step >= 2 && sellerFound && (
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white ${step >= 2 ? 'bg-accent' : 'bg-muted'}`}>
                2
              </div>
              <h2 className="text-2xl font-bold text-foreground">Transaction Details</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount (VND)
                </label>
                <Input
                  type="number"
                  placeholder="1,000,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={step > 2}
                  min="10000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum: 10,000 VND • Service fee: 1% (min 1,000 VND)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Item Description
                </label>
                <Textarea
                  placeholder="Describe the item or service being traded..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={step > 2}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleSendInvite}
                disabled={!amount || !description || step > 2}
                size="lg"
                className="w-full"
              >
                Send Transaction Invite
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {step >= 3 && sellerFound && (
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white bg-accent">
                3
              </div>
              <h2 className="text-2xl font-bold text-foreground">Invite Sent!</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Transaction invite sent to {sellerFound.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      They will receive a notification and can accept or decline your offer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
                <h3 className="font-semibold text-foreground">Transaction Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seller:</span>
                    <span className="text-foreground">{sellerFound.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="text-foreground">{amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee (1%):</span>
                    <span className="text-foreground">{Math.max(1000, Math.round(parseInt(amount) * 0.01)).toLocaleString()} VND</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold">
                    <span>Total to Pay:</span>
                    <span className="text-accent">{(parseInt(amount) + Math.max(1000, Math.round(parseInt(amount) * 0.01))).toLocaleString()} VND</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  Create Another
                </Button>
                <Button className="flex-1" onClick={() => window.location.href = '/demo'}>
                  Back to Demos
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
