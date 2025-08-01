import {
  require_jsx_runtime
} from "./chunk-ICEAERXH.js";
import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@toolpad/core/esm/shared/Link.js
var React2 = __toESM(require_react(), 1);

// node_modules/@toolpad/core/esm/shared/context.js
var React = __toESM(require_react(), 1);
var BrandingContext = React.createContext(null);
var NavigationContext = React.createContext([]);
var PaletteModeContext = React.createContext({
  paletteMode: "light",
  setPaletteMode: () => {
  },
  isDualTheme: false
});
var RouterContext = React.createContext(null);
var DashboardSidebarPageItemContext = React.createContext(null);
var CrudContext = React.createContext({
  dataSource: null,
  dataSourceCache: null
});
var WindowContext = React.createContext(void 0);

// node_modules/@toolpad/core/esm/shared/Link.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var DefaultLink = React2.forwardRef(function Link(props, ref) {
  const {
    children,
    href,
    onClick,
    history: history2,
    ...rest
  } = props;
  const routerContext = React2.useContext(RouterContext);
  const handleLinkClick = React2.useMemo(() => {
    if (!routerContext) {
      return onClick;
    }
    return (event) => {
      event.preventDefault();
      const url = new URL(event.currentTarget.href);
      routerContext.navigate(url.pathname, {
        history: history2
      });
      onClick?.(event);
    };
  }, [routerContext, onClick, history2]);
  return (0, import_jsx_runtime.jsx)("a", {
    ref,
    href,
    ...rest,
    onClick: handleLinkClick,
    children
  });
});
var Link2 = React2.forwardRef(function Link3(props, ref) {
  const routerContext = React2.useContext(RouterContext);
  const LinkComponent = routerContext?.Link ?? DefaultLink;
  return (0, import_jsx_runtime.jsx)(LinkComponent, {
    ref,
    ...props,
    children: props.children
  });
});

// node_modules/@toolpad/utils/esm/warnOnce.js
var history = /* @__PURE__ */ new Set();
function warnOnce(msg) {
  if (!history.has(msg)) {
    history.add(msg);
    console.warn(msg);
  }
}

export {
  BrandingContext,
  NavigationContext,
  PaletteModeContext,
  RouterContext,
  DashboardSidebarPageItemContext,
  CrudContext,
  WindowContext,
  Link2 as Link,
  warnOnce
};
//# sourceMappingURL=chunk-WY4ZPKU5.js.map
