"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Filter, Search, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Article, VideoTutorial } from "../api/types"
import { useRouter } from "next/navigation"
import { YouTubeEmbed } from "../components/youtube-embed"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function InsightsPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([]);
  const [videoTutorials, setVideoTutorials] = useState<VideoTutorial[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const initialLoadComplete = useRef(false);

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch articles, videos, categories, and tags on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch metadata (categories and tags)
        const metadataResponse = await fetch('/api/insights/metadata');
        const metadataData = await metadataResponse.json();
        setCategories(metadataData.categories);
        setAllTags(metadataData.tags);
        
        // Fetch articles
        const articlesResponse = await fetch('/api/insights/articles');
        const articlesData = await articlesResponse.json();
        setArticles(articlesData);
        
        // Fetch videos
        const videosResponse = await fetch('/api/insights/videos');
        const videosData = await videosResponse.json();
        setVideoTutorials(videosData);
        
        // Mark initial load as complete
        initialLoadComplete.current = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Only fetch filtered results when filters change AND initial load is complete
  useEffect(() => {
    // Skip if initial load isn't complete
    if (!initialLoadComplete.current) return;
    
    let isMounted = true;
    const fetchFilteredArticles = async () => {
      try {
        setLoading(true);
        let url = '/api/insights/articles?';
        
        if (selectedCategory !== "All") {
          url += `category=${encodeURIComponent(selectedCategory)}&`;
        }
        
        if (searchQuery) {
          url += `search=${encodeURIComponent(searchQuery)}&`;
        }
        
        if (selectedTags.length > 0) {
          url += `tag=${encodeURIComponent(selectedTags[0])}&`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        if (isMounted) setArticles(data);
        
        // Also fetch videos with search query if provided
        if (searchQuery) {
          const videoResponse = await fetch(`/api/insights/videos?search=${encodeURIComponent(searchQuery)}`);
          const videoData = await videoResponse.json();
          if (isMounted) setVideoTutorials(videoData);
        } else {
          const videoResponse = await fetch('/api/insights/videos');
          const videoData = await videoResponse.json();
          if (isMounted) setVideoTutorials(videoData);
        }
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Debounce the filter changes
    const timer = setTimeout(() => {
      fetchFilteredArticles();
    }, 300);
    
    return () => {
      clearTimeout(timer);
      isMounted = false;
    }
  }, [selectedCategory, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleVideoClick = (e: React.MouseEvent, video: VideoTutorial) => {
    e.preventDefault();
    window.open(video.href, "_blank");
  }

  const featuredArticle = articles.find((article) => article.featured) || articles[0]

  // Define a fixed content area height to prevent layout shifts
  const contentAreaHeight = "min-h-[600px]";

  return (
    <div className="container px-4 md:px-6 py-10 mx-auto space-y-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <Badge variant="outline" className="mb-2">
            Insights
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Articles & Guides</h1>
          <p className="text-muted-foreground mt-1">
            Discover valuable insights and tutorials to start and grow your business
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filter Articles</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="grid gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          className="h-4 w-4 text-primary"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                        />
                        <Label htmlFor={category}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Tags</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="text-sm">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTags([]);
                }}>
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full sm:w-auto">
            <Input
              placeholder="Search articles..."
              className="w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="articles" className="space-y-8">
        <TabsList>
          <TabsTrigger value="articles">Articles & Guides</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className={`space-y-8 ${contentAreaHeight}`}>
          {loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Link href={featuredArticle.href} target="_blank">
                    <Card className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-2/5 h-60 md:h-[400px] relative">
                          <Image
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority
                          />
                        </div>
                        <div className="p-6 md:w-3/5 flex flex-col">
                          <Badge variant="outline" className="w-fit mb-2">
                            Featured
                          </Badge>
                          <CardHeader className="p-0 space-y-2">
                            <CardTitle className="text-xl md:text-2xl">{featuredArticle.title}</CardTitle>
                            <CardDescription className="text-base">{featuredArticle.description}</CardDescription>
                          </CardHeader>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {featuredArticle.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{featuredArticle.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{featuredArticle.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )}

              {/* Article Grid */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {articles.length > 0 ? (
                  articles
                    .filter((article) => article.id !== featuredArticle?.id)
                    .map((article) => (
                      <motion.div key={article.id} variants={fadeIn}>
                        <Link href={article.href} target="_blank">
                          <Card className="h-full flex flex-col border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="relative h-48">
                              <Image 
                                src={article.image} 
                                alt={article.title} 
                                fill 
                                className="object-cover" 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/images/tech-retail-guide.svg"; // Fallback image
                                }}
                              />
                            </div>
                            <CardHeader className="flex-1">
                              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                              <CardDescription className="line-clamp-3">{article.description}</CardDescription>
                            </CardHeader>
                            <div className="px-6 pb-2 flex flex-wrap gap-2">
                              {article.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-secondary/50">
                                  {tag}
                                </Badge>
                              ))}
                              {article.tags.length > 2 && (
                                <Badge variant="secondary" className="bg-secondary/50">
                                  +{article.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                            <CardFooter className="flex justify-between py-4 text-xs text-muted-foreground border-t">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{article.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.readTime}</span>
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-3 flex justify-center items-center h-40">
                    <p className="text-muted-foreground">No articles found matching your criteria.</p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </TabsContent>

        <TabsContent value="videos" className={`space-y-8 ${contentAreaHeight}`}>
          {loading ? (
            <div className="flex items-center justify-center h-[500px]">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : selectedVideo ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVideo(null)}
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to videos
                </Button>
              </div>
              
              <Card className="overflow-hidden border-border/40 shadow-sm">
                <YouTubeEmbed url={selectedVideo.href} title={selectedVideo.title} />
                <CardHeader>
                  <CardTitle>{selectedVideo.title}</CardTitle>
                  <CardDescription>
                    {selectedVideo.instructor} • {selectedVideo.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{selectedVideo.description}</p>
                </CardContent>
              </Card>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">More Videos</h3>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {videoTutorials
                  .filter(v => v.id !== selectedVideo.id)
                  .slice(0, 3)
                  .map(video => (
                    <Card 
                      key={video.id} 
                      className="cursor-pointer border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="relative h-48 group">
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base line-clamp-2">{video.title}</CardTitle>
                        <CardDescription className="text-sm">{video.instructor}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {videoTutorials.length > 0 ? (
                videoTutorials.map((video) => (
                  <motion.div key={video.id} variants={fadeIn}>
                    <div 
                      className="cursor-pointer" 
                      onClick={(e) => handleVideoClick(e, video)}
                    >
                      <Card className="h-full flex flex-col border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                        <div className="relative h-48 group">
                          <Image 
                            src={video.thumbnail} 
                            alt={video.title} 
                            fill 
                            className="object-cover" 
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                            {video.duration}
                          </div>
                        </div>
                        <CardHeader className="flex-1">
                          <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                          <CardDescription className="line-clamp-3">{video.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between py-4 text-xs text-muted-foreground border-t">
                          <div className="flex items-center gap-1">
                            <span>{video.instructor}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{video.date}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 flex justify-center items-center h-40">
                  <p className="text-muted-foreground">No videos found matching your search.</p>
                </div>
              )}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

