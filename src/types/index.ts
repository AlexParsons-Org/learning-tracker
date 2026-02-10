export interface LearningTrack {
  id: string;
  title: string;
  description?: string;
  userId: string;
  isPublic: boolean;
  estimatedDuration?: number; // days
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  progress?: TrackProgress;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  trackId: string;
  order: number;
  estimatedMinutes?: number;
  prerequisites?: string[];
  progress?: ModuleProgress;
  resources?: Resource[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  url?: string;
  type: 'article' | 'video' | 'podcast' | 'book' | 'paper' | 'interactive';
  description?: string;
  estimatedMinutes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  metadata?: {
    author?: string;
    publishedAt?: string;
    source?: string;
    [key: string]: any;
  };
  progress?: ResourceProgress;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  trackId: string;
  moduleId?: string;
  resourceId?: string;
  startTime: Date;
  endTime?: Date;
  durationMinutes?: number;
  notes?: string;
  comprehensionRating?: number; // 1-5
  enjoymentRating?: number; // 1-5
  keyInsights?: string[];
  status: 'in_progress' | 'completed' | 'skipped';
  createdAt: Date;
}

export interface TrackProgress {
  trackId: string;
  userId: string;
  completedModules: number;
  totalModules: number;
  totalTimeMinutes: number;
  lastStudied?: Date;
  averageComprehension?: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface ModuleProgress {
  moduleId: string;
  userId: string;
  completedResources: number;
  totalResources: number;
  timeSpentMinutes: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  masteryScore?: number; // 0.0 - 1.0
  lastReviewed?: Date;
  reviewsDue?: Date;
}

export interface ResourceProgress {
  resourceId: string;
  userId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  timeSpentMinutes?: number;
  completedAt?: Date;
  comprehensionRating?: number;
  notes?: string;
  keyInsights?: string[];
}

export interface Concept {
  id: string;
  name: string;
  description?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  relatedConcepts?: ConceptRelationship[];
  mastery?: number; // 0.0 - 1.0
}

export interface ConceptRelationship {
  id: string;
  fromConceptId: string;
  toConceptId: string;
  relationshipType: 'prerequisite' | 'related' | 'builds_on';
  strength: number; // 0.0 - 1.0
  fromConcept?: Concept;
  toConcept?: Concept;
}

export interface LearningAnalytics {
  totalStudyTime: number; // minutes
  averageSessionLength: number; // minutes
  studyStreak: number; // consecutive days
  completionRate: number; // 0.0 - 1.0
  averageComprehension: number; // 1.0 - 5.0
  conceptsMastered: number;
  weakAreas: string[]; // concept categories with low mastery
  strongAreas: string[]; // concept categories with high mastery
  recommendedReviews: string[]; // concept IDs due for review
}

export interface StudyPlan {
  date: Date;
  estimatedMinutes: number;
  modules: {
    moduleId: string;
    title: string;
    estimatedMinutes: number;
    resources: {
      resourceId: string;
      title: string;
      type: string;
      estimatedMinutes: number;
      priority: 'high' | 'medium' | 'low';
    }[];
  }[];
  reviews: {
    conceptId: string;
    name: string;
    lastReviewed: Date;
    masteryScore: number;
  }[];
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateTrackForm {
  title: string;
  description?: string;
  estimatedDuration?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  isPublic?: boolean;
}

export interface CreateModuleForm {
  title: string;
  description?: string;
  estimatedMinutes?: number;
  prerequisites?: string[];
}

export interface CreateResourceForm {
  title: string;
  url?: string;
  type: 'article' | 'video' | 'podcast' | 'book' | 'paper' | 'interactive';
  description?: string;
  estimatedMinutes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface StudySessionForm {
  notes?: string;
  comprehensionRating?: number;
  enjoymentRating?: number;
  keyInsights?: string[];
}