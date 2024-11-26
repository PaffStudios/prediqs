import ActivityFeed from "@/components/activity-feed"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ActivityPage()
{
    const amounts = [
        {
          name: "None",
        },
        {
          name: "$10",
        },
        {
          name: "$100",
        },
        {
          name: "$1,000",
        },
        {
            name: "$10,000",
        },
        {
            name: "$100,000",
        },
      ]
    return(
        <>
            <div className="h-screen overflow-hidden flex flex-col place-items-center">
                <div className="flex justify-between container mx-auto my-12">
                    <span className="text-4xl font-gilroy font-bold">Activity</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                            >
                                Min Amount
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {amounts.map((amount) => (
                            <DropdownMenuItem
                                key={amount.name}
                                className="cursor-pointer"
                            >
                                {amount.name}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="container max-h-max relative overflow-hidden">
                    <ActivityFeed/>
                </div>
            </div>
        </>
    )
}