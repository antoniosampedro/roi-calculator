using System.Collections.Generic;

namespace FiscalRoiCalculator.API.Models
{
    public class YearBasedMetrics
    {
        public decimal Year1 { get; set; }
        public decimal Year2 { get; set; }
        public decimal Year3 { get; set; }
    }

    public class ImplementationMilestonesOutput
    {
        public string Days30 { get; set; }
        public string Days60 { get; set; }
        public string Days90 { get; set; }
        public string Days180 { get; set; }
    }

    public class StatementRecCalculatorOutput
    {
        // Sales view metrics
        public decimal CostSavingsYear1 { get; set; }
        public decimal CostSavingsYear2 { get; set; }
        public decimal CostSavingsYear3 { get; set; }
        public decimal TotalCostSavings3Year { get; set; }
        public int PaybackPeriodMonths { get; set; }
        public decimal RoiMultiple { get; set; }

        // CSM view metrics
        public decimal ExpectedCreditsFound { get; set; }
        public decimal ExpectedCreditValue { get; set; }
        public decimal MissingInvoiceProjection { get; set; }
        public decimal ProcessingTimeSaved { get; set; }
        public decimal LaborCostSaved { get; set; }
        public ImplementationMilestonesOutput ImplementationMilestones { get; set; }

        // Detailed breakdown
        public YearBasedMetrics SuppliersReconciled { get; set; }
        public YearBasedMetrics SuppliersWithErrors { get; set; }
        public YearBasedMetrics CreditsRecovered { get; set; }
        public YearBasedMetrics TimeSavingHours { get; set; }
        public YearBasedMetrics TimeSavingValue { get; set; }
        public YearBasedMetrics ProjectedROIValue { get; set; }
        public YearBasedMetrics ProjectedROIMultiple { get; set; }
    }
}
