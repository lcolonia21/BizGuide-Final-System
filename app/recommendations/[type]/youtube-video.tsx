"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface YoutubeVideoProps {
  searchQuery: string
  index?: number
  onLoad?: () => void
}

export function YoutubeVideo({ searchQuery, index = 0, onLoad }: YoutubeVideoProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Fetch video data from our API endpoint
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/videos?query=${encodeURIComponent(searchQuery)}&index=${index}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }
        
        const data = await response.json();
        setVideoId(data.videoId);
        setLoading(false);
        onLoad?.();
      } catch (err) {
        console.error("Error loading video:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [searchQuery, index, onLoad]);

  if (loading) {
    return <Skeleton className="w-full aspect-video rounded-lg" />
  }

  if (error || !videoId) {
    return (
      <div className="w-full aspect-video flex items-center justify-center rounded-lg bg-secondary">
        <p className="text-muted-foreground">Could not load video</p>
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
} 