"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MessageSquare, Search, ThumbsUp, User, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Define types for the data
interface Author {
  name: string
  avatar: string
  location?: string
}

interface Reply {
  author: Author
  content: string
  date: string
  likes: number
}

interface DiscussionTopic {
  id: number
  title: string
  author: Author
  category: string
  replies: number
  views: number
  lastActivity: string
  tags: string[]
  href: string
}

interface SuccessStory {
  id: number
  title: string
  author: Author
  content: string
  image: string
  likes: number
  comments: number
  date: string
  href: string
}

interface Question {
  id: number
  title: string
  author: Author
  content: string
  category: string
  replies: Reply[]
  date: string
  views: number
  href: string
}

// Dummy data for discussion topics
const discussionTopics: DiscussionTopic[] = [
  {
    id: 1,
    title: "What's the best location for a computer shop in a suburban area?",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Business Planning",
    replies: 24,
    views: 156,
    lastActivity: "2 hours ago",
    tags: ["Location", "Computer Shop", "Retail"],
    href: "/community/topics/1",
  },
  {
    id: 2,
    title: "How to compete with big box retailers when selling computer hardware?",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Marketing Strategies",
    replies: 18,
    views: 132,
    lastActivity: "5 hours ago",
    tags: ["Competition", "Pricing", "Retail Strategy"],
    href: "/community/topics/2",
  },
  {
    id: 3,
    title: "Best inventory management software for a small computer shop?",
    author: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Operations",
    replies: 32,
    views: 210,
    lastActivity: "1 day ago",
    tags: ["Software", "Inventory", "Management"],
    href: "/community/topics/3",
  },
  {
    id: 4,
    title: "How to structure pricing for computer repair services?",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Pricing",
    replies: 15,
    views: 98,
    lastActivity: "2 days ago",
    tags: ["Pricing", "Services", "Repair"],
    href: "/community/topics/4",
  },
  {
    id: 5,
    title: "Tips for hiring knowledgeable tech staff for a computer shop",
    author: {
      name: "Robert Chang",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Hiring",
    replies: 21,
    views: 145,
    lastActivity: "3 days ago",
    tags: ["Hiring", "Staff", "Technical Skills"],
    href: "/community/topics/5",
  },
]

// Dummy data for success stories
const successStories: SuccessStory[] = [
  {
    id: 1,
    title: "From Tech Enthusiast to Successful Computer Shop Owner",
    author: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
    },
    content:
      "I started my computer shop three years ago with just a small storefront and limited inventory. By focusing on exceptional customer service and specialized gaming PC builds, I've grown my business to three locations with 15 employees. The journey wasn't easy, but the BizGuide community provided invaluable advice when I faced challenges with inventory management and marketing.",
    image: "/placeholder.svg?height=300&width=600",
    likes: 87,
    comments: 34,
    date: "March 10, 2023",
    href: "/community/success-stories/1",
  },
  {
    id: 2,
    title: "How I Built a Profitable IT Consulting Business in 18 Months",
    author: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX",
    },
    content:
      "After 10 years in corporate IT, I decided to start my own consulting business. With minimal startup costs and a focus on small business clients, I reached profitability within 6 months. My strategy involved creating service packages tailored to different business sizes and needs. Now I have a team of 5 consultants and a steady stream of clients through referrals.",
    image: "/placeholder.svg?height=300&width=600",
    likes: 65,
    comments: 28,
    date: "February 28, 2023",
    href: "/community/success-stories/2",
  },
]

// Dummy data for questions
const questions: Question[] = [
  {
    id: 1,
    title: "What permits and licenses do I need to open a computer shop?",
    author: {
      name: "Thomas Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm planning to open a computer shop in Chicago and I'm confused about the permits and licenses I need. Does anyone have experience with this process in Illinois? What are the typical costs and timeframes for getting everything approved?",
    category: "Legal & Compliance",
    replies: [
      {
        author: {
          name: "Lisa Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "In Chicago, you'll need a Business License, Retail Merchant License, and potentially a Home Occupation License if you're starting from home. The process took me about 4-6 weeks and cost around $450 total. I'd recommend checking the City of Chicago Business Affairs website for the most current requirements.",
        date: "2 days ago",
        likes: 12,
      },
      {
        author: {
          name: "Mark Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "Don't forget about sales tax registration with the Illinois Department of Revenue. Also, if you're planning to offer repair services, you might want to look into getting insured - it saved me when a customer claimed we damaged their expensive laptop during a repair.",
        date: "1 day ago",
        likes: 8,
      },
    ],
    date: "3 days ago",
    views: 89,
    href: "/community/questions/1",
  },
  {
    id: 2,
    title: "How much inventory should I start with for a new computer shop?",
    author: {
      name: "Jennifer Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'm opening a computer shop next month and trying to determine how much inventory to purchase initially. I have about $50,000 budgeted for inventory. Should I focus on variety or depth? Any recommendations on which products tend to move faster or have better margins?",
    category: "Inventory Management",
    replies: [
      {
        author: {
          name: "Robert Chen",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
          "With $50K, I'd recommend focusing on a good mix of fast-moving accessories (cables, mice, keyboards) which have good margins, plus a selection of mid-range components. Don't tie up too much capital in high-end systems initially. I started with about 60% components, 30% accessories, and 10% display models, then adjusted based on what sold.",
        date: "12 hours ago",
        likes: 15,
      },
    ],
    date: "1 day ago",
    views: 76,
    href: "/community/questions/2",
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTopics = discussionTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container px-4 md:px-6 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="grid gap-6 lg:grid-cols-[2fr,1fr]"
      >
        <Card className="overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src="/images/success-story.svg"
              alt="Computer Shop Success Story"
              fill
              className="object-cover"
              priority
            />
          </div>
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">James Wilson</h2>
                <p className="text-sm text-muted-foreground">Seattle, WA</p>
              </div>
            </div>
            <CardTitle className="text-2xl">From Tech Enthusiast to Successful Computer Shop Owner</CardTitle>
            <CardDescription className="text-base">
              James shares his journey of turning his passion for technology into a thriving business, offering insights
              and lessons learned along the way.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                "I always knew I wanted to work with computers, but I never imagined I'd be running my own successful
                computer shop. Biz Guide provided me with the guidance and community support I needed to make this
                dream a reality."
              </p>
              <p>
                "The most valuable lessons came from connecting with other shop owners through the platform. Their
                experiences helped me avoid common pitfalls and implement proven strategies from day one."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About James</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Business</h3>
                  <p className="text-sm text-muted-foreground">TechHub Solutions - Premium Computer Shop</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">Seattle, Washington</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Member Since</h3>
                  <p className="text-sm text-muted-foreground">March 2022</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Success Story</h3>
                  <p className="text-sm text-muted-foreground">
                    Grew from a small repair service to a full-service computer shop with over 1,000 satisfied customers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Customer Satisfaction</span>
                  <span className="text-sm text-muted-foreground">4.9/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Revenue Growth</span>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Repeat Customers</span>
                  <span className="text-sm text-muted-foreground">70%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

