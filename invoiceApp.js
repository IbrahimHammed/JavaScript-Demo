const prompt = require('prompt-sync')();

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
        console.log("Product setup selected.");
        // Call product setup function here
        console.log();
        // Prompt user to enter product details
        products = [];
        let addMore = "yes";
        product = {};

        while (addMore.toLowerCase() === "yes") {
            product.Code = prompt("Enter product code: ");
            product.Name = prompt("Enter product name: ");
            product.Category = parseInt(prompt("Enter product category: "));
            product.CostPrice = parseFloat(prompt("Enter product cost price: "));
            product.SellingPrice = parseFloat(prompt("Enter product selling price: "));

            products.push(product);

            addMore = prompt("Do you want to add another product? (yes/no): ");
        }
        console.log();
        console.log("Products added successfully!");
        console.table(products);

    } else if (choice === "2") {
        console.log("Inventory Management selected.");
        // Call inventory management function here
    } else if (choice === "3") {
        console.log("Invoicing selected.");
        // Call invoicing function here
    } else if (choice === "4") {
        console.log("Management Report selected.");
        // Call management report function here
    } else {
        console.log("Invalid choice. Please enter 1, 2, 3, 4, or 5.");
    }

    console.log();
    choice = prompt("Select an option (1-5): ");
    console.log();
}

console.log("Thank you for using the Invoice App. Goodbye!");