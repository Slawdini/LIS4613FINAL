// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gameing',
  database: 'inventory_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CRUD operations for products

// POST new product
app.post('/api/products', (req, res) => {
    const { name, description, price } = req.body;
    const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
    connection.query(query, [name, description, price], (err, result) => {
      if (err) {
        console.error('Error adding product:', err);
        res.status(500).send('Error adding product');
        return;
      }
      res.send('Product added successfully');
    });
  });
  

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, price } = req.body;
  const query = 'UPDATE products SET name=?, description=?, price=? WHERE id=?';
  connection.query(query, [name, description, price, productId], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).send('Error updating product');
      return;
    }
    res.send('Product updated successfully');
  });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM products WHERE id=?';
  connection.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
      return;
    }
    res.send('Product deleted successfully');
  });
});

// GET all products
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
