// ==========================================
// SIMULATED PRODUCT DATA
// ==========================================
const productsData = [
    {
        id: 1,
        name: 'Sony WH-1000XM5 Headphones',
        platform: 'Amazon',
        price: 29050,
        rating: 4.8,
        reviews: 2450,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Sony WH-1000XM5 Headphones',
        platform: 'Flipkart',
        price: 27390,
        rating: 4.7,
        reviews: 1850,
        image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5 Headphones',
        platform: 'Best Buy',
        price: 28220,
        rating: 4.6,
        reviews: 3200,
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Apple iPhone 15 Pro',
        platform: 'Apple Store',
        price: 82917,
        rating: 4.9,
        reviews: 5600,
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Apple iPhone 15 Pro',
        platform: 'Amazon',
        price: 81350,
        rating: 4.8,
        reviews: 4200,
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Apple iPhone 15 Pro',
        platform: 'Best Buy',
        price: 82999,
        rating: 4.7,
        reviews: 3100,
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Dell XPS 13 Laptop',
        platform: 'Dell',
        price: 107899,
        rating: 4.7,
        reviews: 1900,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Dell XPS 13 Laptop',
        platform: 'Amazon',
        price: 103749,
        rating: 4.6,
        reviews: 2800,
        image: 'https://images.unsplash.com/photo-1588872657840-218e7e66e13e?w=400&h=300&fit=crop'
    },
    {
        id: 9,
        name: 'Samsung 55" 4K TV',
        platform: 'Best Buy',
        price: 66399,
        rating: 4.5,
        reviews: 1200,
        image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop'
    },
    {
        id: 10,
        name: 'Samsung 55" 4K TV',
        platform: 'Amazon',
        price: 62249,
        rating: 4.4,
        reviews: 2100,
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop'
    },
    {
        id: 11,
        name: 'Canon EOS R6 Camera',
        platform: 'B&H',
        price: 207417,
        rating: 4.8,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop'
    },
    {
        id: 12,
        name: 'Canon EOS R6 Camera',
        platform: 'Amazon',
        price: 203349,
        rating: 4.7,
        reviews: 1500,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop'
    }
];

let allProducts = [...productsData];
let filteredProducts = [...productsData];
let currentSortType = 'original';

// ==========================================
// DOM ELEMENTS
// ==========================================
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const sortButtons = document.querySelectorAll('.sort-btn');

// ==========================================
// THEME TOGGLE
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = !document.body.classList.contains('light-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

// ==========================================
// RENDER PRODUCTS
// ==========================================
function renderProducts(products = filteredProducts) {
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
        updateStats([]);
        return;
    }

    const cheapestPrice = Math.min(...allProducts.map(p => p.price));
    const maxReviews = Math.max(...allProducts.map(p => p.reviews));

    products.forEach(product => {
        const isCheapest = product.price === cheapestPrice;
        const isMostReviewed = product.reviews === maxReviews;

        const card = document.createElement('div');
        card.className = `product-card ${isCheapest ? 'cheapest' : ''} ${isMostReviewed ? 'most-reviewed' : ''}`;
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-platform">${product.platform}</p>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
            <div class="product-rating">
                <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                <span>${product.rating}</span>
            </div>
            <div class="product-reviews">📝 ${product.reviews.toLocaleString()} reviews</div>
            <div class="badge-container">
                ${isCheapest ? '<span class="badge badge-cheapest">✓ Cheapest</span>' : ''}
                ${isMostReviewed ? '<span class="badge badge-reviewed">⭐ Most Reviewed</span>' : ''}
            </div>
        `;
        productsGrid.appendChild(card);
    });

    updateStats(products);
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.platform.toLowerCase().includes(query)
    );
    
    // Reset sort to original when searching
    currentSortType = 'original';
    updateSortButtons();
    renderProducts();
});

// ==========================================
// SORTING FUNCTIONALITY
// ==========================================
sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sortType = button.getAttribute('data-sort');
        currentSortType = sortType;
        updateSortButtons();

        if (sortType === 'original') {
            filteredProducts = [...allProducts];
        } else if (sortType === 'price') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortType === 'reviews') {
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
        }

        // Apply search filter on top of sort
        const query = searchInput.value.toLowerCase();
        if (query) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.platform.toLowerCase().includes(query)
            );
        }

        renderProducts();
    });
});

function updateSortButtons() {
    sortButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-sort') === currentSortType);
    });
}

// ==========================================
// UPDATE STATS SECTION
// ==========================================
function updateStats(products) {
    let displayProducts = products.length > 0 ? products : allProducts;

    // Cheapest product
    const cheapest = displayProducts.reduce((min, p) => p.price < min.price ? p : min);
    document.getElementById('cheapestProduct').textContent = cheapest.name;
    document.getElementById('cheapestPrice').textContent = `₹${cheapest.price.toLocaleString()}`;

    // Most reviewed product
    const mostReviewed = displayProducts.reduce((max, p) => p.reviews > max.reviews ? p : max);
    document.getElementById('mostReviewedProduct').textContent = mostReviewed.name;
    document.getElementById('mostReviewedCount').textContent = `${mostReviewed.reviews.toLocaleString()} reviews`;

    // Highest rated product
    const highestRated = displayProducts.reduce((max, p) => p.rating > max.rating ? p : max);
    document.getElementById('highestRatedProduct').textContent = highestRated.name;
    document.getElementById('highestRating').textContent = `${highestRated.rating} ⭐`;
}

// ==========================================
// PRICE HISTORY CHART
// ==========================================
function initChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Simulated price history data for Sony Headphones
    const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const amazonPrices = [30710, 30377, 29878, 29050, 28740, 29050, 28220, 27390];
    const flipkartPrices = [32390, 31559, 30710, 29878, 29050, 28220, 27390, 27390];
    const bestbuyPrices = [31560, 31188, 30395, 29878, 29878, 29050, 28220, 28220];

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Amazon',
                    data: amazonPrices,
                    borderColor: '#ff9900',
                    backgroundColor: 'rgba(255, 153, 0, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#ff9900',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Flipkart',
                    data: flipkartPrices,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Best Buy',
                    data: bestbuyPrices,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9',
                        font: { size: 14, weight: 'bold' },
                        padding: 20,
                        usePointStyle: true
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1',
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
                }
            }
        }
    });
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProducts();
    initChart();
});

// ==========================================
// ADD SOME INTERACTIVITY ENHANCEMENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Smooth animations on page load
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
});
