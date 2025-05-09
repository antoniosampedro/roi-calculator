
import { useTransaction } from "../contexts/TransactionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TransactionAdminSettings } from "@/types/calculator";

interface TransactionAdminSettingsFormProps {
  onClose: () => void;
}

export function TransactionAdminSettingsForm({ onClose }: TransactionAdminSettingsFormProps) {
  const { adminSettings, setAdminSettings, recalculate } = useTransaction();
  const [settings, setSettings] = useState<TransactionAdminSettings>({ ...adminSettings });

  const handleChange = (key: keyof TransactionAdminSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSettings({ ...settings, [key]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminSettings(settings);
    recalculate();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="averageFraudAmount">Average Fraud Amount ($)</Label>
          <Input
            id="averageFraudAmount"
            type="number"
            min="0"
            value={settings.averageFraudAmount}
            onChange={handleChange("averageFraudAmount")}
          />
          <p className="text-sm text-muted-foreground">
            Average value of each fraudulent transaction
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="errorCorrectionTime">Error Correction Time (min)</Label>
          <Input
            id="errorCorrectionTime"
            type="number"
            min="0"
            value={settings.errorCorrectionTime}
            onChange={handleChange("errorCorrectionTime")}
          />
          <p className="text-sm text-muted-foreground">
            Minutes to correct each transaction error
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="averageHourlyCost">Avg. Hourly Cost ($)</Label>
          <Input
            id="averageHourlyCost"
            type="number"
            min="0"
            value={settings.averageHourlyCost}
            onChange={handleChange("averageHourlyCost")}
          />
          <p className="text-sm text-muted-foreground">
            Cost per hour for staff processing transactions
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="compliancePenaltyAvoidance">Compliance Penalty Avoidance ($)</Label>
          <Input
            id="compliancePenaltyAvoidance"
            type="number"
            min="0"
            value={settings.compliancePenaltyAvoidance}
            onChange={handleChange("compliancePenaltyAvoidance")}
          />
          <p className="text-sm text-muted-foreground">
            Potential compliance penalties avoided
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualSavingsMultiplier">Annual Savings Multiplier</Label>
          <Input
            id="annualSavingsMultiplier"
            type="number"
            step="0.01"
            min="0.5"
            value={settings.annualSavingsMultiplier}
            onChange={handleChange("annualSavingsMultiplier")}
          />
          <p className="text-sm text-muted-foreground">
            Year-over-year savings increase (e.g., 1.1 = 10% increase)
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Settings</Button>
      </div>
    </form>
  );
}
