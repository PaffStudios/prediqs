import { Card, CardContent } from "@/components/ui/card";
import TradingView from "@/components/trading-view";
import TradeForm from "@/components/trade-form";
import MarketSummary from "@/components/market-summary";
import { RecentPurchases } from "@/components/recent-purchases";
import Comment from "@/components/comment";
import OrderBook from "@/components/order-book";

interface PredictionData {
  id: string;
  title: string;
  volume: string;
}

const comments: Comment[] = Array(7).fill({
  user: "0x551",
  text: "Ayy could someone gift me i need to bet on Elon",
  liked: false,
});

// This would typically come from an API or database
const getPredictionData = (id: string): PredictionData => {
  return {
    id,
    title: "Trump ends war by first 90 days?",
    volume: "$4.6m Vol.",
  };
};

export default function PredictionPage({ params }: { params: { id: string } }) {
  const prediction = getPredictionData(params.id);

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="bg-black/20 border-gray-800 mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-white">
              {prediction.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{prediction.volume}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-black/20 border-gray-800">
            <CardContent className="p-4 aspect-[16/9]">
              <TradingView />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="bg-black/20 border-gray-800 h-full">
            <CardContent className="p-4">
              <TradeForm />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <MarketSummary />
          <RecentPurchases />
          <div className="bg-[#111111] rounded-lg p-4 space-y-4">
            {comments.map((comment, index) => (
              <Comment key={index} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 hidden lg:block">
          <OrderBook />
        </div>
      </div>
    </div>
  );
}
