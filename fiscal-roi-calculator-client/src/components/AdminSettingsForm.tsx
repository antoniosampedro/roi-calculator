
import { useCalculator } from "../contexts/CalculatorContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AdminSettings } from "@/types/calculator";

interface AdminSettingsFormProps {
  onClose: () => void;
}

export function AdminSettingsForm({ onClose }: AdminSettingsFormProps) {
  const { adminSettings, setAdminSettings, recalculate } = useCalculator();
  const [settings, setSettings] = useState<AdminSettings>({ ...adminSettings });

  const handleChange = (key: keyof AdminSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <Label htmlFor="duplicationRate">Duplication Rate</Label>
          <Input
            id="duplicationRate"
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={settings.duplicationRate}
            onChange={handleChange("duplicationRate")}
          />
          <p className="text-sm text-muted-foreground">
            Percentage of statements with duplications (0-1)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="missingInvoiceRate">Missing Invoice Rate</Label>
          <Input
            id="missingInvoiceRate"
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={settings.missingInvoiceRate}
            onChange={handleChange("missingInvoiceRate")}
          />
          <p className="text-sm text-muted-foreground">
            Percentage of invoices that are missing (0-1)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="averageCreditValue">Average Credit Value ($)</Label>
          <Input
            id="averageCreditValue"
            type="number"
            min="0"
            value={settings.averageCreditValue}
            onChange={handleChange("averageCreditValue")}
          />
          <p className="text-sm text-muted-foreground">
            Average value of each credit found
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="averageProcessingTime">Avg. Processing Time (minutes)</Label>
          <Input
            id="averageProcessingTime"
            type="number"
            min="0"
            value={settings.averageProcessingTime}
            onChange={handleChange("averageProcessingTime")}
          />
          <p className="text-sm text-muted-foreground">
            Minutes to process each statement
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
            Cost per hour for statement processing
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
