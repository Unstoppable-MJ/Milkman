import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/30">
        <div className="container-pro py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-brand-primary">
            <span>🥛</span> Milkman
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#features" className="hover:text-brand-primary transition">Features</a>
            <a href="#how-it-works" className="hover:text-brand-primary transition">How it Works</a>
            <a href="#plans" className="hover:text-brand-primary transition">Plans</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-slate-600 font-medium hover:text-brand-primary transition">Login</Link>
            <Link to="/login" className="btn-primary py-2 px-5">Start Now</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="container-pro grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900">
              Pure Daily <br />
              <span className="text-brand-primary">Freshness</span> Delivered.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Experience the joy of farm-fresh milk delivered to your doorstep every morning. 
              Easy subscriptions, premium quality, and zero hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/login" className="btn-primary text-lg px-8 py-4">Start Subscription</Link>
              <Link to="/login" className="btn-outline text-lg px-8 py-4">View Products</Link>
            </div>
            <div className="flex items-center gap-6 pt-8 border-t">
              <div>
                <div className="text-2xl font-bold text-slate-900">5k+</div>
                <div className="text-sm text-slate-500">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <div className="text-2xl font-bold text-slate-900">100%</div>
                <div className="text-sm text-slate-500">Pure Organic</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-primary/10 rounded-3xl blur-2xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop" 
              alt="Fresh Milk" 
              className="rounded-3xl shadow-premium w-full object-cover aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-28 bg-slate-50">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose Milkman?</h2>
            <p className="text-slate-600">We bring the farm closer to you with our premium delivery service.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 space-y-4 hover:translate-y-[-8px] transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🥛</div>
              <h3 className="text-xl font-bold text-slate-900">Fresh Daily</h3>
              <p className="text-slate-600 leading-relaxed">Sourced directly from local farms every morning to ensure maximum freshness and nutrition.</p>
            </div>
            <div className="glass-card p-8 space-y-4 hover:translate-y-[-8px] transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">⚡</div>
              <h3 className="text-xl font-bold text-slate-900">Easy Control</h3>
              <p className="text-slate-600 leading-relaxed">Pause, resume, or change quantities anytime with our intuitive mobile-first dashboard.</p>
            </div>
            <div className="glass-card p-8 space-y-4 hover:translate-y-[-8px] transition-all duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">🛡️</div>
              <h3 className="text-xl font-bold text-slate-900">Purity Guaranteed</h3>
              <p className="text-slate-600 leading-relaxed">Rigorous quality checks at every step. No preservatives, no additives, just pure milk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-28">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">3 Simple Steps</h2>
            <p className="text-slate-600">Get started with your fresh milk journey in minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-slate-200 -z-10"></div>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-brand-primary/30">1</div>
              <h4 className="text-xl font-bold">Pick a Plan</h4>
              <p className="text-slate-600">Choose from our flexible subscription plans that fit your family's needs.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-brand-primary/30">2</div>
              <h4 className="text-xl font-bold">Set Schedule</h4>
              <p className="text-slate-600">Tell us when and where you want your delivery. Early morning? No problem.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-brand-primary/30">3</div>
              <h4 className="text-xl font-bold">Enjoy Freshness</h4>
              <p className="text-slate-600">Wake up to farm-fresh milk at your doorstep, every single day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-24 bg-slate-900 text-white">
        <div className="container-pro text-center space-y-8">
          <h2 className="text-5xl font-bold">Ready to drink pure?</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">Join thousands of families who trust Milkman for their daily nutrition.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/login" className="btn-primary text-lg px-10 py-4">Get Started Now</Link>
            <Link to="/login" className="btn-outline border-white text-white hover:bg-white hover:text-slate-900 text-lg px-10 py-4">Download App</Link>
          </div>
          <div className="pt-20 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span>🥛</span> Milkman
            </div>
            <div className="flex gap-8 text-slate-400">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
            <div className="text-slate-500 text-sm">
              © 2026 Milkman Delivery. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
