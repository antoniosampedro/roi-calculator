
import { useTransaction } from "../contexts/TransactionContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Check, X, PlusSquare, Calendar, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { TransactionGoal, TransactionGoalType } from "@/types/calculator";
import { format } from 'date-fns';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export function TransactionGoals() {
  const { goals, addGoal, updateGoal, removeGoal } = useTransaction();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<TransactionGoal>({
    id: `goal-${Date.now()}`,
    type: 'statements',
    title: 'New Goal',
    from: 10,
    to: 20,
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    isCustom: true
  });

  const handleSaveEdit = (index: number, goal: TransactionGoal) => {
    updateGoal(index, goal);
    setEditIndex(null);
  };

  const handleAddGoal = () => {
    addGoal({...newGoal, id: `goal-${Date.now()}`});
    setIsAddingGoal(false);
    // Reset new goal form
    setNewGoal({
      id: `goal-${Date.now()}`,
      type: 'statements',
      title: 'New Goal',
      from: 10,
      to: 20,
      targetDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      isCustom: true
    });
  };

  const goalTypeOptions = [
    { value: 'statements', label: 'Number of Statements' },
    { value: 'reconciled', label: 'Reconciled Statements' },
    { value: 'credits', label: 'Target Credits' },
    { value: 'invoices', label: 'Target Missing Invoices' },
  ];

  // Calculate progress for visual indicators
  const calculateProgress = (goal: TransactionGoal) => {
    const now = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(goal.targetDate);
    
    const totalDays = Math.ceil((targetDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (remainingDays <= 0) return 100;
    if (totalDays <= 0) return 100;
    
    const progress = Math.max(0, Math.min(100, ((totalDays - remainingDays) / totalDays) * 100));
    return progress;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Goals</h2>
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <PlusSquare className="h-4 w-4" />
              <span>Add Your Own</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goalType">Goal Type</Label>
                <Select 
                  value={newGoal.type} 
                  onValueChange={(value) => setNewGoal({...newGoal, type: value as TransactionGoalType})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Goal Types</SelectLabel>
                      {goalTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    type="number"
                    min="0"
                    value={newGoal.from}
                    onChange={(e) => setNewGoal({...newGoal, from: parseInt(e.target.value) || 0})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    type="number"
                    min="0"
                    value={newGoal.to}
                    onChange={(e) => setNewGoal({...newGoal, to: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={format(newGoal.targetDate, 'yyyy-MM-dd')}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date();
                    setNewGoal({...newGoal, targetDate: date});
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {goals.map((goal, index) => (
          <Card key={goal.id} className={goal.isCustom ? 'border-blue-500' : ''}>
            <CardContent className="pt-4">
              {editIndex === index ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`goal-${index}-title`}>Goal Title</Label>
                    <Input
                      id={`goal-${index}-title`}
                      value={goal.title}
                      onChange={(e) => {
                        const updatedGoal = {...goal, title: e.target.value};
                        updateGoal(index, updatedGoal);
                      }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`goal-${index}-from`}>From</Label>
                      <Input
                        id={`goal-${index}-from`}
                        type="number"
                        min="0"
                        value={goal.from}
                        onChange={(e) => {
                          const updatedGoal = {...goal, from: parseInt(e.target.value) || 0};
                          updateGoal(index, updatedGoal);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`goal-${index}-to`}>To</Label>
                      <Input
                        id={`goal-${index}-to`}
                        type="number"
                        min="0"
                        value={goal.to}
                        onChange={(e) => {
                          const updatedGoal = {...goal, to: parseInt(e.target.value) || 0};
                          updateGoal(index, updatedGoal);
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`goal-${index}-date`}>Target Date</Label>
                    <Input
                      id={`goal-${index}-date`}
                      type="date"
                      value={format(new Date(goal.targetDate), 'yyyy-MM-dd')}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : new Date();
                        const updatedGoal = {...goal, targetDate: date};
                        updateGoal(index, updatedGoal);
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setEditIndex(null)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleSaveEdit(index, goal)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{goal.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <span>From {goal.from}</span>
                        <ArrowRight className="h-4 w-4 mx-2" />
                        <span>To {goal.to}</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setEditIndex(index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeGoal(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        By {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                      </div>
                      <span className="text-muted-foreground">
                        {Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </span>
                    </div>
                    <Progress value={calculateProgress(goal)} className="h-2" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {goals.length === 0 && (
          <div className="text-center p-4 text-muted-foreground">
            No goals set. Click "Add Your Own" to create goals.
          </div>
        )}
      </div>
    </div>
  );
}
