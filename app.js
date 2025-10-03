// Application State
let appState = {
    currentUser: null,
    users: [
        {
            id: "user1",
            username: "alex_dev",
            password: "password123",
            bio: "Full-stack developer who loves coding and coffee ☕",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            followers: ["user2", "user3"],
            following: ["user2", "user4"],
            joinDate: "2024-01-15"
        },
        {
            id: "user2", 
            username: "sarah_designs",
            password: "password123",
            bio: "UI/UX Designer creating beautiful digital experiences ✨",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            followers: ["user1", "user3", "user4"],
            following: ["user1"],
            joinDate: "2024-02-10"
        },
        {
            id: "user3",
            username: "mike_data",
            password: "password123", 
            bio: "Data Scientist | Python enthusiast | Making sense of big data 📊",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            followers: ["user4"],
            following: ["user1", "user2", "user4"],
            joinDate: "2024-01-20"
        },
        {
            id: "user4",
            username: "emma_tech",
            password: "password123",
            bio: "Tech entrepreneur | Building the future one app at a time 🚀",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            followers: ["user2"],
            following: ["user2", "user3"],
            joinDate: "2024-03-05"
        }
    ],
    posts: [
        {
            id: "post1",
            userId: "user2",
            content: "Just finished designing a new mobile app interface! The user experience is everything 📱✨ #UIDesign #MobileFirst",
            timestamp: "2024-12-01T10:30:00Z",
            likes: ["user1", "user3"],
            comments: ["comment1", "comment2"]
        },
        {
            id: "post2", 
            userId: "user1",
            content: "Deployed my first React app today! 🎉 Nothing beats that feeling of seeing your code come to life in production. Next up: learning Next.js!",
            timestamp: "2024-12-01T08:15:00Z",
            likes: ["user2"],
            comments: ["comment3"]
        },
        {
            id: "post3",
            userId: "user3", 
            content: "Working on a fascinating machine learning project analyzing social media trends. The patterns in data never cease to amaze me! 🤖📈",
            timestamp: "2024-11-30T16:45:00Z",
            likes: ["user1", "user2", "user4"],
            comments: []
        },
        {
            id: "post4",
            userId: "user4",
            content: "Just secured funding for our startup! 💰 Excited to scale our team and bring our vision to life. The journey is just beginning! #Startup #Entrepreneurship",
            timestamp: "2024-11-30T14:20:00Z", 
            likes: ["user2", "user3"],
            comments: ["comment4"]
        },
        {
            id: "post5",
            userId: "user1",
            content: "Sunday coding session with coffee and good music 🎵☕ Working on a personal project to track my daily habits. Anyone else love weekend coding?",
            timestamp: "2024-11-29T11:00:00Z",
            likes: ["user3"],
            comments: []
        }
    ],
    comments: [
        {
            id: "comment1",
            postId: "post1", 
            userId: "user1",
            content: "This looks amazing! Love the color palette you chose 🎨",
            timestamp: "2024-12-01T11:00:00Z"
        },
        {
            id: "comment2",
            postId: "post1",
            userId: "user3", 
            content: "Great work! Mobile-first design is definitely the way to go these days",
            timestamp: "2024-12-01T11:15:00Z"
        },
        {
            id: "comment3",
            postId: "post2",
            userId: "user2",
            content: "Congratulations! 🎉 React is such a powerful framework. You'll love Next.js too!",
            timestamp: "2024-12-01T08:45:00Z"
        },
        {
            id: "comment4", 
            postId: "post4",
            userId: "user3",
            content: "Huge congrats! Wishing you all the best with the startup journey 🚀",
            timestamp: "2024-11-30T15:00:00Z"
        }
    ],
    currentPage: 'feed',
    profileUser: null
};

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatTimeAgo(timestamp) {
    try {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return `${seconds}s`;
    } catch (error) {
        return 'now';
    }
}

function getUserById(id) {
    return appState.users.find(user => user.id === id) || null;
}

function getPostById(id) {
    return appState.posts.find(post => post.id === id) || null;
}

function getPostComments(postId) {
    return appState.comments.filter(comment => comment.postId === postId);
}

