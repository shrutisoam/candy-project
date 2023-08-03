const apiUrl = 'http://localhost:12000/candies';

// Function to fetch all candies and update the table
function fetchCandies() {
    axios.get(apiUrl)
        .then(response => {
            const candies = response.data;
            const candyTable = document.getElementById('candyTable');
            candyTable.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            `;

            candies.forEach(candy => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${candy.name}</td>
                    <td>${candy.description || ''}</td>
                    <td>${candy.price !== undefined ? candy.price.toFixed(2) : ''}</td>
                    <td>${candy.quantity !== undefined ? candy.quantity : ''}</td>
                    <td>
                      
                        <button onclick="deleteCandy(${candy.id})">Delete</button>
                        
                        <button onclick="buyCandy(${candy.id}, 'Buy 1')">Buy 1</button>
                        <button onclick="buyCandy(${candy.id}, 'Buy 2')">Buy 2</button>
                        <button onclick="buyCandy(${candy.id}, 'Buy 3')">Buy 3</button>
                        

                    </td>
                `;
                candyTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching candies:', error));
}

// Function to handle adding a new candy
function addCandy() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    const candy = { name, description, price, quantity };

    axios.post(apiUrl, candy)
        .then(response => {
            console.log('Candy added:', response.data);
            fetchCandies();
            document.getElementById('addCandyForm').reset();
        })
        .catch(error => console.error('Error adding candy:', error));
}

// Function to handle buying candies
function buyCandy(candyId, buttonType) {
    let quantityToBuy;
    if (buttonType === 'Buy 1') {
      quantityToBuy = 1;
    } else if (buttonType === 'Buy 2') {
      quantityToBuy = 2;
    } else if (buttonType === 'Buy 3') {
      quantityToBuy = 3;
    } else {
      console.error('Invalid buttonType:', buttonType);
      return;
    }
  
    axios
      .post(`${apiUrl}/${candyId}/buy`, { quantityToBuy })
      .then((response) => {
        console.log('Candy bought:', response.data);
        fetchCandies();
      })
      .catch((error) => console.error('Error buying candy:', error));
  }
  



// Function to handle deleting a candy
function deleteCandy(candyId) {
    axios.delete(`${apiUrl}/${candyId}`)
        .then(response => {
            console.log('Candy deleted:', response.data);
            fetchCandies();
        })
        .catch(error => console.error('Error deleting candy:', error));
}

// Attach event listener to the form submission
document.getElementById('addCandyForm').addEventListener('submit', event => {
    event.preventDefault();
    addCandy();
});

// Initial fetch of candies when the page loads
fetchCandies();
