
import { AdminSettings, CalculatorInputs, ROICalculation } from "../types/calculator";

export const DEFAULT_INPUTS: CalculatorInputs = {
  numTransactions: 10000,
  annualSpend: 1000000,
  numActiveSuppliers: 100,
  reconciledSuppliers: 10,
  effortPersonDays: 20,
  currency: 'GBP',
  goalType: 'more_coverage',
};

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  duplicationRate: 0.02,
  missingInvoiceRate: 0.05,
  averageCreditValue: 500,
  averageProcessingTime: 20,
  averageHourlyCost: 25,
  annualSavingsMultiplier: 1.1,
};

export function calculateROI(inputs: CalculatorInputs, adminSettings: AdminSettings): ROICalculation {
  const {
    numTransactions,
    annualSpend,
    numActiveSuppliers,
    reconciledSuppliers,
    effortPersonDays,
  } = inputs;

  const {
    duplicationRate,
    missingInvoiceRate,
    averageCreditValue,
    averageProcessingTime,
    averageHourlyCost,
  } = adminSettings;

  // Calculate expected credits found
  const expectedCreditsFound = numTransactions * duplicationRate;

  // Calculate expected credit value
  const expectedCreditValue = expectedCreditsFound * averageCreditValue;

  // Calculate missing invoice projection
  const missingInvoiceProjection = numActiveSuppliers * missingInvoiceRate;

  // Calculate labor cost savings
  const processingTimeSaved = effortPersonDays * 0.7 * 8; // Assuming 70% reduction in processing time, 8 hours per day
  const laborCostSaved = processingTimeSaved * averageHourlyCost;

  // Calculate total cost savings
  const totalCostSavings = expectedCreditValue + laborCostSaved;
  
  // Year 1-3 cost savings
  const costSavingsYear1 = totalCostSavings;
  const costSavingsYear2 = totalCostSavings * 1.1;
  const costSavingsYear3 = costSavingsYear2 * 1.1;
  const totalCostSavings3Year = costSavingsYear1 + costSavingsYear2 + costSavingsYear3;
  
  // Calculate payback period in months
  const estimatedSoftwareCost = annualSpend * 0.01;
  const paybackPeriodMonths = Math.ceil((estimatedSoftwareCost / costSavingsYear1) * 12);
  
  // Calculate ROI multiple
  const roiMultiple = totalCostSavings3Year / estimatedSoftwareCost;

  // Detailed breakdown data
  const suppliersReconciled = {
    year1: reconciledSuppliers * 2,
    year2: reconciledSuppliers * 3,
    year3: reconciledSuppliers * 4,
  };

  const suppliersWithErrors = {
    year1: Math.round(suppliersReconciled.year1 * 0.3),
    year2: Math.round(suppliersReconciled.year2 * 0.25),
    year3: Math.round(suppliersReconciled.year3 * 0.2),
  };

  const creditsRecovered = {
    year1: expectedCreditValue,
    year2: expectedCreditValue * 1.2,
    year3: expectedCreditValue * 1.4,
  };

  const timeSavingHours = {
    year1: processingTimeSaved,
    year2: processingTimeSaved * 1.2,
    year3: processingTimeSaved * 1.4,
  };

  const timeSavingValue = {
    year1: laborCostSaved,
    year2: laborCostSaved * 1.2,
    year3: laborCostSaved * 1.4,
  };

  const projectedROIValue = {
    year1: costSavingsYear1,
    year2: costSavingsYear1 + costSavingsYear2,
    year3: totalCostSavings3Year,
  };

  const projectedROIMultiple = {
    year1: Number((costSavingsYear1 / estimatedSoftwareCost).toFixed(1)),
    year2: Number(((costSavingsYear1 + costSavingsYear2) / estimatedSoftwareCost).toFixed(1)),
    year3: Number((totalCostSavings3Year / estimatedSoftwareCost).toFixed(1)),
  };

  // Implementation milestones
  const implementationMilestones = {
    days30: "Initial setup and data integration",
    days60: "Duplicate payment identification and credit recovery",
    days90: "Missing invoice detection and reconciliation",
    days180: "Process automation and efficiency improvements",
  };

  return {
    expectedCreditsFound,
    expectedCreditValue,
    missingInvoiceProjection,
    processingTimeSaved,
    laborCostSaved,
    implementationMilestones,
    costSavingsYear1,
    costSavingsYear2,
    costSavingsYear3,
    totalCostSavings3Year,
    paybackPeriodMonths,
    roiMultiple,
    suppliersReconciled,
    suppliersWithErrors,
    creditsRecovered,
    timeSavingHours,
    timeSavingValue,
    projectedROIValue,
    projectedROIMultiple,
  };
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
