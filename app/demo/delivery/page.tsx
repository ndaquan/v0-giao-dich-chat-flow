'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, CheckCircle, AlertCircle, Bank } from 'lucide-react';

export default function DeliveryPage() {
  const [stage, setStage] = useState('payment-received'); // payment-received -> delivered-pending -> delivery-complete -> payout
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    { id: 'bidv', name: 'BIDV', account: 'Nguyễn Văn A', last4: '1234' },
    { id: 'vietcombank', name: 'Vietcombank', account: 'Nguyễn Văn A', last4: '5678' },
    { id: 'techcombank', name: 'Techcombank', account: 'Nguyễn Văn A', last4: '9012' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <Link href="/demo" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Delivery & Confirmation</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Timeline */}
        <div className="mb-12">
          <div className="space-y-4">
            {[
              { label: 'Payment Received', status: 'complete', stage: 'payment-received' },
              { label: 'Item Delivered', status: stage === 'payment-received' ? 'pending' : 'complete', stage: 'delivered-pending' },
              { label: 'Delivery Confirmed', status: ['delivered-pending', 'payment-received'].includes(stage) ? 'pending' : 'complete', stage: 'delivery-complete' },
              { label: 'Money Transferred', status: stage === 'payout' ? 'active' : stage === 'delivery-complete' ? 'pending' : 'pending', stage: 'payout' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold flex-shrink-0 ${
                  item.status === 'complete' ? 'bg-green-600 text-white' :
                  item.status === 'active' ? 'bg-accent text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {item.status === 'complete' ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`font-medium ${
                    item.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Stage Content */}
        {stage === 'payment-received' && (
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Payment Received</h2>
                <p className="text-muted-foreground mt-1">System has confirmed 5,050,000 VND from buyer</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-green-800">
                ✓ Money is now held safely in escrow. You can proceed to deliver the item to the buyer.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-foreground">Before you deliver:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Ask buyer for their game username (for verification purposes)</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Record a video showing the item delivery</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Share video proof in this chat</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setStage('delivered-pending')}
            >
              Mark as Delivered
            </Button>
          </Card>
        )}

        {stage === 'delivered-pending' && (
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Waiting for Buyer Confirmation</h2>
                <p className="text-muted-foreground mt-1">Buyer needs to confirm they received the item</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800">
                ⏳ You've marked the item as delivered. The buyer has until 23:59 to confirm receipt. If they don't respond within 48 hours, you automatically win the dispute.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">Transaction Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Buyer:</span>
                  <span className="text-foreground">Waiting for confirmation...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Money Status:</span>
                  <span className="text-accent font-medium">Held in Escrow</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Remaining:</span>
                  <span className="text-foreground">47h 30m</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setStage('payment-received')}
              >
                Go Back
              </Button>
              <Button 
                className="flex-1"
                disabled
              >
                Waiting for Buyer...
              </Button>
            </div>
          </Card>
        )}

        {stage === 'delivery-complete' && (
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Delivery Confirmed!</h2>
                <p className="text-muted-foreground mt-1">Buyer has confirmed receipt of the item</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-green-800">
                ✓ Great! Buyer confirmed they received the item. Now you can request payment.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-foreground">Next Step:</h3>
              <p className="text-sm text-muted-foreground">
                Select a bank account to receive your payment, then confirm. The system will automatically transfer your money within 5 minutes.
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setShowPayoutModal(true)}
            >
              Request Payment
            </Button>
          </Card>
        )}

        {stage === 'payout' && (
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Payment Completed!</h2>
                <p className="text-muted-foreground mt-1">Money has been transferred to your account</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-green-800">
                ✓ Transaction completed successfully. Thank you for using our escrow service!
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-4">Payment Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-foreground">5,000,000 VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee:</span>
                  <span className="text-foreground">-50,000 VND</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>You Received:</span>
                  <span className="text-accent">4,950,000 VND</span>
                </div>
                <div className="flex justify-between text-xs pt-3">
                  <span className="text-muted-foreground">Bank Account:</span>
                  <span className="text-foreground">BIDV - ****1234</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => window.location.href = '/demo'}
              >
                Back to Demos
              </Button>
              <Button 
                className="flex-1"
                onClick={() => alert('Redirecting to review page...')}
              >
                Leave Review
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Payout Modal */}
      <Dialog open={showPayoutModal} onOpenChange={setShowPayoutModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Payment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <p className="font-medium mb-1">Payment Summary</p>
              <p>You'll receive 4,950,000 VND (after 1% fee)</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-3">Select Bank Account</label>
              <div className="space-y-2">
                {banks.map(bank => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedBank === bank.id 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bank className="h-4 w-4" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{bank.name}</p>
                        <p className="text-xs text-muted-foreground">{bank.account} • ****{bank.last4}</p>
                      </div>
                      {selectedBank === bank.id && <CheckCircle className="h-4 w-4 text-accent" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              By requesting payment, you confirm that you have delivered the item as described and agree to our terms.
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowPayoutModal(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              disabled={!selectedBank}
              onClick={() => {
                setShowPayoutModal(false);
                setStage('payout');
              }}
            >
              Confirm & Request Payout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
