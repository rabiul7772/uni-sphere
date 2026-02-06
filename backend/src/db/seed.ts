import { db } from '.';
import { departments, subjects } from './schema/app';

async function seed() {
  console.log('🌱 Seeding database with realistic unique data...');

  try {
    // Clear existing data
    console.log('Cleaning up existing data...');
    // Delete subjects first due to foreign key constraint on departments
    await db.delete(subjects);
    await db.delete(departments);

    // --- DEPARTMENTS SEEDING ---
    console.log('Generating 20 departments...');

    const departmentData = [
      {
        name: 'Engineering',
        code: 'ENG100',
        description:
          'Dedicated to the advancement of engineering principles, innovation, and practical application in various fields.'
      },
      {
        name: 'Computer Science',
        code: 'CSC110',
        description:
          'Focuses on the theory, experimentation, and engineering that form the basis for the design and use of computers.'
      },
      {
        name: 'Information Technology',
        code: 'ITC120',
        description:
          'Covers the study, design, development, implementation, support, or management of computer-based information systems.'
      },
      {
        name: 'Physics',
        code: 'PHY200',
        description:
          'Explores the fundamental principles governing the universe, from subatomic particles to the cosmos.'
      },
      {
        name: 'Chemistry',
        code: 'CHM210',
        description:
          'Investigates the composition, structure, properties, and change of matter at the molecular and atomic levels.'
      },
      {
        name: 'Biology',
        code: 'BIO220',
        description:
          'The study of living organisms, their origins, evolution, characteristics, and interactions with the environment.'
      },
      {
        name: 'Mathematics',
        code: 'MAT230',
        description:
          'Deals with numbers, structure, space, and change, forming the foundation for many other scientific disciplines.'
      },
      {
        name: 'Business Administration',
        code: 'BUS300',
        description:
          'Prepares students for management roles in business and public sector organizations, focusing on operations and strategy.'
      },
      {
        name: 'Marketing',
        code: 'MKT310',
        description:
          'Focuses on the strategies and processes involved in researching, promoting, selling, and distributing products or services.'
      },
      {
        name: 'Finance',
        code: 'FIN320',
        description:
          'Studies the management of money and includes activities such as investing, borrowing, lending, budgeting, saving, and forecasting.'
      },
      {
        name: 'Accounting',
        code: 'ACT330',
        description:
          'Involves the measurement, processing, and communication of financial and non-financial information about economic entities.'
      },
      {
        name: 'Economics',
        code: 'ECO400',
        description:
          'Analyzes the production, distribution, and consumption of goods and services, and the behavior of economic agents.'
      },
      {
        name: 'Psychology',
        code: 'PSY500',
        description:
          'The scientific study of the mind and behavior, exploring cognitive processes, emotion, perception, and personality.'
      },
      {
        name: 'Sociology',
        code: 'SOC510',
        description:
          'Examines social behavior, society, patterns of social relationships, social interaction, and culture.'
      },
      {
        name: 'Political Science',
        code: 'POL520',
        description:
          'Deals with systems of governance, and the analysis of political activities, political thoughts, associated constitutions, and political behavior.'
      },
      {
        name: 'History',
        code: 'HIS600',
        description:
          'The study of past events, particularly in human affairs, involving the discovery, collection, organization, and presentation of information.'
      },
      {
        name: 'Philosophy',
        code: 'PHI610',
        description:
          'Involves the study of general and fundamental questions about existence, knowledge, values, reason, mind, and language.'
      },
      {
        name: 'English Literature',
        code: 'LIT700',
        description:
          'Explores the production of literary works in the English language, analyzing themes, styles, and historical contexts.'
      },
      {
        name: 'Fine Arts',
        code: 'ART710',
        description:
          'Focuses on art forms developed primarily for aesthetics or concept definition rather than practical application.'
      },
      {
        name: 'Law',
        code: 'LAW800',
        description:
          'The study of the system of rules that are created and enforced through social or governmental institutions to regulate behavior.'
      }
    ];

    await db.insert(departments).values(departmentData);
    console.log('✅ Departments inserted successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

seed();
