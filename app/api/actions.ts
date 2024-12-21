export async function fetchData(endpoint: string): Promise<any[]> {
    const response = await fetch(`https://localhost:44376/api/${endpoint}`);
    if (!response.ok) {
        console.error(`Failed to fetch data: ${response.statusText}`);
    }
    return  response.json() ;
}
