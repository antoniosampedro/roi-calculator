
import { useCalculator } from "../contexts/CalculatorContext";
import { formatCurrency, formatNumber } from "../utils/calculatorUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { KeyAssumptions } from "./KeyAssumptions";

export function SalesResults() {
  const { results, inputs, showAssumptions, setShowAssumptions } = useCalculator();

  if (!results) {
    return <div className="text-center py-8">Please calculate ROI first</div>;
  }

  const chartData = [
    { name: "Year 1", value: results.costSavingsYear1 },
    { name: "Year 2", value: results.costSavingsYear2 },
    { name: "Year 3", value: results.costSavingsYear3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Financial Impact Summary</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="flex items-center gap-2"
        >
          <InfoIcon className="h-4 w-4" />
          {showAssumptions ? "Hide Assumptions" : "Show Assumptions"}
        </Button>
      </div>

      {showAssumptions && <KeyAssumptions />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              3-Year ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {results.roiMultiple.toFixed(1)}x
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Payback Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {results.paybackPeriodMonths} months
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total 3-Year Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {formatCurrency(results.totalCostSavings3Year)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>3-Year Cost Savings Projection</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(tick) => `${inputs.currency === 'GBP' ? '£' : inputs.currency === 'USD' ? '$' : '€'}${tick / 1000}k`}>
                  <Label
                    value="Annual Savings"
                    position="left"
                    angle={-90}
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), "Savings"]}
                />
                <Bar dataKey="value" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Annual ROI Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="whitespace-nowrap font-bold">Annual ROI Breakdown</TableHead>
                  <TableHead className="text-right font-bold">Year 1</TableHead>
                  <TableHead className="text-right font-bold">Year 2</TableHead>
                  <TableHead className="text-right font-bold">Year 3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">More suppliers reconciled</TableCell>
                  <TableCell className="text-right">{formatNumber(results.suppliersReconciled.year1)}</TableCell>
                  <TableCell className="text-right">{formatNumber(results.suppliersReconciled.year2)}</TableCell>
                  <TableCell className="text-right">{formatNumber(results.suppliersReconciled.year3)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Find more: suppliers with errors</TableCell>
                  <TableCell className="text-right">{formatNumber(results.suppliersWithErrors.year1)}</TableCell>
                  <TableCell className="text-right">{formatNumber(results.suppliersWithErrors.year2)}</TableCell>
                  <TableCell className="text-right">{formatNumber(results.suppliersWithErrors.year3)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Save more: Credits & overpayments recovered</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.creditsRecovered.year1)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.creditsRecovered.year2)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.creditsRecovered.year3)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Save time: FISCAL vs manual in hours</TableCell>
                  <TableCell className="text-right">{formatNumber(Math.round(results.timeSavingHours.year1))}</TableCell>
                  <TableCell className="text-right">{formatNumber(Math.round(results.timeSavingHours.year2))}</TableCell>
                  <TableCell className="text-right">{formatNumber(Math.round(results.timeSavingHours.year3))}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Save time: Time saving vs manual</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.timeSavingValue.year1)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.timeSavingValue.year2)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(results.timeSavingValue.year3)}</TableCell>
                </TableRow>
                <TableRow className="bg-slate-100">
                  <TableCell className="font-medium text-red-600">Projected 3 Year ROI £</TableCell>
                  <TableCell className="text-right text-red-600">{formatCurrency(results.projectedROIValue.year1)}</TableCell>
                  <TableCell className="text-right text-red-600">{formatCurrency(results.projectedROIValue.year2)}</TableCell>
                  <TableCell className="text-right text-red-600">{formatCurrency(results.projectedROIValue.year3)}</TableCell>
                </TableRow>
                <TableRow className="bg-slate-100">
                  <TableCell className="font-medium text-red-600">Projected 3 Year ROI %</TableCell>
                  <TableCell className="text-right text-red-600">X {results.projectedROIMultiple.year1}</TableCell>
                  <TableCell className="text-right text-red-600">X {results.projectedROIMultiple.year2}</TableCell>
                  <TableCell className="text-right text-red-600">X {results.projectedROIMultiple.year3}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Financial Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                1
              </div>
              <p>
                <span className="font-medium">Fast ROI: </span>
                Investment payback period of only {results.paybackPeriodMonths} months with
                continued returns thereafter.
              </p>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                2
              </div>
              <p>
                <span className="font-medium">Significant Credit Recovery: </span>
                Identification of approximately {formatNumber(results.expectedCreditsFound)} unclaimed 
                credits worth {formatCurrency(results.expectedCreditValue)}.
              </p>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                3
              </div>
              <p>
                <span className="font-medium">Process Efficiency: </span>
                {formatNumber(Math.round(results.processingTimeSaved))} hours of labor saved annually,
                worth {formatCurrency(results.laborCostSaved)}.
              </p>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                4
              </div>
              <p>
                <span className="font-medium">Missing Invoice Recovery: </span>
                Identification of approximately {formatNumber(results.missingInvoiceProjection)} missing 
                invoices, preventing payment delays and improving vendor relationships.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
