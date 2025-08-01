import {
  Link,
  warnOnce
} from "./chunk-WY4ZPKU5.js";
import {
  CacheProvider,
  createCache
} from "./chunk-E5DPBVDN.js";
import "./chunk-HQ6ZTAWL.js";
import {
  require_jsx_runtime
} from "./chunk-ICEAERXH.js";
import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@toolpad/core/esm/internal/demo.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function useExternalProductionWarning({
  featureName
}) {
  const isExternalProduction = typeof window !== "undefined" && window.location.hostname !== "mui.com" && false;
  if (isExternalProduction) {
    warnOnce(`${featureName} is an internal feature of Toolpad Core. This feature is not meant for general usage in production.`);
  }
}
function DemoProvider({
  window: window2,
  children
}) {
  useExternalProductionWarning({
    featureName: "DemoProvider"
  });
  const demoEmotionCache = React.useMemo(() => createCache({
    key: "toolpad-demo-app",
    container: window2?.document.head
  }), [window2?.document.head]);
  return (0, import_jsx_runtime.jsx)(CacheProvider, {
    value: demoEmotionCache,
    children
  });
}
var DUMMY_BASE = "https://example.com";
function useDemoRouter(initialUrl = "/") {
  useExternalProductionWarning({
    featureName: "useDemoRouter"
  });
  const [url, setUrl] = React.useState(() => new URL(initialUrl, DUMMY_BASE));
  const router = React.useMemo(() => {
    return {
      pathname: url.pathname,
      searchParams: url.searchParams,
      navigate: (newUrl) => {
        const nextUrl = new URL(newUrl, DUMMY_BASE);
        if (nextUrl.pathname !== url.pathname || nextUrl.search !== url.search) {
          setUrl(nextUrl);
        }
      }
    };
  }, [url.pathname, url.search, url.searchParams]);
  return router;
}
export {
  DemoProvider,
  Link,
  useDemoRouter
};
//# sourceMappingURL=@toolpad_core_internal.js.map
