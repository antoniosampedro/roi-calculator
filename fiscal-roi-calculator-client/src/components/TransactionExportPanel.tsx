
import { Button } from "@/components/ui/button";
import { useTransaction } from "../contexts/TransactionContext";
import { Download, Save } from "lucide-react";

export function TransactionExportPanel() {
  const { results, viewMode } = useTransaction();

  if (!results) {
    return null;
  }

  const handleDownloadPDF = () => {
    // In a real application, this would generate a PDF
    alert("PDF download functionality would be implemented here");
  };

  const handleExportImage = () => {
    // In a real application, this would export images
    alert("Image export functionality would be implemented here");
  };

  const handleSendEmail = () => {
    // In a real application, this would send an email
    alert("Email sending functionality would be implemented here");
  };

  return (
    <div className="border-t pt-4 mt-8">
      <h3 className="font-semibold mb-3">Export Results</h3>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center gap-2">
          <Download size={16} />
          <span>Download PDF</span>
        </Button>
        <Button variant="outline" onClick={handleExportImage} className="flex items-center gap-2">
          <Save size={16} />
          <span>Export Charts</span>
        </Button>
      </div>
    </div>
  );
}
