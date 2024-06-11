"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Sidebar() {
  const [boardsData, setBoardsData] = useState<{
    id: number;
    name: string;
    createdAt: string;
    bcfs: {
      id: number;
      name: string;
      createdAt: string;
      bcfBoards: {
        id: number;
        name: string;
        createdAt: string;
      }[];
    }[];
  }[]>([]);
  

  useEffect(() => {
    // Mock API call to fetch data
    const mockApiResponse = {
      "boards": [
        {
          "id": 1,
          "name": "Use case 1",
          "createdAt": "2022-07-13T07:10:02.729Z",
          "bcfs": [
            {
              "id": 2,
              "name": "BCF 1",
              "createdAt": "2022-07-13T07:10:02.729Z",
              "bcfBoards": [
                {
                  "id": 34,
                  "name": "BCF Board 1",
                  "createdAt": "2022-07-13T07:10:02.729Z"
                },
                {
                  "id": 35,
                  "name": "BCF Board 2",
                  "createdAt": "2022-07-14T08:20:15.123Z"
                }
              ]
            },
            {
              "id": 3,
              "name": "BCF 2",
              "createdAt": "2022-07-15T09:30:45.567Z",
              "bcfBoards": [
                {
                  "id": 36,
                  "name": "BCF Board 3",
                  "createdAt": "2022-07-16T10:40:30.987Z"
                }
              ]
            }
          ]
        },
        {
          "id": 4,
          "name": "Use case 2",
          "createdAt": "2022-07-17T11:50:55.321Z",
          "bcfs": [
            {
              "id": 5,
              "name": "BCF 3",
              "createdAt": "2022-07-18T12:01:10.234Z",
              "bcfBoards": [
                {
                  "id": 37,
                  "name": "BCF Board 4",
                  "createdAt": "2022-07-19T13:15:40.876Z"
                },
                {
                  "id": 38,
                  "name": "BCF Board 5",
                  "createdAt": "2022-07-20T14:25:05.432Z"
                }
              ]
            }
          ]
        }
      ]
    };

    setBoardsData(mockApiResponse.boards);
  }, []);

  return (
    <div className="bg-purple-600 w-1/3 h-screen border-r p-4   flex flex-col  space-y-6 p-4 text-white">
      <Accordion type="single" collapsible className="border border-white rounded-md">
        {boardsData.map((board) => (
          <AccordionItem key={board.id} value={`board-${board.id}`}>
            <AccordionTrigger className="bg-purple-400 text-white border-b border-white p-2 rounded-t-md">
              {board.name}
            </AccordionTrigger>
            <AccordionContent className="bg-purple-400 text-white border-t border-white p-2 rounded-b-md">
              <ul>
                {board.bcfs.map((bcf) => (
                  <li key={bcf.id}>{bcf.name}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
