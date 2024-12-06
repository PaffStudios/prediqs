"use client"
import React, { useEffect, useRef, useCallback } from 'react';

function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [_initialized, setInitialized] = React.useState(false);

  const initWidget = useCallback(() => {
    if (containerRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com"
      });
      containerRef.current.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if(_initialized)
        return;
    initWidget();
    setInitialized(true);
  }, [initWidget, setInitialized, _initialized]);

  return (
    <div className="tradingview-widget-container rounded-sm border-black border-2 overflow-hidden" ref={containerRef} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default TradingViewWidget;

