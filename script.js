// script.js

// Function to add a new product
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: productPrice
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Product added successfully');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error adding product');
    });
}

// Function to update a product
function updateProduct() {
    const productId = document.getElementById('productIdToUpdate').value;
    const productName = document.getElementById('productNameToUpdate').value;
    const productDescription = document.getElementById('productDescriptionToUpdate').value;
    const productPrice = document.getElementById('productPriceToUpdate').value;

    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: productPrice
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Product updated successfully');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error updating product');
    });
}

// Function to delete a product
function deleteProduct() {
    const productId = document.getElementById('productIdToDelete').value;

    fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Product deleted successfully');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error deleting product');
    });
}
