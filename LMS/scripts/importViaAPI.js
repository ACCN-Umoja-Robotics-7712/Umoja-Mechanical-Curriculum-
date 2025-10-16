// This script directly calls the backend API to create courses with videos
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const API_BASE = 'http://localhost:5001/api';
const CURRICULUM_PATH = 'D:\\Umoja Mechanical Curiculum';

const videoResources = {
  1: [
    { label: '🎥 FIRST Robotics Competition Intro', url: 'https://www.youtube.com/watch?v=H3t397jpbO8' },
    { label: '🎥 How FRC Works - Overview', url: 'https://www.youtube.com/watch?v=XJmKSiHvIdo' },
    { label: '🎥 Robot Design Basics - Team 254', url: 'https://www.youtube.com/watch?v=MejFKuHbsJo' },
    { label: '🎥 Championship Highlights', url: 'https://www.youtube.com/watch?v=Mto-68pZ694' },
  ],
  2: [
    { label: '🎥 Engineering Design Process', url: 'https://www.youtube.com/watch?v=wSNIHhWEqMI' },
    { label: '🎥 OnShape CAD for Beginners', url: 'https://www.youtube.com/watch?v=PWp7MchY8Y0' },
    { label: '🎥 SolidWorks Robot Design Tutorial', url: 'https://www.youtube.com/watch?v=xfrorTr157o' },
    { label: '🎥 CAD Best Practices - FRC', url: 'https://www.youtube.com/watch?v=jSjb02OIYUE' },
  ],
  3: [
    { label: '🎥 FRC Drivetrain Types Explained', url: 'https://www.youtube.com/watch?v=1xwaIzuMmuw' },
    { label: '🎥 West Coast Drive Build', url: 'https://www.youtube.com/watch?v=GhHVZP76hDM' },
    { label: '🎥 Swerve Drive Explained', url: 'https://www.youtube.com/watch?v=8erhWOsjw3Y' },
    { label: '🎥 Chain and Sprocket Systems', url: 'https://www.youtube.com/watch?v=SqvqI0JpHN8' },
    { label: '🎥 Gear Ratios Made Simple', url: 'https://www.youtube.com/watch?v=4rnU98k4bQQ' },
  ],
  4: [
    { label: '🎥 FRC Mechanisms Overview', url: 'https://www.youtube.com/watch?v=7R08CED3L_Q' },
    { label: '🎥 Intake Design Tutorial', url: 'https://www.youtube.com/watch?v=K0xA8Sc-Hoo' },
    { label: '🎥 Pneumatics System Guide', url: 'https://www.youtube.com/watch?v=LoC7SYN-1tc' },
    { label: '🎥 Elevator and Arm Mechanisms', url: 'https://www.youtube.com/watch?v=jdD-VXAveuw' },
  ],
  5: [
    { label: '🎥 Materials for Robotics', url: 'https://www.youtube.com/watch?v=XwipsZwTeak' },
    { label: '🎥 CNC Milling Basics', url: 'https://www.youtube.com/watch?v=5flZHdhpFZQ' },
    { label: '🎥 3D Printing for FRC', url: 'https://www.youtube.com/watch?v=C4HAJ5HLuB4' },
    { label: '🎥 Lathe Operation Tutorial', url: 'https://www.youtube.com/watch?v=GCyiDaM3boc' },
  ],
  6: [
    { label: '🎥 Robot Assembly Process', url: 'https://www.youtube.com/watch?v=lwD9P7OQiNI' },
    { label: '🎥 Wiring and Electronics Integration', url: 'https://www.youtube.com/watch?v=K6aKFp7TdvY' },
    { label: '🎥 Build Season Time-lapse - Team 254', url: 'https://www.youtube.com/watch?v=6vGJgvZy0oU' },
    { label: '🎥 Testing and Troubleshooting', url: 'https://www.youtube.com/watch?v=6H-sTqgFN4Q' },
  ],
};

