'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LearningTrack {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
  completedModules: number;
  totalModules: number;
  tags: string[];
  isTemplate?: boolean;
}

export default function LearningTracksPage() {
  const [tracks, setTracks] = useState<LearningTrack[]>([]);
  const [templates, setTemplates] = useState<LearningTrack[]>([]);

  useEffect(() => {
    // Mock data for demo - replace with API calls
    setTracks([
      // User's personal tracks would go here
    ]);

    setTemplates([
      {
        id: 'biotech-deep-dive',
        title: 'Biotechnology Deep Dive',
        description: 'Master CRISPR, mRNA technology, gene editing, and cutting-edge biotechnology. 12-week comprehensive curriculum from basics to advanced applications.',
        difficulty: 'intermediate',
        estimatedDuration: 84, // days
        completedModules: 0,
        totalModules: 12,
        tags: ['CRISPR', 'mRNA', 'Gene Editing', 'Biotech', 'Science'],
        isTemplate: true,
      },
      {
        id: 'machine-learning-fundamentals',
        title: 'Machine Learning Fundamentals',
        description: 'Learn the foundations of machine learning, from linear regression to neural networks. Perfect for beginners.',
        difficulty: 'beginner',
        estimatedDuration: 60,
        completedModules: 0,
        totalModules: 8,
        tags: ['Python', 'ML', 'AI', 'Data Science', 'Math'],
        isTemplate: true,
      },
      {
        id: 'web-development-fullstack',
        title: 'Full-Stack Web Development',
        description: 'Build modern web applications with React, Node.js, and databases. From frontend to deployment.',
        difficulty: 'intermediate',
        estimatedDuration: 90,
        completedModules: 0,
        totalModules: 15,
        tags: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Web Dev'],
        isTemplate: true,
      },
    ]);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (days: number) => {
    if (days < 7) return `${days} days`;
    const weeks = Math.round(days / 7);
    return `${weeks} weeks`;
  };

  const TrackCard = ({ track, showProgress = false }: { track: LearningTrack, showProgress?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{track.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(track.difficulty)}`}>
                {track.difficulty}
              </span>
              <span className="text-sm text-gray-500">{formatDuration(track.estimatedDuration)}</span>
            </div>
          </div>
          {showProgress && (
            <div className="text-right">
              <div className="text-lg font-semibold">
                {Math.round((track.completedModules / track.totalModules) * 100)}%
              </div>
              <div className="text-sm text-gray-500">
                {track.completedModules}/{track.totalModules} modules
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {track.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {track.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {tag}
            </span>
          ))}
          {track.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{track.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/tracks/${track.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              {track.isTemplate ? 'Preview' : 'Continue'}
            </Button>
          </Link>
          {track.isTemplate ? (
            <Button 
              className="flex-1"
              onClick={() => {
                // Add template to user's tracks
                console.log('Creating track from template:', track.id);
              }}
            >
              Start Track
            </Button>
          ) : (
            <Button variant="secondary" className="flex-1">
              View Progress
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Learning Tracks</h1>
          <p className="text-gray-600 mt-2">
            Organize your learning journey with structured tracks
          </p>
        </div>
        <Link href="/dashboard/tracks/new">
          <Button size="lg">Create Custom Track</Button>
        </Link>
      </div>

      {/* User's Active Tracks */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Learning Tracks</h2>
        {tracks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">No learning tracks yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start your learning journey by creating a custom track or choosing from our curated templates below.
              </p>
              <div className="space-y-2">
                <Link href="/dashboard/tracks/new">
                  <Button size="lg">Create Custom Track</Button>
                </Link>
                <div className="text-sm text-gray-500">
                  or explore templates below
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} showProgress />
            ))}
          </div>
        )}
      </section>

      {/* Template Tracks */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Popular Learning Tracks</h2>
          <Button variant="ghost" size="sm">View All Templates</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section className="bg-gray-50 -mx-8 px-8 py-8 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Science & Tech', emoji: '🧬', count: 12 },
            { name: 'Programming', emoji: '💻', count: 24 },
            { name: 'Business', emoji: '📊', count: 8 },
            { name: 'Languages', emoji: '🌍', count: 15 },
            { name: 'Arts & Design', emoji: '🎨', count: 10 },
            { name: 'Health & Fitness', emoji: '💪', count: 6 },
            { name: 'Personal Growth', emoji: '🌱', count: 9 },
            { name: 'Finance', emoji: '💰', count: 7 },
          ].map((category) => (
            <div 
              key={category.name}
              className="bg-white p-4 rounded-lg border hover:shadow-sm cursor-pointer transition-shadow"
            >
              <div className="text-2xl mb-2">{category.emoji}</div>
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs text-gray-500">{category.count} tracks</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}