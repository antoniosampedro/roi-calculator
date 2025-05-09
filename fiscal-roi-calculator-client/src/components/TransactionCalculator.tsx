
import { useEffect } from "react";
import { StatementRecInputForm } from "./StatementRecInputForm";
import { TransactionSalesResults } from "./TransactionSalesResults";
import { TransactionCSMResults } from "./TransactionCSMResults";
import { useTransaction } from "../contexts/TransactionContext";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TransactionAdminSettingsForm } from "./TransactionAdminSettingsForm";
import { KeyAssumptions } from "./KeyAssumptions";
import { TransactionExportMenu } from "./TransactionExportMenu";
import { Settings, FileText } from "lucide-react";

export function TransactionCalculator() {
  const { viewMode, recalculate, results, resetToDefaults, showAssumptions, setShowAssumptions } = useTransaction();

  // Calculate initial results when component mounts
  useEffect(() => {
    if (!results) {
      recalculate();
    }
  }, [recalculate, results]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold text-fiscal-purple">
          {viewMode === "sales" ? "Sales View" : "CSM View"}
        </h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAssumptions(!showAssumptions)}
            className={showAssumptions ? "bg-accent" : ""}
          >
            <FileText className="h-4 w-4 mr-2" />
            Assumptions
          </Button>
          
          <TransactionExportMenu />
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Admin Settings
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Admin Settings</AlertDialogTitle>
              </AlertDialogHeader>
              <TransactionAdminSettingsForm onClose={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new Event('close', { bubbles: true }))} />
            </AlertDialogContent>
          </AlertDialog>
          
          <Button variant="ghost" size="sm" onClick={resetToDefaults}>
            Reset
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <h2 className="text-xl font-bold mb-4">Input Parameters</h2>
            <StatementRecInputForm />
          </div>
        </div>
        
        <div className="md:col-span-2">
          {showAssumptions && <div className="mb-6"><KeyAssumptions /></div>}
          {viewMode === "sales" ? <TransactionSalesResults /> : <TransactionCSMResults />}
        </div>
      </div>
    </div>
  );
}
