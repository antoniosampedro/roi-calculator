
import { useTransaction } from "../contexts/TransactionContext";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function StatementRecInputForm() {
  const { inputs, setInputs, recalculate } = useTransaction();
  const [formValues, setFormValues] = useState({ ...inputs });

  useEffect(() => {
    setFormValues(inputs);
  }, [inputs]);

  const handleInputChange = (key: keyof typeof formValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: number;
    
    if (key === "errorRate" || key === "fraudPercentage") {
      value = parseFloat(e.target.value);
      if (isNaN(value)) value = 0;
      if (value < 0) value = 0;
      if (key === "errorRate" && value > 100) value = 100;
      if (key === "fraudPercentage" && value > 10) value = 10; // Cap fraud at 10%
    } else {
      value = parseInt(e.target.value);
      if (isNaN(value)) value = 0;
      if (value < 0) value = 0;
    }
    
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSliderChange = (key: keyof typeof formValues) => (value: number[]) => {
    setFormValues({ ...formValues, [key]: value[0] });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setInputs(formValues);
    recalculate();
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="numTransactions" className="text-base">
              Number of Transactions
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
                    The total number of transactions processed annually
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
            min={1000}
            max={1000000}
            step={1000}
            onValueChange={handleSliderChange("numTransactions")}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="annualSpend" className="text-base">
              Annual Spend ($)
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
            <Label htmlFor="errorRate" className="text-base">
              Error Rate (%)
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
                    Percentage of transactions with errors
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="errorRate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={formValues.errorRate}
            onChange={handleInputChange("errorRate")}
            className="text-right"
          />
          <Slider
            value={[formValues.errorRate]}
            min={0}
            max={20}
            step={0.1}
            onValueChange={handleSliderChange("errorRate")}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="fraudPercentage" className="text-base">
              Potential Fraud (%)
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
                    Percentage of transactions potentially fraudulent
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="fraudPercentage"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formValues.fraudPercentage}
            onChange={handleInputChange("fraudPercentage")}
            className="text-right"
          />
          <Slider
            value={[formValues.fraudPercentage]}
            min={0}
            max={5}
            step={0.1}
            onValueChange={handleSliderChange("fraudPercentage")}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Calculate ROI
      </Button>
    </form>
  );
}
