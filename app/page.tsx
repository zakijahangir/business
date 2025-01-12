import { FileUpload } from "./components/file-upload"
import { Dashboard } from "./components/dashboard"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Procurement AI Assistant</h1>
      <FileUpload />
      <Dashboard />
    </main>
  )
}

