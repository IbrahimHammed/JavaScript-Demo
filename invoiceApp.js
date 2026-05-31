// This line is used to import the prompt-sync module, which allows us to get user input from the console
const prompt = require('prompt-sync')();

// This line is used to import the fs module, which allows us to work with the file system (e.g., read/write files)
// fs means file system, and it is a built-in module in Node.js that provides functions for working with files and directories.
const fs = require('fs');

// Global products array
let products = [];
let stockItems = [];

function addProducts() {
    let addMore = "yes";
    while (addMore.toLowerCase() === "yes") {
        // Define a blank product object
        let product = {};

        // Prompt user for product properties
        product.Code = prompt("Enter product code: ");
        product.Name = prompt("Enter product name: ");
        product.CostPrice = parseFloat(prompt("Enter cost price: "));
        product.SellingPrice = parseFloat(prompt("Enter selling price: "));

        // Add the product object to the products array
        products.push(product);

        console.log();
        console.log("Product added successfully!");
        console.log(product);
        console.log();
        console.table(products);
        console.log();
        addMore = prompt("Do you want to add another product? (yes/no): ");
    }

    // Save products to products.json file
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log("Products saved to products.json.");
}

// Function to set up products
function productSetup() {
    console.log("You have selected the module for Product setup.");
    console.log();
    
    // Open products.json file and read existing products if it exists    
    if (fs.existsSync('products.json')) {
        const data = fs.readFileSync('products.json');
        
        // Check if file is not empty before parsing
        if (data.length > 0) {
            // Parse the JSON data and load it into the products array
            products = JSON.parse(data);

            console.log("Existing products loaded from products.json:");

            // display products in a table format
            console.table(products);

            // prompt for more products
            let addMore = prompt("Do you want to add more products? (yes/no): ");
            if (addMore.toLowerCase() === "yes") {
                addProducts();
            }
        } else {
            // prompt user to add products if file is empty
            console.log("No products found in products.json. Please add products.");
            addProducts();
        }
    } else {
        console.log("products.json file not found. Please add products.");
        addProducts();
    }
}


// Function to handle invoicing
function invoicing() {
    // Invoicing code goes here
    console.log("Invoicing selected.");

    // Check if there is a customer waiting for a transaction
    let reply = prompt("Is there a customer waiting for a transaction? (yes/no): ");

    while (reply.toLowerCase() !== "yes" && reply.toLowerCase() !== "no") {
        console.log("Invalid input. Please enter 'yes' or 'no'.");
        reply = prompt("Is there a customer waiting for a transaction? (yes/no): ");
    }

    // If valid response go ahead with invoicing process
    if (reply.toLowerCase() === "yes") {
        let customerName = prompt("Enter customer name: ");
        let customeMobile = prompt("Enter customer mobile number: ");
        let customerEmail = prompt("Enter customer email: ");
        let customerGender = prompt("Enter customer gender: ");

        console.log();
        // Display products for selection
        console.log("Available products:");
        console.table(products);
        console.log();
        let productCode = prompt("Enter product code to purchase: ");

        // Find the product by code
        let selectedProduct = products.find(p => p.Code === productCode);
        if (selectedProduct) {
            let quantity = parseInt(prompt("Enter quantity to purchase: "));
            let totalCost = selectedProduct.SellingPrice * quantity;
            console.log();
        } else {
            console.log("Invalid product code. Please try again.");
        }
    } else {
        console.log("No customer waiting for a transaction. Returning to main menu.");
    }
}

// Function for Inventory Management
function inventoryManagement() {
    console.log("Inventory Management selected.");
    // Inventory management code goes here
    // check if products.json file exists and load products
    if (fs.existsSync('products.json')) {
        const data = fs.readFileSync('products.json');
        if (data.length > 0) {
            products = JSON.parse(data);
            console.log("Existing products loaded from products.json:");
            console.table(products);

            console.log();

            // prompt for existing stock items
            let addMore = prompt("Do you want to add stock items? (yes/no): ");
            if (addMore.toLowerCase() === "yes") {
                // code to add stock items goes here
                // get product code for stock item
                let productCode = prompt("Enter product code for stock item: ");
                let product = products.find(p => p.Code === productCode);
                if (product) {
                    let quantity = parseInt(prompt("Enter quantity of stock item: "));
                    let purchaseDate = prompt("Enter purchase date (YYYY-MM-DD): ");
                    let SupplierName = prompt("Enter supplier name: ");

                    // Create stock item object and add to stockItems array
                    let stockItem = {
                        ProductCode: productCode,
                        Quantity: quantity,
                        PurchaseDate: purchaseDate,
                        SupplierName: SupplierName
                    };
                    
                    stockItems.push(stockItem);
                    console.log("Stock item added successfully!");
                    console.table(stockItems);
                } else {
                    console.log("Invalid product code. Please try again.");
                }

                // prompt to add more stock items
                addMore = prompt("Do you want to add more stock items? (yes/no): ");
                if (addMore.toLowerCase() === "yes") {
                    // code to add more stock items goes here (can be a loop or recursive call)
                    // For simplicity, we can call the inventoryManagement function again to add more stock items
                    inventoryManagement();
                }
                else {
                    // write stock items to stock.json file
                    fs.writeFileSync('stock.json', JSON.stringify(stockItems, null, 2));
                    console.log("Stock items saved to stock.json.");

                    // display stock items in a table format
                    console.table(stockItems);

                    // send user to main menu after managing inventory
                    console.log("Returning to main menu...");

                }
            }
        } else {
            console.log("No products found in products.json. Please set up products first.");
        }
    } else {
        console.log("products.json file not found. Please set up products first.");
        productSetup();
    }
}


// Function to generate management report
function managementReport() {
    console.log("Management Report selected.");
    // Management report code goes here
}


// Create a welcome banner showing the name of the program and the author
console.log()
// Draw a line with *
console.log("*".repeat(100));
console.log(" ".repeat(40) + "Welcome to the Invoice App!");
// Draw a line with *
console.log("*".repeat(100));
console.log();

// Console for tasks available in the program
console.log("Please select an option:");
console.log();
console.log("1. Product setup");
console.log("2. Inventory Management");
console.log("3. Invoicing");
console.log("4. Management Report");
console.log("5. Exit");
console.log();

let choice = prompt("Select an option (1-5): ");

while (choice !== "5") {
    if (choice === "1") {
        // Call product setup function here
        productSetup();
    } else if (choice === "2") {
        console.log("Inventory Management selected.");
        // Call inventory management function here
        inventoryManagement();
    } else if (choice === "3") {
        console.log("Invoicing selected.");
        // Call invoicing function here
        invoicing();
    } else if (choice === "4") {
        console.log("Management Report selected.");
        // Call management report function here
        managementReport();
    } else {
        console.log("Invalid choice. Please enter 1, 2, 3, 4, or 5.");
    }

    console.log();
    choice = prompt("Select an option (1-5): ");
    console.log();
}

console.log("Thank you for using the Invoice App. Goodbye!");