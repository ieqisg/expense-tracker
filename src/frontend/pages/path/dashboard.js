import { Navigate } from "react-router-dom";
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

  const name = user?.firstname ?? "";
  const sourceIncome = user?.sourceIncome ?? "";
  const monthlyIncome = user?.monthlyIncome ?? 0;



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
        <h1>Welcome, {name} </h1>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
          </form>
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
            <div className="text-2xl font-bold text-green-600">
              <h1>30,000</h1>
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
                monthlyIncome > 0
                  ? "text-2xl font-bold text-green-600"
                  : "text-2xl font-bold text-red-600"
              }
            >
              <h1>₱{monthlyIncome - 60000}</h1>
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
            <div className="text-2xl font-bold text-green-600 h-64">
              <h1>₱{monthlyIncome.toLocaleString()}</h1>
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
