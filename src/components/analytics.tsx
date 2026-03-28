"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Custom events helper
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    const win = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void };
    if (win.gtag) {
      win.gtag("event", eventName, eventParams);
    }
    if (win.clarity) {
      win.clarity("event", eventName, eventParams);
    }
  }
};

export function Analytics() {
  useEffect(() => {
    // Expose trackEvent to window
    (window as Window & { trackEvent?: typeof trackEvent }).trackEvent = trackEvent;
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_PROJECT_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </>
  );
}
