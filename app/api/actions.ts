export async function fetchData(endpoint: string): Promise<any[]> {
    const response = await fetch(`https://localhost:44376/api/${endpoint}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json() as any[];
}
