import LoginForm from "@/components/login/login-form";

export default function Login() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <LoginForm />
      </div>
    </main>
  )
}
