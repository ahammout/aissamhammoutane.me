export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export const articles: Article[] = [
  {
    id: "building-scalable-apis",
    title: "Building Scalable APIs with Node.js",
    excerpt: "Learn the best practices for creating robust and scalable REST APIs using Node.js and modern architectural patterns.",
    content: `
# Building Scalable APIs with Node.js

When building APIs that need to handle thousands of requests, architecture matters. Here's what I've learned from years of backend development.

## The Foundation

Start with a solid foundation. Use TypeScript for type safety, and structure your code in layers:

- **Controllers** - Handle HTTP requests/responses
- **Services** - Business logic
- **Repositories** - Data access

## Caching Strategies

Implement Redis for session management and frequently accessed data. This alone can reduce database load by 70%.

## Rate Limiting

Protect your APIs with intelligent rate limiting. Not just by IP, but by user tier and endpoint sensitivity.

## Monitoring

You can't improve what you can't measure. Implement proper logging with correlation IDs across your microservices.

The path to scalability is iterative. Start simple, measure, and optimize based on real data.
    `,
    date: "2024-01-15",
    readTime: "5 min",
    tags: ["Node.js", "Backend", "Architecture"],
  },
  {
    id: "art-of-clean-code",
    title: "The Art of Clean Code",
    excerpt: "Writing code that tells a story. How to create maintainable, readable, and elegant solutions.",
    content: `
# The Art of Clean Code

Code is read more often than it's written. This simple truth should guide every line you write.

## Naming Matters

A variable named \`d\` tells you nothing. A variable named \`elapsedTimeInDays\` tells you everything. Be generous with characters.

## Functions Should Do One Thing

If you need to use "and" to describe what a function does, it's doing too much. Split it.

## Comments Are a Last Resort

Good code is self-documenting. If you need a comment to explain what code does, consider rewriting the code instead.

## The Boy Scout Rule

Leave the codebase cleaner than you found it. Every commit is an opportunity to improve.

Writing clean code is not about following rules blindly—it's about caring for the developers who will read your code tomorrow.
    `,
    date: "2024-02-20",
    readTime: "4 min",
    tags: ["Clean Code", "Best Practices", "Development"],
  },
  {
    id: "embracing-typescript",
    title: "Embracing TypeScript in 2024",
    excerpt: "Why TypeScript has become essential for modern web development and how to leverage its full potential.",
    content: `
# Embracing TypeScript in 2024

TypeScript is no longer optional—it's the industry standard for serious JavaScript development.

## Type Safety Saves Time

Yes, you write more code upfront. But you catch bugs at compile time instead of production. The trade-off is worth it.

## Better IDE Experience

With TypeScript, your IDE becomes your pair programmer. Autocomplete, refactoring, and navigation just work.

## Documentation Built In

Types serve as living documentation. New team members can understand your codebase faster.

## Advanced Patterns

Explore generics, conditional types, and template literal types. TypeScript's type system is Turing complete—use its power wisely.

The future is typed. Embrace it.
    `,
    date: "2024-03-10",
    readTime: "6 min",
    tags: ["TypeScript", "JavaScript", "Frontend"],
  },
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find((article) => article.id === id);
};
