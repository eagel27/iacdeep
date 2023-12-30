function fetchNasaAdsPapers() {
	const apiUrl = 'https://api.adsabs.harvard.edu/v1/search/query';
	const apiToken = 'uuDw2qna1C55d2RhI9KahR47cv4X8zxMnPVqYOoR';
	
	const queryParams = {
	    author: 'angeloudi',
	    fl: 'title,bibcode',
	};
	
	// Convert query parameters to a URL-encoded string
	const queryString = new URLSearchParams(queryParams).toString();
	
	// Append query string to the API endpoint
	const fullUrl = `${apiUrl}?${queryString}`;
	
	fetch(fullUrl, {
	    headers: {
	        'Authorization': `Bearer ${apiToken}`,
	        'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'https://eagel27.github.io/iacdeep/'
	    },
	})
	    .then(response => {
	        // Log the entire response to the console
	        console.log('API Response:', response);
	
	        // Check if the response status is OK (200)
	        if (!response.ok) {
	            throw new Error(`HTTP error! Status: ${response.status}`);
	        }
	
	        return response.json();
	    })
	    .then(data => {
	        // Call function to display data
	        displayData(data);
	    })
	.catch(error => console.error('Error fetching data:', error));
}



// Function to display data on the page
function displayData(data) {
        // Select the data container element
        const dataContainer = document.getElementById('data-container');

        // Clear previous content
        dataContainer.innerHTML = '';

        // Create elements to display the data
        //const title = document.createElement('h2');
        //title.textContent = 'Data from API';

        const list = document.createElement('ul');

        data = data.response.docs;
        console.log('DATA:', data);

        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Title:</strong> ${item.title}, <strong>Bibcode:</strong> ${item.bibcode}`;
            list.appendChild(listItem);
        });

        // Append elements to the data container
        //dataContainer.appendChild(title);
        dataContainer.appendChild(list);
}


