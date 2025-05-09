using FiscalRoiCalculator.API.Models;

namespace FiscalRoiCalculator.API.Services
{
    public interface IRoiCalculatorService
    {
        RoiCalculatorOutput CalculateRoi(RoiCalculatorInput input);
        StatementRecCalculatorOutput CalculateStatementReconciliationRoi(StatementRecCalculatorInput statementRecInput);
    }

    public class RoiCalculatorService : IRoiCalculatorService
    {
        private const decimal CREDIT_FIND_RATE = 0.02m; // 2% of annual spend
        private const decimal MISSING_INVOICE_RATE = 0.01m; // 1% of annual spend
        private const decimal IMPLEMENTATION_COST = 50000m; // $50,000 implementation cost
        private const decimal ANNUAL_MAINTENANCE = 25000m; // $25,000 annual maintenance

        public RoiCalculatorOutput CalculateRoi(RoiCalculatorInput input)
        {
            var output = new RoiCalculatorOutput();

            // Calculate expected credits
            output.ExpectedCreditValue = input.AnnualSpend * CREDIT_FIND_RATE;
            output.ExpectedCreditsFound = (int)(output.ExpectedCreditValue / 1000); // Assuming average credit is $1,000

            // Calculate missing invoices
            output.MissingInvoiceProjections = (int)(input.AnnualSpend * MISSING_INVOICE_RATE / 1000);

            // Calculate cost savings
            var annualCostSavings = output.ExpectedCreditValue + (input.AnnualSpend * MISSING_INVOICE_RATE);
            output.TotalCostSavings = annualCostSavings * 3; // 3-year projection

            // Calculate ROI metrics
            var totalInvestment = IMPLEMENTATION_COST + (ANNUAL_MAINTENANCE * 3);
            output.ThreeYearRoi = ((output.TotalCostSavings - totalInvestment) / totalInvestment) * 100;
            output.PaybackPeriod = totalInvestment / annualCostSavings;
            output.RoiMultiple = output.TotalCostSavings / totalInvestment;

            // Generate yearly projections
            output.YearlyProjections = new List<decimal>
            {
                annualCostSavings,
                annualCostSavings * 1.1m, // 10% growth in second year
                annualCostSavings * 1.21m // 21% growth in third year
            };

            // Generate cost breakdown
            output.CostBreakdown = new Dictionary<string, decimal>
            {
                { "Implementation Cost", IMPLEMENTATION_COST },
                { "Annual Maintenance", ANNUAL_MAINTENANCE },
                { "Expected Credits", output.ExpectedCreditValue },
                { "Missing Invoice Recovery", input.AnnualSpend * MISSING_INVOICE_RATE }
            };

            // Generate implementation milestones
            output.ImplementationMilestones = new List<string>
            {
                "Week 1-2: Project kickoff and requirements gathering",
                "Week 3-4: System configuration and setup",
                "Week 5-6: Data migration and validation",
                "Week 7-8: User training and go-live preparation",
                "Week 9: Go-live and initial support"
            };

            return output;
        }

