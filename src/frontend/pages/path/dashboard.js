import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../../Auth/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../../components/ui/select";

import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { TrendingDown, TrendingUp, PlusCircle } from "lucide-react";

export function Dashboard() {
  const [error, setError] = useState("");
  const { session, signOut } = UserAuth();
  const [user, setUser] = useState(null);
  const [popoupTransaction, setPopupTransaction] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState();
  const [balance, setBalance] = useState()
  const [differenceBalance, setDifferenceBalance] = useState()

  const [formData, setFormData] = useState({
    transactionType: "",
    category: "",
    amount: 0,
    description: "",
  });

  const name = user?.firstname ?? "";
  const sourceIncome = user?.sourceIncome ?? "";
  const monthlyIncome = user?.monthlyIncome ?? 0;
  const transactions = user?.transactions ?? [];
  const authUserId = user?.authUserId ?? "";

  useEffect(() => {
    if (!session) return;
    
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/details/me",
          {
            params: { authUserId: session.user.id },
          }
        );
        setUser(data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [session]);

  useEffect(() => {
    const amounts = transactions.map((tx) => tx.amount);
    const sum = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    setTotalExpenses(sum.toLocaleString())

    const difference = monthlyIncome - sum
    setBalance(difference.toLocaleString())
    setDifferenceBalance(difference)
  }, [transactions], [monthlyIncome]);
  

  const handleFormSubmit = async () => {
    
    setPopupTransaction(false);

    try {
      const payload = {
        type: formData.transactionType,
        category: formData.category,
        amount: formData.amount,
        description: formData.description,
      };

      const response = await axios.patch(
        "http://localhost:5001/api/transactions/" + authUserId,
        payload
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSignout = async () => {
    try {
      await signOut();
      Navigate("/");
    } catch (err) {
      setError("An unexpeceted error occured.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 p-5">
      <div className="flex justify-between text-3xl  ">
        <h1 className="hidden sm:block">Dashboard</h1>
        <Button onClick={handleSignout}>Logout</Button>
        <h1>Welcome, {name} </h1>
        <Dialog open={popoupTransaction} onOpenChange={setPopupTransaction}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-2">
                <Label htmlFor="type"> Type</Label>
                <Select
                  value={formData.transactionType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, transactionType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Expense" />
                  </SelectTrigger>
                  <SelectContent className="text-white">
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expenses">Expenses</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <div>
                    {formData.transactionType === "Expenses" ? (
                      <SelectContent>
                        <SelectItem value="Bills">Bills & Utilities</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Grocery">Grocery</SelectItem>
                        <SelectItem value="Transportation">
                          Transportation
                        </SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    ) : (
                      <SelectContent placeholder="Select Category">
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Gift">Gift</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    )}
                  </div>
                </Select>
                <Label htmlFor="Amount">Amount</Label>
                <Input
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      amount: Number(e.target.value),
                    }))
                  }
                  placeholder="0"
                  type="Number"
                ></Input>
                <Label htmlFor="Description">Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: String(e.target.value),
                    }))
                  }
                  placeholder="Enter Description"
                  type="Text"
                ></Input>
              </div>
              <Button className="w-full mt-10">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <h1>₱{monthlyIncome.toLocaleString()}</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              Source of Income: {sourceIncome}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              <h1>₱{totalExpenses}</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Balance: </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div
              className={
                differenceBalance > 0
                  ? "text-2xl font-bold text-green-600"
                  : "text-2xl font-bold text-red-600"
              }
            >
              <h1>₱{balance}</h1>
            </div>
            <p className="text-xs text-muted-foreground">Tite</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
            <CardTitle className="text-lg font-medium">
              Income vs Expenses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <h1>Chart</h1>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-">
            <CardTitle className="text-lg font-medium">
              Recent Transactions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <ul>
              {transactions.map((item, index) => (
                <div key={index}>
                  <li>{item.type}</li>
                  <li>{item.category}</li>
                  <li>₱{item.amount.toLocaleString()}</li>
                  <li>{item.description}</li>
                  <hr className="" />
                </div>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
