'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowLeft, QrCode, AlertCircle, Upload, Clock } from 'lucide-react';

export default function PaymentQRPage() {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showPaymentModal, setShowPaymentModal] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedError, setSelectedError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleErrorSelect = (error: string) => {
    setSelectedError(error);
    if (error === 'not-received' || error === 'wrong-amount' || error === 'wrong-content') {
      setShowErrorModal(false);
      setShowUploadModal(true);
    }
  };

  const handleSubmitTicket = () => {
    setTicketSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <Link href="/demo" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Payment Processing</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Status */}
        <div className="mb-8 p-4 rounded-lg border border-accent/20 bg-accent/5">
          <p className="text-sm font-medium text-accent">
            ✓ Both parties confirmed the proposal. Ready for payment!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Transaction Summary */}
          <div>
            <Card className="p-6 mb-6">
              <h2 className="font-semibold text-foreground mb-4">Transaction Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item:</span>
                  <span className="text-foreground">Game Account</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="text-foreground">5,000,000 VND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee (1%):</span>
                  <span className="text-foreground">50,000 VND</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span>Total to Pay:</span>
                  <span className="text-accent">5,050,000 VND</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Payment Expires In</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{formatTime(timeLeft)}</p>
                  <p className="text-xs text-blue-700 mt-2">
                    If payment is not completed within 30 minutes, this transaction will be canceled
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: QR Code */}
          <div>
            <Card className="p-6 text-center">
              <h2 className="font-semibold text-foreground mb-6">Scan QR Code to Pay</h2>
              
              <div className="bg-gray-100 p-8 rounded-lg mb-6 flex items-center justify-center">
                <div className="bg-white p-4 rounded">
                  <QrCode className="h-48 w-48 text-gray-400" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Use your banking app to scan this QR code and complete the payment
              </p>

              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Scan QR Code (Demo)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowErrorModal(true)}
                >
                  Having Payment Issues?
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Status Modal */}
      <Dialog open={showPaymentModal && !ticketSubmitted} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Processing</DialogTitle>
          </DialogHeader>
          
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Payment Received!</p>
              <p className="text-sm text-muted-foreground mt-2">
                System confirmed 5,050,000 VND
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            ✓ Money is now held safely. Seller can now deliver the item.
          </div>

          <Button className="w-full" onClick={() => setShowPaymentModal(false)}>
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Issues</DialogTitle>
            <DialogDescription>
              What's the problem with your payment?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {[
              { id: 'not-received', label: 'Paid but system hasn\'t received it yet', icon: '⏳' },
              { id: 'wrong-amount', label: 'Transferred wrong amount (more/less)', icon: '💰' },
              { id: 'wrong-content', label: 'Transferred to wrong bank details', icon: '❌' },
              { id: 'other', label: 'Something else', icon: '❓' }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleErrorSelect(option.id)}
                className="w-full text-left p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors"
              >
                <span className="text-lg">{option.icon}</span>
                <p className="text-sm font-medium text-foreground mt-1">{option.label}</p>
              </button>
            ))}
          </div>

          <Button variant="outline" className="w-full" onClick={() => setShowErrorModal(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

      {/* Upload Receipt Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Payment Proof</DialogTitle>
            <DialogDescription>
              Upload a screenshot of your bank transfer receipt as proof
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG or PDF (max 5MB)</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Notes (optional)</label>
              <textarea
                placeholder="Add any additional details..."
                className="w-full mt-2 p-3 border border-border rounded-lg text-sm"
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
              <p className="font-medium mb-1">Next Steps:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Admin will verify your receipt</li>
                <li>If valid: Transaction continues normally</li>
                <li>You'll receive an update within 1 hour</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => { setShowUploadModal(false); setShowErrorModal(false); }}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmitTicket}>
              Submit Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={ticketSubmitted} onOpenChange={setTicketSubmitted}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket Submitted</DialogTitle>
          </DialogHeader>
          
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Support Ticket Created</p>
              <p className="text-sm text-muted-foreground mt-2">
                Ticket #SUP-2026-45821
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 space-y-2">
            <p className="font-medium">What happens next?</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Admin will review your receipt within 1 hour</li>
              <li>You'll get a notification about the result</li>
              <li>If approved: Transaction continues</li>
              <li>If rejected: You can resubmit with more proof</li>
            </ul>
          </div>

          <Button className="w-full" onClick={() => window.location.href = '/demo'}>
            Back to Demos
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
