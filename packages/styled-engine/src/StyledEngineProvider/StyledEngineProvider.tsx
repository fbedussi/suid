import StyledEngineContext, {
  StyledEngineContextValue,
} from "./StyledEngineContext";
import { JSXElement } from "solid-js";

export default function StyledEngineProvider(inProps: {
  children: JSXElement;
  value?: Omit<StyledEngineContextValue, 'injectFirst'>;
  injectFirst?: boolean
}) {
  return (
    <StyledEngineContext.Provider value={Object.assign(inProps.value || {}, { injectFirst: inProps.injectFirst })}>
      {inProps.children}
    </StyledEngineContext.Provider>
  );
}
