"use client"
import { Twitter, DiscIcon as DiscordIcon, Instagram } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'

export default function Footer() {
  
  const pathName = usePathname()
  if(pathName === "/discover") return null

  return (
    <footer className="bg-background text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-md" />
              <span className="text-2xl font-bold">PREDIQS</span>
            </div>
            <p className="text-slate-400 max-w-xs">The worlds most advanced prediction market platform.</p>
          </div>

          {/* Navigation */}
          <nav className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Markets</h3>
              <ul className="space-y-2">
                {["Politics", "Crypto", "Sports", "Business"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                {["Learn", "Blog", "Developers", "Careers"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold">Connect</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Discord">
                    <DiscordIcon className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              All systems operational
            </span>
          </div>
          <p className="text-sm text-slate-400">&copy; 2024 PREDIQS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

