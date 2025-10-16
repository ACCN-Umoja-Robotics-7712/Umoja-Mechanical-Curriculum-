const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../src/models/Course');

dotenv.config();

// YouTube video resources for each day's curriculum
const videoResources = {
  'Day 1': [
    { label: 'FRC Introduction & Game Overview', url: 'https://www.youtube.com/watch?v=XJmKSiHvIdo' },
    { label: 'What is FIRST Robotics Competition?', url: 'https://www.youtube.com/watch?v=H3t397jpbO8' },
    { label: 'FRC Robot Mechanisms Explained', url: 'https://www.youtube.com/watch?v=MejFKuHbsJo' },
    { label: 'Team 254 Robot Reveal', url: 'https://www.youtube.com/watch?v=6_mfwWnhLZk' },
  ],
  'Day 2': [
    { label: 'Engineering Design Process for FRC', url: 'https://www.youtube.com/watch?v=xR9cA8LZ4Oo' },
    { label: 'OnShape CAD for FRC Tutorial', url: 'https://www.youtube.com/watch?v=BWDk4BZFN3Q' },
    { label: 'CAD Best Practices for Robotics', url: 'https://www.youtube.com/watch?v=jSjb02OIYUE' },
    { label: 'Sketching & Modeling Basics', url: 'https://www.youtube.com/watch?v=qz2_D7NLzfw' },
  ],
  'Day 3': [
    { label: 'FRC Drivetrain Design Basics', url: 'https://www.youtube.com/watch?v=1xwaIzuMmuw' },
    { label: 'West Coast Drive vs Swerve', url: 'https://www.youtube.com/watch?v=8erhWOsjw3Y' },
    { label: 'Chain and Sprocket Transmission', url: 'https://www.youtube.com/watch?v=SqvqI0JpHN8' },
    { label: 'Understanding Gear Ratios', url: 'https://www.youtube.com/watch?v=4rnU98k4bQQ' },
  ],
  'Day 4': [
    { label: 'FRC Mechanisms: Intakes & Shooters', url: 'https://www.youtube.com/watch?v=7R08CED3L_Q' },
    { label: 'Pneumatics in FRC', url: 'https://www.youtube.com/watch?v=K0xA8Sc-Hoo' },
    { label: 'Linear Actuators & Motion', url: 'https://www.youtube.com/watch?v=0qZQCbK2YYk' },
    { label: 'Linkages and Mechanisms', url: 'https://www.youtube.com/watch?v=jdD-VXAveuw' },
  ],
  'Day 5': [
    { label: 'Material Selection for Robotics', url: 'https://www.youtube.com/watch?v=XwipsZwTeak' },
    { label: 'CNC Machining Basics', url: 'https://www.youtube.com/watch?v=5flZHdhpFZQ' },
    { label: '3D Printing for FRC', url: 'https://www.youtube.com/watch?v=C4HAJ5HLuB4' },
    { label: 'Manufacturing Techniques', url: 'https://www.youtube.com/watch?v=GCyiDaM3boc' },
  ],
  'Day 6': [
    { label: 'Robot Assembly Best Practices', url: 'https://www.youtube.com/watch?v=lwD9P7OQiNI' },
    { label: 'Wire Management for FRC', url: 'https://www.youtube.com/watch?v=K6aKFp7TdvY' },
    { label: 'Integration & Testing Strategy', url: 'https://www.youtube.com/watch?v=6H-sTqgFN4Q' },
    { label: 'FRC Build Season Time-lapse', url: 'https://www.youtube.com/watch?v=7eCj5wGrMZ8' },
  ],
};

async function addVideosToExistingCourses() {
  try {
    // Connect directly using environment variables
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/umoja_lms';
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');
    
    const courses = await Course.find({});
    console.log(`📚 Found ${courses.length} courses`);
    
    for (const course of courses) {
      // Extract day number from title or tags
      const dayMatch = course.title.match(/Day (\d+)/i) || course.tags?.find(t => t.match(/Day \d+/))?.match(/Day (\d+)/);
      
      if (!dayMatch) {
        console.log(`⏭️  Skipping "${course.title}" - no day number found`);
        continue;
      }
      
      const dayKey = `Day ${dayMatch[1]}`;
      const videos = videoResources[dayKey];
      
      if (!videos || videos.length === 0) {
        console.log(`⏭️  No videos for ${dayKey}`);
        continue;
      }
      
      console.log(`\n🎥 Adding videos to "${course.title}" (${dayKey})`);
      
      // Add videos to each lesson
      course.lessons.forEach((lesson, index) => {
        // Remove existing video resources
        lesson.resources = lesson.resources.filter(r => r.type !== 'video');
        
        // Add 1-2 videos per lesson
        const videoIndex = index % videos.length;
        const video = videos[videoIndex];
        
        lesson.resources.push({
          type: 'video',
          label: video.label,
          url: video.url,
        });
        
        console.log(`   ✅ Added "${video.label}" to "${lesson.title}"`);
      });
      
      await course.save();
      console.log(`✅ Updated "${course.title}" with ${videos.length} unique videos`);
    }
    
    console.log('\n🎉 All courses updated with YouTube videos!');
    console.log('\n📺 Students can now watch videos directly from each lesson.');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addVideosToExistingCourses();
