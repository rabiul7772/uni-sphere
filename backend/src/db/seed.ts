import 'dotenv/config';
import { db, pool } from './index.js';
import { departments, subjects } from './schema/app.js';

const subjectsByDepartmentCode: Record<
  string,
  Array<{ name: string; code: string; description: string }>
> = {
  // Software Engineering (ENG100)
  ENG100: [
    {
      name: 'Introduction to Software Engineering',
      code: 'ENG100-101',
      description:
        'Fundamentals of software development lifecycle, requirements gathering, and project management principles.'
    },
    {
      name: 'Object-Oriented Programming',
      code: 'ENG100-102',
      description:
        'Principles of object-oriented design including encapsulation, inheritance, polymorphism, and abstraction.'
    },
    {
      name: 'Software Architecture & Design',
      code: 'ENG100-201',
      description:
        'Architectural patterns, design principles, and best practices for building scalable software systems.'
    },
    {
      name: 'Agile Development Methods',
      code: 'ENG100-202',
      description:
        'Scrum, Kanban, and other agile methodologies for iterative software development and team collaboration.'
    },
    {
      name: 'Software Testing & Quality Assurance',
      code: 'ENG100-301',
      description:
        'Testing strategies, test automation, quality metrics, and continuous integration practices.'
    },
    {
      name: 'DevOps & Cloud Computing',
      code: 'ENG100-302',
      description:
        'Containerization, CI/CD pipelines, cloud services, and infrastructure as code principles.'
    }
  ],

  // Computer Science (CSC110)
  CSC110: [
    {
      name: 'Introduction to Programming',
      code: 'CSC110-101',
      description:
        'Fundamentals of programming using structured and object-oriented paradigms with hands-on coding exercises.'
    },
    {
      name: 'Data Structures & Algorithms',
      code: 'CSC110-201',
      description:
        'Study of fundamental data organization techniques and algorithm design for efficient problem solving.'
    },
    {
      name: 'Database Management Systems',
      code: 'CSC110-301',
      description:
        'Principles of database design, SQL, normalization, transaction management, and query optimization.'
    },
    {
      name: 'Operating Systems',
      code: 'CSC110-302',
      description:
        'Concepts of process management, memory allocation, file systems, and CPU scheduling algorithms.'
    },
    {
      name: 'Computer Networks',
      code: 'CSC110-401',
      description:
        'Study of network architectures, protocols, TCP/IP stack, routing algorithms, and network security.'
    },
    {
      name: 'Artificial Intelligence',
      code: 'CSC110-501',
      description:
        'Foundations of AI including search algorithms, knowledge representation, machine learning, and neural networks.'
    }
  ],

  // Information Technology (ITC120)
  ITC120: [
    {
      name: 'IT Fundamentals',
      code: 'ITC120-101',
      description:
        'Introduction to information technology concepts, hardware, software, and basic networking principles.'
    },
    {
      name: 'Web Development Fundamentals',
      code: 'ITC120-102',
      description:
        'HTML, CSS, JavaScript basics and responsive web design principles for modern websites.'
    },
    {
      name: 'Database Administration',
      code: 'ITC120-201',
      description:
        'Database installation, configuration, backup, recovery, and performance tuning techniques.'
    },
    {
      name: 'Network Administration',
      code: 'ITC120-202',
      description:
        'Network setup, configuration, monitoring, and troubleshooting for enterprise environments.'
    },
    {
      name: 'Cybersecurity Fundamentals',
      code: 'ITC120-301',
      description:
        'Security principles, threat detection, vulnerability assessment, and incident response procedures.'
    },
    {
      name: 'IT Project Management',
      code: 'ITC120-302',
      description:
        'Planning, executing, and managing IT projects using industry-standard methodologies and tools.'
    }
  ],

  // Physics (PHY200)
  PHY200: [
    {
      name: 'Classical Mechanics',
      code: 'PHY200-101',
      description:
        'Newtonian mechanics, kinematics, dynamics, conservation laws, and rotational motion of rigid bodies.'
    },
    {
      name: 'Thermodynamics',
      code: 'PHY200-102',
      description:
        'Laws of thermodynamics, entropy, heat engines, refrigeration cycles, and statistical mechanics.'
    },
    {
      name: 'Electromagnetism',
      code: 'PHY200-201',
      description:
        'Electric and magnetic fields, Maxwells equations, electromagnetic waves, and optics fundamentals.'
    },
    {
      name: 'Quantum Mechanics',
      code: 'PHY200-301',
      description:
        'Wave-particle duality, Schrodinger equation, quantum states, operators, and atomic structure.'
    },
    {
      name: 'Solid State Physics',
      code: 'PHY200-401',
      description:
        'Crystal structures, band theory, semiconductors, superconductivity, and material properties.'
    },
    {
      name: 'Nuclear Physics',
      code: 'PHY200-402',
      description:
        'Nuclear structure, radioactivity, nuclear reactions, fission, fusion, and particle physics basics.'
    }
  ],

  // Chemistry (CHM210)
  CHM210: [
    {
      name: 'General Chemistry',
      code: 'CHM210-101',
      description:
        'Atomic structure, periodic table, chemical bonding, stoichiometry, and states of matter.'
    },
    {
      name: 'Organic Chemistry',
      code: 'CHM210-201',
      description:
        'Structure, nomenclature, reactions, and synthesis of carbon-based compounds and functional groups.'
    },
    {
      name: 'Inorganic Chemistry',
      code: 'CHM210-202',
      description:
        'Chemistry of main group and transition metal elements, coordination compounds, and solid-state chemistry.'
    },
    {
      name: 'Physical Chemistry',
      code: 'CHM210-301',
      description:
        'Thermodynamics, kinetics, quantum chemistry, and spectroscopy in chemical systems.'
    },
    {
      name: 'Analytical Chemistry',
      code: 'CHM210-302',
      description:
        'Qualitative and quantitative analysis techniques, instrumentation, and method validation.'
    },
    {
      name: 'Biochemistry',
      code: 'CHM210-401',
      description:
        'Structure and function of biomolecules, enzyme kinetics, metabolism, and molecular biology.'
    }
  ],

  // Biology (BIO220)
  BIO220: [
    {
      name: 'Cell Biology',
      code: 'BIO220-101',
      description:
        'Structure and function of cells, organelles, membrane transport, and cellular processes.'
    },
    {
      name: 'Genetics',
      code: 'BIO220-201',
      description:
        'Mendelian genetics, molecular genetics, gene expression, and hereditary patterns.'
    },
    {
      name: 'Molecular Biology',
      code: 'BIO220-202',
      description:
        'DNA replication, transcription, translation, and gene regulation mechanisms.'
    },
    {
      name: 'Ecology',
      code: 'BIO220-301',
      description:
        'Population dynamics, community interactions, ecosystems, and environmental conservation.'
    },
    {
      name: 'Microbiology',
      code: 'BIO220-302',
      description:
        'Study of microorganisms including bacteria, viruses, fungi, and their applications.'
    },
    {
      name: 'Human Physiology',
      code: 'BIO220-401',
      description:
        'Organ systems, homeostasis, neural and hormonal regulation in the human body.'
    }
  ],

  // Mathematics (MAT230)
  MAT230: [
    {
      name: 'Calculus I',
      code: 'MAT230-101',
      description:
        'Differential calculus including limits, derivatives, and applications to rates of change and optimization.'
    },
    {
      name: 'Calculus II',
      code: 'MAT230-102',
      description:
        'Integral calculus including definite and indefinite integrals, techniques of integration, and series.'
    },
    {
      name: 'Linear Algebra',
      code: 'MAT230-201',
      description:
        'Vector spaces, matrices, linear transformations, eigenvalues, and applications to systems of equations.'
    },
    {
      name: 'Probability & Statistics',
      code: 'MAT230-202',
      description:
        'Probability theory, random variables, distributions, statistical inference, and hypothesis testing.'
    },
    {
      name: 'Differential Equations',
      code: 'MAT230-301',
      description:
        'Ordinary differential equations, solution methods, Laplace transforms, and applications in science.'
    },
    {
      name: 'Numerical Analysis',
      code: 'MAT230-401',
      description:
        'Numerical methods for solving equations, interpolation, numerical integration, and error analysis.'
    }
  ],

  // Business Administration (BUS300)
  BUS300: [
    {
      name: 'Principles of Management',
      code: 'BUS300-101',
      description:
        'Introduction to management functions including planning, organizing, leading, and controlling organizations.'
    },
    {
      name: 'Organizational Behavior',
      code: 'BUS300-102',
      description:
        'Individual and group behavior in organizations, motivation, leadership, and organizational culture.'
    },
    {
      name: 'Business Communication',
      code: 'BUS300-201',
      description:
        'Effective written and oral communication skills for professional business environments.'
    },
    {
      name: 'Operations Management',
      code: 'BUS300-301',
      description:
        'Production planning, quality control, supply chain management, and process optimization.'
    },
    {
      name: 'Strategic Management',
      code: 'BUS300-401',
      description:
        'Formulation and implementation of business strategies, competitive analysis, and corporate governance.'
    },
    {
      name: 'Entrepreneurship',
      code: 'BUS300-402',
      description:
        'Business plan development, venture financing, startup management, and innovation strategies.'
    }
  ],

  // Marketing (MKT310)
  MKT310: [
    {
      name: 'Principles of Marketing',
      code: 'MKT310-101',
      description:
        'Fundamentals of marketing concepts, consumer behavior, and the marketing mix elements.'
    },
    {
      name: 'Consumer Behavior',
      code: 'MKT310-201',
      description:
        'Psychological and social factors influencing consumer decision-making and purchase behavior.'
    },
    {
      name: 'Digital Marketing',
      code: 'MKT310-202',
      description:
        'Online marketing strategies, SEO, social media marketing, and digital analytics.'
    },
    {
      name: 'Brand Management',
      code: 'MKT310-301',
      description:
        'Brand strategy, positioning, equity measurement, and brand portfolio management.'
    },
    {
      name: 'Marketing Research',
      code: 'MKT310-302',
      description:
        'Research methodologies, data collection, analysis techniques, and market insights generation.'
    },
    {
      name: 'International Marketing',
      code: 'MKT310-401',
      description:
        'Global marketing strategies, cross-cultural considerations, and international market entry.'
    }
  ],

  // Finance (FIN320)
  FIN320: [
    {
      name: 'Financial Management',
      code: 'FIN320-101',
      description:
        'Principles of corporate finance, capital budgeting, cost of capital, and working capital management.'
    },
    {
      name: 'Investment Analysis',
      code: 'FIN320-201',
      description:
        'Security analysis, portfolio theory, asset valuation, and investment strategies.'
    },
    {
      name: 'Financial Markets & Institutions',
      code: 'FIN320-202',
      description:
        'Structure and function of financial markets, banking systems, and regulatory frameworks.'
    },
    {
      name: 'Corporate Finance',
      code: 'FIN320-301',
      description:
        'Capital structure decisions, dividend policy, mergers and acquisitions, and financial restructuring.'
    },
    {
      name: 'Risk Management',
      code: 'FIN320-302',
      description:
        'Financial risk identification, measurement, derivatives, and hedging strategies.'
    },
    {
      name: 'International Finance',
      code: 'FIN320-401',
      description:
        'Foreign exchange markets, international investment, and multinational financial management.'
    }
  ],

  // Accounting (ACT330)
  ACT330: [
    {
      name: 'Financial Accounting',
      code: 'ACT330-101',
      description:
        'Fundamentals of accounting principles, financial statements preparation, and bookkeeping practices.'
    },
    {
      name: 'Managerial Accounting',
      code: 'ACT330-201',
      description:
        'Cost analysis, budgeting, performance measurement, and decision-making support for management.'
    },
    {
      name: 'Cost Accounting',
      code: 'ACT330-202',
      description:
        'Product costing methods, cost allocation, variance analysis, and activity-based costing.'
    },
    {
      name: 'Auditing',
      code: 'ACT330-301',
      description:
        'Audit planning, internal controls evaluation, evidence gathering, and audit reporting standards.'
    },
    {
      name: 'Taxation',
      code: 'ACT330-302',
      description:
        'Income tax principles, tax planning strategies, compliance requirements, and tax regulations.'
    },
    {
      name: 'Advanced Financial Reporting',
      code: 'ACT330-401',
      description:
        'Complex accounting standards, consolidation, international reporting, and financial analysis.'
    }
  ],

  // Economics (ECO400)
  ECO400: [
    {
      name: 'Microeconomics',
      code: 'ECO400-101',
      description:
        'Consumer theory, producer theory, market structures, and welfare economics.'
    },
    {
      name: 'Macroeconomics',
      code: 'ECO400-102',
      description:
        'National income, unemployment, inflation, monetary and fiscal policy, and economic growth.'
    },
    {
      name: 'International Economics',
      code: 'ECO400-201',
      description:
        'Trade theories, trade policies, balance of payments, and exchange rate systems.'
    },
    {
      name: 'Development Economics',
      code: 'ECO400-301',
      description:
        'Economic development theories, poverty reduction, inequality, and sustainable development.'
    },
    {
      name: 'Econometrics',
      code: 'ECO400-302',
      description:
        'Statistical methods for economic analysis, regression models, and hypothesis testing.'
    },
    {
      name: 'Public Economics',
      code: 'ECO400-401',
      description:
        'Government intervention, public goods, taxation theory, and public policy analysis.'
    }
  ],

  // Psychology (PSY500)
  PSY500: [
    {
      name: 'Introduction to Psychology',
      code: 'PSY500-101',
      description:
        'Overview of psychological concepts, research methods, and major theoretical perspectives.'
    },
    {
      name: 'Developmental Psychology',
      code: 'PSY500-201',
      description:
        'Human development across the lifespan including cognitive, social, and emotional changes.'
    },
    {
      name: 'Social Psychology',
      code: 'PSY500-202',
      description:
        'Social influences on behavior, attitudes, group dynamics, and interpersonal relationships.'
    },
    {
      name: 'Cognitive Psychology',
      code: 'PSY500-301',
      description:
        'Mental processes including perception, memory, thinking, language, and problem-solving.'
    },
    {
      name: 'Abnormal Psychology',
      code: 'PSY500-302',
      description:
        'Psychological disorders, diagnostic criteria, etiology, and treatment approaches.'
    },
    {
      name: 'Clinical Psychology',
      code: 'PSY500-401',
      description:
        'Psychological assessment, therapeutic interventions, and evidence-based treatment practices.'
    }
  ],

  // Sociology & Society (SOC510)
  SOC510: [
    {
      name: 'Introduction to Sociology',
      code: 'SOC510-101',
      description:
        'Fundamental sociological concepts, theories, and research methods for understanding society.'
    },
    {
      name: 'Social Stratification',
      code: 'SOC510-201',
      description:
        'Class systems, social mobility, inequality, and power distribution in societies.'
    },
    {
      name: 'Urban Sociology',
      code: 'SOC510-202',
      description:
        'Urbanization processes, city life, community development, and urban social problems.'
    },
    {
      name: 'Sociology of Gender',
      code: 'SOC510-301',
      description:
        'Gender roles, socialization, inequality, and feminist perspectives in social analysis.'
    },
    {
      name: 'Criminology',
      code: 'SOC510-302',
      description:
        'Theories of crime, criminal behavior, justice systems, and crime prevention strategies.'
    },
    {
      name: 'Research Methods in Sociology',
      code: 'SOC510-401',
      description:
        'Quantitative and qualitative research design, data collection, and analysis techniques.'
    }
  ],

  // Political Science (POL520)
  POL520: [
    {
      name: 'Introduction to Political Science',
      code: 'POL520-101',
      description:
        'Fundamental concepts of politics, governance, political systems, and power relations.'
    },
    {
      name: 'Comparative Politics',
      code: 'POL520-201',
      description:
        'Analysis of different political systems, institutions, and processes across countries.'
    },
    {
      name: 'International Relations',
      code: 'POL520-202',
      description:
        'Theories of international politics, foreign policy, diplomacy, and global governance.'
    },
    {
      name: 'Political Theory',
      code: 'POL520-301',
      description:
        'Major political philosophers, ideologies, justice, liberty, and democracy concepts.'
    },
    {
      name: 'Public Administration',
      code: 'POL520-302',
      description:
        'Government bureaucracy, public policy implementation, and administrative management.'
    },
    {
      name: 'Constitutional Law',
      code: 'POL520-401',
      description:
        'Constitutional principles, fundamental rights, judicial review, and constitutional interpretation.'
    }
  ],

  // History (HIS600)
  HIS600: [
    {
      name: 'World History',
      code: 'HIS600-101',
      description:
        'Survey of major civilizations, events, and developments from ancient times to the present.'
    },
    {
      name: 'Ancient Civilizations',
      code: 'HIS600-201',
      description:
        'Study of Mesopotamia, Egypt, Greece, Rome, and other ancient societies and cultures.'
    },
    {
      name: 'Medieval History',
      code: 'HIS600-202',
      description:
        'European Middle Ages, Byzantine Empire, Islamic civilization, and feudal societies.'
    },
    {
      name: 'Modern World History',
      code: 'HIS600-301',
      description:
        'Renaissance to contemporary era including industrialization, colonialism, and world wars.'
    },
    {
      name: 'History of Ideas',
      code: 'HIS600-302',
      description:
        'Intellectual movements, philosophical developments, and their historical contexts.'
    },
    {
      name: 'Historical Research Methods',
      code: 'HIS600-401',
      description:
        'Primary source analysis, historiography, archival research, and historical writing.'
    }
  ],

  // Philosophy (PHI610)
  PHI610: [
    {
      name: 'Introduction to Philosophy',
      code: 'PHI610-101',
      description:
        'Fundamental philosophical questions, methods, and major branches of philosophical inquiry.'
    },
    {
      name: 'Ethics',
      code: 'PHI610-201',
      description:
        'Moral theories, applied ethics, moral reasoning, and contemporary ethical issues.'
    },
    {
      name: 'Logic',
      code: 'PHI610-202',
      description:
        'Formal and informal logic, argument analysis, fallacies, and critical thinking skills.'
    },
    {
      name: 'Epistemology',
      code: 'PHI610-301',
      description:
        'Nature of knowledge, justification, truth, skepticism, and sources of knowledge.'
    },
    {
      name: 'Metaphysics',
      code: 'PHI610-302',
      description:
        'Nature of reality, existence, causation, free will, and mind-body problem.'
    },
    {
      name: 'Philosophy of Mind',
      code: 'PHI610-401',
      description:
        'Consciousness, mental states, personal identity, and artificial intelligence philosophy.'
    }
  ],

  // English Literature (LIT700)
  LIT700: [
    {
      name: 'Introduction to Literature',
      code: 'LIT700-101',
      description:
        'Survey of major literary genres including poetry, prose, and drama from various traditions.'
    },
    {
      name: 'British Literature',
      code: 'LIT700-201',
      description:
        'Study of British literary works from medieval period through contemporary times.'
    },
    {
      name: 'American Literature',
      code: 'LIT700-202',
      description:
        'Exploration of American literary traditions from colonial period to modern era.'
    },
    {
      name: 'World Literature',
      code: 'LIT700-301',
      description:
        'Literary works from diverse cultures and traditions in translation and context.'
    },
    {
      name: 'Literary Criticism & Theory',
      code: 'LIT700-302',
      description:
        'Major critical approaches including structuralism, feminism, and postcolonialism.'
    },
    {
      name: 'Creative Writing',
      code: 'LIT700-401',
      description:
        'Workshop-based course in fiction, poetry, and creative nonfiction writing.'
    }
  ],

  // Fine Arts (ART710)
  ART710: [
    {
      name: 'Foundations of Art',
      code: 'ART710-101',
      description:
        'Basic principles of visual arts including composition, color theory, and design elements.'
    },
    {
      name: 'Drawing Techniques',
      code: 'ART710-201',
      description:
        'Fundamental drawing skills, perspective, figure drawing, and various media exploration.'
    },
    {
      name: 'Painting',
      code: 'ART710-202',
      description:
        'Oil, acrylic, and watercolor painting techniques, color mixing, and artistic expression.'
    },
    {
      name: 'Sculpture',
      code: 'ART710-301',
      description:
        'Three-dimensional art forms, modeling, casting, and sculptural materials and methods.'
    },
    {
      name: 'Art History',
      code: 'ART710-302',
      description:
        'Survey of art movements, styles, and artists from ancient times to contemporary art.'
    },
    {
      name: 'Digital Arts',
      code: 'ART710-401',
      description:
        'Digital illustration, graphic design, animation, and computer-aided artistic creation.'
    }
  ],

  // Law (LAW800)
  LAW800: [
    {
      name: 'Introduction to Law',
      code: 'LAW800-101',
      description:
        'Fundamentals of legal systems, sources of law, legal reasoning, and court structures.'
    },
    {
      name: 'Constitutional Law',
      code: 'LAW800-201',
      description:
        'Constitutional principles, fundamental rights, separation of powers, and judicial review.'
    },
    {
      name: 'Contract Law',
      code: 'LAW800-202',
      description:
        'Formation, performance, breach, and remedies in contractual agreements.'
    },
    {
      name: 'Criminal Law',
      code: 'LAW800-301',
      description:
        'Elements of crimes, criminal liability, defenses, and criminal justice procedures.'
    },
    {
      name: 'Property Law',
      code: 'LAW800-302',
      description:
        'Real and personal property rights, ownership, transfers, and land use regulations.'
    },
    {
      name: 'International Law',
      code: 'LAW800-401',
      description:
        'Public international law, treaties, international organizations, and human rights law.'
    }
  ]
};

async function seed() {
  console.log('Fetching existing departments...');

  const existingDepartments = await db.select().from(departments);

  if (existingDepartments.length === 0) {
    console.log('No departments found. Please seed departments first.');
    await pool.end();
    return;
  }

  console.log(`Found ${existingDepartments.length} departments:`);
  existingDepartments.forEach(dept => {
    console.log(`  - ${dept.code}: ${dept.name} (ID: ${dept.id})`);
  });

  const subjectsToInsert: Array<{
    departmentId: number;
    name: string;
    code: string;
    description: string;
  }> = [];

  for (const dept of existingDepartments) {
    const deptSubjects = subjectsByDepartmentCode[dept.code];
    if (deptSubjects) {
      for (const subject of deptSubjects) {
        subjectsToInsert.push({
          departmentId: dept.id,
          name: subject.name,
          code: subject.code,
          description: subject.description
        });
      }
    } else {
      console.log(
        `  Warning: No subjects defined for department code "${dept.code}"`
      );
    }
  }

  await pool.end();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  pool.end();
  process.exit(1);
});
