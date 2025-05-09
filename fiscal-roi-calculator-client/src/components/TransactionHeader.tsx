
import { useState } from "react";
import { useTransaction } from "../contexts/TransactionContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewMode } from "@/types/calculator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionAdminSettingsForm } from "./TransactionAdminSettingsForm";

export function TransactionHeader() {
  const { viewMode, setViewMode, recalculate, resetToDefaults } = useTransaction();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleViewChange = (value: string) => {
    setViewMode(value as ViewMode);
    recalculate();
  };

  return (
    <header className="border-b pb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-fiscal-purple">Transaction Analysis ROI</h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Tabs
          defaultValue={viewMode}
          value={viewMode}
          onValueChange={handleViewChange}
          className="w-auto"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales">Sales View</TabsTrigger>
            <TabsTrigger value="csm">CSM View</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-2">
              Admin Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Admin Settings</DialogTitle>
            </DialogHeader>
            <TransactionAdminSettingsForm onClose={() => setIsAdminOpen(false)} />
          </DialogContent>
        </Dialog>
        
        <Button variant="ghost" onClick={resetToDefaults} className="ml-2">
          Reset
        </Button>
      </div>
    </header>
  );
}
