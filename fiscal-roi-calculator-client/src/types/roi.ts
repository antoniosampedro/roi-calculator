export interface RoiCalculatorInput {
    numberOfStatements: number;
    annualSpend: number;
    poMatchPercentage: number;
    yearsSinceLastAudit: number;
    isSalesView: boolean;
}

export interface RoiCalculatorOutput {
    totalCostSavings: number;
    threeYearRoi: number;
    paybackPeriod: number;
    roiMultiple: number;
    expectedCreditsFound: number;
    expectedCreditValue: number;
    missingInvoiceProjections: number;
    implementationMilestones: string[];
    costBreakdown: Record<string, number>;
    yearlyProjections: number[];
} 