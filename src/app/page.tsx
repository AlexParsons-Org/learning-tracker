import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning Tracker
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Master Any Subject with
            <br />
            Progressive Learning
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your learning journey, visualize knowledge connections, and achieve mastery 
            through spaced repetition and intelligent progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to learn effectively
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualize your learning journey with detailed progress analytics, 
                completion rates, and time tracking across all your subjects.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧠 Knowledge Graphs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                See how concepts connect with interactive knowledge graphs that 
                help you understand relationships between topics and identify learning gaps.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔄 Spaced Repetition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Never forget what you've learned with intelligent review scheduling 
                based on proven spaced repetition algorithms.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📚 Multi-Format Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize articles, videos, podcasts, books, and papers in one place. 
                Track progress across all types of learning materials.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Personalized Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get customized daily study plans based on your goals, available time, 
                and learning preferences.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your learning habits, identify patterns, and optimize 
                your study sessions for maximum effectiveness.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perfect for any learning goal
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🧬
              </div>
              <h3 className="text-xl font-semibold mb-2">Biotechnology</h3>
              <p className="text-gray-600">
                Master CRISPR, mRNA technology, and cutting-edge gene editing techniques 
                with structured learning paths.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                💻
              </div>
              <h3 className="text-xl font-semibold mb-2">Programming</h3>
              <p className="text-gray-600">
                Learn new programming languages, frameworks, and computer science 
                concepts with hands-on project tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Science</h3>
              <p className="text-gray-600">
                Build expertise in machine learning, statistics, and data analysis 
                through progressive skill building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to supercharge your learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners who are achieving their goals faster with structured, 
            data-driven learning.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="mb-4">
              Start Your Learning Journey
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Free to start • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">LT</span>
              </div>
              <span className="font-semibold">Learning Tracker</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 Learning Tracker. Built with Next.js & TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}