import { Button } from "@/components/ui/button"
import { TokenStorage } from "@/lib/token-storage"

export default function Forbidden() {

  const handleClearAccessToken = () => {
    TokenStorage.removeAccessToken()
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-3xl font-semibold text-gray-200">Access Forbidden</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Sorry, you don&apos;t have permission to access this page. Please make sure you&apos;re logged in or have the necessary permissions.
        </p>
        <div className="pt-4">
          <Button
            onClick={handleClearAccessToken}
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Return to Login
          </Button>
        </div>
      </div>
    </div>
  )
}