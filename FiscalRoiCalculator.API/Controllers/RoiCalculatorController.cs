using Microsoft.AspNetCore.Mvc;
using FiscalRoiCalculator.API.Models;
using FiscalRoiCalculator.API.Services;

namespace FiscalRoiCalculator.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoiCalculatorController : ControllerBase
    {
        private readonly IRoiCalculatorService _roiCalculatorService;

        public RoiCalculatorController(IRoiCalculatorService roiCalculatorService)
        {
            _roiCalculatorService = roiCalculatorService;
        }

        [HttpPost("calculate")]
        public ActionResult<RoiCalculatorOutput> CalculateRoi([FromBody] RoiCalculatorInput input)
        {
            try
            {
                var result = _roiCalculatorService.CalculateRoi(input);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("statement-reconciliation")]
        public ActionResult<StatementRecCalculatorOutput> CalculateStatementReconciliationRoi([FromBody] StatementRecCalculatorInput input)
        {
            if (input == null)
            {
                return BadRequest("Input data is null.");
            }

            try
            {
                var result = _roiCalculatorService.CalculateStatementReconciliationRoi(input);
                return Ok(result);
            }
            catch (ArgumentException ex) // Catch specific exceptions if needed
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex) // Generic catch-all
            {
                // Log the exception ex here
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}
