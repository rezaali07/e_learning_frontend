import React, { useEffect } from "react";

const ChatSupport = () => {
  useEffect(() => {
    // Initialize LiveChat script
    window.__lc = window.__lc || {};
    window.__lc.license = 18976628;
    window.__lc.integration_name = "manual_onboarding";
    window.__lc.product_name = "livechat";

    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = "https://cdn.livechatinc.com/tracking.js";
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI elements needed for this component
};

export default ChatSupport;
