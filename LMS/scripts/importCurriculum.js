const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB } = require('../src/config/db');
const User = require('../src/models/User');
const Course = require('../src/models/Course');

dotenv.config();

const CURRICULUM_PATH = 'D:\\Umoja Mechanical Curiculum';

const curriculumFiles = [
  'Day1_Introduction_FRC_Fundamentals.md',
  'Day2_Design_Process_CAD.md',
  'Day3_Drivetrain_Power_Transmission.md',
  'Day4_Mechanisms_Actuators.md',
  'Day5_Material_Selection_Manufacturing.md',
  'Day6_Assembly_Integration.md',
  'Day7_Testing_Troubleshooting_Competition_Readiness.md',
];

// YouTube video resources for each day's curriculum
const videoResources = {
  'Day1': [
    { label: 'FRC Introduction & Game Overview', url: 'https://www.youtube.com/watch?v=XJmKSiHvIdo' },
    { label: 'What is FIRST Robotics Competition?', url: 'https://www.youtube.com/watch?v=H3t397jpbO8' },
    { label: 'FRC Robot Mechanisms Explained', url: 'https://www.youtube.com/watch?v=MejFKuHbsJo' },
    { label: 'Team 254 Robot Reveal (Example)', url: 'https://www.youtube.com/watch?v=6_mfwWnhLZk' },
  ],
  'Day2': [
    { label: 'Engineering Design Process for FRC', url: 'https://www.youtube.com/watch?v=xR9cA8LZ4Oo' },
    { label: 'OnShape CAD for FRC Tutorial', url: 'https://www.youtube.com/watch?v=BWDk4BZFN3Q' },
    { label: 'CAD Best Practices for Robotics', url: 'https://www.youtube.com/watch?v=jSjb02OIYUE' },
    { label: 'Sketching & Modeling Basics', url: 'https://www.youtube.com/watch?v=qz2_D7NLzfw' },
  ],
  'Day3': [
    { label: 'FRC Drivetrain Design Basics', url: 'https://www.youtube.com/watch?v=1xwaIzuMmuw' },
    { label: 'West Coast Drive vs Swerve Drive', url: 'https://www.youtube.com/watch?v=8erhWOsjw3Y' },
    { label: 'Chain and Sprocket Power Transmission', url: 'https://www.youtube.com/watch?v=SqvqI0JpHN8' },
    { label: 'Understanding Gear Ratios', url: 'https://www.youtube.com/watch?v=4rnU98k4bQQ' },
  ],
  'Day4': [
    { label: 'FRC Mechanisms: Intakes, Shooters & Arms', url: 'https://www.youtube.com/watch?v=7R08CED3L_Q' },
    { label: 'Pneumatics in FRC', url: 'https://www.youtube.com/watch?v=K0xA8Sc-Hoo' },
    { label: 'Linear Actuators & Motion', url: 'https://www.youtube.com/watch?v=0qZQCbK2YYk' },
    { label: 'Linkages and Mechanisms', url: 'https://www.youtube.com/watch?v=jdD-VXAveuw' },
  ],
  'Day5': [
    { label: 'Material Selection for Robotics', url: 'https://www.youtube.com/watch?v=XwipsZwTeak' },
    { label: 'CNC Machining Basics', url: 'https://www.youtube.com/watch?v=5flZHdhpFZQ' },
    { label: '3D Printing for FRC', url: 'https://www.youtube.com/watch?v=C4HAJ5HLuB4' },
    { label: 'Manufacturing Techniques Overview', url: 'https://www.youtube.com/watch?v=GCyiDaM3boc' },
  ],
  'Day6': [
    { label: 'Robot Assembly Best Practices', url: 'https://www.youtube.com/watch?v=lwD9P7OQiNI' },
    { label: 'Wire Management for FRC', url: 'https://www.youtube.com/watch?v=K6aKFp7TdvY' },
    { label: 'Integration & Testing Strategy', url: 'https://www.youtube.com/watch?v=6H-sTqgFN4Q' },
    { label: 'FRC Build Season Time-lapse', url: 'https://www.youtube.com/watch?v=7eCj5wGrMZ8' },
  ],
  'Day7': [
    { label: 'Robot Testing & Driver Practice', url: 'https://www.youtube.com/watch?v=_hl9z-c_Ias' },
    { label: 'Competition Strategy & Scouting', url: 'https://www.youtube.com/watch?v=RkwC7V9oR1I' },
    { label: 'Troubleshooting Common Issues', url: 'https://www.youtube.com/watch?v=XM2xzTz1sZY' },
    { label: 'Match Day Preparation', url: 'https://www.youtube.com/watch?v=ACJpvGCPklE' },
  ],
};

