"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BarChart, Calendar, ChevronRight, Clock, Lightbulb, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

// Dummy data for charts
const profitabilityData = [
  { name: "Computer Shop", value: 85 },
  { name: "Coffee Shop", value: 75 },
  { name: "Digital Marketing", value: 90 },
  { name: "Food Truck", value: 65 },
  { name: "Online Store", value: 80 },
]

// Dummy data for recommended businesses
const recommendedBusinesses = [
  {
    title: "Computer Shop",
    description: "Based on your tech background and market analysis, a computer shop has high potential in your area.",
    profitMargin: "25-30%",
    startupCost: "₱50,000 - ₱80,000",
    href: "/recommendations/computer-shop",
  },
  {
    title: "IT Consulting",
    description: "Leverage your expertise to provide IT solutions to small businesses with minimal startup costs.",
    profitMargin: "40-60%",
    startupCost: "₱5,000 - ₱15,000",
    href: "/recommendations/it-consulting",
  },
  {
    title: "Tech Repair Service",
    description: "A growing demand for device repairs makes this a lucrative option with moderate investment.",
    profitMargin: "30-45%",
    startupCost: "₱10,000 - ₱25,000",
    href: "/recommendations/tech-repair",
  },
]

// Dummy data for market trends
const marketTrends = [
  {
    title: "Remote Work Solutions",
    description: "Growing demand for products and services that support remote work environments.",
    growth: "+32% YoY",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Sustainable Tech",
    description: "Increasing consumer preference for eco-friendly and sustainable technology products.",
    growth: "+28% YoY",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Digital Transformation",
    description: "Small businesses seeking affordable tech solutions for digital transformation.",
    growth: "+45% YoY",
    icon: <BarChart className="h-5 w-5" />,
  },
]

// Dummy data for expert insights
const expertInsights = [
  {
    title: "Optimizing Inventory for Tech Retail",
    author: "Sarah Johnson",
    date: "March 15, 2023",
    readTime: "8 min read",
    href: "/insights/optimizing-inventory",
  },
  {
    title: "Customer Acquisition Strategies for Tech Businesses",
    author: "Michael Chen",
    date: "March 10, 2023",
    readTime: "12 min read",
    href: "/insights/customer-acquisition",
  },
  {
    title: "Pricing Strategies for IT Services",
    author: "David Wilson",
    date: "March 5, 2023",
    readTime: "10 min read",
    href: "/insights/pricing-strategies",
  },
]

export default function Dashboard() {
  return (
    <div className="container px-4 md:px-6 py-10 mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col gap-2 mb-8">
        <Badge variant="outline" className="w-fit mb-2">
          Dashboard
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">
          Here's an overview of your personalized business recommendations and insights.
        </p>
      </motion.div>

      <Tabs defaultValue="recommendations" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="market-trends">Market Trends</TabsTrigger>
          <TabsTrigger value="expert-insights">Expert Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {recommendedBusinesses.map((business, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full flex flex-col border-border/40 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{business.title}</CardTitle>
                    <CardDescription>{business.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Profit Margin</p>
                        <p className="font-medium">{business.profitMargin}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Startup Cost</p>
                        <p className="font-medium">{business.startupCost}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-4">
                    <Link href={business.href} className="w-full">
                      <Button variant="outline" className="w-full group">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="market-trends">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-full border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Business Profitability Comparison</CardTitle>
                  <CardDescription>Based on current market analysis and industry trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={profitabilityData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`${value}%`, "Profitability"]} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full border-border/40 shadow-sm">
                <CardHeader>
                  <CardTitle>Trending Industries</CardTitle>
                  <CardDescription>Fastest growing business sectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketTrends.map((trend, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">{trend.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{trend.title}</h4>
                            <span className="text-xs font-medium text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                              {trend.growth}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{trend.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expert-insights">
          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Latest Expert Insights</CardTitle>
              <CardDescription>Curated articles and guides from industry experts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {expertInsights.map((insight, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="flex-1">
                      <Link href={insight.href}>
                        <h3 className="font-semibold hover:text-primary transition-colors">{insight.title}</h3>
                      </Link>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span>{insight.author}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {insight.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {insight.readTime}
                        </span>
                      </div>
                    </div>
                    <Link href={insight.href}>
                      <Button variant="outline" size="sm" className="group">
                        Read Article
                        <ChevronRight className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/insights" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Insights
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Learning Resources</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Business Planning</CardTitle>
              <CardDescription>Essential guides for creating a solid business plan</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/business-planning/bp-template" className="hover:underline">
                    Business Plan Template
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/business-planning/financial-projections" className="hover:underline">
                    Creating Financial Projections
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/business-planning/market-analysis" className="hover:underline">
                    Market Analysis Guide
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/resources/business-planning" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View All Resources
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Marketing Strategies</CardTitle>
              <CardDescription>Effective marketing approaches for new businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/marketing/digital-marketing" className="hover:underline">
                    Digital Marketing Basics
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/marketing/social-media" className="hover:underline">
                    Social Media Strategy
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/marketing/local-marketing" className="hover:underline">
                    Local Marketing Tactics
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/resources/marketing" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View All Resources
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Operations</CardTitle>
              <CardDescription>Guides for efficient business operations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/operations/inventory-management" className="hover:underline">
                    Inventory Management
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/operations/hiring-guide" className="hover:underline">
                    Hiring Your First Employee
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  <Link href="/resources/operations/customer-service" className="hover:underline">
                    Customer Service Excellence
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/resources/operations" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View All Resources
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-4 text-center">
          <Link href="/learning-resources">
            <Button variant="default">
              Browse All Learning Resources
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

