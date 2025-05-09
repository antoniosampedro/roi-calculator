
import { useTransaction } from "../contexts/TransactionContext";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export function TransactionSplitInputForm() {
  const { inputs, setInputs, recalculate, currentValues, setCurrentValues } = useTransaction();
  const [formValues, setFormValues] = useState({ ...inputs });
  const [currentFormValues, setCurrentFormValues] = useState({ ...currentValues });

  useEffect(() => {
    setFormValues(inputs);
  }, [inputs]);

  useEffect(() => {
    setCurrentFormValues(currentValues);
  }, [currentValues]);

  const handleInputChange = (key: keyof typeof formValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: number;
    value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSliderChange = (key: keyof typeof formValues) => (value: number[]) => {
    setFormValues({ ...formValues, [key]: value[0] });
  };

  const handleCurrentValueChange = (key: keyof typeof currentFormValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    
    setCurrentFormValues({ ...currentFormValues, [key]: value });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setInputs(formValues);
    setCurrentValues(currentFormValues);
    recalculate();
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">ROI Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="annualSpend" className="text-base">
                  Supplier Spend
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[220px]">
                        Total annual procurement spend
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="annualSpend"
                type="number"
                min="1"
                value={formValues.annualSpend}
                onChange={handleInputChange("annualSpend")}
                className="text-right"
              />
              <Slider
                value={[formValues.annualSpend]}
                min={1000000}
                max={50000000}
                step={1000000}
                onValueChange={handleSliderChange("annualSpend")}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="numActiveSuppliers" className="text-base">
                  Active Suppliers
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[220px]">
                        Number of active suppliers
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="numActiveSuppliers"
                type="number"
                min="1"
                value={formValues.numActiveSuppliers}
                onChange={handleInputChange("numActiveSuppliers")}
                className="text-right"
              />
              <Slider
                value={[formValues.numActiveSuppliers]}
                min={10}
                max={1000}
                step={10}
                onValueChange={handleSliderChange("numActiveSuppliers")}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="numTransactions" className="text-base">
                  Number of Statements
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[220px]">
                        The total number of statements processed annually
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="numTransactions"
                type="number"
                min="1"
                value={formValues.numTransactions}
                onChange={handleInputChange("numTransactions")}
                className="text-right"
              />
              <Slider
                value={[formValues.numTransactions]}
                min={50}
                max={5000}
                step={50}
                onValueChange={handleSliderChange("numTransactions")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="statementsReconciled" className="text-base">
                How many statements are you reconciling today?
              </Label>
              <Input
                id="statementsReconciled"
                type="number"
                min="0"
                value={currentFormValues.statementsReconciled}
                onChange={handleCurrentValueChange("statementsReconciled")}
                className="text-right"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="missingCredits" className="text-base">
                How many missing credits are you finding today?
              </Label>
              <Input
                id="missingCredits"
                type="number"
                min="0"
                value={currentFormValues.missingCredits}
                onChange={handleCurrentValueChange("missingCredits")}
                className="text-right"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="missingInvoices" className="text-base">
                How many missing invoices are you finding today?
              </Label>
              <Input
                id="missingInvoices"
                type="number"
                min="0"
                value={currentFormValues.missingInvoices}
                onChange={handleCurrentValueChange("missingInvoices")}
                className="text-right"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Calculate ROI
      </Button>
    </form>
  );
}
