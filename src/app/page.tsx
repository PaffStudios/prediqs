"use client"
import Categories from "@/components/categories"
// import PollCard  from "@/components/poll-card"
import ActivityFeed from "@/components/activity-feed"
import Marquee from "@/components/ui/marquee";
import ReviewCard from "@/components/review-card";
import { useEffect, useRef } from "react";
import { faker } from '@faker-js/faker';
import dynamic from "next/dynamic";

export default function Home() {
  // const [firstRender, setFirstRender] = useState(true)
  const generateRandomData = (id: number) => ({
    id,
    title: faker.lorem.sentence(),
    image: faker.image.avatar(),
    rewardRate: faker.finance.amount({ min: 5, max: 10 }), // Random between 5 and 25
    earnings: faker.finance.amount({ min: 5, max: 10 }), // Random between 10 and 60
    movement: faker.finance.amount({ min: 5, max: 10 }), // Random between 0 and 10
    isPositive: faker.datatype.boolean(), // Randomly true or false
  });

  const PollCard = dynamic(() => import("@/components/poll-card"), {
    ssr: false,
  });
  
  
  const mainRef = useRef<HTMLDivElement>(null)
  const activityFeedRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!activityFeedRef || !mainRef) return;
    
    const mainHeight = mainRef.current?.offsetHeight || 0; // Ensure fallback to 0
    activityFeedRef.current!.style.maxHeight = `${mainHeight}px`;
    activityFeedRef.current!.style.height = `${mainHeight}px`;
  }, [mainRef, activityFeedRef]); // Add dependencies if needed
  
  useEffect(() => {
    const handleResize = () => {
      if (!activityFeedRef || !mainRef) return;
      
      const mainHeight = mainRef.current?.offsetHeight || 0; // Ensure fallback to 0
      activityFeedRef.current!.style.maxHeight = `${mainHeight}px`;
      activityFeedRef.current!.style.height = `${mainHeight}px`;
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  
  
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  
  const pollData = Array.from({ length: 6 }, (_, i) => generateRandomData(i));
  const pollData2 = Array.from({ length: 8 }, (_, i) => generateRandomData(i));
  if(!generateRandomData){
    return null
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Categories Bar */}
      <Categories />

      {/* Main Content */}
      <main className="w-full max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-2 justify-between">
          <div className="w-full lg:w-3/4">
            {/* New Section */}
            <section>
              <h2 className="mb-4 text-2xl font-gilroy font-bold">New</h2>
              <div ref={mainRef} className="lg:min-h-[600px] grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {pollData.map((poll) => (
                  <PollCard
                    key={poll.id}
                    id={poll.id}
                    title={poll.title}
                    image={poll.image}
                    rewardRate={poll.rewardRate}
                    earnings={poll.earnings}
                    movement={poll.movement}
                    isPositive={poll.isPositive}
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="w-full lg:w-1/4 lg:max-w-[300px] hidden lg:block">
            <div ref={activityFeedRef} className="relative overflow-hidden">
              <span className="text-2xl font-gilroy font-bold block mb-4">Recent Activities</span>
              <div  className="overflow-y-hidden relative">
                <ActivityFeed />
              </div>
              <div className="absolute w-full h-24 left-0 bottom-0 bg-gradient-to-t from-background to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </main>

      <div className="relative pt-10">
        <div className="absolute h-full w-24 left-0 top-0 bg-gradient-to-r from-background to-transparent z-10"></div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="absolute h-full w-24 right-0 top-0 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto px-4 py-8">
        <section>
          <h2 className="mb-4 text-xl font-gilroy font-bold">New</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pollData2.map((poll) => (
              <PollCard
                key={poll.id}
                id={poll.id}
                title={poll.title}
                image={poll.image}
                rewardRate={poll.rewardRate}
                earnings={poll.earnings}
                movement={poll.movement}
                isPositive={poll.isPositive}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

