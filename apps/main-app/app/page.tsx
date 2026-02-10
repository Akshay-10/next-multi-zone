import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 font-sans dark:from-gray-950 dark:via-purple-950 dark:to-gray-900">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-24 px-8 sm:px-16">
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-5 py-2.5 text-sm font-semibold text-purple-700 dark:text-purple-300 shadow-lg">
            <span className="text-lg">🏠</span>
            Main Application
          </div>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={140}
            height={28}
            priority
          />
        </div>
        
        <div className="flex flex-col items-center gap-10 text-center max-w-3xl">
          <div className="flex flex-col gap-5">
            <h1 className="text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Multi-Zone Architecture
            </h1>
            <p className="text-2xl text-purple-600 dark:text-purple-400 font-semibold">
              Main Application Hub
            </p>
          </div>
          
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              This is the <span className="font-bold text-purple-600 dark:text-purple-400">Main App</span>, serving as the central 
              orchestrator for your multi-zone Next.js architecture. The main app acts as a reverse proxy, seamlessly 
              routing requests to different zones while providing a unified user experience.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              The main app uses Next.js rewrites to intelligently route traffic to various zones based on URL patterns. 
              Each zone runs independently on its own server, but users experience a single, cohesive application. 
              This allows for better code organization, independent deployments, and improved scalability across large teams.
            </p>
          </div>

          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How Main App Routes Traffic
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Request Interception</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User navigates to a zone-specific route (e.g., <code className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">/zone-one</code>)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Rewrite Rules Match</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Next.js rewrites match the pattern and determine the target zone server
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Proxy to Zone</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Request is proxied to the zone's server (e.g., localhost:3001) transparently
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Unified Experience</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User sees seamless navigation across zones with a single domain
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
            <div className="flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg text-white">
              <div className="text-4xl">🎯</div>
              <h3 className="font-bold text-xl">Centralized Routing</h3>
              <p className="text-sm text-center opacity-90">
                Single entry point that intelligently distributes traffic to zones
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg text-white">
              <div className="text-4xl">🔄</div>
              <h3 className="font-bold text-xl">Seamless Integration</h3>
              <p className="text-sm text-center opacity-90">
                Zones appear as one application to end users
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <a
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-white transition-all hover:shadow-2xl hover:scale-105 sm:w-auto"
            href="/zone-one"
          >
            <span className="text-xl">🚀</span>
            Navigate to Zone One
          </a>
          <a
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-purple-600 dark:border-purple-400 px-8 text-purple-600 dark:text-purple-400 transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105 sm:w-auto"
            href="https://nextjs.org/docs/app/building-your-application/deploying/multi-zones"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Learn More
          </a>
        </div>
      </main>
    </div>
  );
}
