"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Share } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { YouTubeEmbed } from "./youtube-embed"
import { VideoTutorial } from "@/app/api/types"

interface VideoPageProps {
  videoUrl: string
  backUrl?: string
}

export function VideoPage({ videoUrl, backUrl = "/insights" }: VideoPageProps) {
  const [video, setVideo] = useState<VideoTutorial | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<VideoTutorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)
        
        // Find the current video
        const videosRes = await fetch("/api/insights/videos")
        const videos = await videosRes.json()
        
        // Look for the video with the matching href
        const currentVideo = videos.find(
          (v: VideoTutorial) => v.href === videoUrl || v.href.includes(videoUrl)
        )
        
        if (currentVideo) {
          setVideo(currentVideo)
          
          // Get related videos - videos from the same instructor or with similar tags
          const related = videos
            .filter((v: VideoTutorial) => v.id !== currentVideo.id)
            .sort(() => 0.5 - Math.random()) // Randomly sort
            .slice(0, 3) // Take top 3
          
          setRelatedVideos(related)
        }
      } catch (error) {
        console.error("Error fetching video:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [videoUrl])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex items-center mb-6">
          <Link href={backUrl}>
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
            <p className="text-muted-foreground">
              The video you're looking for could not be found.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/insights">Browse Videos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center mb-6">
        <Link href={backUrl}>
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Insights
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <YouTubeEmbed url={video.href} title={video.title} />
            <CardHeader>
              <CardTitle className="text-2xl">{video.title}</CardTitle>
              <div className="flex items-center justify-between">
                <CardDescription>{video.instructor}</CardDescription>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {video.date}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{video.description}</p>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Related Videos</h3>
          {relatedVideos.map((relatedVideo) => (
            <Link href={relatedVideo.href} key={relatedVideo.id}>
              <Card className="border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video relative bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {relatedVideo.duration}
                  </div>
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-base line-clamp-2">{relatedVideo.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {relatedVideo.instructor}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 