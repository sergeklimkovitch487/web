// DOM elements
const blogContainer = document.getElementById('blogContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initial display settings
let visibleItems = 8;
const itemsPerLoad = 4;

// Function to create blog card element
function createBlogCardElement(blog) {
	const card = document.createElement('div');
	card.className = 'blog-card';
	card.innerHTML = `
		<a href="${blog.url}" class="blog-link">
			<img src="${blog.image}" alt="${blog.title}" class="blog-image">
			<div class="blog-content">
				<h3 class="blog-title">${blog.title}</h3>
			</div>
		</a>
	`;
	return card;

}

// Function to load initial blogs
function loadInitialBlogs() {
	const fragment = document.createDocumentFragment();

	// Get initial blogs to display
	const initialBlogs = dataInput.slice(0, visibleItems);

	// Create and append cards
	initialBlogs.forEach(blog => {
		fragment.appendChild(createBlogCardElement(blog));
	});

	blogContainer.appendChild(fragment);

	// Hide load more button if all blogs are visible
	updateLoadMoreButton();
}

// Function to load more blogs
function loadMoreBlogs() {
	const fragment = document.createDocumentFragment();
	const currentLength = blogContainer.children.length;

	// Get next set of blogs
	const nextBlogs = dataInput.slice(currentLength, currentLength + itemsPerLoad);

	// Create and append new cards
	nextBlogs.forEach(blog => {
		fragment.appendChild(createBlogCardElement(blog));
	});

	blogContainer.appendChild(fragment);

	// Update visible items count
	visibleItems = blogContainer.children.length;

	// Update button state
	updateLoadMoreButton();

	// Smooth scroll to show new content
	setTimeout(() => {
		window.scrollBy({
			top: 300,
			behavior: 'smooth'
		});
	}, 100);
}

// Function to update load more button state
function updateLoadMoreButton() {
	if (blogContainer.children.length >= dataInput.length) {
		loadMoreBtn.disabled = true;
		loadMoreBtn.textContent = 'No More Posts';
	}
}

// Event listeners
loadMoreBtn.addEventListener('click', loadMoreBlogs);

// Initial load
loadInitialBlogs();