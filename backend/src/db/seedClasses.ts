import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { db, pool } from './index.js';
import { classes, subjects, users } from './schema/app.js';
import { eq } from 'drizzle-orm';

// Section identifiers for class names
const sections = ['A', 'B', 'C', 'D', 'E'];

// Academic-themed banner URLs using picsum.photos with education/classroom themes
const bannerCategories = [
  // Classroom & education themed images
  'https://picsum.photos/seed/classroom',
  'https://picsum.photos/seed/lecture',
  'https://picsum.photos/seed/university',
  'https://picsum.photos/seed/education',
  'https://picsum.photos/seed/study',
  'https://picsum.photos/seed/library',
  'https://picsum.photos/seed/academic',
  'https://picsum.photos/seed/learning',
  'https://picsum.photos/seed/school',
  'https://picsum.photos/seed/campus'
];

function generateBannerUrl(subjectName: string, section: string): string {
  // Create a unique seed based on subject and section for consistent but varied images
  const seed = `${subjectName.toLowerCase().replace(/\s+/g, '-')}-${section}`;
  return `https://picsum.photos/seed/${seed}/1200/400`;
}

function generateClassDescription(
  subjectName: string,
  section: string,
  teacherName: string
): string {
  const templates = [
    `This ${subjectName} Section ${section} class offers comprehensive coverage of core concepts and practical applications. Taught by ${teacherName}, students will engage in lectures, discussions, and hands-on exercises.`,
    `Section ${section} of ${subjectName} provides an in-depth exploration of fundamental principles and advanced topics. Under the guidance of ${teacherName}, students develop critical thinking and problem-solving skills.`,
    `Join ${teacherName} in ${subjectName} Section ${section} for an engaging learning experience. This course combines theoretical foundations with real-world applications and collaborative projects.`,
    `${subjectName} Section ${section}, led by ${teacherName}, focuses on building strong foundational knowledge while exploring cutting-edge developments in the field.`,
    `Experience ${subjectName} in Section ${section} with ${teacherName}. This class emphasizes active learning, peer collaboration, and practical skill development.`
  ];

  return templates[sections.indexOf(section) % templates.length];
}

function generateCapacity(): number {
  // Generate realistic class capacities between 20-50 students
  return faker.number.int({ min: 20, max: 50 });
}

async function seedClasses() {
  console.log('🎓 Starting class seeding...\n');

  // Fetch all subjects with their department info
  console.log('📚 Fetching subjects...');
  const allSubjects = await db.query.subjects.findMany({
    with: {
      department: true
    }
  });

  if (allSubjects.length === 0) {
    console.log('❌ No subjects found. Please seed subjects first.');
    await pool.end();
    return;
  }
  console.log(`   Found ${allSubjects.length} subjects.\n`);

  // Fetch all teachers (users with role 'teacher' or 'admin')
  console.log('👨‍🏫 Fetching teachers...');
  const allTeachers = await db
    .select()
    .from(users)
    .where(eq(users.role, 'teacher'));

  // Also include admins as they can teach
  const admins = await db.select().from(users).where(eq(users.role, 'admin'));

  const teachersPool = [...allTeachers, ...admins];

  if (teachersPool.length === 0) {
    console.log(
      '❌ No teachers found. Please seed users with teacher role first.'
    );
    await pool.end();
    return;
  }
  console.log(`   Found ${teachersPool.length} teachers/admins.\n`);

  // Check for existing classes
  const existingClasses = await db.select().from(classes);
  if (existingClasses.length > 0) {
    console.log(`⚠️  Found ${existingClasses.length} existing classes.`);
    console.log('   Skipping class seeding to avoid duplicates.\n');
    console.log('   To re-seed, delete existing classes first.\n');
    await pool.end();
    return;
  }

  // Generate classes: 5 sections (A-E) per subject
  const classesToInsert: Array<{
    subjectId: number;
    teacherId: number;
    name: string;
    bannerUrl: string;
    capacity: number;
    status: 'active' | 'inactive';
    description: string;
  }> = [];

  let teacherIndex = 0;

  for (const subject of allSubjects) {
    console.log(`📖 Generating classes for: ${subject.name}`);

    for (const section of sections) {
      // Distribute teachers across classes (round-robin)
      const teacher = teachersPool[teacherIndex % teachersPool.length];
      teacherIndex++;

      const className = `${subject.name} - Section ${section}`;
      const bannerUrl = generateBannerUrl(subject.name, section);
      const capacity = generateCapacity();
      const description = generateClassDescription(
        subject.name,
        section,
        teacher.name
      );

      classesToInsert.push({
        subjectId: subject.id,
        teacherId: teacher.id,
        name: className,
        bannerUrl,
        capacity,
        status: 'active', // All classes active by default
        description
      });
    }
  }

  console.log(`\n📊 Total classes to insert: ${classesToInsert.length}`);
  console.log('   (5 sections per subject)\n');

  // Batch insert for efficiency
  console.log('💾 Inserting classes in batches...');
  const BATCH_SIZE = 50;
  let insertedCount = 0;

  for (let i = 0; i < classesToInsert.length; i += BATCH_SIZE) {
    const batch = classesToInsert.slice(i, i + BATCH_SIZE);
    await db.insert(classes).values(batch);
    insertedCount += batch.length;
    console.log(
      `   Inserted ${insertedCount}/${classesToInsert.length} classes...`
    );
  }

  console.log('\n✅ Class seeding completed successfully!');
  console.log(`   Total classes created: ${classesToInsert.length}`);
  console.log(`   Subjects covered: ${allSubjects.length}`);
  console.log(`   Teachers assigned: ${teachersPool.length}`);

  await pool.end();
}

seedClasses().catch(err => {
  console.error('❌ Seed failed:', err);
  pool.end();
  process.exit(1);
});
