import { createContext, useCallback, useContext, useState } from "react";
import SwordTransition from "./SwordTransition";

interface SwordTransitionContextType {
  triggerTransition: (onComplete: () => void) => void;
}

const SwordTransitionContext = createContext<SwordTransitionContextType>({
  triggerTransition: () => {},
});

export const useSwordTransition = () => useContext(SwordTransitionContext);

export const SwordTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [completionCallback, setCompletionCallback] = useState<(() => void) | null>(null);

  const triggerTransition = useCallback((callback: () => void) => {
    setCompletionCallback(() => callback);
    setIsTransitioning(true);
  }, []);

  const handleComplete = useCallback(() => {
    completionCallback?.();
    setIsTransitioning(false);
    setCompletionCallback(null);
  }, [completionCallback]);

  return (
    <SwordTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {/* Rendered at root level — always covers full viewport */}
      <SwordTransition isActive={isTransitioning} onComplete={handleComplete} />
    </SwordTransitionContext.Provider>
  );
};
