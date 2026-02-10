'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Module {
  id: string;
  title: string;
  description: string;
  week: number;
  estimatedDays: number;
  resources: Resource[];
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'podcast' | 'paper' | 'interactive';
  url?: string;
  estimatedMinutes: number;
  description: string;
  isCompleted: boolean;
}

export default function BiotechDeepDivePage() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  const modules: Module[] = [
    {
      id: 'foundations-week1',
      title: 'DNA, RNA & Protein Basics',
      description: 'Understanding the fundamental building blocks of molecular biology',
      week: 1,
      estimatedDays: 7,
      isCompleted: false,
      isUnlocked: true,
      resources: [
        {
          id: 'dna-intro-khan',
          title: 'Introduction to DNA - Khan Academy',
          type: 'video',
          url: 'https://khanacademy.org',
          estimatedMinutes: 45,
          description: 'Comprehensive overview of DNA structure and function',
          isCompleted: false,
        },
        {
          id: 'dna-replication',
          title: 'DNA Replication Process',
          type: 'video',
          estimatedMinutes: 30,
          description: 'How DNA copies itself during cell division',
          isCompleted: false,
        },
        {
          id: 'central-dogma',
          title: 'Central Dogma of Molecular Biology',
          type: 'article',
          estimatedMinutes: 20,
          description: 'Nature Education primer on genetic information flow',
          isCompleted: false,
        }
      ]
    },
    {
      id: 'gene-expression-week2',
      title: 'Gene Expression & Regulation',
      description: 'How genes are turned on and off to create different cell types',
      week: 2,
      estimatedDays: 7,
      isCompleted: false,
      isUnlocked: true,
      resources: [
        {
          id: 'transcription-translation',
          title: 'Transcription and Translation Series',
          type: 'video',
          estimatedMinutes: 60,
          description: 'Khan Academy series on protein synthesis',
          isCompleted: false,
        },
        {
          id: 'gene-regulation',
          title: 'Gene Regulation Mechanisms',
          type: 'video',
          estimatedMinutes: 40,
          description: 'Professor Dave Explains regulatory systems',
          isCompleted: false,
        },
        {
          id: 'epigenetics-overview',
          title: 'Epigenetics Overview',
          type: 'article',
          estimatedMinutes: 25,
          description: 'NIH primer on epigenetic modifications',
          isCompleted: false,
        }
      ]
    },
    {
      id: 'modern-genetics-week3',
      title: 'Modern Genetics',
      description: 'Contemporary understanding of genetics and genomics',
      week: 3,
      estimatedDays: 7,
      isCompleted: false,
      isUnlocked: false,
      resources: [
        {
          id: 'genetics-evolution-course',
          title: 'Introduction to Genetics and Evolution',
          type: 'video',
          estimatedMinutes: 120,
          description: 'Duke University Coursera module selection',
          isCompleted: false,
        },
        {
          id: 'genome-project-legacy',
          title: 'Human Genome Project Legacy',
          type: 'article',
          estimatedMinutes: 30,
          description: 'Nature article series on genomics impact',
          isCompleted: false,
        }
      ]
    },
    {
      id: 'crispr-basics-week4',
      title: 'CRISPR Fundamentals',
      description: 'Introduction to the revolutionary gene editing tool',
      week: 4,
      estimatedDays: 7,
      isCompleted: false,
      isUnlocked: false,
      resources: [
        {
          id: 'crispr-kurzgesagt',
          title: 'CRISPR Explained - Kurzgesagt',
          type: 'video',
          estimatedMinutes: 50,
          description: 'Popular science explanation of CRISPR technology',
          isCompleted: false,
        },
        {
          id: 'crispr-broad-institute',
          title: 'CRISPR-Cas9: A Revolutionary Gene-Editing Tool',
          type: 'article',
          estimatedMinutes: 35,
          description: 'Broad Institute comprehensive primer',
          isCompleted: false,
        },
        {
          id: 'gene-doctors-podcast',
          title: 'The Gene Doctors - CRISPR Episodes',
          type: 'podcast',
          estimatedMinutes: 90,
          description: 'BBC podcast series on CRISPR applications',
          isCompleted: false,
        }
      ]
    }
    // More modules would continue here...
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'podcast': return '🎧';
      case 'paper': return '📋';
      case 'interactive': return '🎮';
      default: return '📄';
    }
  };

  const completedModules = modules.filter(m => m.isCompleted).length;
  const progressPercentage = Math.round((completedModules / modules.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/dashboard/tracks" className="text-sm text-gray-500 hover:text-gray-700 mb-2 block">
            ← Back to Learning Tracks
          </Link>
          <h1 className="text-3xl font-bold">Biotechnology Deep Dive</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Master CRISPR, mRNA technology, gene editing, and cutting-edge biotechnology. 
            A comprehensive 12-week journey from molecular biology fundamentals to advanced applications.
          </p>
        </div>
        {!isEnrolled ? (
          <Button size="lg" onClick={() => setIsEnrolled(true)}>
            Start Learning Track
          </Button>
        ) : (
          <Button size="lg" variant="outline">
            Continue Learning
          </Button>
        )}
      </div>

      {/* Progress Overview */}
      {isEnrolled && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your advancement through the biotechnology curriculum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedModules}/12</div>
                <div className="text-sm text-gray-600">Modules Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0h</div>
                <div className="text-sm text-gray-600">Study Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Path */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Learning Path</h2>
        <div className="space-y-6">
          {modules.slice(0, 4).map((module, index) => (
            <Card key={module.id} className={`${!module.isUnlocked && !isEnrolled ? 'opacity-50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      module.isCompleted ? 'bg-green-500' : 
                      module.isUnlocked || isEnrolled ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      {module.isCompleted ? '✓' : index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>Week {module.week} • {module.estimatedDays} days</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {module.isUnlocked || isEnrolled ? (
                      <Button variant="outline" size="sm">
                        {module.isCompleted ? 'Review' : 'Start Module'}
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{module.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">Module Content</h4>
                  {module.resources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getResourceIcon(resource.type)}</span>
                        <div>
                          <div className="font-medium text-sm">{resource.title}</div>
                          <div className="text-xs text-gray-500">{resource.estimatedMinutes} minutes • {resource.type}</div>
                        </div>
                      </div>
                      {resource.isCompleted && (
                        <div className="text-green-500">✓</div>
                      )}
                    </div>
                  ))}
                  {module.resources.length > 3 && (
                    <div className="text-xs text-gray-500 pl-3">
                      +{module.resources.length - 3} more resources
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Show remaining modules preview */}
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <div className="text-gray-500">
                <div className="text-lg font-medium mb-2">8 More Modules</div>
                <div className="text-sm">
                  Including CRISPR Deep Dive, mRNA Technology, Advanced Gene Editing, 
                  and Cutting-Edge Applications
                </div>
                {!isEnrolled && (
                  <Button className="mt-4" onClick={() => setIsEnrolled(true)}>
                    Start Track to Unlock All Modules
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Track Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>What You'll Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                'Molecular biology fundamentals (DNA, RNA, proteins)',
                'CRISPR-Cas9 mechanism and applications',
                'mRNA technology beyond vaccines',
                'Advanced gene editing techniques (base editing, prime editing)',
                'Synthetic biology principles',
                'Bioethics and regulatory considerations',
                'Current clinical trials and applications',
                'Future directions in biotechnology'
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Difficulty</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Duration</span>
                <span className="text-sm">12 weeks (84 days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Time Commitment</span>
                <span className="text-sm">30-60 minutes/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Prerequisites</span>
                <span className="text-sm">Basic chemistry knowledge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Created by</span>
                <span className="text-sm">Learning Tracker Team</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}