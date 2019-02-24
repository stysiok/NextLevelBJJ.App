export const graphQLFetch = async(query) => {
    try {
        let response = await fetch('http://nextlevelbjjtest.azurewebsites.net/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 query: query
            })
        });

        return await response.json();

    } catch (error) {
        console.log(error);
    }
};