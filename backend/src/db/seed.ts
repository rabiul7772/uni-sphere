import { db } from '.';
import { users } from './schema/app';
import { hash } from 'bcryptjs';
import { faker } from '@faker-js/faker';

async function seed() {
  console.log('🌱 Seeding database with realistic unique data...');

  try {
    // Hash password once to speed up
    const hashedPassword = await hash('password123', 10);

    // Clear existing data (optional but good for consistency)
    console.log('Cleaning up existing users...');
    await db.delete(users);

    const teachers = [];
    console.log('Generating 100 teachers...');
    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });

      teachers.push({
        name: `${firstName} ${lastName}`,
        email: email, // Unique email
        password: hashedPassword,
        role: 'teacher' as const,
        avatarUrl: `https://i.pravatar.cc/150?u=${email}` // Unique consistent avatar
      });
    }

    const students = [];
    console.log('Generating 500 students...');
    for (let i = 0; i < 500; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });

      students.push({
        name: `${firstName} ${lastName}`,
        email: email,
        password: hashedPassword,
        role: 'student' as const,
        avatarUrl: `https://i.pravatar.cc/150?u=${email}`
      });
    }

    console.log('Inserting teachers...');
    await db.insert(users).values(teachers);

    console.log('Inserting students...');
    // Batch insert students
    const batchSize = 100;
    for (let i = 0; i < students.length; i += batchSize) {
      const chunk = students.slice(i, i + batchSize);
      console.log(`Inserting students batch ${i / batchSize + 1}...`);
      await db.insert(users).values(chunk);
    }

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
