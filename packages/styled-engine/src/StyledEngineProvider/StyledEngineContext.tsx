import { createContext } from "solid-js";

export type StyledEngineContextValue = {
  injectFirst?: boolean
  cache?: {
    nonce?: string;
  };
};

const StyledEngineContext = createContext<StyledEngineContextValue>({});

export default StyledEngineContext;
