import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function InfoSettings() {
  return (
    <div className="min-h-screen bg-[#0A0B14] text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">Information Settings</h1>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Profile Share Options</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tap to Share with a dot.device</li>
              <li>Multi-Device Management</li>
              <li>With Username Link</li>
              <li>With Profile QR Code</li>
              <li>Apple Wallet Integration</li>
              <li>Android Wallet Integration</li>
              <li>Direct Contact Download</li>
              <li>Two Way Contact Exchange</li>
              <li>Direct Link Share</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Profile Content</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Add Company Logo (Pro only)</li>
              <li>Profile Picture</li>
              <li>Banner Picture</li>
              <li>Bio Fields</li>
              <li>Real Time Updates</li>
              <li>Unlimited Link Content</li>
              <li>Custom Link Titles</li>
              <li>Contact Info</li>
              <li>Social Links</li>
              <li>Productivity Links</li>
              <li>Payment Links</li>
              <li>Music Links</li>
              <li>Rearrange Links</li>
              <li>Edit Contact Card Details</li>
            </ul>
          </section>

          <Link href="/settings/design">
            <Button className="w-full">Go to Design Settings</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

