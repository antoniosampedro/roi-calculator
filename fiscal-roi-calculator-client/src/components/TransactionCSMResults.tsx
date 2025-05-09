
import { useTransaction } from "../contexts/TransactionContext";
import { formatCurrency, formatNumber, formatPercentage } from "../utils/calculatorUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionGoals } from "./TransactionGoals";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function TransactionCSMResults() {
  const { results, inputs, currentValues } = useTransaction();

  if (!results) {
    return <div className="text-center py-8">Please calculate ROI first</div>;
  }

  // Calculate spend percentage
  const spendPercentage = (inputs.annualSpend > 0) 
    ? (inputs.numTransactions / inputs.annualSpend * 100)
    : 0;

  // Calculate missing credits and invoices values
  const avgCreditValue = results.fraudPreventionSavings / Math.max(1, inputs.numTransactions * (inputs.fraudPercentage / 100));
  const avgInvoiceValue = results.errorReductionSavings / Math.max(1, inputs.numTransactions * (inputs.errorRate / 100));
  
  const missingCreditsValue = currentValues.missingCredits * avgCreditValue;
  const missingInvoicesValue = currentValues.missingInvoices * avgInvoiceValue;

  // Data for charts
  const potentialData = [
    {
      name: "Current",
      credits: currentValues.missingCredits,
      invoices: currentValues.missingInvoices,
      statements: currentValues.statementsReconciled,
    },
    {
      name: "Potential",
      credits: currentValues.missingCredits * 2,
      invoices: currentValues.missingInvoices * 2,
      statements: currentValues.statementsReconciled * 2,
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              % of Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {formatPercentage(spendPercentage)}
            </div>
            <p className="text-sm text-muted-foreground">
              Of total supplier spend
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Missing Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-fiscal-purple">
              {formatNumber(currentValues.missingCredits)}
            </div>
            <p className="text-sm text-muted-foreground">
              Value: {formatCurrency(missingCreditsValue)}
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
              {formatNumber(currentValues.missingInvoices)}
            </div>
            <p className="text-sm text-muted-foreground">
              Value: {formatCurrency(missingInvoicesValue)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionGoals />

        <Card>
          <CardHeader>
            <CardTitle>Potential Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={potentialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="statements" name="Statements" fill="#9b87f5" />
                <Bar dataKey="credits" name="Credits" fill="#6E59A5" />
                <Bar dataKey="invoices" name="Invoices" fill="#7E69AB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">Financial Benefits</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </div>
                  <p>
                    <span className="font-medium">Increased Credit Recovery: </span>
                    Potential to identify an additional {formatNumber(currentValues.missingCredits)} credits 
                    worth {formatCurrency(missingCreditsValue)}.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </div>
                  <p>
                    <span className="font-medium">Missing Invoice Detection: </span>
                    Ability to identify {formatNumber(currentValues.missingInvoices)} missing invoices
                    worth {formatCurrency(missingInvoicesValue)}.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </div>
                  <p>
                    <span className="font-medium">Time Efficiency: </span>
                    {Math.round(results.processingTimeSaved)} hours saved annually in statement reconciliation.
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg">Operational Benefits</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                    1
                  </div>
                  <p>
                    <span className="font-medium">Increased Volume: </span>
                    Process {formatPercentage(100)} more statements with the same staff resources.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                    2
                  </div>
                  <p>
                    <span className="font-medium">Reduced Processing Time: </span>
                    70% reduction in time spent on manual statement reconciliation.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-fiscal-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                    3
                  </div>
                  <p>
                    <span className="font-medium">Improved Accuracy: </span>
                    Reduce human error in reconciliation process by up to 85%.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
