import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MarketSummary() {
  return (
    <Card className="bg-background text-white border-none mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          Created By
          <Badge className="bg-[#6b21a8] hover:bg-[#6b21a8] text-white font-normal px-2 py-0.5 h-5">
            <span className="mr-1">💎</span>
            0x551
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <h2 className="font-semibold text-lg mb-2">Market Summary</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          As of November 18, 2024, there are no current reports or indications that Matt Gaetz has been nominated or is under consideration for the position of Attorney General.
        </p>
      </CardContent>
    </Card>
  )
}

