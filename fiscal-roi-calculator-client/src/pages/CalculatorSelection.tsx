
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { Calculator, FileText, ArrowLeft } from "lucide-react";

const CalculatorSelection = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  
  // Redirect to role selection if no role is specified
  if (!role || (role !== 'sales' && role !== 'csm')) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-fiscal-purple mb-2">FISCAL ROI Calculator</h1>
          <p className="text-muted-foreground">Select a module to calculate potential return on investment</p>
          <Button variant="link" asChild className="mt-2">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Change Role
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-fiscal-purple" />
                Statement Reconciliation
              </CardTitle>
              <CardDescription>
                Calculate ROI for automated statement reconciliation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The Statement Reconciliation module helps identify duplicate payments,
                missing invoices, and streamline reconciliation processes.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/statement-rec?role=${role}`}>Open Calculator</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-fiscal-purple" />
                Transaction Analysis
              </CardTitle>
              <CardDescription>
                Calculate ROI for automated transaction monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The Transaction Analysis module helps detect fraud, reduce errors,
                and ensure compliance in payment processes.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/transactions?role=${role}`}>Open Calculator</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CalculatorSelection;
