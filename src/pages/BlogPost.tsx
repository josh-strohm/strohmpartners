import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug, formatDate } from '@/data/blogPosts';
import styles from './BlogPost.module.css';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h1>Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>
      </div>
    );
  }

  // Simple markdown-to-HTML conversion
  const renderContent = (content: string) => {
    let html = content
      // Headers
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Unordered lists
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      // Horizontal rules
      .replace(/^---$/gm, '<hr />')
      // Paragraphs (lines not starting with <)
      .replace(/^(?!<)(.*$)/gm, (match) => {
        if (match.trim() === '') return '';
        return `<p>${match}</p>`;
      })
      // Wrap consecutive <li> in <ul>
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    return html;
  };

  return (
    <motion.div
      className={styles.blogPost}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <article>
        <header className={styles.header}>
          <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>
          
          <div className={styles.meta}>
            <time className={styles.date}>{formatDate(post.date)}</time>
            <span className={styles.author}>{post.author}</span>
          </div>
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />
      </article>

      <div className={styles.footer}>
        <Link to="/blog" className={styles.backLink}>← Back to Blog</Link>
      </div>
    </motion.div>
  );
}
