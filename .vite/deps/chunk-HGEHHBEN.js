import {
  Typography_default
} from "./chunk-3MG4R4WW.js";
import {
  DialogContext_default
} from "./chunk-J5H5HN4L.js";
import {
  getDialogTitleUtilityClass
} from "./chunk-X3VKFJPB.js";
import {
  useDefaultProps
} from "./chunk-DCIEJ4JL.js";
import {
  composeClasses,
  styled_default2 as styled_default
} from "./chunk-4NPN3XYL.js";
import {
  require_prop_types
} from "./chunk-L4UMR4YY.js";
import {
  clsx_default
} from "./chunk-2KHBIA62.js";
import {
  require_jsx_runtime
} from "./chunk-ICEAERXH.js";
import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@mui/material/esm/DialogTitle/DialogTitle.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};
var DialogTitleRoot = styled_default(Typography_default, {
  name: "MuiDialogTitle",
  slot: "Root"
})({
  padding: "16px 24px",
  flex: "0 0 auto"
});
var DialogTitle = React.forwardRef(function DialogTitle2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiDialogTitle"
  });
  const {
    className,
    id: idProp,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const {
    titleId = idProp
  } = React.useContext(DialogContext_default);
  return (0, import_jsx_runtime.jsx)(DialogTitleRoot, {
    component: "h2",
    className: clsx_default(classes.root, className),
    ownerState,
    ref,
    variant: "h6",
    id: idProp ?? titleId,
    ...other
  });
});
true ? DialogTitle.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * @ignore
   */
  id: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var DialogTitle_default = DialogTitle;

export {
  DialogTitle_default
};
//# sourceMappingURL=chunk-HGEHHBEN.js.map
