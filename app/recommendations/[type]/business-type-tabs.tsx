"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { YoutubeVideo } from "./youtube-video"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Guide } from "@/app/api/types"

interface BusinessTypeTabsProps {
  guide: Guide
  businessType?: string
}

interface BusinessResources {
  articles?: { title: string; url: string }[];
  guides?: { title: string; url: string }[];
}

export function BusinessTypeTabs({ guide, businessType = "" }: BusinessTypeTabsProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [resources, setResources] = useState<BusinessResources>({});
  const [loading, setLoading] = useState(true);

  // Map business types to relevant search queries for YouTube videos
  const keywordMap: Record<string, string> = {
    "tech-retail-store": "how to start tech retail store business",
    "computer-shop": "how to start computer shop business",
    "coffee-shop": "how to start coffee shop business",
    "digital-marketing": "how to start digital marketing agency",
    "it-consulting": "how to start IT consulting business",
    "tech-repair": "how to start tech repair business",
    "online-education": "how to start education center business",
  }

  // Fetch resources from the API
  useEffect(() => {
    const fetchResources = async () => {
      if (!businessType) {
        setLoading(false);
        return;
      }

      try {
        // Map the business type to the API expected format if needed
        const apiBusinessType = businessType.replace('-store', '');
        const response = await fetch(`/api/business-resources?type=${apiBusinessType}`);
        
        if (response.ok) {
          const data = await response.json();
          setResources(data);
        } else {
          // If the resource is not found, set empty resources
          setResources({});
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources({});
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [businessType]);

  const searchQuery = businessType ? keywordMap[businessType] || "how to start tech business" : "how to start tech business"

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-7 mb-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="market">Market Analysis</TabsTrigger>
        <TabsTrigger value="requirements">Startup Requirements</TabsTrigger>
        <TabsTrigger value="financial">Financial Plan</TabsTrigger>
        <TabsTrigger value="marketing">Marketing Strategy</TabsTrigger>
        <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{guide.title}</CardTitle>
            <CardDescription>Business Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <p>{guide.overview}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="market" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
            <CardDescription>Target Market and Competition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <h3>Target Audience</h3>
              <p>{guide.marketAnalysis?.targetAudience || "Information not available."}</p>
              
              <h3>Market Size</h3>
              <p>{guide.marketAnalysis?.marketSize || "Information not available."}</p>
              
              <h3>Competitors</h3>
              <p>{guide.marketAnalysis?.competitors || "Information not available."}</p>
              
              <h3>Market Trends</h3>
              <p>{guide.marketAnalysis?.trends || "Information not available."}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="requirements" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Startup Requirements</CardTitle>
            <CardDescription>Essential Requirements to Start the Business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <h3>Legal Requirements</h3>
              <p>{guide.startupRequirements?.legal || "Information not available."}</p>
              
              <h3>Equipment Needs</h3>
              <p>{guide.startupRequirements?.equipment || "Information not available."}</p>
              
              <h3>Staffing Needs</h3>
              <p>{guide.startupRequirements?.staffing || "Information not available."}</p>
              
              <h3>Location Requirements</h3>
              <p>{guide.startupRequirements?.location || "Information not available."}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="financial" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Financial Plan</CardTitle>
            <CardDescription>Financial Analysis and Projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <h3>Startup Costs</h3>
              <p>{guide.financialPlan?.startupCosts || "Information not available."}</p>
              
              <h3>Monthly Expenses</h3>
              <p>{guide.financialPlan?.monthlyExpenses || "Information not available."}</p>
              
              <h3>Pricing Strategy</h3>
              <p>{guide.financialPlan?.pricingStrategy || "Information not available."}</p>
              
              <h3>Break-Even Analysis</h3>
              <p>{guide.financialPlan?.breakEvenAnalysis || "Information not available."}</p>
              
              <h3>Funding Options</h3>
              <p>{guide.financialPlan?.fundingOptions || "Information not available."}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="marketing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Marketing Strategy</CardTitle>
            <CardDescription>Promotion and Customer Acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <h3>Branding Strategy</h3>
              <p>{guide.marketingStrategy?.branding || "Information not available."}</p>
              
              <h3>Online Marketing</h3>
              <p>{guide.marketingStrategy?.onlineMarketing || "Information not available."}</p>
              
              <h3>Offline Marketing</h3>
              <p>{guide.marketingStrategy?.offlineMarketing || "Information not available."}</p>
              
              <h3>Customer Retention</h3>
              <p>{guide.marketingStrategy?.customerRetention || "Information not available."}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="tutorials" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>Watch helpful guides for your business type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <YoutubeVideo 
              searchQuery={searchQuery} 
              index={0}
              onLoad={() => setVideoLoaded(true)}
            />
            
            {videoLoaded && (
              <YoutubeVideo 
                searchQuery={searchQuery} 
                index={1}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resources" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>Helpful articles and guides for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert">
              <h3>Articles</h3>
              {loading ? (
                <p>Loading resources...</p>
              ) : resources.articles && resources.articles.length > 0 ? (
                <ul>
                  {resources.articles.map((article, index) => (
                    <li key={index}>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No specific articles available for this business type.</p>
              )}
              
              <h3>Guides</h3>
              {loading ? (
                <p>Loading resources...</p>
              ) : resources.guides && resources.guides.length > 0 ? (
                <ul>
                  {resources.guides.map((guide, index) => (
                    <li key={index}>
                      <a href={guide.url} target="_blank" rel="noopener noreferrer">
                        {guide.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No specific guides available for this business type.</p>
              )}
              
              <h3>General Resources</h3>
              <ul>
                <li>
                  <a href="https://www.sba.gov/business-guide" target="_blank" rel="noopener noreferrer">
                    Small Business Administration Guide
                  </a>
                </li>
                <li>
                  <a href="https://www.score.org/resource/business-planning-financial-statements-template-gallery" target="_blank" rel="noopener noreferrer">
                    SCORE Business Templates
                  </a>
                </li>
                <li>
                  <a href="https://www.entrepreneur.com/starting-a-business" target="_blank" rel="noopener noreferrer">
                    Entrepreneur's Starting a Business Guide
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 