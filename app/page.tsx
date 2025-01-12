"use client"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">My Business</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300">Features</a>
            <a href="#" className="hover:text-gray-300">Pricing</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to My Business
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mb-8">
          Your all-in-one solution for business management and productivity
        </p>
        
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:scale-105 transition-transform">
            Get Started
          </button>
          <button className="px-8 py-3 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <h3 className="text-2xl font-bold mb-4">Dashboard</h3>
              <p className="text-gray-300">
                Comprehensive overview of your business metrics
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <h3 className="text-2xl font-bold mb-4">Analytics</h3>
              <p className="text-gray-300">
                Detailed insights and reporting tools
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <h3 className="text-2xl font-bold mb-4">Integration</h3>
              <p className="text-gray-300">
                Seamless connection with your existing tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses using our platform
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:scale-105 transition-transform">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          © 2025 My Business. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
