
import { createContext, useContext, useState, ReactNode } from "react";
import { AdminSettings, CalculatorInputs, ROICalculation, ViewMode, Currency, GoalType } from "../types/calculator";
import {
  calculateROI,
  DEFAULT_ADMIN_SETTINGS,
  DEFAULT_INPUTS,
} from "../utils/calculatorUtils";

interface CalculatorContextType {
  inputs: CalculatorInputs;
  setInputs: (inputs: CalculatorInputs) => void;
  adminSettings: AdminSettings;
  setAdminSettings: (settings: AdminSettings) => void;
  results: ROICalculation | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  setCurrency: (currency: Currency) => void;
  setGoalType: (goalType: GoalType) => void;
  recalculate: () => void;
  resetToDefaults: () => void;
  showAssumptions: boolean;
  setShowAssumptions: (show: boolean) => void;
}

interface CalculatorProviderProps {
  children: ReactNode;
  initialViewMode?: ViewMode;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children, initialViewMode = "sales" }: CalculatorProviderProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(DEFAULT_ADMIN_SETTINGS);
  const [results, setResults] = useState<ROICalculation | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);

  const recalculate = () => {
    const calculatedResults = calculateROI(inputs, adminSettings);
    setResults(calculatedResults);
  };

  const resetToDefaults = () => {
    setInputs(DEFAULT_INPUTS);
    setAdminSettings(DEFAULT_ADMIN_SETTINGS);
    // Don't reset viewMode as it's determined by the role
    setResults(calculateROI(DEFAULT_INPUTS, DEFAULT_ADMIN_SETTINGS));
  };

  const setCurrency = (currency: Currency) => {
    setInputs(prev => ({ ...prev, currency }));
  };

  const setGoalType = (goalType: GoalType) => {
    setInputs(prev => ({ ...prev, goalType }));
  };

  return (
    <CalculatorContext.Provider
      value={{
        inputs,
        setInputs,
        adminSettings,
        setAdminSettings,
        results,
        viewMode,
        setViewMode,
        setCurrency,
        setGoalType,
        recalculate,
        resetToDefaults,
        showAssumptions,
        setShowAssumptions,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
