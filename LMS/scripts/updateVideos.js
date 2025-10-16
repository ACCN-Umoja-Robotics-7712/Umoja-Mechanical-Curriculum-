// This script updates existing courses with better YouTube videos
const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

// Curated, high-quality FRC educational videos
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
    { label: '🎥 SolidWorks Robot Design', url: 'https://www.youtube.com/watch?v=xfrorTr157o' },
    { label: '🎥 CAD Best Practices - FRC', url: 'https://www.youtube.com/watch?v=jSjb02OIYUE' },
  ],
  3: [
    { label: '🎥 FRC Drivetrain Types', url: 'https://www.youtube.com/watch?v=1xwaIzuMmuw' },
    { label: '🎥 West Coast Drive Build', url: 'https://www.youtube.com/watch?v=GhHVZP76hDM' },
    { label: '🎥 Swerve Drive Explained', url: 'https://www.youtube.com/watch?v=8erhWOsjw3Y' },
    { label: '🎥 Chain & Sprocket Systems', url: 'https://www.youtube.com/watch?v=SqvqI0JpHN8' },
    { label: '🎥 Gear Ratios Made Simple', url: 'https://www.youtube.com/watch?v=4rnU98k4bQQ' },
  ],
  4: [
    { label: '🎥 FRC Mechanisms Overview', url: 'https://www.youtube.com/watch?v=7R08CED3L_Q' },
    { label: '🎥 Intake Design Tutorial', url: 'https://www.youtube.com/watch?v=K0xA8Sc-Hoo' },
    { label: '🎥 Pneumatics System Guide', url: 'https://www.youtube.com/watch?v=LoC7SYN-1tc' },
    { label: '🎥 Elevator & Arm Mechanisms', url: 'https://www.youtube.com/watch?v=jdD-VXAveuw' },
  ],
  5: [
    { label: '🎥 Materials for Robotics', url: 'https://www.youtube.com/watch?v=XwipsZwTeak' },
    { label: '🎥 CNC Milling Basics', url: 'https://www.youtube.com/watch?v=5flZHdhpFZQ' },
    { label: '🎥 3D Printing for FRC', url: 'https://www.youtube.com/watch?v=C4HAJ5HLuB4' },
    { label: '🎥 Lathe Operation Tutorial', url: 'https://www.youtube.com/watch?v=GCyiDaM3boc' },
  ],
  6: [
    { label: '🎥 Robot Assembly Process', url: 'https://www.youtube.com/watch?v=lwD9P7OQiNI' },
    { label: '🎥 Wiring & Electronics', url: 'https://www.youtube.com/watch?v=K6aKFp7TdvY' },
    { label: '🎥 Build Season - Team 254', url: 'https://www.youtube.com/watch?v=6vGJgvZy0oU' },
    { label: '🎥 Testing & Troubleshooting', url: 'https://www.youtube.com/watch?v=6H-sTqgFN4Q' },
  ],
};

async function updateCourseVideos() {
  try {
    console.log('🔐 Logging in as instructor...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'mentor@umoja.com',
      password: 'umoja2025!'
    });
    
    const token = loginResponse.data.token;
    const api = axios.create({
      baseURL: API_BASE,
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Authenticated\n');
    console.log('📚 Fetching courses...');
    
    const coursesResponse = await api.get('/courses?includeDrafts=true');
    const courses = coursesResponse.data.courses;
    
    console.log(`Found ${courses.length} courses\n`);
    
    for (const course of courses) {
      const dayMatch = course.title.match(/Day (\d+)/i);
      if (!dayMatch) continue;
      
      const dayNum = parseInt(dayMatch[1]);
      const videos = videoResources[dayNum];
      
      if (!videos) continue;
      
      console.log(`🎬 Updating "${course.title}"...`);
      
      // For each lesson, update video resources
      for (let i = 0; i < course.lessons.length; i++) {
        const lesson = course.lessons[i];
        const videoIndex = i % videos.length;
        const video = videos[videoIndex];
        
        // Remove old video resources
        const updatedResources = lesson.resources.filter(r => r.type !== 'video');
        
        // Add new video
        updatedResources.push({
          type: 'video',
          label: video.label,
          url: video.url
        });
        
        try {
          await api.patch(`/courses/${course._id}/lessons/${lesson._id}`, {
            resources: updatedResources
          });
          console.log(`   ✅ Updated "${lesson.title}" with ${video.label}`);
        } catch (error) {
          console.error(`   ❌ Failed to update lesson: ${error.response?.data?.message || error.message}`);
        }
      }
      
      console.log(`✅ Finished updating "${course.title}"\n`);
    }
    
    console.log('🎉 All courses updated with curated videos!');
    console.log('\n📺 Refresh your browser to see the new videos!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
  }
}

updateCourseVideos();
