# Learning Tracker

A comprehensive learning platform for progressive mastery of any subject. Track your progress, visualize knowledge connections, and achieve mastery through spaced repetition and intelligent analytics.

## Features

- **Progress Tracking**: Detailed analytics across learning tracks, modules, and resources
- **Knowledge Graphs**: Interactive visualization of concept relationships
- **Spaced Repetition**: Intelligent review scheduling for long-term retention
- **Multi-Format Resources**: Support for articles, videos, podcasts, books, and papers
- **Personalized Plans**: AI-driven daily study recommendations
- **Analytics Dashboard**: Comprehensive insights into learning habits and progress

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI with custom styling
- **Visualizations**: D3.js for knowledge graphs
- **Deployment**: AWS (under $100/month budget)

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- AWS account (for deployment)

### Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd learning-tracker
   npm install
   ```

2. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb learning_tracker
   
   # Copy environment variables
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

3. **Run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for session encryption
- `NEXTAUTH_URL`: Your app's URL (http://localhost:3000 for development)

## Database Schema

The application uses a comprehensive schema designed for learning analytics:

- **Users**: User accounts and profiles
- **Learning Tracks**: Top-level learning paths (e.g., "Biotechnology Deep Dive")
- **Modules**: Organized sections within tracks
- **Resources**: Individual learning materials (articles, videos, etc.)
- **Sessions**: Study session tracking with notes and ratings
- **Progress**: Granular progress tracking with mastery scores
- **Concepts**: Knowledge graph nodes with relationships
- **Analytics**: Computed learning analytics and insights

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── dashboard/       # Main application dashboard
│   ├── tracks/          # Learning track pages
│   └── auth/           # Authentication pages
├── components/         # React components
│   ├── ui/             # Base UI components (Radix + custom)
│   └── features/       # Feature-specific components
├── lib/               # Utilities and configurations
│   ├── schema.ts      # Database schema (Drizzle ORM)
│   ├── db.ts          # Database connection
│   └── utils.ts       # Utility functions
└── types/             # TypeScript type definitions
```

## Deployment

### AWS Infrastructure (Budget: <$100/month)

Recommended AWS setup for cost-effective deployment:

1. **Compute**: 
   - AWS Lightsail ($10/month) or ECS Fargate ($15-25/month)
   - Alternative: Vercel Pro ($20/month) for frontend + AWS RDS

2. **Database**: 
   - RDS PostgreSQL t3.micro ($15-20/month)
   - Alternative: PlanetScale or Supabase ($10-25/month)

3. **Storage**: 
   - S3 + CloudFront for assets ($5-10/month)

4. **Total**: $35-65/month with room for growth

### Deployment Steps

1. **Database Setup**
   ```bash
   # Create RDS PostgreSQL instance
   aws rds create-db-instance --db-instance-identifier learning-tracker-db \
     --db-instance-class db.t3.micro --engine postgres
   ```

2. **Container Deployment** (if using ECS)
   ```bash
   # Build and push Docker image
   docker build -t learning-tracker .
   # Deploy to ECS/Fargate
   ```

3. **Environment Configuration**
   - Set production environment variables
   - Configure database connection
   - Set up SSL certificates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Roadmap

### Phase 1: Core Functionality ✅
- [x] Database schema and basic CRUD operations
- [x] User authentication and authorization
- [ ] Basic progress tracking
- [ ] Resource management

### Phase 2: Advanced Features 
- [ ] Knowledge graph visualization
- [ ] Spaced repetition algorithm
- [ ] Analytics dashboard
- [ ] Study plan generation

### Phase 3: AI Integration
- [ ] AI-powered content recommendations
- [ ] Automated concept extraction from resources
- [ ] Intelligent study scheduling
- [ ] Personalized learning paths

### Phase 4: Social Features
- [ ] Public learning tracks
- [ ] Community features
- [ ] Collaborative learning
- [ ] Progress sharing

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: [docs/](./docs/)
- Issues: [GitHub Issues](../../issues)
- Email: support@learningtracker.com