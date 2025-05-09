
import { useCalculator } from "../contexts/CalculatorContext";
import { formatCurrency, formatNumber } from "../utils/calculatorUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend 
} from "recharts";
import { Progress } from "@/components/ui/progress";

export function CSMResults() {
  const { results } = useCalculator();

  if (!results) {
    return <div className="text-center py-8">Please calculate ROI first</div>;
  }

  const pieData = [
    { name: "Duplicate Credits", value: results.expectedCreditValue },
    { name: "Labor Savings", value: results.laborCostSaved },
  ];
  
  const COLORS = ["#9b87f5", "#7E69AB"];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold">Customer Success Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Expected Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {formatNumber(results.expectedCreditsFound)}
            </div>
            <p className="text-sm text-muted-foreground">
              Credits to be identified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Credit Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {formatCurrency(results.expectedCreditValue)}
            </div>
            <p className="text-sm text-muted-foreground">
              Total value of credits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Missing Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {formatNumber(results.missingInvoiceProjection)}
            </div>
            <p className="text-sm text-muted-foreground">
              Invoices to be identified
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip 
                  formatter={(value: number) => [`${formatCurrency(value)}`, "Value"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Statement Processing Time</span>
                  <span>{Math.round(results.processingTimeSaved)} hours saved</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  70% reduction in statement processing time
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Labor Cost Saved</span>
                  <span>{formatCurrency(results.laborCostSaved)}</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Based on {formatCurrency(results.laborCostSaved / results.processingTimeSaved)} per hour
                </p>
              </div>
              
              <div className="pt-4">
                <p className="font-medium">Key Efficiency Metrics:</p>
                <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                  <li>
                    Reduced manual statement review by 70%
                  </li>
                  <li>
                    Automated identification of duplicate payments
                  </li>
                  <li>
                    Improved vendor statement reconciliation accuracy
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-muted"></div>
            
            <ol className="space-y-6 relative">
              <li className="ml-10">
                <div className="absolute left-0 rounded-full flex items-center justify-center w-8 h-8 bg-fiscal-purple text-white">30d</div>
                <h3 className="font-medium">First 30 Days</h3>
                <p className="text-muted-foreground">{results.implementationMilestones.days30}</p>
              </li>
              
              <li className="ml-10">
                <div className="absolute left-0 rounded-full flex items-center justify-center w-8 h-8 bg-fiscal-purple text-white">60d</div>
                <h3 className="font-medium">Days 31-60</h3>
                <p className="text-muted-foreground">{results.implementationMilestones.days60}</p>
              </li>
              
              <li className="ml-10">
                <div className="absolute left-0 rounded-full flex items-center justify-center w-8 h-8 bg-fiscal-purple text-white">90d</div>
                <h3 className="font-medium">Days 61-90</h3>
                <p className="text-muted-foreground">{results.implementationMilestones.days90}</p>
              </li>
              
              <li className="ml-10">
                <div className="absolute left-0 rounded-full flex items-center justify-center w-8 h-8 bg-fiscal-purple text-white">180d</div>
                <h3 className="font-medium">Days 91-180</h3>
                <p className="text-muted-foreground">{results.implementationMilestones.days180}</p>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
