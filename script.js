/* script.js */

/* Example functions */
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => (section.style.display = 'none'));
  document.getElementById(`${sectionId}-section`).style.display = 'block';
}

function calculatePrice() {
  const product = document.getElementById('product-select').value;
  const qty = parseFloat(document.getElementById('quantity').value);
  const result = document.getElementById('calculator-result');
  const prices = {
    wheat: 35, rice: 45, ragi: 50, corn: 40, millet: 55, pearl_millet: 48,
    sorghum: 42, rye: 60, chilli: 120, porridge: 80, idli: 50
  };
  if (product && qty > 0) {
    const total = prices[product] * qty;
    result.textContent = `Total Price: ₹${total.toFixed(2)}`;
  } else {
    result.textContent = "Select a product and quantity to calculate price";
  }
}

/* All other JavaScript from your original file continues here —
   login modal, dashboards, billing, profile updates, slot booking, etc. */

        // Sample data for products and prices
        const products = [
            { id: 'wheat', name: 'Wheat Flour', price: 35, description: 'Finely ground whole wheat flour for all your baking needs' },
            { id: 'rice', name: 'Rice Flour', price: 45, description: 'Perfect for traditional sweets and gluten-free cooking' },
            { id: 'ragi', name: 'Ragi Flour', price: 50, description: 'Highly nutritious finger millet flour rich in calcium' },
            { id: 'corn', name: 'Corn Flour', price: 40, description: 'Versatile corn flour for thickening and baking' },
            { id: 'millet', name: 'Millet Flour', price: 55, description: 'Healthy alternative with high fiber content' },
            { id: 'pearl_millet', name: 'Pearl Millet Flour', price: 48, description: 'Traditional bajra flour for rotis and porridge' },
            { id: 'sorghum', name: 'Sorghum Flour', price: 42, description: 'Jowar flour perfect for gluten-free recipes' },
            { id: 'rye', name: 'Rye Flour', price: 60, description: 'Dark, flavorful flour for hearty breads' },
            { id: 'chilli', name: 'Chilli Powder', price: 120, description: 'Spicy and flavorful homemade chilli powder' },
            { id: 'porridge', name: 'Multigrain Porridge Mix', price: 80, description: 'Nutritious homemade mix for children\'s health', unit: '500g' },
            { id: 'idli', name: 'Idli Batter', price: 50, description: 'Freshly ground idli batter for soft idlis' }
        ];

        // Sample data for customers
        const customers = [
            { id: 1, name: 'Customer One', phone: '9876543210', city: 'Flour Town', visits: 12, points: 250, balance: 350 },
            { id: 2, name: 'Customer Two', phone: '8765432109', city: 'Grain Village', visits: 8, points: 180, balance: 0 },
            { id: 3, name: 'Customer Three', phone: '7654321098', city: 'Flour Town', visits: 15, points: 320, balance: 120 }
        ];

        // Sample data for bills
        const bills = [
            { id: 'SMFM-2023-001', date: '15/07/2023', time: '10:30 AM', customer: 'Customer One', amount: 420, paid: 400, balance: 20, items: [
                { product: 'Wheat Flour', qty: 5, rate: 35, amount: 175 },
                { product: 'Rice Flour', qty: 3, rate: 45, amount: 135 },
                { product: 'Chilli Powder', qty: 1, rate: 120, amount: 120 }
            ]},
            { id: 'SMFM-2023-002', date: '10/07/2023', time: '04:15 PM', customer: 'Customer Two', amount: 380, paid: 380, balance: 0, items: [
                { product: 'Ragi Flour', qty: 4, rate: 50, amount: 200 },
                { product: 'Multigrain Porridge Mix', qty: 2, rate: 80, amount: 160 },
                { product: 'Corn Flour', qty: 0.5, rate: 40, amount: 20 }
            ]},
            { id: 'SMFM-2023-003', date: '05/07/2023', time: '11:00 AM', customer: 'Customer Three', amount: 275, paid: 200, balance: 75, items: [
                { product: 'Sorghum Flour', qty: 3, rate: 42, amount: 126 },
                { product: 'Pearl Millet Flour', qty: 2, rate: 48, amount: 96 },
                { product: 'Idli Batter', qty: 1, rate: 50, amount: 50 }
            ]}
        ];

        // Sample data for bulk orders
        const bulkOrders = [
            { id: 'BULK-001', customer: 'Local Shop', phone: '9876543210', date: '20/07/2023', items: 'Wheat Flour (50kg), Rice Flour (30kg)', amount: 3500, advance: 1500, balance: 2000, status: 'Pending' },
            { id: 'BULK-002', customer: 'Wedding Function', phone: '8765432109', date: '18/07/2023', items: 'Idli Batter (100kg), Ragi Flour (20kg)', amount: 7000, advance: 7000, balance: 0, status: 'Completed' },
            { id: 'BULK-003', customer: 'Restaurant', phone: '7654321098', date: '25/07/2023', items: 'Chilli Powder (10kg), Multigrain Mix (5kg)', amount: 1700, advance: 500, balance: 1200, status: 'Pending' }
        ];

        // Shop status and timing
        let shopStatus = 'open';
        let openingTime = '08:00';
        let closingTime = '20:00';

        // Current user
        let currentUser = null;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Set min date for booking to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('booking-date').min = today;
            document.getElementById('modal-booking-date').min = today;
            document.getElementById('bulk-date').min = today;
            document.getElementById('bill-date-input').value = today;
            document.getElementById('report-date').value = today;
            
            // Load price list
            loadPriceList();
            
            // Load sample data
            loadOrderHistory();
            loadBillHistory();
            loadBookedSlots();
            loadCustomerList();
            loadRecentTransactions();
            loadBulkOrders();
            
            // Set current date in reports
            document.getElementById('report-date').value = today;
            document.getElementById('report-start-date').value = today;
            document.getElementById('report-end-date').value = today;
            
            // Set shop status and timing
            updateShopStatusDisplay();
            
            // Load price update list for owner
            loadPriceUpdateList();
            loadProductPriceList();
            
            // Event listeners
            document.getElementById('customer-login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                customerLogin();
            });
            
            document.getElementById('owner-login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                ownerLogin();
            });
            
            document.getElementById('register-form').addEventListener('submit', function(e) {
                e.preventDefault();
                registerCustomer();
            });
            
            document.getElementById('contact-form').addEventListener('submit', function(e) {
                e.preventDefault();
                sendContactMessage();
            });
            
            document.getElementById('bill-customer-select').addEventListener('change', function() {
                if (t0his.value === 'new') {
                    document.getElementById('new-customer-fields').style.display = 'block';
                } else {
                    document.getElementById('new-customer-fields').style.display = 'none';
                }
            });
            
            document.getElementById('report-type').addEventListener('change', function() {
                if (this.value === 'custom') {
                    document.getElementById('daily-report-fields').style.display = 'none';
                    document.getElementById('custom-report-fields').style.display = 'block';
                } else {
                    document.getElementById('daily-report-fields').style.display = 'block';
                    document.getElementById('custom-report-fields').style.display = 'none';
                }
            });
            
            // Calculate bill items
            document.addEventListener('input', function(e) {
                if (e.target.classList.contains('bill-quantity') || e.target.classList.contains('bill-rate')) {
                    calculateBillItem(e.target);
                }
            });
            
            // Calculate total bill amount
            document.addEventListener('input', function(e) {
                if (e.target.id === 'bill-amount-paid') {
                    calculateBillBalance();
                }
            });
        });

        // Show section on main page
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId + '-section').style.display = 'block';
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // Show dashboard section
        function showDashboardSection(sectionId) {
            document.querySelectorAll('#customer-dashboard .main-content > div').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId + '-section').style.display = 'block';
            
            // Update title
            let title = 'Customer Dashboard';
            switch(sectionId) {
                case 'customer-overview': title = 'Customer Overview'; break;
                case 'customer-orders': title = 'My Orders'; break;
                case 'customer-billing': title = 'Billing'; break;
                case 'customer-booking': title = 'Book Slot'; break;
                case 'customer-profile': title = 'My Profile'; break;
            }
            document.getElementById('dashboard-title').textContent = title;
            
            // Update active menu item
            document.querySelectorAll('#customer-dashboard .sidebar-menu a').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Show owner section
        function showOwnerSection(sectionId) {
            document.querySelectorAll('#owner-dashboard .main-content > div').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId + '-section').style.display = 'block';
            
            // Update title
            let title = 'Owner Dashboard';
            switch(sectionId) {
                case 'owner-overview': title = 'Owner Overview'; break;
                case 'owner-billing': title = 'Billing System'; break;
                case 'owner-products': 
                    title = 'Product Management'; 
                    // Reload price data when products section is shown
                    loadPriceUpdateList();
                    loadProductPriceList();
                    break;
                case 'owner-customers': title = 'Customer Management'; break;
                case 'owner-settings': title = 'Shop Settings'; break;
                case 'owner-reports': title = 'Reports'; break;
            }
            document.getElementById('owner-dashboard-title').textContent = title;
            
            // Update active menu item
            document.querySelectorAll('#owner-dashboard .sidebar-menu a').forEach(item => {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Show login modal
        function showLoginModal() {
            document.getElementById('login-modal').style.display = 'block';
            showLoginTab('customer');
        }

        // Show register modal
        function showRegisterModal() {
            closeModal('login-modal');
            document.getElementById('register-modal').style.display = 'block';
        }

        // Show slot booking modal
        function showSlotBookingModal() {
            document.getElementById('slot-booking-modal').style.display = 'block';
            loadTimeSlots('modal-time-slots', 'modal-book-slot-btn');
        }

        // Show bulk order modal
        function showBulkOrderModal() {
            document.getElementById('bulk-order-modal').style.display = 'block';
        }

        // Close modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Show login tab
        function showLoginTab(tab) {
            if (tab === 'customer') {
                document.getElementById('customer-login').style.display = 'block';
                document.getElementById('owner-login').style.display = 'none';
                document.querySelector('#login-tabs button:first-child').style.backgroundColor = 'var(--accent-color)';
                document.querySelector('#login-tabs button:first-child').style.color = 'var(--white)';
                document.querySelector('#login-tabs button:last-child').style.backgroundColor = '#f8f9fa';
                document.querySelector('#login-tabs button:last-child').style.color = 'var(--text-color)';
            } else {
                document.getElementById('customer-login').style.display = 'none';
                document.getElementById('owner-login').style.display = 'block';
                document.querySelector('#login-tabs button:first-child').style.backgroundColor = '#f8f9fa';
                document.querySelector('#login-tabs button:first-child').style.color = 'var(--text-color)';
                document.querySelector('#login-tabs button:last-child').style.backgroundColor = 'var(--accent-color)';
                document.querySelector('#login-tabs button:last-child').style.color = 'var(--white)';
            }
        }

        // Customer login
        function customerLogin() {
            const phone = document.getElementById('customer-phone').value;
            const password = document.getElementById('customer-password').value;
            
            // Simple validation - in real app, this would check against a database
            if (phone && password) {
                currentUser = {
                    id: 1,
                    name: 'Customer One',
                    phone: phone,
                    city: 'Flour Town',
                    visits: 12,
                    points: 250,
                    balance: 350
                };
                
                // Hide main page and show customer dashboard
                document.getElementById('main-page').style.display = 'none';
                document.getElementById('customer-dashboard').style.display = 'block';
                document.getElementById('owner-dashboard').style.display = 'none';
                
                // Update customer info
                document.getElementById('customer-name').textContent = currentUser.name;
                document.getElementById('monthly-visits').textContent = currentUser.visits;
                document.getElementById('pending-balance').textContent = '₹' + currentUser.balance;
                document.getElementById('customer-points').textContent = currentUser.points;
                
                // Close modal
                closeModal('login-modal');
            } else {
                alert('Please enter phone number and password');
            }
        }

        // Owner login
        function ownerLogin() {
            const id = document.getElementById('owner-id').value;
            const password = document.getElementById('owner-password').value;
            const secretKey = document.getElementById('owner-secret-key').value;
            
            // Check secret key
            if (secretKey === '14082004') {
                // Hide main page and show owner dashboard
                document.getElementById('main-page').style.display = 'none';
                document.getElementById('customer-dashboard').style.display = 'none';
                document.getElementById('owner-dashboard').style.display = 'block';
                
                // Close modal
                closeModal('login-modal');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        }

        // Register customer
        function registerCustomer() {
            const name = document.getElementById('register-name').value;
            const phone = document.getElementById('register-phone').value;
            const city = document.getElementById('register-city').value;
            const address = document.getElementById('register-address').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, this would send data to server
            alert('Registration successful! Please login with your credentials.');
            closeModal('register-modal');
            showLoginModal();
        }

        // Logout
        function logout() {
            currentUser = null;
            document.getElementById('main-page').style.display = 'block';
            document.getElementById('customer-dashboard').style.display = 'none';
            document.getElementById('owner-dashboard').style.display = 'none';
        }

        // Calculate price
        function calculatePrice() {
            const productSelect = document.getElementById('product-select');
            const quantity = document.getElementById('quantity').value;
            const resultDiv = document.getElementById('calculator-result');
            
            if (!productSelect.value) {
                resultDiv.textContent = 'Please select a product';
                return;
            }
            
            if (!quantity || quantity <= 0) {
                resultDiv.textContent = 'Please enter a valid quantity';
                return;
            }
            
            const product = products.find(p => p.id === productSelect.value);
            const total = product.price * quantity;
            const unit = product.unit || 'kg';
            
            resultDiv.textContent = `${quantity}${unit} of ${product.name} = ₹${total}`;
        }

        // Load price list
        function loadPriceList() {
            const priceList = document.getElementById('price-list');
            priceList.innerHTML = '';
            
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>₹${product.price}/${product.unit || 'kg'}</td>
                `;
                priceList.appendChild(row);
            });
        }

        // Load price update list
        function loadPriceUpdateList() {
            const priceUpdateList = document.getElementById('price-update-list');
            priceUpdateList.innerHTML = '';
            
            products.forEach(product => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'price-update-item';
                itemDiv.innerHTML = `
                    <div class="product-name">${product.name}</div>
                    <div class="current-price">₹${product.price}/${product.unit || 'kg'}</div>
                    <input type="number" class="new-price-input" id="new-price-${product.id}" placeholder="New price" min="1" value="${product.price}">
                    <button class="update-price-btn" onclick="updateProductPrice('${product.id}')">Update</button>
                `;
                priceUpdateList.appendChild(itemDiv);
            });
        }

        // Update individual product price
        function updateProductPrice(productId) {
            const newPriceInput = document.getElementById(`new-price-${productId}`);
            const newPrice = parseFloat(newPriceInput.value);
            
            if (isNaN(newPrice) || newPrice <= 0) {
                alert('Please enter a valid price');
                return;
            }
            
            // Find the product and update its price
            const productIndex = products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                products[productIndex].price = newPrice;
                
                // Update the product price list
                loadProductPriceList();
                
                // Update the price list on customer dashboard
                loadPriceList();
                
                // Update the price calculator
                updatePriceCalculator();
                
                // Update product cards on main page
                updateProductCards();
                
                // Show success message
                showPriceUpdateSuccess();
            }
        }

        // Update all product prices at once
        function updateAllPrices() {
            let hasUpdates = false;
            
            products.forEach(product => {
                const newPriceInput = document.getElementById(`new-price-${product.id}`);
                const newPrice = parseFloat(newPriceInput.value);
                
                if (!isNaN(newPrice) && newPrice > 0 && newPrice !== product.price) {
                    product.price = newPrice;
                    hasUpdates = true;
                }
            });
            
            if (hasUpdates) {
                // Update the product price list
                loadProductPriceList();
                
                // Update the price list on customer dashboard
                loadPriceList();
                
                // Update the price calculator
                updatePriceCalculator();
                
                // Update product cards on main page
                updateProductCards();
                
                // Show success message
                showPriceUpdateSuccess();
            } else {
                alert('No price changes detected');
            }
        }

        // Show price update success message
        function showPriceUpdateSuccess() {
            const successMsg = document.getElementById('price-update-success');
            successMsg.style.display = 'block';
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }

        // Load product price list for owner
        function loadProductPriceList() {
            const productPriceList = document.getElementById('product-price-list');
            productPriceList.innerHTML = '';
            
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>₹${product.price}/${product.unit || 'kg'}</td>
                    <td>
                        <input type="number" id="owner-new-price-${product.id}" class="form-control" style="width: 100px; display: inline-block;" value="${product.price}" min="1">
                    </td>
                    <td>
                        <button class="btn" style="padding: 5px 10px;" onclick="updateSingleProductPrice('${product.id}')">Update</button>
                    </td>
                `;
                productPriceList.appendChild(row);
            });
        }

        // Update single product price from the table
        function updateSingleProductPrice(productId) {
            const newPriceInput = document.getElementById(`owner-new-price-${productId}`);
            const newPrice = parseFloat(newPriceInput.value);
            
            if (isNaN(newPrice) || newPrice <= 0) {
                alert('Please enter a valid price');
                return;
            }
            
            // Find the product and update its price
            const productIndex = products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                products[productIndex].price = newPrice;
                
                // Update the price update list
                loadPriceUpdateList();
                
                // Update the price list on customer dashboard
                loadPriceList();
                
                // Update the price calculator
                updatePriceCalculator();
                
                // Update product cards on main page
                updateProductCards();
                
                // Show success message
                document.getElementById('price-update-success-old').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('price-update-success-old').style.display = 'none';
                }, 3000);
            }
        }

        // Update price calculator with new prices
        function updatePriceCalculator() {
            // This function would update the price calculator on the main page
            // In a real application, this might involve updating the product options
            // or recalculating existing selections
            console.log('Price calculator updated with new prices');
        }

        // Update product cards on main page with new prices
        function updateProductCards() {
            // Update product cards on home page
            document.querySelectorAll('#home-section .product-card').forEach(card => {
                const productName = card.querySelector('h3').textContent;
                const product = products.find(p => p.name === productName);
                if (product) {
                    const priceElement = card.querySelector('.price');
                    priceElement.textContent = `₹${product.price}/${product.unit || 'kg'}`;
                }
            });
            
            // Update product cards on products page
            document.querySelectorAll('#products-section .product-card').forEach(card => {
                const productName = card.querySelector('h3').textContent;
                const product = products.find(p => p.name === productName);
                if (product) {
                    const priceElement = card.querySelector('.price');
                    priceElement.textContent = `₹${product.price}/${product.unit || 'kg'}`;
                }
            });
        }

        // Load order history
        function loadOrderHistory() {
            const orderHistory = document.getElementById('order-history');
            orderHistory.innerHTML = '';
            
            // Sample data - in real app, this would come from server
            const orders = [
                { date: '15/07/2023', items: 'Wheat Flour (5kg), Rice Flour (3kg)', qty: 8, amount: 420, status: 'Completed' },
                { date: '10/07/2023', items: 'Ragi Flour (4kg), Porridge Mix (2pk)', qty: 6, amount: 380, status: 'Completed' },
                { date: '05/07/2023', items: 'Sorghum Flour (3kg), Pearl Millet (2kg)', qty: 5, amount: 275, status: 'Completed' }
            ];
            
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.date}</td>
                    <td>${order.items}</td>
                    <td>${order.qty}${order.qty > 1 ? 'kgs' : 'kg'}</td>
                    <td>₹${order.amount}</td>
                    <td><span class="badge badge-success">${order.status}</span></td>
                `;
                orderHistory.appendChild(row);
            });
        }

        // Load bill history
        function loadBillHistory() {
            const billHistory = document.getElementById('bill-history');
            billHistory.innerHTML = '';
            
            bills.forEach(bill => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${bill.id}</td>
                    <td>${bill.date}</td>
                    <td>₹${bill.amount}</td>
                    <td>₹${bill.balance}</td>
                    <td><button class="btn" onclick="viewBill('${bill.id}')">View</button></td>
                `;
                billHistory.appendChild(row);
            });
        }

        // View bill
        function viewBill(billId) {
            const bill = bills.find(b => b.id === billId);
            if (!bill) return;
            
            document.getElementById('bill-number').textContent = bill.id;
            document.getElementById('bill-date').textContent = bill.date;
            document.getElementById('bill-time').textContent = bill.time;
            document.getElementById('bill-customer').textContent = bill.customer;
            
            const billItems = document.getElementById('bill-items');
            billItems.innerHTML = '';
            
            let total = 0;
            bill.items.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.product}</td>
                    <td>${item.qty}${item.qty > 1 ? 'kgs' : 'kg'}</td>
                    <td>₹${item.rate}</td>
                    <td>₹${item.amount}</td>
                `;
                billItems.appendChild(row);
                total += item.amount;
            });
            
            document.getElementById('bill-total').textContent = total.toFixed(2);
            document.getElementById('bill-paid').textContent = bill.paid.toFixed(2);
            document.getElementById('bill-balance').textContent = bill.balance.toFixed(2);
            
            document.getElementById('bill-details').style.display = 'block';
        }

        // Load booked slots
        function loadBookedSlots() {
            const bookedSlots = document.getElementById('booked-slots');
            bookedSlots.innerHTML = '';
            
            // Sample data - in real app, this would come from server
            const slots = [
                { date: '20/07/2023', time: '10:00 AM', items: 'Wheat Flour (5kg), Rice Flour (3kg)', status: 'Confirmed' },
                { date: '15/07/2023', time: '02:30 PM', items: 'Ragi Flour (4kg)', status: 'Completed' },
                { date: '10/07/2023', time: '11:00 AM', items: 'Chilli Powder (2kg)', status: 'Completed' }
            ];
            
            slots.forEach(slot => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${slot.date}</td>
                    <td>${slot.time}</td>
                    <td>${slot.items}</td>
                    <td><span class="badge badge-success">${slot.status}</span></td>
                    <td>
                        ${slot.status === 'Confirmed' ? 
                            '<button class="btn" style="padding: 3px 8px; background-color: #dc3545;">Cancel</button>' : 
                            '<button class="btn" style="padding: 3px 8px;">View</button>'}
                    </td>
                `;
                bookedSlots.appendChild(row);
            });
        }

        // Load time slots
        function loadTimeSlots(slotContainerId, bookButtonId) {
            const container = document.getElementById(slotContainerId);
            const bookButton = document.getElementById(bookButtonId);
            container.innerHTML = '';
            
            // Generate time slots from opening to closing time
            const slots = [];
            const startHour = 8;
            const endHour = 20;
            
            for (let hour = startHour; hour < endHour; hour++) {
                slots.push(`${hour}:00 - ${hour}:30`);
                slots.push(`${hour}:30 - ${hour + 1}:00`);
            }
            
            // Randomly mark some slots as booked
            slots.forEach(slot => {
                const isBooked = Math.random() < 0.3; // 30% chance of being booked
                const slotElement = document.createElement('div');
                slotElement.className = `time-slot ${isBooked ? 'booked' : ''}`;
                slotElement.textContent = slot;
                
                if (!isBooked) {
                    slotElement.addEventListener('click', function() {
                        document.querySelectorAll(`#${slotContainerId} .time-slot`).forEach(s => {
                            s.classList.remove('selected');
                        });
                        this.classList.add('selected');
                        bookButton.disabled = false;
                    });
                }
                
                container.appendChild(slotElement);
            });
            
            bookButton.disabled = true;
        }

        // Book slot
        function bookSlot() {
            const selectedSlot = document.querySelector('.time-slot.selected');
            if (!selectedSlot) return;
            
            const items = document.getElementById('booking-items').value;
            if (!items) {
                alert('Please enter items to grind');
                return;
            }
            
            // In a real app, this would send data to server
            document.getElementById('booking-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('booking-success').style.display = 'none';
                closeModal('slot-booking-modal');
                loadBookedSlots();
            }, 3000);
        }

        // Update profile
        function updateProfile() {
            // In a real app, this would send data to server
            document.getElementById('profile-update-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('profile-update-success').style.display = 'none';
            }, 3000);
        }

        // Change password
        function changePassword() {
            const current = document.getElementById('current-password').value;
            const newPass = document.getElementById('new-password').value;
            const confirm = document.getElementById('confirm-password').value;
            
            if (!current || !newPass || !confirm) {
                alert('Please fill all fields');
                return;
            }
            
            if (newPass !== confirm) {
                alert('New passwords do not match');
                return;
            }
            
            // In a real app, this would validate current password and update
            document.getElementById('password-change-success').style.display = 'block';
            document.getElementById('password-change-error').style.display = 'none';
            
            setTimeout(() => {
                document.getElementById('password-change-success').style.display = 'none';
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
            }, 3000);
        }

        // Send contact message
        function sendContactMessage() {
            // In a real app, this would send data to server
            alert('Thank you for your message! We will get back to you soon.');
            document.getElementById('contact-form').reset();
        }

        // Update shop status display
        function updateShopStatusDisplay() {
            const statusText = shopStatus === 'open' ? 'Shop is Open' : 'Shop is Closed';
            const statusClass = shopStatus === 'open' ? 'open' : 'closed';
            
            // Update on main page
            const shopStatusDiv = document.querySelector('.shop-status');
            shopStatusDiv.className = `shop-status ${statusClass}`;
            document.getElementById('shop-status-text').textContent = statusText;
            document.getElementById('shop-timing').textContent = `Today's Timing: ${openingTime} - ${closingTime}`;
            document.getElementById('contact-timing').textContent = `Monday - Sunday: ${openingTime} - ${closingTime}`;
            
            // Update on customer dashboard
            if (document.getElementById('customer-shop-status')) {
                document.getElementById('customer-shop-status').textContent = statusText;
                document.querySelector('#customer-dashboard .shop-status').className = `shop-status ${statusClass}`;
                document.querySelector('#customer-dashboard .status-indicator').className = `status-indicator ${statusClass}`;
                document.getElementById('customer-shop-timing').textContent = `Today's Timing: ${openingTime} - ${closingTime}`;
            }
            
            // Update on owner dashboard
            if (document.getElementById('shop-status-toggle')) {
                document.getElementById('shop-status-toggle').value = shopStatus;
                document.getElementById('opening-time').value = openingTime;
                document.getElementById('closing-time').value = closingTime;
            }
        }

        // Update shop status
        function updateShopStatus() {
            shopStatus = document.getElementById('shop-status-toggle').value;
            updateShopStatusDisplay();
            
            // Show success message
            document.getElementById('shop-status-update-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('shop-status-update-success').style.display = 'none';
            }, 3000);
        }

        // Update shop timing
        function updateShopTiming() {
            openingTime = document.getElementById('opening-time').value;
            closingTime = document.getElementById('closing-time').value;
            updateShopStatusDisplay();
            
            // Show success message
            document.getElementById('shop-status-update-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('shop-status-update-success').style.display = 'none';
            }, 3000);
        }

        // Load customer list
        function loadCustomerList() {
            const customerList = document.getElementById('customer-list');
            customerList.innerHTML = '';
            
            customers.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.city}</td>
                    <td>${Math.floor(Math.random() * 10) + 1} days ago</td>
                    <td>₹${customer.balance}</td>
                    <td><button class="btn" onclick="viewCustomerDetails(${customer.id})">View</button></td>
                `;
                customerList.appendChild(row);
            });
        }

        // View customer details
        function viewCustomerDetails(customerId) {
            const customer = customers.find(c => c.id === customerId);
            if (!customer) return;
            
            document.getElementById('detail-customer-name').textContent = customer.name;
            document.getElementById('detail-customer-phone').textContent = `Phone: ${customer.phone}`;
            document.getElementById('detail-customer-address').textContent = `Address: 123 ${customer.city}`;
            document.getElementById('detail-customer-visits').textContent = `Total Visits: ${customer.visits}`;
            document.getElementById('detail-customer-points').textContent = `Loyalty Points: ${customer.points}`;
            document.getElementById('detail-customer-balance').textContent = `Balance Due: ₹${customer.balance}`;
            
            // Load transaction history
            const transactionHistory = document.getElementById('customer-transaction-history');
            transactionHistory.innerHTML = '';
            
            const transactions = bills.filter(b => b.customer === customer.name);
            transactions.forEach(trans => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${trans.date}</td>
                    <td>${trans.id}</td>
                    <td>₹${trans.amount}</td>
                    <td>₹${trans.paid}</td>
                    <td>₹${trans.balance}</td>
                `;
                transactionHistory.appendChild(row);
            });
            
            document.getElementById('customer-details').style.display = 'block';
        }

        // Update customer balance
        function updateCustomerBalance() {
            const newBalance = document.getElementById('new-customer-balance').value;
            if (!newBalance) {
                alert('Please enter a balance amount');
                return;
            }
            
            // In a real app, this would update in database
            document.getElementById('detail-customer-balance').textContent = `Balance Due: ₹${newBalance}`;
            document.getElementById('balance-update-success').style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('balance-update-success').style.display = 'none';
            }, 3000);
        }

        // Load recent transactions
        function loadRecentTransactions() {
            const transactionsTable = document.getElementById('recent-transactions');
            transactionsTable.innerHTML = '';
            
            bills.forEach(bill => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${bill.id}</td>
                    <td>${bill.date}</td>
                    <td>${bill.customer}</td>
                    <td>₹${bill.amount}</td>
                    <td>${bill.balance > 0 ? '<span class="badge badge-warning">Pending</span>' : '<span class="badge badge-success">Paid</span>'}</td>
                    <td><button class="btn" onclick="viewOwnerBill('${bill.id}')">View</button></td>
                `;
                transactionsTable.appendChild(row);
            });
        }

        // View owner bill
        function viewOwnerBill(billId) {
            const bill = bills.find(b => b.id === billId);
            if (!bill) return;
            
            // Similar to customer view bill but with owner-specific options
            // In a full implementation, this might allow editing or other admin functions
            alert(`Viewing bill ${billId} for ${bill.customer}`);
        }

        // Calculate bill item
        function calculateBillItem(input) {
            const itemRow = input.closest('.bill-item');
            const quantity = itemRow.querySelector('.bill-quantity').value;
            const rate = itemRow.querySelector('.bill-rate').value;
            
            if (quantity && rate) {
                const amount = quantity * rate;
                itemRow.querySelector('.bill-amount').textContent = amount.toFixed(2);
                calculateBillTotal();
            }
        }

        // Calculate bill total
        function calculateBillTotal() {
            let total = 0;
            document.querySelectorAll('.bill-item').forEach(item => {
                const amount = parseFloat(item.querySelector('.bill-amount').textContent) || 0;
                total += amount;
            });
            
            document.getElementById('bill-total-amount').textContent = total.toFixed(2);
            calculateBillBalance();
        }

        // Calculate bill balance
        function calculateBillBalance() {
            const total = parseFloat(document.getElementById('bill-total-amount').textContent) || 0;
            const paid = parseFloat(document.getElementById('bill-amount-paid').value) || 0;
            const balance = total - paid;
            
            document.getElementById('bill-balance-due').textContent = balance.toFixed(2);
        }

        // Add bill item
        function addBillItem() {
            const container = document.getElementById('bill-items-container');
            const newItem = document.createElement('div');
            newItem.className = 'bill-item';
            newItem.style.display = 'flex';
            newItem.style.gap = '10px';
            newItem.style.marginBottom = '15px';
            newItem.innerHTML = `
                <div style="flex: 2;">
                    <select class="form-control bill-product">
                        <option value="">-- Select Product --</option>
                        <option value="wheat">Wheat Flour</option>
                        <option value="rice">Rice Flour</option>
                        <option value="ragi">Ragi Flour</option>
                        <option value="corn">Corn Flour</option>
                        <option value="millet">Millet Flour</option>
                        <option value="pearl_millet">Pearl Millet Flour</option>
                        <option value="sorghum">Sorghum Flour</option>
                        <option value="rye">Rye Flour</option>
                        <option value="chilli">Chilli Powder</option>
                        <option value="porridge">Multigrain Porridge Mix</option>
                        <option value="idli">Idli Batter</option>
                    </select>
                </div>
                <div style="flex: 1;">
                    <input type="number" class="form-control bill-quantity" placeholder="Qty (kg)" min="0.1" step="0.1">
                </div>
                <div style="flex: 1;">
                    <input type="number" class="form-control bill-rate" placeholder="Rate" min="1">
                </div>
                <div style="flex: 1; display: flex; align-items: center;">
                    <span class="bill-amount">0.00</span>
                </div>
                <div style="flex: 0;">
                    <button class="btn" style="padding: 5px 10px; background-color: #dc3545;" onclick="removeBillItem(this)"><i class="fas fa-times"></i></button>
                </div>
            `;
            container.appendChild(newItem);
        }

        // Remove bill item
        function removeBillItem(button) {
            button.closest('.bill-item').remove();
            calculateBillTotal();
        }

        // Generate bill
        function generateBill() {
            const customerSelect = document.getElementById('bill-customer-select');
            const customerName = customerSelect.value === 'new' ? 
                document.getElementById('new-customer-name').value : 
                customerSelect.options[customerSelect.selectedIndex].text;
            
            if (!customerName) {
                alert('Please select or enter customer name');
                return;
            }
            
            const billDate = document.getElementById('bill-date-input').value;
            const paidAmount = parseFloat(document.getElementById('bill-amount-paid').value) || 0;
            
            // Collect bill items
            const items = [];
            let total = 0;
            
            document.querySelectorAll('.bill-item').forEach(item => {
                const product = item.querySelector('.bill-product').value;
                const quantity = parseFloat(item.querySelector('.bill-quantity').value) || 0;
                const rate = parseFloat(item.querySelector('.bill-rate').value) || 0;
                
                if (product && quantity > 0 && rate > 0) {
                    const amount = quantity * rate;
                    items.push({
                        product: product,
                        qty: quantity,
                        rate: rate,
                        amount: amount
                    });
                    total += amount;
                }
            });
            
            if (items.length === 0) {
                alert('Please add at least one item to the bill');
                return;
            }
            
            // Generate bill HTML (similar to customer view)
            const billId = 'SMFM-' + new Date().getFullYear() + '-' + (bills.length + 1);
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            
            const billHTML = `
                <div class="bill print-bill">
                    <div class="bill-header">
                        <h2>SRI MURUGAN FLOUR MILL</h2>
                        <p>Covai main road, Vellakovil, Tiruppur(dt)-638111</p>
                        <p>Phone: +91 9360512536 | GSTIN: 22AAAAA0000A1Z5</p>
                    </div>
                    <div class="bill-details">
                        <div>
                            <p><strong>Bill No:</strong> ${billId}</p>
                            <p><strong>Customer:</strong> ${customerName}</p>
                        </div>
                        <div>
                            <p><strong>Date:</strong> ${billDate}</p>
                            <p><strong>Time:</strong> ${timeString}</p>
                        </div>
                    </div>
                    <table class="bill-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((item, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.product}</td>
                                    <td>${item.qty}${item.qty > 1 ? 'kgs' : 'kg'}</td>
                                    <td>₹${item.rate}</td>
                                    <td>₹${item.amount.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="bill-total">
                        <p><strong>Total Amount: ₹</strong>${total.toFixed(2)}</p>
                        <p><strong>Amount Paid: ₹</strong>${paidAmount.toFixed(2)}</p>
                        <p><strong>Balance Due: ₹</strong>${(total - paidAmount).toFixed(2)}</p>
                    </div>
                    <div class="qr-code">
                        <p>Scan to pay</p>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://srimuruganmill.com/pay/${billId}" alt="QR Code">
                    </div>
                    <div class="bill-footer">
                        <p>Thank you for your business! Please visit again</p>
                        <p class="no-print"><button class="btn" onclick="window.print()">Print Bill</button></p>
                    </div>
                </div>
            `;
            
            document.getElementById('generated-bill').innerHTML = billHTML;
            document.getElementById('generated-bill').style.display = 'block';
            
            // Add to recent transactions
            bills.unshift({
                id: billId,
                date: billDate,
                time: timeString,
                customer: customerName,
                amount: total,
                paid: paidAmount,
                balance: total - paidAmount,
                items: items
            });
            
            loadRecentTransactions();
        }

        // Load bulk orders
        function loadBulkOrders() {
            const bulkOrdersList = document.getElementById('bulk-orders-list');
            bulkOrdersList.innerHTML = '';
            
            bulkOrders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.items}</td>
                    <td>${order.date}</td>
                    <td>₹${order.amount}</td>
                    <td>₹${order.balance}</td>
                    <td><span class="badge ${order.status === 'Completed' ? 'badge-success' : 'badge-warning'}">${order.status}</span></td>
                    <td>
                        <button class="btn" style="padding: 3px 8px;">View</button>
                        ${order.status === 'Pending' ? 
                            '<button class="btn" style="padding: 3px 8px; margin-left: 5px; background-color: #28a745;">Complete</button>' : ''}
                    </td>
                `;
                bulkOrdersList.appendChild(row);
            });
        }

        // Save bulk order
        function saveBulkOrder() {
            const customer = document.getElementById('bulk-customer').value;
            const phone = document.getElementById('bulk-phone').value;
            const date = document.getElementById('bulk-date').value;
            const items = document.getElementById('bulk-items').value;
            const amount = document.getElementById('bulk-amount').value;
            const advance = document.getElementById('bulk-advance').value;
            
            if (!customer || !phone || !date || !items || !amount) {
                alert('Please fill all required fields');
                return;
            }
            
            // Generate order ID
            const orderId = 'BULK-' + (bulkOrders.length + 1);
            
            // Add to bulk orders
            bulkOrders.unshift({
                id: orderId,
                customer: customer,
                phone: phone,
                date: date,
                items: items,
                amount: parseFloat(amount),
                advance: parseFloat(advance),
                balance: parseFloat(amount) - parseFloat(advance),
                status: 'Pending'
            });
            
            // Show success message
            document.getElementById('bulk-order-success').style.display = 'block';
            
            // Reload bulk orders list
            setTimeout(() => {
                document.getElementById('bulk-order-success').style.display = 'none';
                closeModal('bulk-order-modal');
                loadBulkOrders();
            }, 2000);
        }

        // Update product prices
        function updateProductPrices() {
            // In a real app, this would update prices in database
            document.getElementById('price-update-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('price-update-success').style.display = 'none';
            }, 3000);
        }

        // Add new product
        function addNewProduct() {
            const name = document.getElementById('new-product-name').value;
            const price = document.getElementById('new-product-price').value;
            const description = document.getElementById('new-product-description').value;
            
            if (!name || !price) {
                alert('Please enter product name and price');
                return;
            }
            
            // In a real app, this would add product to database
            document.getElementById('new-product-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('new-product-success').style.display = 'none';
                document.getElementById('new-product-name').value = '';
                document.getElementById('new-product-price').value = '';
                document.getElementById('new-product-description').value = '';
            }, 3000);
        }

        // Update shop settings
        function updateShopSettings() {
            // In a real app, this would update settings in database
            document.getElementById('settings-update-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('settings-update-success').style.display = 'none';
            }, 3000);
        }

        // Update QR code
        function updateQRCode() {
            const url = document.getElementById('qr-code-url').value;
            if (!url) {
                alert('Please enter payment link');
                return;
            }
            
            document.getElementById('qr-code-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
            
            // Show success message
            document.getElementById('qr-update-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('qr-update-success').style.display = 'none';
            }, 3000);
        }

        // Generate report
        function generateReport() {
            const reportType = document.getElementById('report-type').value;
            let reportTitle = '';
            let reportData = [];
            
            if (reportType === 'daily') {
                const date = document.getElementById('report-date').value;
                reportTitle = `Daily Sales Report for ${date}`;
                
                // Sample data - in real app, this would come from server
                reportData = [
                    { date: date, sales: 5420, bills: 18, avg: 301.11 },
                    { date: '2023-07-14', sales: 4875, bills: 15, avg: 325.00 },
                    { date: '2023-07-13', sales: 5120, bills: 17, avg: 301.18 }
                ];
            } else if (reportType === 'weekly') {
                reportTitle = 'Weekly Sales Report';
                
                // Sample data
                reportData = [
                    { date: 'Week 28 (Jul 10-16)', sales: 35420, bills: 112, avg: 316.25 },
                    { date: 'Week 27 (Jul 3-9)', sales: 32875, bills: 105, avg: 313.10 },
                    { date: 'Week 26 (Jun 26-Jul 2)', sales: 37120, bills: 118, avg: 314.58 }
                ];
            } else if (reportType === 'monthly') {
                reportTitle = 'Monthly Sales Report';
                
                // Sample data
                reportData = [
                    { date: 'July 2023', sales: 124580, bills: 342, avg: 364.27 },
                    { date: 'June 2023', sales: 118750, bills: 335, avg: 354.48 },
                    { date: 'May 2023', sales: 112430, bills: 328, avg: 342.77 }
                ];
            } else if (reportType === 'custom') {
                const startDate = document.getElementById('report-start-date').value;
                const endDate = document.getElementById('report-end-date').value;
                reportTitle = `Custom Sales Report from ${startDate} to ${endDate}`;
                
                // Sample data
                reportData = [
                    { date: startDate, sales: 5420, bills: 18, avg: 301.11 },
                    { date: '2023-07-14', sales: 4875, bills: 15, avg: 325.00 },
                    { date: '2023-07-13', sales: 5120, bills: 17, avg: 301.18 },
                    { date: endDate, sales: 4980, bills: 16, avg: 311.25 }
                ];
            }
            
            // Display report
            document.getElementById('report-title').textContent = reportTitle;
            
            const reportTable = document.getElementById('report-data');
            reportTable.innerHTML = '';
            
            reportData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.date}</td>
                    <td>₹${item.sales.toLocaleString()}</td>
                    <td>${item.bills}</td>
                    <td>₹${item.avg.toFixed(2)}</td>
                    <td><button class="btn" style="padding: 3px 8px;">Details</button></td>
                `;
                reportTable.appendChild(row);
            });
            
            document.getElementById('report-results').style.display = 'block';
        }

        // Print report
        function printReport() {
            window.print();
        }

        // Export report
        function exportReport() {
            alert('Report exported as Excel file');
        }