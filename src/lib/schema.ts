import { pgTable, serial, text, timestamp, integer, boolean, jsonb, uuid, varchar, real } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Learning tracks (e.g., "Biotechnology Deep Dive", "Machine Learning", etc.)
export const learningTracks = pgTable('learning_tracks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  userId: uuid('user_id').references(() => users.id).notNull(),
  isPublic: boolean('is_public').default(false),
  estimatedDuration: integer('estimated_duration'), // in days
  difficulty: varchar('difficulty', { length: 50 }), // beginner, intermediate, advanced
  tags: jsonb('tags').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Modules within a learning track (e.g., "CRISPR Basics", "mRNA Technology")
export const modules = pgTable('modules', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  trackId: uuid('track_id').references(() => learningTracks.id).notNull(),
  order: integer('order').notNull(),
  estimatedMinutes: integer('estimated_minutes'),
  prerequisites: jsonb('prerequisites').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Resources (articles, videos, podcasts, etc.)
export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  url: text('url'),
  type: varchar('type', { length: 50 }).notNull(), // article, video, podcast, book, paper
  description: text('description'),
  estimatedMinutes: integer('estimated_minutes'),
  difficulty: varchar('difficulty', { length: 50 }),
  tags: jsonb('tags').$type<string[]>(),
  metadata: jsonb('metadata'), // author, publication date, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Module resources (many-to-many)
export const moduleResources = pgTable('module_resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  moduleId: uuid('module_id').references(() => modules.id).notNull(),
  resourceId: uuid('resource_id').references(() => resources.id).notNull(),
  order: integer('order').notNull(),
  isRequired: boolean('is_required').default(true),
});

// Learning sessions (daily study sessions)
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  trackId: uuid('track_id').references(() => learningTracks.id).notNull(),
  moduleId: uuid('module_id').references(() => modules.id),
  resourceId: uuid('resource_id').references(() => resources.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  durationMinutes: integer('duration_minutes'),
  notes: text('notes'),
  comprehensionRating: integer('comprehension_rating'), // 1-5 scale
  enjoymentRating: integer('enjoyment_rating'), // 1-5 scale
  keyInsights: jsonb('key_insights').$type<string[]>(),
  status: varchar('status', { length: 50 }).default('completed'), // in_progress, completed, skipped
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Progress tracking
export const progress = pgTable('progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  trackId: uuid('track_id').references(() => learningTracks.id).notNull(),
  moduleId: uuid('module_id').references(() => modules.id),
  resourceId: uuid('resource_id').references(() => resources.id),
  status: varchar('status', { length: 50 }).notNull(), // not_started, in_progress, completed, mastered
  completedAt: timestamp('completed_at'),
  lastReviewed: timestamp('last_reviewed'),
  masteryScore: real('mastery_score'), // 0.0 - 1.0
  reviewsDue: timestamp('reviews_due'), // for spaced repetition
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Concept mapping (knowledge graph)
export const concepts = pgTable('concepts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  difficulty: varchar('difficulty', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Concept relationships (knowledge graph edges)
export const conceptRelationships = pgTable('concept_relationships', {
  id: uuid('id').primaryKey().defaultRandom(),
  fromConceptId: uuid('from_concept_id').references(() => concepts.id).notNull(),
  toConceptId: uuid('to_concept_id').references(() => concepts.id).notNull(),
  relationshipType: varchar('relationship_type', { length: 50 }).notNull(), // prerequisite, related, builds_on
  strength: real('strength').default(1.0), // 0.0 - 1.0
});

// Resource concepts (many-to-many)
export const resourceConcepts = pgTable('resource_concepts', {
  id: uuid('id').primaryKey().defaultRandom(),
  resourceId: uuid('resource_id').references(() => resources.id).notNull(),
  conceptId: uuid('concept_id').references(() => concepts.id).notNull(),
  relevance: real('relevance').default(1.0), // how relevant this concept is to the resource
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  tracks: many(learningTracks),
  sessions: many(sessions),
  progress: many(progress),
}));

export const learningTracksRelations = relations(learningTracks, ({ one, many }) => ({
  user: one(users, { fields: [learningTracks.userId], references: [users.id] }),
  modules: many(modules),
  sessions: many(sessions),
  progress: many(progress),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  track: one(learningTracks, { fields: [modules.trackId], references: [learningTracks.id] }),
  moduleResources: many(moduleResources),
  sessions: many(sessions),
  progress: many(progress),
}));

export const resourcesRelations = relations(resources, ({ many }) => ({
  moduleResources: many(moduleResources),
  sessions: many(sessions),
  progress: many(progress),
  resourceConcepts: many(resourceConcepts),
}));

export const moduleResourcesRelations = relations(moduleResources, ({ one }) => ({
  module: one(modules, { fields: [moduleResources.moduleId], references: [modules.id] }),
  resource: one(resources, { fields: [moduleResources.resourceId], references: [resources.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
  track: one(learningTracks, { fields: [sessions.trackId], references: [learningTracks.id] }),
  module: one(modules, { fields: [sessions.moduleId], references: [modules.id] }),
  resource: one(resources, { fields: [sessions.resourceId], references: [resources.id] }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, { fields: [progress.userId], references: [users.id] }),
  track: one(learningTracks, { fields: [progress.trackId], references: [learningTracks.id] }),
  module: one(modules, { fields: [progress.moduleId], references: [modules.id] }),
  resource: one(resources, { fields: [progress.resourceId], references: [resources.id] }),
}));

export const conceptsRelations = relations(concepts, ({ many }) => ({
  fromRelationships: many(conceptRelationships, { relationName: 'fromConcept' }),
  toRelationships: many(conceptRelationships, { relationName: 'toConcept' }),
  resourceConcepts: many(resourceConcepts),
}));

export const conceptRelationshipsRelations = relations(conceptRelationships, ({ one }) => ({
  fromConcept: one(concepts, { 
    fields: [conceptRelationships.fromConceptId], 
    references: [concepts.id],
    relationName: 'fromConcept'
  }),
  toConcept: one(concepts, { 
    fields: [conceptRelationships.toConceptId], 
    references: [concepts.id],
    relationName: 'toConcept'
  }),
}));

export const resourceConceptsRelations = relations(resourceConcepts, ({ one }) => ({
  resource: one(resources, { fields: [resourceConcepts.resourceId], references: [resources.id] }),
  concept: one(concepts, { fields: [resourceConcepts.conceptId], references: [concepts.id] }),
}));