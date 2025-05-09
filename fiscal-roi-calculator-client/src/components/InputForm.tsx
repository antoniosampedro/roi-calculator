
import { useCalculator } from "../contexts/CalculatorContext";
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
import {
  HelpCircle,
  PoundSterling,
  DollarSign,
  Euro,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Currency, GoalType } from "../types/calculator";

export function InputForm() {
  const { inputs, setInputs, recalculate, setCurrency, setGoalType } = useCalculator();
  const [formValues, setFormValues] = useState({ ...inputs });

  useEffect(() => {
    setFormValues(inputs);
  }, [inputs]);

  const handleInputChange = (key: keyof typeof formValues) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: number | string = e.target.value;
    
    if (key !== 'currency' && key !== 'goalType') {
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

  const handleCurrencyChange = (value: string) => {
    const currency = value as Currency;
    setCurrency(currency);
    setFormValues({ ...formValues, currency });
  };

  const handleGoalChange = (value: string) => {
    const goalType = value as GoalType;
    setGoalType(goalType);
    setFormValues({ ...formValues, goalType });
  };

  const getCurrencyIcon = () => {
    switch (formValues.currency) {
      case 'GBP':
        return <PoundSterling className="h-4 w-4" />;
      case 'USD':
        return <DollarSign className="h-4 w-4" />;
      case 'EUR':
        return <Euro className="h-4 w-4" />;
      default:
        return <PoundSterling className="h-4 w-4" />;
    }
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Currency</h3>
        <Select value={formValues.currency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Goal</h3>
        <Select value={formValues.goalType} onValueChange={handleGoalChange}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="more_coverage">More coverage (focus on money)</SelectItem>
            <SelectItem value="time_savings">Time savings (focus on efficiency)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="numTransactions" className="text-base">
              Annual # Transactions
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
            max={100000}
            step={1000}
            onValueChange={handleSliderChange("numTransactions")}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="annualSpend" className="text-base">
              Annual Supplier Spend
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
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {getCurrencyIcon()}
            </div>
            <Input
              id="annualSpend"
              type="number"
              min="1"
              value={formValues.annualSpend}
              onChange={handleInputChange("annualSpend")}
              className="text-right pl-10"
            />
          </div>
          <Slider
            value={[formValues.annualSpend]}
            min={100000}
            max={50000000}
            step={100000}
            onValueChange={handleSliderChange("annualSpend")}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="numActiveSuppliers" className="text-base">
              Number of Active Suppliers
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
                    Total number of active suppliers
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
            <Label htmlFor="reconciledSuppliers" className="text-base">
              Annually Reconciled Suppliers
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
                    Number of suppliers reconciled annually
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="reconciledSuppliers"
            type="number"
            min="1"
            max={formValues.numActiveSuppliers}
            value={formValues.reconciledSuppliers}
            onChange={handleInputChange("reconciledSuppliers")}
            className="text-right"
          />
          <Slider
            value={[formValues.reconciledSuppliers]}
            min={1}
            max={formValues.numActiveSuppliers}
            step={1}
            onValueChange={handleSliderChange("reconciledSuppliers")}
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="effortPersonDays" className="text-base">
              Effort Person Days Per Year
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
                    Manual effort in person-days per year
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="effortPersonDays"
            type="number"
            min="1"
            value={formValues.effortPersonDays}
            onChange={handleInputChange("effortPersonDays")}
            className="text-right"
          />
          <Slider
            value={[formValues.effortPersonDays]}
            min={1}
            max={365}
            step={1}
            onValueChange={handleSliderChange("effortPersonDays")}
          />
        </div>

        {formValues.goalType === 'more_coverage' && (
          <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-sm text-blue-700">
              With a focus on more coverage, you'll be able to reconcile more suppliers
              and recover more credits with the same effort.
            </p>
          </div>
        )}

        {formValues.goalType === 'time_savings' && (
          <div className="p-4 bg-green-50 rounded-md border border-green-100">
            <p className="text-sm text-green-700">
              With a focus on time savings, you'll be able to reconcile the same number
              of suppliers much faster, saving significant labor costs.
            </p>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">
        Calculate ROI
      </Button>
    </form>
  );
}
