using FiscalRoiCalculator.API.Models;

namespace FiscalRoiCalculator.API.Services
{
    public interface IRoiCalculatorService
    {
        RoiCalculatorOutput CalculateRoi(RoiCalculatorInput input);
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
    }
} 