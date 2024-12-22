export async function fetchData(endpoint: string): Promise<any[]> {
  try{
      const response = await fetch(`https://localhost:44376/api/${endpoint}`);
      if (!response.ok) {
          console.error(`Failed to fetch data: ${response.statusText}`);
      }
      return  response.json() ;
  }catch(e){
      return [];
  }

}
export async function postData(endpoint: string, data:  string ): Promise<any> {
    try {
        const response = await fetch(`https://localhost:44376/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const responseBody = await response.text();
            console.error(`Failed to post data: ${response.status} - ${responseBody}`);
            return null;
        }

        return response;
    } catch (e) {
        console.error('Error posting data:', e);
        return null;
    }
}


