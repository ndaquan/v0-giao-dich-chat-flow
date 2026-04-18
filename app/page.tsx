'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, MessageCircle, Zap, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold text-foreground">Escrow</span>
          </div>
          <div className="hidden gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Login</Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex w-fit rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                Trusted by thousands of traders
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                Secure transactions, zero risk
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                The safest way to buy and sell game items, accounts, and digital services online. We hold the money until both parties confirm the transaction.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn more
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-accent">10k+</div>
                <div className="text-sm text-muted-foreground">Completed trades</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">$2M+</div>
                <div className="text-sm text-muted-foreground">Volume secured</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">99.8%</div>
                <div className="text-sm text-muted-foreground">Success rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-foreground">Why choose Escrow?</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need for safe peer-to-peer transactions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="flex flex-col gap-4 p-6">
                <Shield className="h-8 w-8 text-accent" />
                <h3 className="font-semibold text-foreground">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Money is held safely until both parties confirm the transaction.
                </p>
              </Card>

              <Card className="flex flex-col gap-4 p-6">
                <MessageCircle className="h-8 w-8 text-accent" />
                <h3 className="font-semibold text-foreground">Built-in Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Communicate safely with all parties and admin in one place.
                </p>
              </Card>

              <Card className="flex flex-col gap-4 p-6">
                <Zap className="h-8 w-8 text-accent" />
                <h3 className="font-semibold text-foreground">Auto Payouts</h3>
                <p className="text-sm text-muted-foreground">
                  Get paid instantly to your bank account after confirmation.
                </p>
              </Card>

              <Card className="flex flex-col gap-4 p-6">
                <Users className="h-8 w-8 text-accent" />
                <h3 className="font-semibold text-foreground">Dispute Handling</h3>
                <p className="text-sm text-muted-foreground">
                  Expert admins resolve disputes fairly with full transparency.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-foreground">How it works in 4 steps</h2>
              <p className="text-lg text-muted-foreground">
                Simple, transparent, and completely automated.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: 1, title: 'Create a room', desc: 'Add the seller email and set the amount' },
                { step: 2, title: 'Buyer pays', desc: 'Pay via QR code or bank transfer' },
                { step: 3, title: 'Trade items', desc: 'Exchange items in a secure chat' },
                { step: 4, title: 'Confirm & receive', desc: 'Seller gets paid instantly to their bank' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-8 items-center text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-foreground">Ready to trade safely?</h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Join thousands of traders who have completed secure transactions on our platform.
              </p>
            </div>
            <Button size="lg">
              Create your first transaction
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Escrow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure peer-to-peer transactions made simple.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-foreground text-sm">Product</h4>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-foreground text-sm">Company</h4>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-foreground text-sm">Legal</h4>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">KYC Policy</a>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Escrow Platform. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
