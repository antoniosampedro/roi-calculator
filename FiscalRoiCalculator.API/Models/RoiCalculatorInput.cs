namespace FiscalRoiCalculator.API.Models
{
    public class RoiCalculatorInput
    {
        public int NumberOfStatements { get; set; }
        public decimal AnnualSpend { get; set; }
        public decimal PoMatchPercentage { get; set; }
        public int YearsSinceLastAudit { get; set; }
        public bool IsSalesView { get; set; }
    }
} 