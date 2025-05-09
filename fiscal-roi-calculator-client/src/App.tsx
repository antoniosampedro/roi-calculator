
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import CalculatorSelection from "./pages/CalculatorSelection";
import StatementRecPage from "./pages/StatementRecPage";
import TransactionsPage from "./pages/TransactionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelectionPage />} />
          <Route path="/calculators" element={<CalculatorSelection />} />
          <Route path="/statement-rec" element={<StatementRecPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
