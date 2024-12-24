export async function fetchData(endpoint: string): Promise<any[]> {
  try{
      const response = await fetch(`http://localhost:5007/api/${endpoint}`);
      if (!response.ok) {
          console.error(`Failed to fetch data: ${response.statusText}`);
          return [];
      }
      return  response.json() ;
  }catch(e){
      return [];
  }

}
export async function postData(endpoint: string, data:  string ): Promise<any> {
    try {
        const response = await fetch(`http://localhost:5007/api/${endpoint}`, {
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

export async function DeleteData(endpoint: string,key:any) {
    const response = await fetch(`http://localhost:5007/api/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(key),

    });

    if (!response.ok) {
        const responseBody = await response.text();
        console.error(`Failed to Delete data: ${response.status} - ${responseBody}`);
        return null;
    }

    return response;
}