function getUserPosts(userId) {
    return appState.posts.filter(post => post.userId === userId);
}

function getFeedPosts() {
    if (!appState.currentUser) return [];
    const following = appState.currentUser.following || [];
    return appState.posts
        .filter(post => following.includes(post.userId) || post.userId === appState.currentUser.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function getAllPosts() {
    return [...appState.posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Authentication Functions
function showAuthModal() {
    try {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error showing auth modal:', error);
    }
}

function hideAuthModal() {
    try {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding auth modal:', error);
    }
}

function toggleAuthMode(event) {
    try {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        const title = document.getElementById('auth-title');
        const submitBtn = document.getElementById('auth-submit');
        const switchText = document.getElementById('auth-switch-text');
        const switchBtn = document.getElementById('auth-switch-btn');
        const bioGroup = document.getElementById('bio-group');
        
        if (!title || !submitBtn || !switchText || !switchBtn || !bioGroup) {
            console.error('Missing auth modal elements');
            return;
        }
        
        const isLoginMode = submitBtn.textContent.trim() === 'Sign In';
        
        if (isLoginMode) {
            title.textContent = 'Create Account';
            submitBtn.textContent = 'Sign Up';
            switchText.innerHTML = 'Already have an account? ';
            switchBtn.textContent = 'Sign In';
            bioGroup.classList.remove('hidden');
        } else {
            title.textContent = 'Welcome Back';
            submitBtn.textContent = 'Sign In';
            switchText.innerHTML = "Don't have an account? ";
            switchBtn.textContent = 'Sign Up';
            bioGroup.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error toggling auth mode:', error);
    }
}

function handleAuth(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        
        const usernameInput = document.getElementById('auth-username');
        const passwordInput = document.getElementById('auth-password');
        const bioInput = document.getElementById('auth-bio');
        const submitBtn = document.getElementById('auth-submit');
        
        if (!usernameInput || !passwordInput || !submitBtn) {
            console.error('Missing auth form elements');
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const bio = bioInput ? bioInput.value.trim() : '';
        
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        
        const isSignUp = submitBtn.textContent.trim() === 'Sign Up';
        
        if (isSignUp) {
            // Create new user
            const existingUser = appState.users.find(user => user.username === username);
            if (existingUser) {
                alert('Username already exists');
                return;
            }
            
            const newUser = {
                id: generateId(),
                username,
                password,
                bio: bio || 'New to SocialConnect!',
                avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&r=${Math.random()}`,
                followers: [],
                following: [],
                joinDate: new Date().toISOString().split('T')[0]
            };
            
            appState.users.push(newUser);
            appState.currentUser = newUser;
        } else {
            // Login existing user
            const user = appState.users.find(u => u.username === username && u.password === password);
            if (!user) {
                alert('Invalid username or password');
                return;
            }
            appState.currentUser = user;
        }
        
        // Successfully authenticated
        hideAuthModal();
        showApp();
        switchPage('feed');
        
    } catch (error) {
        console.error('Error during authentication:', error);
        alert('An error occurred during login. Please try again.');
    }
}

function logout() {
    try {
        appState.currentUser = null;
        appState.profileUser = null;
        hideApp();
        showAuthModal();
        
        const form = document.getElementById('auth-form');
        if (form) {
            form.reset();
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

function showApp() {
    try {
        const container = document.getElementById('app-container');
        if (container) {
            container.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error showing app:', error);
    }
}

function hideApp() {
    try {
        const container = document.getElementById('app-container');
        if (container) {
            container.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error hiding app:', error);
    }
}

// Navigation Functions
function switchPage(pageName) {
    try {
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageName) {
                item.classList.add('active');
            }
        });
        
        // Update pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        appState.currentPage = pageName;
        renderCurrentPage();
    } catch (error) {
        console.error('Error switching page:', error);
    }
}

function renderCurrentPage() {
    try {
        switch (appState.currentPage) {
            case 'feed':
                renderFeed();
                break;
            case 'discover':
                renderDiscover();
                break;
            case 'profile':
                renderProfile(appState.profileUser || appState.currentUser);
                break;
        }
    } catch (error) {
        console.error('Error rendering current page:', error);
    }
}

// Post Rendering Functions
function createPostElement(post) {
    try {
        const template = document.getElementById('post-template');
        if (!template) return null;
        
        const postElement = template.content.cloneNode(true);
        
        const author = getUserById(post.userId);
        if (!author) return null;
        
        const isCurrentUser = post.userId === appState.currentUser.id;
        const isLiked = post.likes.includes(appState.currentUser.id);
        const comments = getPostComments(post.id);
        
        // Set post data
        const postDiv = postElement.querySelector('.post');
        if (postDiv) postDiv.dataset.postId = post.id;
        
        const avatar = postElement.querySelector('.post-avatar');
        if (avatar) avatar.src = author.avatar;
        
        const username = postElement.querySelector('.post-username');
        if (username) username.textContent = author.username;
        
        const time = postElement.querySelector('.post-time');
        if (time) time.textContent = formatTimeAgo(post.timestamp);
        
        const text = postElement.querySelector('.post-text');
        if (text) text.textContent = post.content;
        
        const likeCount = postElement.querySelector('.like-count');
        if (likeCount) likeCount.textContent = post.likes.length;
        
        const commentCount = postElement.querySelector('.comment-count');
        if (commentCount) commentCount.textContent = comments.length;
        
        // Handle like status
        const likeBtn = postElement.querySelector('.like-btn');
        const likeIcon = postElement.querySelector('.like-icon');
        if (isLiked && likeBtn && likeIcon) {
            likeBtn.classList.add('liked');
            likeIcon.textContent = '❤️';
        }
        
        // Show delete button for own posts
        if (isCurrentUser) {
            const deleteBtn = postElement.querySelector('.post-delete');
            if (deleteBtn) deleteBtn.classList.remove('hidden');
        }
        
        return postElement;
    } catch (error) {
        console.error('Error creating post element:', error);
        return null;
    }
}

function renderPosts(posts, containerId) {
    try {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        if (posts.length === 0) {
            container.innerHTML = '<div class="card"><div class="card__body"><p>No posts to show.</p></div></div>';
            return;
        }
        
        posts.forEach(post => {
            const postElement = createPostElement(post);
            if (postElement) {
                container.appendChild(postElement);
            }
        });
        
        // Add event listeners after rendering
        setTimeout(() => {
            addPostEventListeners();
        }, 10);
    } catch (error) {
        console.error('Error rendering posts:', error);
    }
}

function renderFeed() {
    const feedPosts = getFeedPosts();
    renderPosts(feedPosts, 'feed-posts');
}

function renderDiscover() {
    const allPosts = getAllPosts();
    renderPosts(allPosts, 'discover-posts');
}

function renderProfile(user) {
    try {
        if (!user) return;
        
        const isCurrentUser = user.id === appState.currentUser.id;
        const isFollowing = appState.currentUser.following.includes(user.id);
        
        // Update profile info safely
        const avatar = document.getElementById('profile-avatar');
        const username = document.getElementById('profile-username');
        const bio = document.getElementById('profile-bio');
        const followingCount = document.getElementById('profile-following-count');
        const followersCount = document.getElementById('profile-followers-count');
        const editBtn = document.getElementById('edit-profile-btn');
        const followBtn = document.getElementById('follow-btn');
        
        if (avatar) avatar.src = user.avatar;
        if (username) username.textContent = user.username;
        if (bio) bio.textContent = user.bio;
        if (followingCount) followingCount.textContent = user.following.length;
        if (followersCount) followersCount.textContent = user.followers.length;
        
        // Show/hide buttons
        if (editBtn && followBtn) {
            if (isCurrentUser) {
                editBtn.classList.remove('hidden');
                followBtn.classList.add('hidden');
            } else {
                editBtn.classList.add('hidden');
                followBtn.classList.remove('hidden');
                followBtn.textContent = isFollowing ? 'Unfollow' : 'Follow';
                followBtn.className = isFollowing ? 'btn btn--outline' : 'btn btn--primary';
            }
        }
        
        // Render user posts
        const userPosts = getUserPosts(user.id);
        renderPosts(userPosts, 'profile-posts');
    } catch (error) {
        console.error('Error rendering profile:', error);
    }
}

// Event Listeners
function addPostEventListeners() {
    try {
        // Like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const postElement = newBtn.closest('.post');
                if (postElement) {
                    toggleLike(postElement.dataset.postId);
                }
            });
        });
        
        // Comment buttons
        document.querySelectorAll('.comment-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const postElement = newBtn.closest('.post');
                if (postElement) {
                    toggleComments(postElement.dataset.postId);
                }
            });
        });
        
        // Username clicks
        document.querySelectorAll('.post-username').forEach(username => {
            const newUsername = username.cloneNode(true);
            username.parentNode.replaceChild(newUsername, username);
            
            newUsername.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const postElement = newUsername.closest('.post');
                if (postElement) {
                    const post = getPostById(postElement.dataset.postId);
                    if (post) {
                        const author = getUserById(post.userId);
                        if (author) {
                            showUserProfile(author);
                        }
                    }
                }
            });
        });
        
    } catch (error) {
        console.error('Error adding post event listeners:', error);
    }
}

function toggleLike(postId) {
    try {
        const post = getPostById(postId);
        if (!post) return;
        
        const userId = appState.currentUser.id;
        const likeIndex = post.likes.indexOf(userId);
        
        if (likeIndex === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }
        
        renderCurrentPage();
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}

function toggleComments(postId) {
    try {
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (!postElement) return;
        
        const commentsSection = postElement.querySelector('.comments-section');
        if (!commentsSection) return;
        
        commentsSection.classList.toggle('hidden');
    } catch (error) {
        console.error('Error toggling comments:', error);
    }
}

function showUserProfile(user) {
    try {
        appState.profileUser = user;
        switchPage('profile');
    } catch (error) {
        console.error('Error showing user profile:', error);
    }
}

function createPost(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        
        const contentInput = document.getElementById('post-content');
        if (!contentInput) return;
        
        const content = contentInput.value.trim();
        if (!content) return;
        
        const newPost = {
            id: generateId(),
            userId: appState.currentUser.id,
            content,
            timestamp: new Date().toISOString(),
            likes: [],
            comments: []
        };
        
        appState.posts.unshift(newPost);
        hideComposeForm();
        renderCurrentPage();
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

function showComposeForm() {
    try {
        const composeForm = document.getElementById('compose-form');
        if (composeForm) composeForm.classList.remove('hidden');
    } catch (error) {
        console.error('Error showing compose form:', error);
    }
}

function hideComposeForm() {
    try {
        const composeForm = document.getElementById('compose-form');
        const postForm = document.getElementById('post-form');
        
        if (composeForm) composeForm.classList.add('hidden');
        if (postForm) postForm.reset();
    } catch (error) {
        console.error('Error hiding compose form:', error);
    }
}

// Initialize App
function initializeApp() {
    try {
        console.log('Initializing SocialConnect app...');
        
        // Initialize auth modal events with error handling
        const authForm = document.getElementById('auth-form');
        if (authForm) {
            authForm.addEventListener('submit', handleAuth);
        }
        
        const authSwitchBtn = document.getElementById('auth-switch-btn');
        if (authSwitchBtn) {
            authSwitchBtn.addEventListener('click', toggleAuthMode);
        }
        
        const closeModal = document.getElementById('close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', (e) => {
                e.preventDefault();
                hideAuthModal();
            });
        }
        
        // Navigation events
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                switchPage(item.dataset.page);
            });
        });
        
        // Logout event
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
        
        // Post composition events
        const composeBtn = document.getElementById('compose-btn');
        if (composeBtn) {
            composeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showComposeForm();
            });
        }
        
        const cancelPost = document.getElementById('cancel-post');
        if (cancelPost) {
            cancelPost.addEventListener('click', (e) => {
                e.preventDefault();
                hideComposeForm();
            });
        }
        
        const postForm = document.getElementById('post-form');
        if (postForm) {
            postForm.addEventListener('submit', createPost);
        }
        
        console.log('App initialized successfully');
        
        // Show auth modal initially
        showAuthModal();
        
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}