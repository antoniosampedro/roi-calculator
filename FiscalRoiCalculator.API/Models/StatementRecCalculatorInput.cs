namespace FiscalRoiCalculator.API.Models
{
    public class StatementRecCalculatorInput
    {
        // From frontend CalculatorInputs
        public int NumTransactions { get; set; }
        public decimal AnnualSpend { get; set; }
        public int NumActiveSuppliers { get; set; }
        public int ReconciledSuppliers { get; set; }
        public int EffortPersonDays { get; set; }
        public string GoalType { get; set; } // "more_coverage" | "time_savings"
        public string Currency { get; set; } // "GBP" | "USD" | "EUR"

        // From frontend AdminSettings
        public decimal DuplicationRate { get; set; }
        public decimal MissingInvoiceRate { get; set; }
        public decimal AverageCreditValue { get; set; }
        public decimal AverageProcessingTime { get; set; } // in minutes
        public decimal AverageHourlyCost { get; set; }
        public decimal AnnualSavingsMultiplier { get; set; }
    }
}
