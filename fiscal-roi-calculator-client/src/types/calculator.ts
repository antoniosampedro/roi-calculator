
export interface CalculatorInputs {
  numTransactions: number;
  annualSpend: number;
  numActiveSuppliers: number;
  reconciledSuppliers: number;
  effortPersonDays: number;
  goalType: GoalType;
  currency: Currency;
}

export interface AdminSettings {
  duplicationRate: number;
  missingInvoiceRate: number;
  averageCreditValue: number;
  averageProcessingTime: number;
  averageHourlyCost: number;
  annualSavingsMultiplier: number;
}

export interface ROICalculation {
  // Sales view metrics
  costSavingsYear1: number;
  costSavingsYear2: number;
  costSavingsYear3: number;
  totalCostSavings3Year: number;
  paybackPeriodMonths: number;
  roiMultiple: number;
  
  // CSM view metrics
  expectedCreditsFound: number;
  expectedCreditValue: number;
  missingInvoiceProjection: number;
  processingTimeSaved: number;
  laborCostSaved: number;
  implementationMilestones: {
    days30: string;
    days60: string;
    days90: string;
    days180: string;
  };
  
  // Detailed breakdown
  suppliersReconciled: {
    year1: number;
    year2: number;
    year3: number;
  };
  suppliersWithErrors: {
    year1: number;
    year2: number;
    year3: number;
  };
  creditsRecovered: {
    year1: number;
    year2: number;
    year3: number;
  };
  timeSavingHours: {
    year1: number;
    year2: number;
    year3: number;
  };
  timeSavingValue: {
    year1: number;
    year2: number;
    year3: number;
  };
  projectedROIValue: {
    year1: number;
    year2: number;
    year3: number;
  };
  projectedROIMultiple: {
    year1: number;
    year2: number;
    year3: number;
  };
}

export type ViewMode = 'sales' | 'csm';

export type GoalType = 'more_coverage' | 'time_savings';
export type Currency = 'GBP' | 'USD' | 'EUR';

// Statement Reconciliation types
export type StatementRecInputs = CalculatorInputs;
export type StatementRecAdminSettings = AdminSettings;
export type StatementRecROICalculation = ROICalculation;

// Transaction Module types
export interface TransactionInputs {
  numTransactions: number;
  annualSpend: number;
  errorRate: number;
  fraudPercentage: number;
  numActiveSuppliers: number;
}

export interface TransactionAdminSettings {
  averageFraudAmount: number;
  errorCorrectionTime: number;
  averageHourlyCost: number;
  compliancePenaltyAvoidance: number;
  annualSavingsMultiplier: number;
}

export interface TransactionROICalculation {
  // Sales view metrics
  costSavingsYear1: number;
  costSavingsYear2: number;
  costSavingsYear3: number;
  totalCostSavings3Year: number;
  paybackPeriodMonths: number;
  roiMultiple: number;
  
  // CSM view metrics
  fraudPreventionSavings: number;
  errorReductionSavings: number;
  complianceSavings: number;
  processingTimeSaved: number;
  implementationMilestones: {
    days30: string;
    days60: string;
    days90: string;
    days180: string;
  };
}

export type CalculatorType = 'statement-rec' | 'transactions';

export type TransactionGoalType = 'statements' | 'reconciled' | 'credits' | 'invoices';

export interface TransactionGoal {
  id: string;
  type: TransactionGoalType;
  title: string;
  from: number;
  to: number;
  targetDate: Date;
  isCustom: boolean;
}
