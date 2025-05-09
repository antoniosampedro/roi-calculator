
import { Button } from "@/components/ui/button";
import { useCalculator } from "../contexts/CalculatorContext";
import { Download, Save } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ExportMenu() {
  const { results } = useCalculator();

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            <span>Download PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportImage} className="cursor-pointer">
            <Save className="h-4 w-4 mr-2" />
            <span>Export Charts</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
