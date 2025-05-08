namespace FiscalRoiCalculator.API.Models
{
    public class RoiCalculatorOutput
    {
        // Financial metrics
        public decimal TotalCostSavings { get; set; }
        public decimal ThreeYearRoi { get; set; }
        public decimal PaybackPeriod { get; set; }
        public decimal RoiMultiple { get; set; }

        // Operational metrics
        public int ExpectedCreditsFound { get; set; }
        public decimal ExpectedCreditValue { get; set; }
        public int MissingInvoiceProjections { get; set; }
        public List<string> ImplementationMilestones { get; set; } = new List<string>();

        // Additional details
        public Dictionary<string, decimal> CostBreakdown { get; set; } = new Dictionary<string, decimal>();
        public List<decimal> YearlyProjections { get; set; } = new List<decimal>();
    }
} 