const courseFiles = [
  { file: 'Day1_Introduction_FRC_Fundamentals.md', day: 1 },
  { file: 'Day2_Design_Process_CAD.md', day: 2 },
  { file: 'Day3_Drivetrain_Power_Transmission.md', day: 3 },
  { file: 'Day4_Mechanisms_Actuators.md', day: 4 },
  { file: 'Day5_Material_Selection_Manufacturing.md', day: 5 },
  { file: 'Day6_Assembly_Integration.md', day: 6 },
];

async function registerInstructor() {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, {
      name: 'Umoja Robotics Mentor',
      email: 'mentor@umoja.com',
      password: 'umoja2025!',
      role: 'instructor'
    });
    return response.data.token;
  } catch (error) {
    if (error.response?.status === 409) {
      // Already exists, login instead
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
        email: 'mentor@umoja.com',
        password: 'umoja2025!'
      });
      return loginResponse.data.token;
    }
    throw error;
  }
}

function parseContentToLessons(content, dayNumber) {
  const lines = content.split('\n');
  const lessons = [];
  let currentSection = { title: '', content: [], videos: [] };
  
  for (const line of lines) {
    if (line.startsWith('## ') && !line.includes('Overview')) {
      if (currentSection.title) {
        lessons.push(currentSection);
      }
      currentSection = {
        title: line.replace(/^##+ /, '').trim(),
        content: [],
        videos: []
      };
    } else if (currentSection.title) {
      currentSection.content.push(line);
    }
  }
  
  if (currentSection.title) {
    lessons.push(currentSection);
  }
  
  // Assign videos to lessons
  const videos = videoResources[dayNumber] || [];
  lessons.forEach((lesson, idx) => {
    const videoIdx = idx % videos.length;
    lesson.videos.push(videos[videoIdx]);
  });
  
  return lessons.map((lesson, idx) => ({
    title: lesson.title || `Lesson ${idx + 1}`,
    overview: lesson.content.find(l => l.trim().length > 30)?.substring(0, 200) || 'Mechanical engineering fundamentals',
    durationMinutes: 90,
    resources: [
      {
        type: 'text',
        label: '📄 Lesson Content',
        content: lesson.content.join('\n').substring(0, 4000)
      },
      ...lesson.videos.map(v => ({
        type: 'video',
        label: v.label,
        url: v.url
      }))
    ]
  }));
}

async function importCourses() {
  try {
    console.log('🔐 Setting up instructor account...');
    const token = await registerInstructor();
    console.log('✅ Instructor authenticated');
    
    const api = axios.create({
      baseURL: API_BASE,
      headers: { Authorization: `Bearer ${token}` }
    });
    
    for (const { file, day } of courseFiles) {
      try {
        const filePath = path.join(CURRICULUM_PATH, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        const title = content.match(/^#\s+(.+)$/m)?.[1] || file.replace('.md', '');
        const description = content.split('\n').find(l => l.trim().length > 30) || 'Umoja Mechanical Curriculum';
        const lessons = parseContentToLessons(content, day);
        
        console.log(`\n📚 Creating "${title}"...`);
        
        const courseResponse = await api.post('/courses', {
          title,
          description: description.substring(0, 300),
          category: 'FRC Mechanical Engineering',
          difficulty: day <= 2 ? 'beginner' : day <= 4 ? 'intermediate' : 'advanced',
          durationWeeks: 1,
          tags: ['FRC', 'Mechanical', 'Robotics', `Day ${day}`],
        });
        
        const courseId = courseResponse.data.course._id;
        
        // Add lessons with videos
        for (const lesson of lessons) {
          await api.post(`/courses/${courseId}/lessons`, lesson);
        }
        
        // Publish course
        await api.post(`/courses/${courseId}/toggle-publish`);
        
        console.log(`✅ Created "${title}" with ${lessons.length} lessons and videos`);
      } catch (error) {
        console.error(`❌ Error importing ${file}:`, error.response?.data?.message || error.message);
      }
    }
    
    console.log('\n🎉 All courses imported successfully!');
    console.log('\n🔑 Instructor Login:');
    console.log('   Email: mentor@umoja.com');
    console.log('   Password: umoja2025!');
    console.log('\n🌐 Visit http://localhost:3000/courses to see your courses!');
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

importCourses();
