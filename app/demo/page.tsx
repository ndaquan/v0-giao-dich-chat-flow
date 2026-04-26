'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link href="/" className="text-xl font-bold text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Demo Flows</h1>
          <p className="text-lg text-muted-foreground">
            Click on a demo below to test the main user flows of the Escrow Platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Find Seller & Create Transaction */}
          <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/demo/find-seller" className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold">
                  1
                </div>
                <h2 className="text-xl font-semibold text-foreground">Find Seller & Create Transaction</h2>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Demo: Buyer searches for seller by email and creates a transaction request
              </p>
              <Button className="w-full">View Demo</Button>
            </Link>
          </Card>

          {/* Chat Room */}
          <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/demo/chat-room" className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold">
                  2
                </div>
                <h2 className="text-xl font-semibold text-foreground">Chat & Proposal Card</h2>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Demo: 3-way chat with buyer, seller, and admin. Create and confirm proposal cards
              </p>
              <Button className="w-full">View Demo</Button>
            </Link>
          </Card>

          {/* Payment QR */}
          <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/demo/payment-qr" className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold">
                  3
                </div>
                <h2 className="text-xl font-semibold text-foreground">Payment QR & Error Handling</h2>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Demo: Display QR code for payment, handle payment errors and submit ticket to admin
              </p>
              <Button className="w-full">View Demo</Button>
            </Link>
          </Card>

          {/* Delivery & Confirmation */}
          <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/demo/delivery" className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold">
                  4
                </div>
                <h2 className="text-xl font-semibold text-foreground">Delivery & Confirmation</h2>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Demo: Seller marks as delivered, buyer confirms receipt, payout to seller
              </p>
              <Button className="w-full">View Demo</Button>
            </Link>
          </Card>

          {/* Transaction History */}
          <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/demo/history" className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold">
                  5
                </div>
                <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Demo: View all past transactions with filter and detail view
              </p>
              <Button className="w-full">View Demo</Button>
            </Link>
          </Card>

          {/* User Profile */}
          <Card className="flex flex-col gap-4 p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/demo/profile" className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-semibold">
                  6
                </div>
                <h2 className="text-xl font-semibold text-foreground">User Profile & Bank Accounts</h2>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                Demo: Manage profile, add/edit/delete bank accounts, view trust score
              </p>
              <Button className="w-full">View Demo</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
