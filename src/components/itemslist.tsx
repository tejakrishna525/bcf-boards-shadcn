import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Board, Prompt } from "@/lib/datafetcher";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"; // Assuming Input component is available
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ItemListProps {
  data: { boards: Board[]; prompts: Prompt[] };
}

const ItemList: React.FC<ItemListProps> = ({ data }) => {
  const [hydrated, setHydrated] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setHydrated(true);
    filterPromptsByDate("today");
  }, []);

  const { prompts } = data;
  console.log("prompsts", prompts);

  const filterPromptsByDate = (filter: string) => {
    const today = new Date();
  
    let filteredPrompts: Prompt[] = [];
  
    switch (filter) {
      case "today":
        filteredPrompts = prompts.filter(
          (prompt) =>
            new Date(prompt.createdAt).getDate() === today.getDate() &&
            new Date(prompt.createdAt).getMonth() === today.getMonth() &&
            new Date(prompt.createdAt).getFullYear() === today.getFullYear()
        );
        break;
      case "week":
        const weekStartDate = new Date(today);
        weekStartDate.setDate(today.getDate() - today.getDay()); // Start of the week (assuming Sunday is 0)
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 6); // End of the week
        filteredPrompts = prompts.filter(
          (prompt) =>
            new Date(prompt.createdAt) >= weekStartDate &&
            new Date(prompt.createdAt) <= weekEndDate
        );
        break;
      case "month":
        const monthStartDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
        const monthEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month
        filteredPrompts = prompts.filter(
          (prompt) =>
            new Date(prompt.createdAt) >= monthStartDate &&
            new Date(prompt.createdAt) <= monthEndDate
        );
        break;
      default:
        filteredPrompts = prompts;
    }
  
    setFilteredPrompts(filteredPrompts);
  };
  
  

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    filterPromptsByDate(filter);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredPrompts = prompts.filter((prompt) =>
      prompt.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPrompts(filteredPrompts);
  };

  const BarChart = () => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"], // Example labels
      datasets: [
        {
          data: [65, 59, 80, 81, 56], // Replace this with your actual data
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          categoryPercentage: 1.0,
          barPercentage: 1.0,
          // borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          grid: {
            //drawOnChartArea: false,
            display: false,
          },
        },
        y: {
          grid: {
            // drawOnChartArea: false,
            display: false,
          },
        },
      },
      tooltips: {
        minCategoryMargin: 2, // Adjust this to remove space between bars
      },
    };

    // Return the data object along with the options
    return { data, options };
  };

  if (!hydrated) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!Array.isArray(prompts) || prompts.length === 0) {
    return <p className="text-center text-gray-500">No items available.</p>;
  }

  return (
    <div className="space-y-6 p-4 margin-2">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 w-full p-3">
          <div className="w-full">
            <Input
              placeholder="Search prompts"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleFilterChange("today")}
              className={`${
                selectedFilter === "today"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-md`}
            >
              Today
            </button>
            <button
              onClick={() => handleFilterChange("week")}
              className={`${
                selectedFilter === "week"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-md`}
            >
              Week
            </button>
            <button
              onClick={() => handleFilterChange("month")}
              className={`${
                selectedFilter === "month"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-md`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col"
            style={{ width: "100%", height: "100%" }}
          >
            <CardHeader>
              <CardTitle>{prompt.name}</CardTitle>
              <CardDescription>
                {new Date(prompt.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Bar
                className="w-full h-full"
                data={BarChart().data}
                options={BarChart().options}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
