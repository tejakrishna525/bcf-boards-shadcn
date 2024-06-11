import React from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from './ui/skeleton';// Adjusted import

function SkeletonCard() {
  return (
    <Skeleton color="#e0e0e0">
      <Card className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col">
        <CardHeader className='h-20 w-full flex-grow'>
          <Skeleton className='h-10 w-3/4 bg-gray-300' />
        </CardHeader>
        <CardContent className='w-full h-32'>
          <Skeleton className='h-12 w-3/4 bg-gray-300' />
          <Skeleton className='h-12 w-3/4 mt-4 bg-gray-300' />
        </CardContent>
        <CardFooter className='mt-auto'>
          <Skeleton className='py-2 px-4 bg-gray-300 rounded' />
        </CardFooter>
      </Card>
    </Skeleton>
  );
}

export default SkeletonCard;
