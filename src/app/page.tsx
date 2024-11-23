import HeroSection from "@/components/hero-section"
import Categories from "@/components/categories"
import { PollCard } from "@/components/poll-card"
import FighterHero from "@/components/test"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <FighterHero />

      {/* Categories Bar */}
      <Categories />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* New Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">New</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PollCard
                  key={i}
                  id={i}
                  title="Will Bitcoin reach $100k in 2024?"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXOpM0y4zFy2bKKQ6eTV2tKr04qalNY7Cfw&s"
                  author="@crypto_expert"
                  timestamp="2h ago"
                />
              ))}
            </div>
          </section>

          {/* Creators Section */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Creators</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PollCard
                  key={i}
                  id={i}
                  title="Creator milestone reached in 2024?"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXOpM0y4zFy2bKKQ6eTV2tKr04qalNY7Cfw&s"
                  author="@creator_stats"
                  timestamp="3h ago"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

