
import { createContext, useContext, useState, ReactNode } from "react";
import {
  TransactionInputs,
  TransactionAdminSettings,
  TransactionROICalculation,
  ViewMode,
  TransactionGoal
} from "../types/calculator";
import {
  calculateTransactionROI,
  DEFAULT_TRANSACTION_ADMIN_SETTINGS,
  DEFAULT_TRANSACTION_INPUTS,
  generateDefaultGoals
} from "../utils/transactionUtils";

interface TransactionContextType {
  inputs: TransactionInputs;
  setInputs: (inputs: TransactionInputs) => void;
  adminSettings: TransactionAdminSettings;
  setAdminSettings: (settings: TransactionAdminSettings) => void;
  results: TransactionROICalculation | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  recalculate: () => void;
  resetToDefaults: () => void;
  showAssumptions: boolean;
  setShowAssumptions: (show: boolean) => void;
  currentValues: {
    statementsReconciled: number;
    missingCredits: number;
    missingInvoices: number;
  };
  setCurrentValues: (values: {
    statementsReconciled: number;
    missingCredits: number;
    missingInvoices: number;
  }) => void;
  goals: TransactionGoal[];
  setGoals: (goals: TransactionGoal[]) => void;
  addGoal: (goal: TransactionGoal) => void;
  updateGoal: (index: number, goal: TransactionGoal) => void;
  removeGoal: (index: number) => void;
}

interface TransactionProviderProps {
  children: ReactNode;
  initialViewMode?: ViewMode;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children, initialViewMode = "sales" }: TransactionProviderProps) {
  const [inputs, setInputs] = useState<TransactionInputs>(DEFAULT_TRANSACTION_INPUTS);
  const [adminSettings, setAdminSettings] = useState<TransactionAdminSettings>(DEFAULT_TRANSACTION_ADMIN_SETTINGS);
  const [results, setResults] = useState<TransactionROICalculation | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);
  const [currentValues, setCurrentValues] = useState({
    statementsReconciled: 10,
    missingCredits: 5,
    missingInvoices: 3
  });
  const [goals, setGoals] = useState<TransactionGoal[]>([]);

  // Initialize default goals
  useState(() => {
    if (goals.length === 0) {
      setGoals(generateDefaultGoals(currentValues));
    }
  });

  const recalculate = () => {
    const calculatedResults = calculateTransactionROI(inputs, adminSettings);
    setResults(calculatedResults);
    // Regenerate goals if they haven't been customized
    if (goals.length === 0) {
      setGoals(generateDefaultGoals(currentValues));
    }
  };

  const resetToDefaults = () => {
    setInputs(DEFAULT_TRANSACTION_INPUTS);
    setAdminSettings(DEFAULT_TRANSACTION_ADMIN_SETTINGS);
    // Don't reset viewMode as it's determined by the role
    setResults(calculateTransactionROI(DEFAULT_TRANSACTION_INPUTS, DEFAULT_TRANSACTION_ADMIN_SETTINGS));
    setCurrentValues({
      statementsReconciled: 10,
      missingCredits: 5,
      missingInvoices: 3
    });
    setGoals(generateDefaultGoals({
      statementsReconciled: 10,
      missingCredits: 5,
      missingInvoices: 3
    }));
  };

  const addGoal = (goal: TransactionGoal) => {
    setGoals([...goals, goal]);
  };

  const updateGoal = (index: number, goal: TransactionGoal) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = goal;
    setGoals(updatedGoals);
  };

  const removeGoal = (index: number) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
  };

  return (
    <TransactionContext.Provider
      value={{
        inputs,
        setInputs,
        adminSettings,
        setAdminSettings,
        results,
        viewMode,
        setViewMode,
        recalculate,
        resetToDefaults,
        showAssumptions,
        setShowAssumptions,
        currentValues,
        setCurrentValues,
        goals,
        setGoals,
        addGoal,
        updateGoal,
        removeGoal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
}