        public StatementRecCalculatorOutput CalculateStatementReconciliationRoi(StatementRecCalculatorInput statementRecInput)
        {
            // Ported logic from frontend: fiscal-roi-calculator-client/src/utils/calculatorUtils.ts

            // Destructure inputs (using decimal for calculations)
            decimal numTransactions = statementRecInput.NumTransactions;
            decimal annualSpend = statementRecInput.AnnualSpend;
            decimal numActiveSuppliers = statementRecInput.NumActiveSuppliers;
            decimal reconciledSuppliers = statementRecInput.ReconciledSuppliers;
            decimal effortPersonDays = statementRecInput.EffortPersonDays;

            // Destructure admin settings
            decimal duplicationRate = statementRecInput.DuplicationRate;
            decimal missingInvoiceRate = statementRecInput.MissingInvoiceRate;
            decimal averageCreditValue = statementRecInput.AverageCreditValue;
            // averageProcessingTime is used in frontend's calculation but not directly here for these specific outputs
            // decimal averageProcessingTime = statementRecInput.AverageProcessingTime; 
            decimal averageHourlyCost = statementRecInput.AverageHourlyCost;
            // annualSavingsMultiplier is used for year 2 & 3 cost savings, but the frontend logic for that is slightly different
            // decimal annualSavingsMultiplier = statementRecInput.AnnualSavingsMultiplier;


            // Calculate expected credits found
            decimal expectedCreditsFound = numTransactions * duplicationRate;

            // Calculate expected credit value
            decimal expectedCreditValue = expectedCreditsFound * averageCreditValue;

            // Calculate missing invoice projection
            decimal missingInvoiceProjection = numActiveSuppliers * missingInvoiceRate;

            // Calculate labor cost savings
            // Assuming 70% reduction in processing time, 8 hours per day
            decimal processingTimeSaved = effortPersonDays * 0.7m * 8; 
            decimal laborCostSaved = processingTimeSaved * averageHourlyCost;

            // Calculate total cost savings for Year 1
            decimal totalCostSavingsYear1 = expectedCreditValue + laborCostSaved;
            
            // Year 1-3 cost savings (matches frontend logic for year-on-year increase)
            decimal costSavingsYear1 = totalCostSavingsYear1;
            decimal costSavingsYear2 = totalCostSavingsYear1 * 1.1m; // Using 1.1m as per frontend logic for Y2
            decimal costSavingsYear3 = costSavingsYear2 * 1.1m; // Using 1.1m on Y2's value as per frontend logic for Y3
            decimal totalCostSavings3Year = costSavingsYear1 + costSavingsYear2 + costSavingsYear3;
            
            // Calculate payback period in months
            // Frontend uses: const estimatedSoftwareCost = annualSpend * 0.01;
            decimal estimatedSoftwareCost = annualSpend * 0.01m; 
            int paybackPeriodMonths = 0;
            if (costSavingsYear1 > 0) // Avoid division by zero
            {
                paybackPeriodMonths = (int)System.Math.Ceiling((estimatedSoftwareCost / costSavingsYear1) * 12);
            }
            
            // Calculate ROI multiple
            decimal roiMultiple = 0;
            if (estimatedSoftwareCost > 0) // Avoid division by zero
            {
                roiMultiple = totalCostSavings3Year / estimatedSoftwareCost;
            }

            // Detailed breakdown data
            var suppliersReconciledMetrics = new YearBasedMetrics
            {
                Year1 = reconciledSuppliers * 2,
                Year2 = reconciledSuppliers * 3,
                Year3 = reconciledSuppliers * 4,
            };

            var suppliersWithErrorsMetrics = new YearBasedMetrics
            {
                Year1 = System.Math.Round(suppliersReconciledMetrics.Year1 * 0.3m),
                Year2 = System.Math.Round(suppliersReconciledMetrics.Year2 * 0.25m),
                Year3 = System.Math.Round(suppliersReconciledMetrics.Year3 * 0.2m),
            };

            var creditsRecoveredMetrics = new YearBasedMetrics
            {
                Year1 = expectedCreditValue,
                Year2 = expectedCreditValue * 1.2m,
                Year3 = expectedCreditValue * 1.4m,
            };

            var timeSavingHoursMetrics = new YearBasedMetrics
            {
                Year1 = processingTimeSaved,
                Year2 = processingTimeSaved * 1.2m,
                Year3 = processingTimeSaved * 1.4m,
            };

            var timeSavingValueMetrics = new YearBasedMetrics
            {
                Year1 = laborCostSaved,
                Year2 = laborCostSaved * 1.2m,
                Year3 = laborCostSaved * 1.4m,
            };

            var projectedROIValueMetrics = new YearBasedMetrics
            {
                Year1 = costSavingsYear1,
                Year2 = costSavingsYear1 + costSavingsYear2,
                Year3 = totalCostSavings3Year,
            };

            var projectedROIMultipleMetrics = new YearBasedMetrics();
            if (estimatedSoftwareCost > 0) // Avoid division by zero
            {
                projectedROIMultipleMetrics.Year1 = System.Math.Round(costSavingsYear1 / estimatedSoftwareCost, 1);
                projectedROIMultipleMetrics.Year2 = System.Math.Round((costSavingsYear1 + costSavingsYear2) / estimatedSoftwareCost, 1);
                projectedROIMultipleMetrics.Year3 = System.Math.Round(totalCostSavings3Year / estimatedSoftwareCost, 1);
            }


            // Implementation milestones (static as per frontend)
            var implementationMilestonesOutput = new ImplementationMilestonesOutput
            {
                Days30 = "Initial setup and data integration",
                Days60 = "Duplicate payment identification and credit recovery",
                Days90 = "Missing invoice detection and reconciliation",
                Days180 = "Process automation and efficiency improvements",
            };

            return new StatementRecCalculatorOutput
            {
                ExpectedCreditsFound = expectedCreditsFound,
                ExpectedCreditValue = expectedCreditValue,
                MissingInvoiceProjection = missingInvoiceProjection,
                ProcessingTimeSaved = processingTimeSaved,
                LaborCostSaved = laborCostSaved,
                ImplementationMilestones = implementationMilestonesOutput,
                CostSavingsYear1 = costSavingsYear1,
                CostSavingsYear2 = costSavingsYear2,
                CostSavingsYear3 = costSavingsYear3,
                TotalCostSavings3Year = totalCostSavings3Year,
                PaybackPeriodMonths = paybackPeriodMonths,
                RoiMultiple = roiMultiple,
                SuppliersReconciled = suppliersReconciledMetrics,
                SuppliersWithErrors = suppliersWithErrorsMetrics,
                CreditsRecovered = creditsRecoveredMetrics,
                TimeSavingHours = timeSavingHoursMetrics,
                TimeSavingValue = timeSavingValueMetrics,
                ProjectedROIValue = projectedROIValueMetrics,
                ProjectedROIMultiple = projectedROIMultipleMetrics,
            };
        }
    }
}
