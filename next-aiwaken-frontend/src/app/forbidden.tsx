export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-3xl font-semibold text-gray-200">Access Forbidden</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Sorry, you don&apos;t have permission to access this page. Please make sure you&apos;re logged in or have the necessary permissions.
        </p>
        <div className="pt-4">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </a>
        </div>
      </div>
    </div>
  )
}