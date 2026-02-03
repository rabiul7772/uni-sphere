import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull()
};

export const departments = pgTable('departments', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 1000 }).notNull(),
  ...timestamps
});

export const subjects = pgTable('subjects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  departmentId: integer('department_id')
    .notNull()
    .references(() => departments.id, { onDelete: 'restrict' }),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 1000 }).notNull(),
  ...timestamps
});

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 })
    .$type<'admin' | 'student' | 'teacher'>()
    .notNull(),
  avatarUrl: varchar('avatar_url', { length: 1000 }),
  ...timestamps
});

export const classes = pgTable('classes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  subjectId: integer('subject_id')
    .notNull()
    .references(() => subjects.id, { onDelete: 'cascade' }),
  teacherId: integer('teacher_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  bannerUrl: varchar('banner_url', { length: 1000 }),
  capacity: integer('capacity').notNull(),
  status: varchar('status', { length: 20 })
    .$type<'active' | 'inactive'>()
    .default('active')
    .notNull(),
  description: text('description').notNull(),
  ...timestamps
});

export const enrollments = pgTable(
  'enrollments',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    studentId: integer('student_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    classId: integer('class_id')
      .notNull()
      .references(() => classes.id, { onDelete: 'cascade' }),
    ...timestamps
  },
  table => [
    uniqueIndex('enrollments_student_class_unique').on(
      table.studentId,
      table.classId
    )
  ]
);

export const departmentsRelations = relations(departments, ({ many }) => ({
  subjects: many(subjects)
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id]
  }),
  classes: many(classes)
}));

export const usersRelations = relations(users, ({ many }) => ({
  classes: many(classes),
  enrollments: many(enrollments)
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [classes.subjectId],
    references: [subjects.id]
  }),
  teacher: one(users, {
    fields: [classes.teacherId],
    references: [users.id]
  }),
  enrollments: many(enrollments)
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(users, {
    fields: [enrollments.studentId],
    references: [users.id]
  }),
  class: one(classes, {
    fields: [enrollments.classId],
    references: [classes.id]
  })
}));

export type Department = typeof departments.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type User = typeof users.$inferSelect;
export type Class = typeof classes.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;

export type NewDepartment = typeof departments.$inferInsert;
export type NewSubject = typeof subjects.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewClass = typeof classes.$inferInsert;
export type NewEnrollment = typeof enrollments.$inferInsert;
