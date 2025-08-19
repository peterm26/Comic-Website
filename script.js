// Choco Comics Website - Main JavaScript File

// Global variables
let currentSection = 'home';

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadAllContent();
    setupNavigation();
    setupAnimations();
});

// Load all content sections
async function loadAllContent() {
    try {
        const response = await fetch('comics.json');
        const data = await response.json();
        
        loadNewReleases(data.newReleases);
        loadTrendingComics(data.trendingComics);
        loadPullList(data.pullList);
        loadStaffPicks(data.staffPicks);
        loadComicNews(data.comicNews);
        
    } catch (error) {
        console.error('Error loading content:', error);
        showErrorMessage();
    }
}

// Load New Releases Section
function loadNewReleases(releases) {
    const container = document.getElementById('newReleasesGrid');
    if (!container) return;
    
    const releasesHTML = releases.map(release => `
        <div class="comic-card" onclick="showComicDetails(${release.id})">
            <div class="comic-image">
                <span>📚</span>
            </div>
            <div class="comic-info">
                <h3 class="comic-title">${release.title}</h3>
                <p class="comic-author">by ${release.author}</p>
                ${release.artist && release.artist !== release.author ? `<p class="comic-author">Art by ${release.artist}</p>` : ''}
                <p class="comic-description">${release.description}</p>
                <div class="comic-tags">
                    ${release.tags.map(tag => `<span class="comic-tag">${tag}</span>`).join('')}
                </div>
                <div class="comic-meta">
                    <span class="release-date">📅 ${formatDate(release.releaseDate)}</span>
                    <span class="rating">★ ${release.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = releasesHTML;
}

// Load Trending Comics Section
function loadTrendingComics(trending) {
    const container = document.getElementById('trendingGrid');
    if (!container) return;
    
    const trendingHTML = trending.map(comic => `
        <div class="comic-card trending-card" onclick="showComicDetails(${comic.id})">
            <div class="comic-image">
                <span>🔥</span>
            </div>
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <p class="comic-author">by ${comic.author}</p>
                <p class="comic-description">${comic.description}</p>
                <div class="comic-tags">
                    ${comic.tags.map(tag => `<span class="comic-tag">${tag}</span>`).join('')}
                </div>
                <div class="trending-badge">🔥 Trending</div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = trendingHTML;
}

// Load Pull List Section
function loadPullList(pullList) {
    const container = document.getElementById('pullListContent');
    if (!container) return;
    
    const pullListHTML = pullList.map(comic => `
        <div class="pull-list-item" onclick="showComicDetails(${comic.id})">
            <div class="pull-item-image">
                <span>📖</span>
            </div>
            <div class="pull-item-info">
                <h4>${comic.title}</h4>
                <p class="pull-author">by ${comic.author}</p>
                <p class="next-issue">${comic.nextIssue}</p>
                <div class="pull-tags">
                    ${comic.tags.slice(0, 2).map(tag => `<span class="pull-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = pullListHTML;
}

// Load Staff Picks Section
function loadStaffPicks(staffPicks) {
    const container = document.getElementById('staffPicksGrid');
    if (!container) return;
    
    const staffPicksHTML = staffPicks.map(pick => `
        <div class="comic-card staff-pick-card" onclick="showComicDetails(${pick.id})">
            <div class="comic-image">
                <span>👑</span>
            </div>
            <div class="comic-info">
                <div class="staff-badge">${pick.staffMember}</div>
                <h3 class="comic-title">${pick.title}</h3>
                <p class="comic-author">by ${pick.author}</p>
                <p class="comic-description">${pick.description}</p>
                <div class="comic-tags">
                    ${pick.tags.map(tag => `<span class="comic-tag">${tag}</span>`).join('')}
                </div>
                <div class="staff-rating">👑 Staff Rating: ★ ${pick.rating}</div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = staffPicksHTML;
}

// Load Comic News Section
function loadComicNews(news) {
    const container = document.getElementById('newsGrid');
    if (!container) return;
    
    const newsHTML = news.map(item => `
        <div class="news-card" onclick="showNewsDetails(${item.id})">
            <div class="news-image">
                <span>📰</span>
            </div>
            <div class="news-content">
                <div class="news-category">${item.category}</div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-summary">${item.summary}</p>
                <div class="news-meta">
                    <span class="news-date">${formatDate(item.date)}</span>
                    <span class="news-read-more">Read More →</span>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = newsHTML;
}

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Update current section
            const href = this.getAttribute('href');
            currentSection = href.replace('#', '');
            
            // Smooth scroll to section
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Setup Animations
function setupAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all comic cards and news cards
    document.querySelectorAll('.comic-card, .news-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Show Comic Details (placeholder for future enhancement)
function showComicDetails(comicId) {
    console.log(`Showing details for comic ID: ${comicId}`);
    // This can be enhanced later with a modal or detail page
    alert(`You clicked on comic ID: ${comicId}! This feature can be enhanced later with detailed comic information.`);
}

// Show News Details (placeholder for future enhancement)
function showNewsDetails(newsId) {
    console.log(`Showing news details for ID: ${newsId}`);
    // This can be enhanced later with a modal or detail page
    alert(`You clicked on news ID: ${newsId}! This feature can be enhanced later with full news articles.`);
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show Error Message
function showErrorMessage() {
    const errorMessage = '<p style="text-align: center; color: #e74c3c; font-size: 1.2rem; padding: 2rem;">Error loading content. Please try again later.</p>';
    
    // Show error in all sections
    const sections = ['newReleasesGrid', 'trendingGrid', 'pullListContent', 'staffPicksGrid', 'newsGrid'];
    sections.forEach(sectionId => {
        const container = document.getElementById(sectionId);
        if (container) {
            container.innerHTML = errorMessage;
        }
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to animated characters
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        character.addEventListener('click', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    });
    
    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 