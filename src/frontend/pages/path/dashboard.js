import { Link, Navigate } from "react-router-dom";
import { UserAuth } from "../../Auth/AuthContext";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  Dialog,
  DialogContent,
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
} from "../../../components/ui/select";

import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { TrendingDown, TrendingUp, PlusCircle, Trash2 } from "lucide-react";

export function Dashboard() {
  const [error, setError] = useState("");
  const { session, signOut } = UserAuth();
  const [user, setUser] = useState(null);
  const [popoupTransaction, setPopupTransaction] = useState(false);
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpenses, setTotalExpenses] = useState();
  const [balance, setBalance] = useState(0);

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
  const monthlyIncomeString = monthlyIncome + totalIncome;

  useEffect(() => {
    if (!session) return;

    // fetch users data from the database that matches the authUserId
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
    const incomeAmount = transactions
      .filter((tx) => tx.type === "Income")
      .map((tx) => tx.amount);

    const expensesAmount = transactions
      .filter((tx) => tx.type === "Expenses")
      .map((tx) => tx.amount);

    const sumIncome = incomeAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const sumExpenses = expensesAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const totalBalance = monthlyIncome + sumIncome - sumExpenses;

    setBalance(totalBalance);
    setTotalIncome(sumIncome);
    setTotalExpenses(sumExpenses.toLocaleString());
  }, [transactions, monthlyIncome]);

  // update the transactions in the data when new transaction is added
  const handleFormSubmit = async () => {
    setPopupTransaction(false);
    const currentDate = new Date().toLocaleString();
    try {
      const payload = {
        type: formData.transactionType,
        category: formData.category,
        amount: formData.amount,
        description: formData.description,
        transactionDate: currentDate,
      };

      const response = await axios.patch(
        "http://localhost:5001/api/transactions/" + authUserId,
        payload
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignout = async () => {
    try {
      await signOut();
      Navigate("/");
    } catch (err) {
      setError("An unexpeceted error occured.");
    }
  };

  const handleDeleteTransaction = async (authUserId, transactionId) => {
    try {
      await axios.delete(
        "http://localhost:5001/api/transactions/" +
          authUserId +
          "/" +
          transactionId
      );
      setUser(function (prev) {
        return {
          ...prev,
          transactions: prev.transactions.filter(function (tx) {
            return tx._id !== transactionId;
          }),
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex justify-between items-center text-3xl">
        <div className="flex items-center gap-4">
          <h1 className="hidden sm:block">Dashboard</h1>
          <h1 className="hidden sm:block"></h1>
        </div>
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
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <h1>₱{monthlyIncomeString.toLocaleString()}</h1>
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
                balance > 0
                  ? "text-2xl font-bold text-green-600"
                  : "text-2xl font-bold text-red-600"
              }
            >
              <h1>₱{balance.toLocaleString()}</h1>
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
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      {/* Left side: Icon + details */}
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.type === "Income"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {item.type === "Income" ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                item.transactionDate
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                item.transactionDate
                              ).toLocaleTimeString()}
                            </p>
                            <h1></h1>
                          </div>
                        </div>
                      </div>

                      {/* Right side: Amount */}
                      <div
                        className={`font-bold flex items-center gap-3 ${
                          item.type === "Income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.type === "Income" ? "+" : "-"}₱
                        {item.amount.toLocaleString()}
                        <Trash2
                          onClick={() =>
                            handleDeleteTransaction(authUserId, item._id)
                          }
                          className="hover:cursor-pointer"
                        ></Trash2>
                      </div>
                    </div>

                    {/* Separator except for the last item */}
                    {index < transactions.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No transactions yet</p>
                <p className="text-sm">
                  Add your first transaction to get started
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
