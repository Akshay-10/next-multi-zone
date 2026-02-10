import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans dark:from-gray-900 dark:to-gray-800">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-24 px-8 sm:px-16 relative">
        {/* Back Button */}
        <a 
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:shadow-lg group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm font-medium">Back to Main App</span>
        </a>

        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Zone One
          </div>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
        </div>
        
        <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Welcome to Zone One
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
              Multi-Zone Next.js Application
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              This is <span className="font-semibold text-blue-600 dark:text-blue-400">Zone One</span>, an independent Next.js application 
              that's part of a multi-zone architecture. Multi-zone apps allow you to merge multiple Next.js applications 
              into a single cohesive experience while maintaining separate codebases and deployment pipelines.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Each zone can be developed, tested, and deployed independently, enabling better team collaboration 
              and more flexible scaling. This architecture is perfect for large-scale applications with multiple 
              feature domains or when migrating incrementally from legacy systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
            <div className="flex flex-col items-center gap-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl">🚀</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Independent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Develop and deploy zones separately</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl">🔗</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Unified</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Seamless navigation between zones</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl">⚡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Scalable</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Perfect for large teams and apps</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-white transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto"
            href="https://nextjs.org/docs/app/building-your-application/deploying/multi-zones"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Multi-Zone Docs
          </a>
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-blue-600 dark:border-blue-400 px-6 text-blue-600 dark:text-blue-400 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 sm:w-auto"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            📖 Next.js Docs
          </a>
        </div>
      </main>
    </div>
  );
}
