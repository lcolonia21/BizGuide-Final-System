import Link from "next/link"
import { BookOpen, Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="flex justify-center">
          <div className="space-y-4 max-w-xl text-center">
            <Link href="/" className="flex items-center gap-2 justify-center">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Biz<span className="text-primary">Guide</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your comprehensive guide to business success with personalized recommendations, expert insights, and
              community support.
            </p>
            <div className="flex space-x-4 justify-center">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex justify-center">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by Leona Colonia
          </p>
        </div>
      </div>
    </footer>
  )
}

