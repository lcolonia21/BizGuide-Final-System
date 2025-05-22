"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BusinessRecommendation } from "@/hooks/use-recommendations"

interface PdfDownloadButtonProps {
  business: BusinessRecommendation
  className?: string
}

export function PdfDownloadButton({ business, className }: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = () => {
    setIsLoading(true)
    
    // Simulate PDF generation and download
    setTimeout(() => {
      // Create a blob with dummy PDF data
      const blob = new Blob(['PDF content would go here'], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      // Create a link and trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = `${business.title.toLowerCase().replace(/\s+/g, '-')}-business-guide.pdf`
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Button 
      className={className} 
      variant="outline" 
      onClick={handleDownload}
      disabled={isLoading}
    >
      <Download className="h-4 w-4 mr-2" />
      {isLoading ? "Preparing PDF..." : "Download PDF"}
    </Button>
  )
} 