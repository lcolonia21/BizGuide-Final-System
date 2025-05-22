"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BusinessRecommendation } from "@/hooks/use-recommendations"

interface ShareButtonProps {
  business: BusinessRecommendation
  className?: string
}

export function ShareButton({ business, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopyLink = () => {
    // Get the current URL
    const url = window.location.href
    
    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  
  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this ${business.title} business guide on Biz Guide!`
    
    let shareUrl = ''
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Biz Guide - ${business.title}`)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="grid gap-2">
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleShare('twitter')}>
            Twitter
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleShare('facebook')}>
            Facebook
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleShare('linkedin')}>
            LinkedIn
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleShare('email')}>
            Email
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleCopyLink}>
            {copied ? "Link copied!" : "Copy link"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
} 