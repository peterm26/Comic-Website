// ========================================
// CHOCO COMICS DYNAMIC CONTENT LOADER
// ========================================

// Global variable to store comic data
let comicData = {};

// ========================================
// INITIALIZATION
// ========================================

// Load comics when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadComicData();
});

// ========================================
// DATA LOADING FUNCTIONS
// ========================================

// Load comic data from JSON file
async function loadComicData() {
    try {
        const response = await fetch('comics.json');
        comicData = await response.json();
        
        console.log('Loaded comic data:', comicData);
        console.log('Available sections:', Object.keys(comicData));
        
        // Load all sections with comic data
        loadNewReleases();
        loadTrendingComics();
        loadComicLists();
        loadStaffPicks();
        
    } catch (error) {
        console.error('Error loading comic data:', error);
        // Fallback to default content if JSON fails to load
        loadDefaultContent();
    }
}

// ========================================
// SECTION LOADING FUNCTIONS
// ========================================

// Load New Releases section
function loadNewReleases() {
    const container = document.getElementById('newReleasesGrid');
    if (!container || !comicData.newReleases) return;
    
    if (comicData.newReleases.length === 0) {
        container.innerHTML = '<p>No new releases available at the moment.</p>';
        return;
    }
    
    container.innerHTML = comicData.newReleases.map(comic => `
        <div class="comic-card" data-id="${comic.id}">
            <div class="comic-cover">
                <img src="${comic.cover}" alt="${comic.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="comic-cover-fallback" style="display: none;">📚</div>
            </div>
            <div class="comic-info">
                <h3>${comic.title}</h3>
                <p class="comic-publisher">${comic.publisher}</p>
                <p class="comic-writer">by ${comic.writer}</p>
                <div class="comic-meta">
                    <span class="price">${comic.price}</span>
                    <span class="release-date">${comic.releaseDate}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click listeners to the new comic cards
    addComicCardListeners();
}

// Load Trending Comics section
function loadTrendingComics() {
    const container = document.getElementById('trendingList');
    console.log('Loading trending comics...');
    console.log('Container:', container);
    console.log('Trending comics data:', comicData.trendingComics);
    
    if (!container || !comicData.trendingComics) {
        console.log('Container or trending comics data not found');
        return;
    }
    
    if (comicData.trendingComics.length === 0) {
        container.innerHTML = '<p>No trending comics available at the moment.</p>';
        return;
    }
    
    console.log('Rendering trending comics...');
    container.innerHTML = comicData.trendingComics.map(comic => {
        const rating = (Math.random() * 1.0 + 4.0).toFixed(1); // Random rating between 4.0-5.0 with one decimal
        const likes = Math.floor(Math.random() * 50000) + 5000; // Random likes between 5K-55K
        
        // Convert rating to number for star calculation
        const ratingNum = parseFloat(rating);
        const fullStars = Math.floor(ratingNum);
        const hasHalfStar = ratingNum % 1 >= 0.5;
        
        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '☆';
        stars += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
        
        return `
        <div class="trending-item" data-id="${comic.id}">
            <div class="trending-cover">
                <img src="${comic.cover}" alt="${comic.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="trending-cover-fallback" style="display: none;">📚</div>
            </div>
            <div class="trending-info">
                <h3 class="comic-title">${comic.title}</h3>
                <div class="rating-section">
                    <div class="stars">${stars}</div>
                    <span class="rating">${rating}</span>
                </div>
                <p class="review-text">"${comic.description ? comic.description.substring(0, 100) + (comic.description.length > 100 ? '...' : '') : 'Great comic!'}"</p>
                <div class="engagement">
                    <span class="likes">${likes.toLocaleString()} likes</span>
                </div>
            </div>
        </div>
        `;
    }).join('');
    
    // Add click listeners to trending items
    addTrendingItemListeners();
}

// Load Comic Lists section
function loadComicLists() {
    const container = document.getElementById('comicListsContent');
    console.log('Loading pull list...');
    console.log('Container:', container);
    
    if (!container) {
        console.log('Pull list container not found');
        return;
    }
    
    const pullListComics = [
        { 
            title: "Absolute Batman #11", 
            rating: 5, 
            cover: "https://s3.amazonaws.com/comicgeeks/comics/covers/large-9078880.jpg?1755646956",
            releaseDate: "8/20/25",
            price: "$5.99"
        },
        { 
            title: "Ultimate Spider-Man #1", 
            rating: 4, 
            cover: "https://s3.amazonaws.com/comicgeeks/comics/covers/large-5207966.jpg?1738662101",
            releaseDate: "8/20/25",
            price: "$4.99"
        },
        { 
            title: "Transformers #23", 
            rating: 5, 
            cover: "https://cdn.imagecomics.com/assets/i/releases/1075030/transformers-23_4486d9bfcc.jpg",
            releaseDate: "8/20/25",
            price: "$3.99"
        },
        { 
            title: "SPAWN #367", 
            rating: 4, 
            cover: "https://cdn.imagecomics.com/assets/i/releases/1068781/spawn-367_c7de8e0582.jpg",
            releaseDate: "8/20/25",
            price: "$3.99"
        },
        { 
            title: "Absolute Wonder Woman #10", 
            rating: 5, 
            cover: "https://s3.amazonaws.com/comicgeeks/comics/covers/large-3167576.jpg?1753253543",
            releaseDate: "8/20/25",
            price: "$4.99"
        }
    ];
    
    console.log('Rendering pull list...');
    container.innerHTML = pullListComics.map(comic => `
        <div class="pull-comic-item">
            <div class="pull-comic-cover">
                <img src="${comic.cover}" alt="${comic.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="pull-comic-cover-fallback" style="display: none;">📚</div>
            </div>
            <div class="pull-comic-content">
                <h4 class="pull-comic-title">${comic.title}</h4>
                <div class="pull-comic-rating">
                    ${'★'.repeat(comic.rating)}${'☆'.repeat(5-comic.rating)}
                </div>
                <div class="pull-comic-meta">
                    <span class="pull-comic-date">${comic.releaseDate}</span>
                    <span class="pull-comic-price">${comic.price}</span>
                </div>
            </div>
        </div>
    `).join('') + `
        <div class="pull-comic-item add-comic-item">
            <div class="add-comic-content">
                <div class="add-comic-plus">+</div>
                <div class="add-comic-text">Add Comic</div>
            </div>
        </div>
    `;
}





// Load Staff Picks section
function loadStaffPicks() {
    const container = document.getElementById('staffPicksGrid');
    console.log('Loading staff picks...');
    console.log('Container:', container);
    console.log('Staff picks data:', comicData.staffPicks);
    
    if (!container || !comicData.staffPicks) {
        console.log('Container or staff picks data not found');
        return;
    }
    
    if (comicData.staffPicks.length === 0) {
        container.innerHTML = '<p>No staff picks available at the moment.</p>';
        return;
    }
    
    console.log('Rendering staff picks...');
    container.innerHTML = comicData.staffPicks.map(comic => `
        <div class="staff-pick-card" data-id="${comic.id}">
            <div class="staff-pick-cover">
                <img src="${comic.cover}" alt="${comic.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="staff-pick-cover-fallback" style="display: none;">📚</div>
            </div>
            <div class="staff-pick-content">
                <h3>${comic.title}</h3>
                <p class="staff-pick-publisher">${comic.publisher}</p>
                <div class="staff-pick-rating">
                    <span class="staff-rating">${comic.rating}</span>
                    <div class="staff-stars">★★★★☆</div>
                </div>
                <p class="staff-pick-price">${comic.price} • ${comic.releaseDate}</p>
                <div class="staff-description">
                    <p>${comic.description || "Description coming soon..."}</p>
                </div>
            </div>
        </div>
    `).join('');
}





// ========================================
// FALLBACK CONTENT
// ========================================

// Load default content if JSON fails
function loadDefaultContent() {
    console.log('Loading default content...');
    
    // You can add default content here if needed
    // For now, the HTML will show the placeholder content
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Add click event listeners to comic cards
function addComicCardListeners() {
    const comicCards = document.querySelectorAll('.comic-card');
    comicCards.forEach(card => {
        card.addEventListener('click', function() {
            const comicId = this.getAttribute('data-id');
            showComicDetails(comicId);
        });
    });
}

// Add click event listeners to trending items
function addTrendingItemListeners() {
    const trendingItems = document.querySelectorAll('.trending-item');
    trendingItems.forEach(item => {
        item.addEventListener('click', function() {
            const comicId = this.getAttribute('data-id');
            showComicDetails(comicId);
        });
    });
}


// Show comic details with full review
function showComicDetails(comicId) {
    const comic = comicData.trendingComics.find(c => c.id === comicId);
    if (!comic) return;
    
    // Create modal for full review
    const modal = document.createElement('div');
    modal.className = 'review-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <img src="${comic.cover}" alt="${comic.title}" class="modal-cover">
                <div class="modal-info">
                    <h2>${comic.title}</h2>
                    <p class="modal-publisher">${comic.publisher}</p>
                    <p class="modal-writer">by ${comic.writer}</p>
                    <div class="modal-rating">
                        <div class="modal-stars">★★★★★</div>
                        <span class="modal-rating-text">5.0</span>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <h3>Full Review</h3>
                <p class="modal-description">${comic.description}</p>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.remove();
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// ========================================
// SEARCH FUNCTIONALITY (Future Enhancement)
// ========================================

// Search comics by title or publisher
function searchComics(query) {
    if (!query || !comicData) return [];
    
    const allComics = [
        ...comicData.newReleases,
        ...comicData.trendingComics,
        ...comicData.pullList,
        ...comicData.staffPicks
    ];
    
    return allComics.filter(comic => 
        comic.title.toLowerCase().includes(query.toLowerCase()) ||
        comic.publisher.toLowerCase().includes(query.toLowerCase())
    );
}

// ========================================
// EXPORT FUNCTIONS (for future use)
// ========================================

// Make functions available globally if needed
window.ChocoComics = {
    loadComicData,
    searchComics,
    showComicDetails
}; 