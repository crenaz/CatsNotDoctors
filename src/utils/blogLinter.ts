export interface LintIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  location?: string;
}

export interface LintResult {
  slug: string;
  title: string;
  issues: LintIssue[];
}

export function lintBlogPost(post: any): LintResult {
  const issues: LintIssue[] = [];
  
  // Check title length
  if (post.data.title.length < 20) {
    issues.push({
      type: 'warning',
      message: 'Title might be too short for SEO (recommended: 20-60 characters)',
      location: 'title'
    });
  }
  if (post.data.title.length > 60) {
    issues.push({
      type: 'warning',
      message: 'Title might be too long for SEO (recommended: 20-60 characters)',
      location: 'title'
    });
  }

  // Check description
  if (!post.data.description) {
    issues.push({
      type: 'error',
      message: 'Missing description',
      location: 'description'
    });
  } else if (post.data.description.length < 50) {
    issues.push({
      type: 'warning',
      message: 'Description might be too short for SEO (recommended: 50-160 characters)',
      location: 'description'
    });
  }

  // Check tags
  if (!post.data.tags || post.data.tags.length === 0) {
    issues.push({
      type: 'warning',
      message: 'No tags specified',
      location: 'tags'
    });
  }

  // Check publish date
  if (!post.data.publishDate) {
    issues.push({
      type: 'error',
      message: 'Missing publish date',
      location: 'publishDate'
    });
  }

  // Check author
  if (!post.data.author) {
    issues.push({
      type: 'error',
      message: 'Missing author',
      location: 'author'
    });
  }

  // Check content length (if available)
  if (post.body.length < 1000) {
    issues.push({
      type: 'warning',
      message: 'Content might be too short for a blog post (less than 1000 characters)',
      location: 'content'
    });
  }

  return {
    slug: post.slug,
    title: post.data.title,
    issues
  };
}