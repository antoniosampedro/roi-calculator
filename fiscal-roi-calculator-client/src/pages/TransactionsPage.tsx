
import { TransactionProvider } from "../contexts/TransactionContext";
import { TransactionCalculator } from "../components/TransactionCalculator";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link, useSearchParams, Navigate } from "react-router-dom";

const TransactionsPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');
  
  // Redirect to role selection if no role is specified
  if (!role || (role !== 'sales' && role !== 'csm')) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-fiscal-purple">Transaction Analysis ROI</h1>
          <Button variant="outline" asChild>
            <Link to={`/calculators?role=${role}`} className="flex items-center gap-2">
              <ArrowDown className="rotate-90 h-4 w-4" />
              Back to Calculators
            </Link>
          </Button>
        </div>
      </div>
      <TransactionProvider initialViewMode={role as 'sales' | 'csm'}>
        <TransactionCalculator />
      </TransactionProvider>
    </main>
  );
};

export default TransactionsPage;
