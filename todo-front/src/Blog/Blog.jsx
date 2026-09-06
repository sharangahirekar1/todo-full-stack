import React, { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import './Blog.css';

const demoBlogs = [
    {
        id: 1,
        category: 'Focus',
        title: 'A calmer way to plan your week',
        excerpt: 'A practical reset for turning a crowded list into a small set of promises you can actually keep.',
        author: 'Maya Chen',
        date: 'Sep 04, 2026',
        readTime: '5 min read',
        accent: 'coral',
        featured: true,
    },
    {
        id: 2,
        category: 'Habits',
        title: 'The two-minute start line',
        excerpt: 'Why making the first action tiny is often more effective than finding more motivation.',
        author: 'Jon Bell',
        date: 'Aug 28, 2026',
        readTime: '4 min read',
        accent: 'sun',
    },
    {
        id: 3,
        category: 'Workflows',
        title: 'Make space for deep work',
        excerpt: 'A simple rhythm for protecting your best thinking when the day keeps asking for attention.',
        author: 'Nia Okafor',
        date: 'Aug 21, 2026',
        readTime: '7 min read',
        accent: 'mint',
    },
    {
        id: 4,
        category: 'Reflection',
        title: 'Your list is not your life',
        excerpt: 'A gentle reminder that progress is more than the number of boxes you check.',
        author: 'Maya Chen',
        date: 'Aug 14, 2026',
        readTime: '3 min read',
        accent: 'ink',
    },
];

const categories = ['All stories', 'Focus', 'Habits', 'Workflows', 'Reflection'];

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All stories');
    const [search, setSearch] = useState('');

    const filteredBlogs = useMemo(() => {
        const query = search.trim().toLowerCase();
        return demoBlogs.filter((blog) => {
            const matchesCategory = activeCategory === 'All stories' || blog.category === activeCategory;
            const matchesSearch = !query || `${blog.title} ${blog.excerpt} ${blog.category}`.toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, search]);

    const featuredBlog = demoBlogs.find((blog) => blog.featured);
    const stories = filteredBlogs.filter((blog) => blog.id !== featuredBlog.id);
    const showFeatured = activeCategory === 'All stories' && !search.trim();

    return (
        <div className="blog-page">
            <section className="blog-hero">
                <div className="blog-hero-copy">
                    <p className="blog-kicker">The TODO journal</p>
                    <h1>Small ideas for making room for what matters.</h1>
                    <p className="blog-intro">Notes on focus, habits, and building a life that feels a little more intentional.</p>
                </div>
                <div className="blog-hero-mark" aria-hidden="true">
                    <span>✦</span>
                </div>
            </section>

            <section className="blog-toolbar" aria-label="Blog filters">
                <div className="blog-categories">
                    {categories.map((category) => (
                        <button
                            className={activeCategory === category ? 'category-button active' : 'category-button'}
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            type="button"
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <label className="blog-search">
                    <SearchIcon fontSize="small" />
                    <span className="sr-only">Search stories</span>
                    <input
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search stories"
                        type="search"
                        value={search}
                    />
                </label>
            </section>

            <div className="blog-content">
                {showFeatured && (
                    <article className={`featured-story accent-${featuredBlog.accent}`}>
                        <div className="story-illustration" aria-hidden="true">
                            <span className="illustration-sun" />
                            <span className="illustration-line line-one" />
                            <span className="illustration-line line-two" />
                            <span className="illustration-block" />
                        </div>
                        <div className="featured-copy">
                            <div className="story-meta"><span>{featuredBlog.category}</span><span>Featured story</span></div>
                            <h2>{featuredBlog.title}</h2>
                            <p>{featuredBlog.excerpt}</p>
                            <div className="story-footer">
                                <span>By {featuredBlog.author} · {featuredBlog.date}</span>
                                <button className="read-link" type="button">Read story <ArrowForwardIcon fontSize="small" /></button>
                            </div>
                        </div>
                    </article>
                )}

                <div className="stories-heading">
                    <h2>{search || activeCategory !== 'All stories' ? 'Matching stories' : 'Latest from the journal'}</h2>
                    <span>{filteredBlogs.length} {filteredBlogs.length === 1 ? 'story' : 'stories'}</span>
                </div>

                {stories.length > 0 ? (
                    <div className="story-grid">
                        {stories.map((blog) => (
                            <article className="story-card" key={blog.id}>
                                <div className={`story-card-art accent-${blog.accent}`} aria-hidden="true"><span>✦</span></div>
                                <div className="story-card-body">
                                    <div className="story-meta"><span>{blog.category}</span><BookmarkBorderIcon fontSize="small" /></div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.excerpt}</p>
                                    <div className="story-card-footer">
                                        <span>{blog.author} · {blog.date}</span>
                                        <span className="read-time"><AccessTimeIcon fontSize="small" />{blog.readTime}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-stories"><h3>No stories found</h3><p>Try another search or choose a different topic.</p></div>
                )}
            </div>
        </div>
    );
};

export default Blog;