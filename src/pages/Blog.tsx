import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts, formatDate } from '@/data/blogPosts';
import styles from './Blog.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export function Blog() {
  return (
    <div className={styles.main}>
      <div className={styles.blogPage}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.heroTitle}>Blog</h1>
        <p className={styles.heroSubtitle}>
          Practical insights on AI, automation, and growing your business
        </p>
      </motion.div>

      <motion.div
        className={styles.postList}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.slug}
            className={styles.postCard}
            variants={itemVariants}
          >
            <div className={styles.postMeta}>
              <time className={styles.postDate}>{formatDate(post.date)}</time>
              <span className={styles.postAuthor}>{post.author}</span>
            </div>
            
            <h2 className={styles.postTitle}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            
            <div className={styles.postFooter}>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <Link to={`/blog/${post.slug}`} className={styles.readMore}>
                Read more →
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