// Helper to parse markdown content into lessons
function parseMarkdownToLessons(content, filename) {
  const lines = content.split('\n');
  const lessons = [];
  let currentLesson = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect lesson headers (## or ###)
    if (line.startsWith('## ') && !line.includes('Overview') && !line.includes('Introduction')) {
      if (currentLesson) {
        lessons.push(currentLesson);
      }
      currentLesson = {
        title: line.replace(/^##+ /, ''),
        overview: '',
        content: [],
        order: lessons.length,
      };
    } else if (currentLesson) {
      // Accumulate content
      if (!currentLesson.overview && line.length > 20) {
        currentLesson.overview = line;
      }
      currentLesson.content.push(line);
    }
  }
  
  if (currentLesson) {
    lessons.push(currentLesson);
  }
  
  // If no lessons found, create single lesson from entire content
  if (lessons.length === 0) {
    const title = content.match(/^#\s+(.+)$/m)?.[1] || filename.replace('.md', '').replace(/_/g, ' ');
    const overview = content.split('\n').find(l => l.trim().length > 30) || 'Complete mechanical engineering curriculum';
    lessons.push({
      title,
      overview,
      content: content.split('\n'),
      order: 0,
    });
  }
  
  return lessons.map(lesson => ({
    title: lesson.title,
    overview: lesson.overview || 'Learn key concepts in mechanical engineering and robotics',
    durationMinutes: 90,
    order: lesson.order,
    resources: [{
      type: 'text',
      label: 'Lesson Content',
      content: lesson.content.join('\n').substring(0, 5000), // Limit to 5000 chars
    }],
  }));
}

// Add video resources to lessons based on day number
function addVideoResources(lessons, dayNumber) {
  const videos = videoResources[`Day${dayNumber}`] || [];
  
  if (videos.length > 0) {
    // Distribute videos across lessons
    lessons.forEach((lesson, index) => {
      const videoIndex = index % videos.length;
      lesson.resources.push({
        type: 'video',
        label: videos[videoIndex].label,
        url: videos[videoIndex].url,
      });
    });
    
    // Add all videos to first lesson as reference
    videos.forEach(video => {
      if (!lessons[0].resources.find(r => r.url === video.url)) {
        lessons[0].resources.push({
          type: 'video',
          label: video.label,
          url: video.url,
        });
      }
    });
  }
  
  return lessons;
}

async function importCurriculum() {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    console.log('👤 Creating instructor account...');
    let instructor = await User.findOne({ email: 'instructor@umoja.com' });
    if (!instructor) {
      instructor = await User.create({
        name: 'Umoja Robotics Mentor',
        email: 'instructor@umoja.com',
        password: 'umoja2025!',
        role: 'instructor',
      });
      console.log('✅ Created instructor account');
    } else {
      console.log('✅ Instructor account already exists');
    }
    
    console.log('📚 Importing curriculum files...');
    
    for (const filename of curriculumFiles) {
      const filePath = path.join(CURRICULUM_PATH, filename);
      
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const dayNumber = filename.match(/Day(\d+)/)?.[1] || '1';
        const title = content.match(/^#\s+(.+)$/m)?.[1] || filename.replace('.md', '').replace(/_/g, ' ');
        const description = content.split('\n').find(l => l.trim().length > 30) || 'Umoja Mechanical Engineering Curriculum';
        
        let lessons = parseMarkdownToLessons(content, filename);
        lessons = addVideoResources(lessons, dayNumber);
        
        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
          console.log(`⏭️  Skipping "${title}" - already exists`);
          continue;
        }
        
        const course = await Course.create({
          title,
          description: description.substring(0, 300),
          category: 'FRC Mechanical Engineering',
          difficulty: dayNumber <= '3' ? 'beginner' : dayNumber <= '5' ? 'intermediate' : 'advanced',
          durationWeeks: 1,
          instructor: instructor._id,
          published: true,
          lessons,
          tags: ['FRC', 'Mechanical', 'Robotics', `Day ${dayNumber}`],
        });
        
        console.log(`✅ Created course: "${course.title}" with ${lessons.length} lessons`);
      } catch (error) {
        console.error(`❌ Error importing ${filename}:`, error.message);
      }
    }
    
    console.log('\n🎉 Curriculum import complete!');
    console.log('\n📋 Login credentials:');
    console.log('   Email: instructor@umoja.com');
    console.log('   Password: umoja2025!');
    console.log('\nYou can now browse courses at http://localhost:3000');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importCurriculum();
