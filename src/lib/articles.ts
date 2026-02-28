export interface Article {
  id: string;
  title: string;
  titleFr: string;
  excerpt: string;
  excerptFr: string;
  content: string;
  contentFr: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "building-scalable-apis",
    title: "Building Scalable APIs with Node.js",
    titleFr: "Construire des APIs scalables avec Node.js",
    excerpt: "Learn the best practices for creating robust and scalable REST APIs using Node.js and modern architectural patterns.",
    excerptFr: "Apprenez les meilleures pratiques pour créer des APIs REST robustes et scalables avec Node.js et des patterns architecturaux modernes.",
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
    contentFr: `
# Construire des APIs scalables avec Node.js

Lorsqu'on construit des APIs capables de gérer des milliers de requêtes, l'architecture est essentielle. Voici ce que j'ai appris au fil des années de développement backend.

## Les fondations

Commencez avec des bases solides. Utilisez TypeScript pour la sécurité des types, et structurez votre code en couches :

- **Contrôleurs** - Gestion des requêtes/réponses HTTP
- **Services** - Logique métier
- **Repositories** - Accès aux données

## Stratégies de cache

Implémentez Redis pour la gestion des sessions et les données fréquemment consultées. Cela seul peut réduire la charge de la base de données de 70%.

## Limitation de débit

Protégez vos APIs avec une limitation de débit intelligente. Pas seulement par IP, mais par niveau d'utilisateur et sensibilité de l'endpoint.

## Surveillance

On ne peut pas améliorer ce qu'on ne peut pas mesurer. Implémentez un logging approprié avec des IDs de corrélation à travers vos microservices.

Le chemin vers la scalabilité est itératif. Commencez simplement, mesurez, et optimisez en fonction de données réelles.
    `,
    date: "2024-01-15",
    readTime: "5 min",
    tags: ["Node.js", "Backend", "Architecture"],
  },
  {
    id: "art-of-clean-code",
    title: "The Art of Clean Code",
    titleFr: "L'art du code propre",
    excerpt: "Writing code that tells a story. How to create maintainable, readable, and elegant solutions.",
    excerptFr: "Écrire du code qui raconte une histoire. Comment créer des solutions maintenables, lisibles et élégantes.",
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

Writing clean code is not about following rules blindly, it's about caring for the developers who will read your code tomorrow.
    `,
    contentFr: `
# L'art du code propre

Le code est lu bien plus souvent qu'il n'est écrit. Cette simple vérité devrait guider chaque ligne que vous écrivez.

## Le nommage compte

Une variable nommée \`d\` ne dit rien. Une variable nommée \`elapsedTimeInDays\` dit tout. Soyez généreux avec les caractères.

## Les fonctions doivent faire une seule chose

Si vous devez utiliser "et" pour décrire ce que fait une fonction, elle en fait trop. Séparez-la.

## Les commentaires sont un dernier recours

Un bon code se documente lui-même. Si vous avez besoin d'un commentaire pour expliquer ce que fait le code, envisagez de réécrire le code à la place.

## La règle du scout

Laissez la base de code plus propre que vous ne l'avez trouvée. Chaque commit est une opportunité d'amélioration.

Écrire du code propre ne consiste pas à suivre des règles aveuglément, c'est prendre soin des développeurs qui liront votre code demain.
    `,
    date: "2024-02-20",
    readTime: "4 min",
    tags: ["Clean Code", "Best Practices", "Development"],
  },
  {
    id: "embracing-typescript",
    title: "Embracing TypeScript in 2024",
    titleFr: "Adopter TypeScript en 2024",
    excerpt: "Why TypeScript has become essential for modern web development and how to leverage its full potential.",
    excerptFr: "Pourquoi TypeScript est devenu essentiel pour le développement web moderne et comment exploiter tout son potentiel.",
    content: `
# Embracing TypeScript in 2024

TypeScript is no longer optional, it's the industry standard for serious JavaScript development.

## Type Safety Saves Time

Yes, you write more code upfront. But you catch bugs at compile time instead of production. The trade-off is worth it.

## Better IDE Experience

With TypeScript, your IDE becomes your pair programmer. Autocomplete, refactoring, and navigation just work.

## Documentation Built In

Types serve as living documentation. New team members can understand your codebase faster.

## Advanced Patterns

Explore generics, conditional types, and template literal types. TypeScript's type system is Turing complete, use its power wisely.

The future is typed. Embrace it.
    `,
    contentFr: `
# Adopter TypeScript en 2024

TypeScript n'est plus optionnel, c'est le standard de l'industrie pour le développement JavaScript sérieux.

## La sécurité des types fait gagner du temps

Oui, vous écrivez plus de code au départ. Mais vous détectez les bugs à la compilation plutôt qu'en production. Le compromis en vaut la peine.

## Meilleure expérience IDE

Avec TypeScript, votre IDE devient votre pair programmeur. L'autocomplétion, le refactoring et la navigation fonctionnent parfaitement.

## Documentation intégrée

Les types servent de documentation vivante. Les nouveaux membres de l'équipe comprennent votre base de code plus rapidement.

## Patterns avancés

Explorez les génériques, les types conditionnels et les types de littéraux de template. Le système de types de TypeScript est Turing-complet, utilisez sa puissance judicieusement.

L'avenir est typé. Adoptez-le.
    `,
    date: "2024-03-10",
    readTime: "6 min",
    tags: ["TypeScript", "JavaScript", "Frontend"],
  },
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find((article) => article.id === id);
};
