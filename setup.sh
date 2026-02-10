#!/bin/bash

echo "🚀 Setting up Learning Tracker development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if PostgreSQL is available
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is required but not installed. Please install PostgreSQL and try again."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your database credentials"
else
    echo "✅ Environment file already exists"
fi

# Check if database exists and is accessible
echo "🗄️ Checking database connection..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set in environment. Please configure your database."
else
    echo "✅ Database URL configured"
fi

echo "🏗️ Generating database schema..."
npm run db:generate

echo "🔄 Running database migrations..."
npm run db:migrate

echo "✅ Setup complete! Run 'npm run dev' to start the development server."
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env.local with your database credentials"
echo "   2. Run 'npm run dev' to start development server"
echo "   3. Visit http://localhost:3000"
echo ""
echo "📚 Useful commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run db:studio    - Open database studio"
echo "   npm run lint         - Run linting"