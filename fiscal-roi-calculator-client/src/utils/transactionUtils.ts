
import { TransactionAdminSettings, TransactionInputs, TransactionROICalculation, TransactionGoal } from "../types/calculator";
import { formatCurrency, formatNumber } from "./calculatorUtils";

export const DEFAULT_TRANSACTION_ADMIN_SETTINGS: TransactionAdminSettings = {
  averageFraudAmount: 4500, // $4,500 average fraud transaction amount
  errorCorrectionTime: 45, // 45 minutes to correct an error
  averageHourlyCost: 25, // $25 per hour labor cost
  compliancePenaltyAvoidance: 75000, // $75,000 in potential compliance penalties avoided
  annualSavingsMultiplier: 1.1, // 10% increase in savings year-over-year
};

export function calculateTransactionROI(
  inputs: TransactionInputs,
  adminSettings: TransactionAdminSettings = DEFAULT_TRANSACTION_ADMIN_SETTINGS
): TransactionROICalculation {
  // Calculate fraud prevention savings
  const fraudPreventionSavings = 
    inputs.numTransactions * (inputs.fraudPercentage / 100) * 0.85 * adminSettings.averageFraudAmount;
  
  // Calculate error reduction savings (time saved fixing errors)
  const errorsDetected = inputs.numTransactions * (inputs.errorRate / 100) * 0.8;
  const processingTimeSaved = (errorsDetected * adminSettings.errorCorrectionTime / 60);
  const errorReductionSavings = processingTimeSaved * adminSettings.averageHourlyCost;
  
  // Calculate compliance savings (based on annual spend)
  const complianceSavings = 
    inputs.annualSpend > 10000000 ? adminSettings.compliancePenaltyAvoidance : adminSettings.compliancePenaltyAvoidance * 0.5;
  
  // Calculate first year cost savings
  const costSavingsYear1 = fraudPreventionSavings + errorReductionSavings + complianceSavings;
  
  // Calculate year 2 and 3 with multiplier effect
  const costSavingsYear2 = costSavingsYear1 * adminSettings.annualSavingsMultiplier;
  const costSavingsYear3 = costSavingsYear2 * adminSettings.annualSavingsMultiplier;
  
  // Calculate total 3-year cost savings
  const totalCostSavings3Year = costSavingsYear1 + costSavingsYear2 + costSavingsYear3;
  
  // Calculate payback period (in months)
  // Assuming software cost is roughly related to annual spend and transaction volume
  const estimatedSoftwareCost = 
    (inputs.annualSpend * 0.01) + (inputs.numTransactions * 0.1);
  const paybackPeriodMonths = Math.ceil((estimatedSoftwareCost / costSavingsYear1) * 12);
  
  // Calculate ROI multiple
  const roiMultiple = totalCostSavings3Year / estimatedSoftwareCost;
  
  // Create implementation milestones
  const implementationMilestones = {
    days30: `Implement transaction monitoring for ${formatNumber(Math.round(inputs.numTransactions * 0.3))} transactions`,
    days60: `Detect ${formatNumber(Math.round(inputs.numTransactions * inputs.fraudPercentage / 100 * 0.4))} potential fraud cases`,
    days90: `Reduce error rates by ${formatNumber(Math.round((inputs.errorRate * 0.6)))}%`,
    days180: `Complete ROI validation showing ${formatCurrency(Math.round(costSavingsYear1 * 0.5))} in savings`,
  };
  
  return {
    costSavingsYear1,
    costSavingsYear2,
    costSavingsYear3,
    totalCostSavings3Year,
    paybackPeriodMonths,
    roiMultiple,
    fraudPreventionSavings,
    errorReductionSavings,
    complianceSavings,
    processingTimeSaved,
    implementationMilestones,
  };
}

export const DEFAULT_TRANSACTION_INPUTS: TransactionInputs = {
  numTransactions: 50000,
  annualSpend: 8000000,
  errorRate: 3.5,
  fraudPercentage: 0.8,
  numActiveSuppliers: 100,
};

export function generateDefaultGoals(currentValues: { 
  statementsReconciled: number; 
  missingCredits: number; 
  missingInvoices: number;
}): TransactionGoal[] {
  const today = new Date();
  const twoMonthsFromNow = new Date(today);
  twoMonthsFromNow.setMonth(today.getMonth() + 2);

  const fourMonthsFromNow = new Date(today);
  fourMonthsFromNow.setMonth(today.getMonth() + 4);

  return [
    {
      id: `goal-${Date.now()}-1`,
      type: 'statements',
      title: 'Number of Statements',
      from: Math.max(10, currentValues.statementsReconciled),
      to: Math.max(50, Math.round(currentValues.statementsReconciled * 2)),
      targetDate: twoMonthsFromNow,
      isCustom: false
    },
    {
      id: `goal-${Date.now()}-2`,
      type: 'reconciled',
      title: 'Reconciled Statements',
      from: Math.max(5, currentValues.statementsReconciled),
      to: Math.max(25, Math.round(currentValues.statementsReconciled * 2)),
      targetDate: twoMonthsFromNow,
      isCustom: false
    },
    {
      id: `goal-${Date.now()}-3`,
      type: 'credits',
      title: 'Target Credits',
      from: Math.max(3, currentValues.missingCredits),
      to: Math.max(15, Math.round(currentValues.missingCredits * 2)),
      targetDate: fourMonthsFromNow,
      isCustom: false
    },
    {
      id: `goal-${Date.now()}-4`,
      type: 'invoices',
      title: 'Target Missing Invoices',
      from: Math.max(2, currentValues.missingInvoices),
      to: Math.max(10, Math.round(currentValues.missingInvoices * 2)),
      targetDate: fourMonthsFromNow,
      isCustom: false
    }
  ];
}
