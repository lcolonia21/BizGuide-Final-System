"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { LearningResource } from "../../api/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryResourcesPageProps {
  params: {
    category: string
  }
}

export default function CategoryResourcesPage({ params }: CategoryResourcesPageProps) {
  const { category } = params
  const [resources, setResources] = useState<LearningResource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/learning-resources?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [category]);

  const categoryInfo = {
    "business-planning": {
      title: "Business Planning Resources",
      description: "Comprehensive guides and tools for business planning"
    },
    "marketing": {
      title: "Marketing Strategy Resources",
      description: "Resources to help you market your business effectively"
    },
    "operations": {
      title: "Business Operations Resources",
      description: "Resources for managing day-to-day business operations"
    }
  };

  const currentCategory = category as keyof typeof categoryInfo;
  const { title, description } = categoryInfo[currentCategory] || { 
    title: "Resources", 
    description: "Learning resources for your business" 
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/learning-resources" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to All Resources
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-8">{description}</p>
      
      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="bg-card border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="h-7 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></CardTitle>
                <CardDescription className="h-5 w-3/4 mt-2 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {resources.length > 0 ? (
            resources.map(resource => (
              <Link key={resource.id} href={resource.url}>
                <Card className="bg-card border shadow-sm hover:bg-accent/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardDescription>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No resources found for this category.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
} 