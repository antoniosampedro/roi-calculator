
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function KeyAssumptions() {
  return (
    <Card className="bg-slate-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Key Assumptions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">
          FISCAL have decades of services experience, we use this in our ROI calculator with the following assumptions
        </p>
        <Table>
          <TableBody className="text-sm">
            <TableRow>
              <TableCell>1 in 3 supplier statements has an error</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>On average 1 in 9 statements have unclaimed credits*</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>On average statements with unclaimed credits, have upto £9,600 of unclaimed credits*</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FISCAL provides upto 12X greater reconciliation efficiency vs manual processing</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="text-xs italic pt-4">
                *Typical for the top 250 suppliers, calculations adapt as more statements are reconciled
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
