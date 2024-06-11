"use server";
import axios from 'axios';
import { NextResponse } from 'next/server';
import https from 'https';

// Create an https agent that ignores SSL certificate errors
const agent = new https.Agent({  
  rejectUnauthorized: false
});

export async function GET() {
  try {
    console.log("API endpoint hit");

    // Fetch boards data
    const boardsResponse = await axios.get('https://demo6396395.mockable.io/bcf-boards', {
      httpsAgent: agent, // Use the agent that ignores SSL certificate errors
    });
    console.log("Fetched boards data response:", boardsResponse.status);

    // Fetch prompts data
    const promptsResponse = await axios.get('https://demo6396395.mockable.io/prompts', {
      httpsAgent: agent, // Use the agent that ignores SSL certificate errors
    });
    console.log("Fetched prompts data response:", promptsResponse.status);

    if (boardsResponse.status !== 200) {
      throw new Error(`Failed to fetch boards data: ${boardsResponse.statusText}`);
    }

    if (promptsResponse.status !== 200) {
      throw new Error(`Failed to fetch prompts data: ${promptsResponse.statusText}`);
    }

    const boards = Array.isArray(boardsResponse.data.boards) ? boardsResponse.data.boards : [];
    const prompts = Array.isArray(promptsResponse.data) ? promptsResponse.data : [];

    console.log("Returning response with boards and prompts");
    return NextResponse.json({ boards, prompts });
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
