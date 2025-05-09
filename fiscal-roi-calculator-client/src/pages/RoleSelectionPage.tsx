
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, UserRound, Calculator, FileText } from "lucide-react";

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-fiscal-purple mb-2">FISCAL ROI Calculator</h1>
          {!selectedRole ? (
            <p className="text-muted-foreground">Select your role to continue</p>
          ) : (
            <p className="text-muted-foreground">
              Selected role: <span className="font-medium">{selectedRole === "sales" ? "Sales Person" : "Customer Success Manager"}</span>
              <Button 
                variant="link" 
                className="text-sm ml-2 p-0 h-auto" 
                onClick={() => setSelectedRole(null)}
              >
                Change
              </Button>
            </p>
          )}
        </div>
        
        {/* Role Selection - Always visible but highlighted when selected */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedRole === "sales" ? "ring-2 ring-fiscal-purple" : ""}`}
              onClick={() => setSelectedRole("sales")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-fiscal-purple" />
                  Sales Person
                </CardTitle>
                <CardDescription>
                  View ROI calculations optimized for sales presentations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Access ROI calculators with sales-focused metrics, financial projections,
                  and customer-facing visualizations to help close deals.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${selectedRole === "csm" ? "ring-2 ring-fiscal-purple" : ""}`}
              onClick={() => setSelectedRole("csm")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-fiscal-purple" />
                  Customer Success Manager
                </CardTitle>
                <CardDescription>
                  View ROI calculations optimized for customer success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Access ROI calculators with implementation timelines, efficiency metrics,
                  and detailed operational insights to drive customer value.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calculator Selection - Only enabled after role is selected */}
        <div className={selectedRole ? "" : "opacity-50 pointer-events-none"}>
          <h2 className="text-xl font-bold mb-4">Select a Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-fiscal-purple" />
                  Statement Reconciliation
                </CardTitle>
                <CardDescription>
                  Calculate ROI for automated statement reconciliation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The Statement Reconciliation module helps identify duplicate payments,
                  missing invoices, and streamline reconciliation processes.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full" 
                  disabled={!selectedRole}
                >
                  <Link to={selectedRole ? `/statement-rec?role=${selectedRole}` : "#"}>
                    Open Calculator
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-fiscal-purple" />
                  Transaction Analysis
                </CardTitle>
                <CardDescription>
                  Calculate ROI for automated transaction monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The Transaction Analysis module helps detect fraud, reduce errors,
                  and ensure compliance in payment processes.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className="w-full" 
                  disabled={!selectedRole}
                >
                  <Link to={selectedRole ? `/transactions?role=${selectedRole}` : "#"}>
                    Open Calculator
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoleSelectionPage;
