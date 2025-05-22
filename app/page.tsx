"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  Building,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

const featuredBusinesses = [
  {
    title: "Tech Retail Store",
    description:
      "Start a profitable tech retail business with expert guidance on inventory, marketing, and customer service.",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    href: "/recommendations/tech-retail-store",
    badge: "High Demand",
  },
  {
    title: "Coffee Shop",
    description:
      "Launch a cozy café with insights on location selection, equipment, and creating a unique customer experience.",
    icon: <Building className="h-10 w-10 text-primary" />,
    href: "/recommendations/coffee-shop",
    badge: "Popular",
  },
  {
    title: "Digital Marketing Agency",
    description: "Build a modern agency with strategies for client acquisition, service pricing, and team management.",
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    href: "/recommendations/digital-marketing",
    badge: "Low Investment",
  },
]

const testimonials = [
  {
    quote:
      "Biz Guide helped me identify the perfect business opportunity that matched my skills and budget. I'm now running a successful tech store!",
    author: "Michael Chen",
    role: "Founder, TechHub Solutions",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The insights and community support from Biz Guide were invaluable when I was starting my coffee shop. Highly recommended!",
    author: "Sarah Johnson",
    role: "Owner, Brew & Bean Café",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "As a first-time entrepreneur, Biz Guide's step-by-step guides and personalized recommendations made all the difference.",
    author: "David Wilson",
    role: "CEO, Wilson Digital Marketing",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col gap-4">
              <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20 mb-2">
                Your Business Success Partner
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
                Find Your Perfect <span className="text-primary">Business Opportunity</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Get personalized business recommendations, expert insights, and connect with a community of
                entrepreneurs to start and grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/recommendations">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Business Recommendations
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Business Strategies
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <Image src={`/placeholder.svg?height=32&width=32&text=${i}`} alt="User" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">2,500+</span> entrepreneurs joined this month
                </div>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[600px] aspect-[4/3]">
                <Image
                  src="/images/hero-business.svg"
                  alt="Business Growth Visualization"
                  width={600}
                  height={450}
                  className="object-contain rounded-2xl shadow-xl bg-gradient-to-br from-primary/5 to-cyan-500/5"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 bg-background rounded-lg p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Success Rate</div>
                      <div className="text-2xl font-bold">87%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-background rounded-lg p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Satisfaction</div>
                      <div className="text-2xl font-bold">4.9/5</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Business Opportunities */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Trending Opportunities
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Business Opportunities
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-[800px]">
              Explore these trending business ideas with comprehensive guides and expert recommendations.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredBusinesses.map((business, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full flex flex-col overflow-hidden border-border/40 transition-all duration-200 hover:shadow-md hover:border-primary/20 group">
                  <CardHeader>
                    <div className="mb-4 bg-primary/10 p-3 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      {business.icon}
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{business.title}</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {business.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{business.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-4">
                    <Link href={business.href} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link href="/recommendations">
              <Button variant="outline" size="lg">
                View All Business Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How Biz Guide Works</h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-[800px]">
              Our platform provides everything you need to start and grow your business with confidence.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-3"
          >
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-70"></div>
                <div className="relative bg-primary/10 p-5 rounded-full">
                  <Lightbulb className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-background border border-primary/20 rounded-full h-8 w-8 flex items-center justify-center text-primary font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Get tailored business suggestions based on your interests, budget, and location through our smart
                recommendation engine.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Matches your skills & experience</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Considers your financial resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Analyzes market opportunities</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-70"></div>
                <div className="relative bg-primary/10 p-5 rounded-full">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-background border border-primary/20 rounded-full h-8 w-8 flex items-center justify-center text-primary font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Insights</h3>
              <p className="text-muted-foreground">
                Access comprehensive guides, strategies, and market trends from industry experts to make informed
                decisions.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Detailed business guides</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Financial planning tools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Marketing strategy templates</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-70"></div>
                <div className="relative bg-primary/10 p-5 rounded-full">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-background border border-primary/20 rounded-full h-8 w-8 flex items-center justify-center text-primary font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Support</h3>
              <p className="text-muted-foreground">
                Connect with fellow entrepreneurs to share experiences, get advice, and build valuable business
                relationships.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Discussion forums by industry</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Mentorship opportunities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span>Networking events</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 text-muted-foreground md:text-xl max-w-[800px]">
              Join thousands of entrepreneurs who have found success with Biz Guide.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background border-border/40">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to Start Your Business?</h2>
        <p className="mt-4 text-muted-foreground md:text-xl max-w-[800px]">
          Join thousands of entrepreneurs who have found success with Biz Guide.
        </p>
      </div>
    </div>
  )
}

