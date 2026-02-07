import 'dotenv/config';
import { db, pool } from './index.js';
import { classes, subjects, departments } from './schema/app.js';
import { eq } from 'drizzle-orm';

// Map department codes to meaningful keywords for LoremFlickr
const departmentKeywords: Record<string, string> = {
  ENG100: 'programming,software',
  CSC110: 'computer,technology',
  ITC120: 'server,network',
  PHY200: 'physics,laboratory',
  CHM210: 'chemistry,laboratory',
  BIO220: 'biology,microscope',
  MAT230: 'mathematics,geometry',
  BUS300: 'business,office',
  MKT310: 'marketing,advertising',
  FIN320: 'finance,stock',
  ACT330: 'accounting,calculator',
  ECO400: 'economics,chart',
  PSY500: 'psychology,brain',
  SOC510: 'community,society',
  POL520: 'politics,government',
  HIS600: 'history,museum',
  PHI610: 'philosophy,books',
  LIT700: 'library,literature',
  ART710: 'art,painting',
  LAW800: 'law,justice'
};

// Generate banner URL using LoremFlickr (keyword-based images)
function generateBannerUrl(deptCode: string, classId: number): string {
  const keywords = departmentKeywords[deptCode] || 'education,classroom';
  // Add lock parameter to get consistent image for each class
  return `https://loremflickr.com/1200/400/${keywords}?lock=${classId}`;
}

async function updateClassBanners() {
  console.log('🖼️  Starting class banner URL update...\n');

  // Fetch all classes with their subject and department info
  console.log('📚 Fetching classes with subject/department info...');

  const allClasses = await db
    .select({
      classId: classes.id,
      className: classes.name,
      subjectId: subjects.id,
      subjectName: subjects.name,
      departmentId: departments.id,
      departmentCode: departments.code,
      departmentName: departments.name
    })
    .from(classes)
    .leftJoin(subjects, eq(classes.subjectId, subjects.id))
    .leftJoin(departments, eq(subjects.departmentId, departments.id));

  console.log(`   Found ${allClasses.length} classes.\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const cls of allClasses) {
    const deptCode = cls.departmentCode;

    if (!deptCode) {
      console.log(
        `⚠️  Skipping class ${cls.classId} (${cls.className}) - no department code found`
      );
      skippedCount++;
      continue;
    }

    const newBannerUrl = generateBannerUrl(deptCode, cls.classId);

    await db
      .update(classes)
      .set({ bannerUrl: newBannerUrl })
      .where(eq(classes.id, cls.classId));

    updatedCount++;

    if (updatedCount % 50 === 0) {
      console.log(`   Updated ${updatedCount}/${allClasses.length} classes...`);
    }
  }

  console.log('\n✅ Banner URL update completed!');
  console.log(`   Total classes updated: ${updatedCount}`);
  console.log(`   Classes skipped: ${skippedCount}`);
  console.log('\n📝 Example URLs generated:');

  // Show a few examples
  const examples = allClasses.slice(0, 5);
  for (const cls of examples) {
    const deptCode = cls.departmentCode;
    if (deptCode) {
      const url = generateBannerUrl(deptCode, cls.classId);
      console.log(`   - ${cls.className}: ${url}`);
    }
  }

  await pool.end();
}

updateClassBanners().catch(err => {
  console.error('❌ Update failed:', err);
  pool.end();
  process.exit(1);
});
