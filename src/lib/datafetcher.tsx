export interface BcfBoard {
  id: number;
  name: string;
  createdAt: string;
}

export interface Bcf {
  id: number;
  name: string;
  createdAt: string;
  bcfBoards: BcfBoard[];
}

export interface Board {
  id: number;
  name: string;
  createdAt: string;
  bcfs: Bcf[];
}

export interface Prompt {
  id: number;
  name: string;
  createdAt: string;
}

export async function getItems(): Promise<{ boards: Board[], prompts: Prompt[] }> {
  try {
    const result = await fetch('/api/items');
    const data = await result.json();
    return {
      boards: Array.isArray(data.boards) ? data.boards : [],
      prompts: Array.isArray(data.prompts) ? data.prompts : []
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return { boards: [], prompts: [] };
  }
}
