"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, BarChart3, Users, TrendingUp, Clock, AlertTriangle, DollarSign, Store, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useRecommendations, FormData as RecommendationFormData, BusinessRecommendation } from "@/hooks/use-recommendations"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Business categories
const businessCategories = [
  "Technology",
  "Food & Beverage",
  "Retail",
  "Professional Services",
  "Health & Wellness",
  "Education",
  "Entertainment",
  "Manufacturing",
  "Construction",
  "Transportation",
]

// Locations
const locations = ["Urban", "Suburban", "Rural", "Online Only"]

// Function to convert title to kebab-case
const titleToKebabCase = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

export default function RecommendationPage() {
  const [step, setStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState<RecommendationFormData>({
    interests: [],
    skills: "",
    budget: [50000],
    location: "",
    experience: "",
    goals: "",
  })
  const [recommendationResults, setRecommendationResults] = useState<BusinessRecommendation[]>([])
  
  const { getRecommendations } = useRecommendations()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Generate recommendations based on form data
    const recommendations = getRecommendations(formData)
    setRecommendationResults(recommendations)
    
    setShowResults(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBudgetChange = (value: number[]) => {
    setFormData({ ...formData, budget: value })
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container px-4 md:px-6 py-10 mx-auto">
      {!showResults ? (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-4">
              Find Your Perfect Business
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Business Recommendation Finder</h1>
            <p className="text-muted-foreground">
              Answer a few questions to get personalized business recommendations tailored to your interests, skills,
              and budget.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step === stepNumber
                      ? "border-primary bg-primary text-primary-foreground"
                      : step > stepNumber
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-muted bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
                </div>
              ))}
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-muted rounded-full">
                  <div
                    className="h-1 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                Interests & Skills
              </span>
              <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                Budget & Location
              </span>
              <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                Experience & Goals
              </span>
            </div>
          </div>

          <Card className="border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Tell us about your interests and skills"}
                {step === 2 && "What's your budget and preferred location?"}
                {step === 3 && "Share your experience and business goals"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "This helps us understand what type of business would be a good fit for you"}
                {step === 2 &&
                  "We'll recommend businesses that match your financial resources and location preferences"}
                {step === 3 && "Your experience level and goals help us tailor our recommendations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="interests" className="text-base">
                        Which business categories interest you the most?
                      </Label>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {businessCategories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={category}
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                              onChange={(e) => {
                                const isChecked = e.target.checked
                                setFormData({
                                  ...formData,
                                  interests: isChecked
                                    ? [...formData.interests, category]
                                    : formData.interests.filter((item) => item !== category),
                                })
                              }}
                              checked={formData.interests.includes(category)}
                            />
                            <Label htmlFor={category} className="text-sm font-normal">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="skills" className="text-base">
                        What skills and expertise do you have?
                      </Label>
                      <Textarea
                        id="skills"
                        placeholder="E.g., technical knowledge, customer service, management experience, etc."
                        className="mt-2"
                        rows={4}
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="group"
                        disabled={formData.interests.length === 0}
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="budget" className="text-base mb-6 block">
                        What's your budget for starting a business?
                      </Label>
                      <div className="px-3">
                        <Slider
                          defaultValue={formData.budget}
                          max={200000}
                          step={5000}
                          onValueChange={handleBudgetChange}
                        />
                        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                          <span>₱0</span>
                          <span>₱100,000</span>
                          <span>₱200,000+</span>
                        </div>
                        <p className="mt-4 text-center font-medium">₱{formData.budget[0].toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-base">
                        Preferred business location type
                      </Label>
                      <RadioGroup
                        id="location"
                        className="mt-3 grid grid-cols-2 gap-3"
                        value={formData.location}
                        onValueChange={(value) => setFormData({ ...formData, location: value })}
                      >
                        {locations.map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <RadioGroupItem value={location} id={location} />
                            <Label htmlFor={location} className="text-sm font-normal">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep} 
                        className="group"
                        disabled={!formData.location}
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="experience" className="text-base">
                        What's your level of business experience?
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => setFormData({ ...formData, experience: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No prior business experience</SelectItem>
                          <SelectItem value="some">Some experience (worked in business)</SelectItem>
                          <SelectItem value="moderate">Moderate (managed teams/departments)</SelectItem>
                          <SelectItem value="experienced">Experienced (previously owned a business)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="goals" className="text-base">
                        What are your primary goals for starting a business?
                      </Label>
                      <Textarea
                        id="goals"
                        placeholder="E.g., financial independence, pursuing a passion, creating jobs in your community, etc."
                        className="mt-2"
                        rows={4}
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                      <Button 
                        type="submit" 
                        className="group"
                        disabled={!formData.experience}
                      >
                        Get Recommendations
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-4">
              Your Results
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Your Personalized Business Recommendations</h1>
            <p className="text-muted-foreground">
              Based on your interests, skills, budget, and goals, we've identified these business
              opportunities that would be a great fit for you.
            </p>
          </div>

          <div className="space-y-10">
            {recommendationResults.map((business, index) => (
              <motion.div
                key={business.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/40 shadow-sm overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="px-3 py-1 text-sm">
                        Match: {business.match}
                      </Badge>
                      <Badge
                        variant={
                          parseFloat(business.match) > 90
                            ? "destructive"
                            : parseFloat(business.match) > 80
                            ? "default"
                            : "secondary"
                        }
                        className={`px-3 py-1 text-sm ${
                          parseFloat(business.match) > 90
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : parseFloat(business.match) > 80
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {parseFloat(business.match) > 90
                          ? "Excellent Match"
                          : parseFloat(business.match) > 80
                          ? "Good Match"
                          : "Potential Match"}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{business.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Business Overview</h3>
                      <p className="leading-relaxed">{business.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Startup Cost</h4>
                            <p className="text-muted-foreground">{business.startupCost}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Profit Margin</h4>
                            <p className="text-muted-foreground">{business.profitMargin}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Time to Profit</h4>
                            <p className="text-muted-foreground">{business.timeToProfit}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Risk Level</h4>
                            <p className="text-muted-foreground">{business.riskLevel}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Key Requirements</h3>
                      <ul className="space-y-2">
                        {business.keyRequirements.map((requirement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Expert Advice</h3>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="italic text-muted-foreground">{business.expertAdvice}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-xl font-semibold mb-4">Market Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-muted/30">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <TrendingUp className="h-8 w-8 text-primary mb-2" />
                            <h4 className="font-medium">Growth Trend</h4>
                            <p className="text-sm text-muted-foreground">
                              {business.title === "Computer Shop" 
                                ? "6.8% annual growth" 
                                : business.title === "IT Consulting" 
                                ? "12.3% annual growth"
                                : business.title === "Tech Repair Service"
                                ? "8.5% annual growth"
                                : business.title === "Digital Marketing Agency"
                                ? "16.2% annual growth"
                                : business.title === "Sustainable Retail Store"
                                ? "22.4% annual growth"
                                : business.title === "Online Education Platform"
                                ? "18.7% annual growth"
                                : business.title === "Healthcare Consultancy"
                                ? "14.6% annual growth"
                                : business.title === "Food Truck"
                                ? "7.9% annual growth"
                                : business.title === "Coffee Shop"
                                ? "5.2% annual growth"
                                : business.title === "Personal Fitness Training"
                                ? "9.8% annual growth"
                                : "10.5% annual growth"}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <Users className="h-8 w-8 text-primary mb-2" />
                            <h4 className="font-medium">Target Audience</h4>
                            <p className="text-sm text-muted-foreground">
                              {business.title === "Computer Shop" 
                                ? "Students, professionals, gamers" 
                                : business.title === "IT Consulting" 
                                ? "SMEs, startups, non-profits"
                                : business.title === "Tech Repair Service"
                                ? "Individuals, businesses, schools"
                                : business.title === "Digital Marketing Agency"
                                ? "Small businesses, local services"
                                : business.title === "Sustainable Retail Store"
                                ? "Eco-conscious consumers, millennials"
                                : business.title === "Online Education Platform"
                                ? "Students, professionals, lifelong learners"
                                : business.title === "Healthcare Consultancy"
                                ? "Clinics, hospitals, practitioners"
                                : business.title === "Food Truck"
                                ? "Office workers, event attendees"
                                : business.title === "Coffee Shop"
                                ? "Students, remote workers, social groups"
                                : business.title === "Personal Fitness Training"
                                ? "Fitness enthusiasts, busy professionals"
                                : "Various consumer segments"}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <Briefcase className="h-8 w-8 text-primary mb-2" />
                            <h4 className="font-medium">Success Rate</h4>
                            <p className="text-sm text-muted-foreground">
                              {business.title === "Computer Shop" 
                                ? "68% after 5 years" 
                                : business.title === "IT Consulting" 
                                ? "82% after 5 years"
                                : business.title === "Tech Repair Service"
                                ? "75% after 5 years"
                                : business.title === "Digital Marketing Agency"
                                ? "65% after 5 years"
                                : business.title === "Sustainable Retail Store"
                                ? "58% after 5 years"
                                : business.title === "Online Education Platform"
                                ? "72% after 5 years"
                                : business.title === "Healthcare Consultancy"
                                ? "85% after 5 years"
                                : business.title === "Food Truck"
                                ? "52% after 5 years"
                                : business.title === "Coffee Shop"
                                ? "45% after 5 years"
                                : business.title === "Personal Fitness Training"
                                ? "78% after 5 years"
                                : "65% after 5 years"}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-xl font-semibold mb-4">Competitive Analysis</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted/50 text-left">
                              <th className="p-2 border-b">Factor</th>
                              <th className="p-2 border-b">Market Saturation</th>
                              <th className="p-2 border-b">Entry Barriers</th>
                              <th className="p-2 border-b">Competition Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 border-b">Rating</td>
                              <td className="p-2 border-b">
                                {business.title === "Computer Shop" 
                                  ? "High" 
                                  : business.title === "IT Consulting" 
                                  ? "Medium"
                                  : business.title === "Tech Repair Service"
                                  ? "Medium"
                                  : business.title === "Digital Marketing Agency"
                                  ? "High"
                                  : business.title === "Sustainable Retail Store"
                                  ? "Low"
                                  : business.title === "Online Education Platform"
                                  ? "Medium"
                                  : business.title === "Healthcare Consultancy"
                                  ? "Low"
                                  : business.title === "Food Truck"
                                  ? "Medium"
                                  : business.title === "Coffee Shop"
                                  ? "High"
                                  : business.title === "Personal Fitness Training"
                                  ? "Medium"
                                  : "Medium"}
                              </td>
                              <td className="p-2 border-b">
                                {business.title === "Computer Shop" 
                                  ? "Medium" 
                                  : business.title === "IT Consulting" 
                                  ? "Low"
                                  : business.title === "Tech Repair Service"
                                  ? "Low"
                                  : business.title === "Digital Marketing Agency"
                                  ? "Low"
                                  : business.title === "Sustainable Retail Store"
                                  ? "Medium"
                                  : business.title === "Online Education Platform"
                                  ? "Medium"
                                  : business.title === "Healthcare Consultancy"
                                  ? "High"
                                  : business.title === "Food Truck"
                                  ? "Medium"
                                  : business.title === "Coffee Shop"
                                  ? "Medium"
                                  : business.title === "Personal Fitness Training"
                                  ? "Low"
                                  : "Medium"}
                              </td>
                              <td className="p-2 border-b">
                                {business.title === "Computer Shop" 
                                  ? "High" 
                                  : business.title === "IT Consulting" 
                                  ? "Medium"
                                  : business.title === "Tech Repair Service"
                                  ? "Medium"
                                  : business.title === "Digital Marketing Agency"
                                  ? "High"
                                  : business.title === "Sustainable Retail Store"
                                  ? "Low"
                                  : business.title === "Online Education Platform"
                                  ? "Medium"
                                  : business.title === "Healthcare Consultancy"
                                  ? "Medium"
                                  : business.title === "Food Truck"
                                  ? "Medium"
                                  : business.title === "Coffee Shop"
                                  ? "High"
                                  : business.title === "Personal Fitness Training"
                                  ? "Medium"
                                  : "Medium"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <Link href={`/recommendations/${titleToKebabCase(business.title)}`}>
                          View Detailed Guide <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Back to Questions
            </Button>
            <Button variant="default" onClick={() => window.print()}>
              Save Results
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

