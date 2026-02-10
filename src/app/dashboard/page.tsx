'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalTracks: 0,
    completedModules: 0,
    totalStudyTime: 0,
    currentStreak: 0,
  });

  // Demo data for initial load
  useEffect(() => {
    // In real app, fetch from API
    setStats({
      totalTracks: 1,
      completedModules: 0,
      totalStudyTime: 0,
      currentStreak: 0,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to continue your learning journey?
          </p>
        </div>
        <Link href="/dashboard/tracks/new">
          <Button size="lg">
            Create New Learning Track
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Tracks</CardTitle>
            <div className="text-2xl">📚</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTracks}</div>
            <p className="text-xs text-muted-foreground">
              Active learning paths
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <div className="text-2xl">✅</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedModules}</div>
            <p className="text-xs text-muted-foreground">
              Knowledge milestones reached
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <div className="text-2xl">⏰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudyTime}h</div>
            <p className="text-xs text-muted-foreground">
              Total time invested
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <div className="text-2xl">🔥</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              Consecutive study days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.totalTracks === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold mb-2">Ready to start learning?</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first learning track to begin tracking your progress.
                  </p>
                  <Link href="/dashboard/tracks/new">
                    <Button>Create Learning Track</Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No recent activity yet. Start studying to see your progress here!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Suggested next steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Start with Biotechnology</h4>
                  <p className="text-sm text-gray-600">
                    12-week comprehensive CRISPR and gene editing curriculum
                  </p>
                </div>
                <Link href="/dashboard/tracks/biotechnology">
                  <Button variant="outline" size="sm">
                    Explore
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Complete Your Profile</h4>
                  <p className="text-sm text-gray-600">
                    Set learning goals and preferences
                  </p>
                </div>
                <Link href="/dashboard/profile">
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Import Learning Plan</h4>
                  <p className="text-sm text-gray-600">
                    Upload your existing curriculum or syllabus
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Focus */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Study Plan</CardTitle>
          <CardDescription>Recommended activities for {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">No study plan yet</h3>
            <p className="text-gray-600 mb-4">
              Once you create learning tracks, we'll generate personalized daily study plans.
            </p>
            <Link href="/dashboard/tracks">
              <Button>View Learning Tracks</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}