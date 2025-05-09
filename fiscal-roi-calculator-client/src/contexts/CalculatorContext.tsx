
import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AdminSettings, CalculatorInputs, ROICalculation, ViewMode, Currency, GoalType } from "../types/calculator";
import {
  DEFAULT_ADMIN_SETTINGS,
  DEFAULT_INPUTS,
} from "../utils/calculatorUtils"; // calculateROI will be removed

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
  recalculate: () => Promise<void>; // Changed to Promise
  resetToDefaults: () => Promise<void>; // Changed to Promise
  showAssumptions: boolean;
  setShowAssumptions: (show: boolean) => void;
  loading: boolean;
  error: string | null;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const recalculate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Prepare payload for the backend by combining inputs and adminSettings
      const payload = {
        // From CalculatorInputs
        numTransactions: inputs.numTransactions,
        annualSpend: inputs.annualSpend,
        numActiveSuppliers: inputs.numActiveSuppliers,
        reconciledSuppliers: inputs.reconciledSuppliers,
        effortPersonDays: inputs.effortPersonDays,
        goalType: inputs.goalType,
        currency: inputs.currency,
        // From AdminSettings
        duplicationRate: adminSettings.duplicationRate,
        missingInvoiceRate: adminSettings.missingInvoiceRate,
        averageCreditValue: adminSettings.averageCreditValue,
        averageProcessingTime: adminSettings.averageProcessingTime,
        averageHourlyCost: adminSettings.averageHourlyCost,
        annualSavingsMultiplier: adminSettings.annualSavingsMultiplier,
      };

      const response = await fetch('/api/roicalculator/statement-reconciliation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'API request failed with status: ' + response.status }));
        throw new Error(errorData.message || 'API request failed');
      }
      const calculatedResults: ROICalculation = await response.json();
      setResults(calculatedResults);
    } catch (err: unknown) {
      let message = "An unexpected error occurred during calculation.";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }
      // console.error("[CalculatorContext] Failed to recalculate ROI from API:", message, err); // Keep this for debugging if needed by user
      setError(message);
      setResults(null); // Optionally clear results on error or keep stale
    } finally {
      setLoading(false);
    }
  }, [inputs, adminSettings]); // Recalculate is dependent on inputs and adminSettings

  const resetToDefaults = useCallback(async () => {
    setInputs(DEFAULT_INPUTS);
    setAdminSettings(DEFAULT_ADMIN_SETTINGS);
    // Don't reset viewMode as it's determined by the role
    // Recalculate with default inputs
    await recalculate(); // Await the recalculation with new defaults
  }, [recalculate]); // resetToDefaults depends on the recalculate function instance

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
        loading,
        error,
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
