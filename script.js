// Umoja 7712 FRC Robotics LMS JavaScript - Fixed Version

// Global state management
let currentProgress = 0;
let completedLessons = [];

// Initialize LMS when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLMS();
    loadProgress();
    updateProgressDisplay();
});

// Initialize LMS functionality
function initializeLMS() {
    // Set default active section
    showSection('dashboard');
    
    // Add event listeners for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            showSection(section);
            updateActiveNav(this);
        });
    });
    
    // Initialize lesson cards
    initializeLessonCards();
    
    console.log('Umoja 7712 FRC Robotics LMS Initialized');
}

// Show specific content section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Hide lesson container if showing other sections
    if (sectionId !== 'lesson-viewer') {
        const lessonContainer = document.querySelector('.lesson-container');
        if (lessonContainer) {
            lessonContainer.style.display = 'none';
        }
    }
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Update navigation active state
function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Initialize lesson cards with click handlers
function initializeLessonCards() {
    const lessonCards = document.querySelectorAll('.lesson-card');
    console.log('Found lesson cards:', lessonCards.length);
    lessonCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const weekId = this.getAttribute('data-week');
            console.log('Lesson card clicked, week:', weekId);
            if (weekId) {
                openInteractiveLesson(parseInt(weekId));
            } else {
                console.error('No data-week attribute found on card:', index);
            }
        });
    });
}

// Progress tracking functions
function saveProgress() {
    const progressData = {
        currentProgress: currentProgress,
        completedLessons: completedLessons,
        lastAccessed: new Date().toISOString()
    };
    localStorage.setItem('umojaFRCProgress', JSON.stringify(progressData));
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('umojaFRCProgress');
        if (saved) {
            const data = JSON.parse(saved);
            currentProgress = data.currentProgress || 0;
            completedLessons = data.completedLessons || [];
            updateProgressDisplay();
        }
    } catch (error) {
        console.log('No saved progress found');
    }
}

function updateProgressDisplay() {
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const nextLessonSpan = document.getElementById('next-lesson');
    
    if (progressBar) {
        progressBar.style.width = currentProgress + '%';
    }
    
    if (progressText) {
        progressText.textContent = Math.round(currentProgress) + '% Complete';
    }
    
    if (nextLessonSpan) {
        const weekTitles = [
            "Safety & Tools Introduction",
            "Measurement & CAD Basics", 
            "Materials & Fasteners",
            "Basic Mechanisms"
        ];
        
        const nextWeek = Math.floor(currentProgress / 25) + 1;
        if (nextWeek <= weekTitles.length) {
            nextLessonSpan.textContent = weekTitles[nextWeek - 1];
        } else {
            nextLessonSpan.textContent = "Course Complete!";
        }
    }
}

function completeLesson(lessonId) {
    if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        currentProgress = Math.min(100, currentProgress + 25);
        saveProgress();
        updateProgressDisplay();
        
        // Update lesson card UI
        const lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
        if (lessonCard) {
            lessonCard.classList.add('completed');
        }
    }
}

// YouTube video modal functionality
function openYouTubeVideo(videoId, title) {
    const modal = document.getElementById('video-modal');
    const modalContent = document.getElementById('video-modal-content');
    
    if (modal && modalContent) {
        modalContent.innerHTML = `
            <div class="video-modal-header">
                <h3>${title}</h3>
                <span class="video-close" onclick="closeVideoModal()">&times;</span>
            </div>
            <div class="video-modal-body">
                <iframe width="800" height="450" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('video-modal-content').innerHTML = '';
    }
}

// Quiz functionality
function selectQuizOption(element, isCorrect) {
    // Remove previous selections in this question group
    const siblings = element.parentElement.querySelectorAll('.quiz-option');
    siblings.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    
    // Mark this option as selected
    element.classList.add('selected');
    
    // Show if correct or incorrect
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function checkQuizAnswers() {
    const questions = document.querySelectorAll('.quiz-question');
    let correct = 0;
    let total = questions.length;
    
    questions.forEach(question => {
        const correctOption = question.querySelector('.quiz-option.correct.selected');
        if (correctOption) {
            correct++;
        }
    });
    
    const percentage = Math.round((correct / total) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excellent work!';
    } else if (percentage >= 60) {
        message = 'Good job!';
    } else {
        message = 'Keep studying!';
    }
    
    document.getElementById('quiz-score').innerHTML = `Score: ${correct}/${total} (${percentage}%) - ${message}`;
}

// Lesson data with all content
const lessonData = {
    1: {
        title: "Day 1: Safety & Tools/Equipment Introduction",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "🔧 Introduction to Basic Tools",
                type: "tools-notes",
                completed: false
            },
            {
                title: "📺 Tools & Equipment Video",
                type: "tools-video",
                completed: false
            },
            {
                title: "🛠️ Hands-On Tool Identification",
                type: "tools-practical",
                completed: false
            },
            {
                title: "📏 Basic Measuring Practice",
                type: "measuring",
                completed: false
            },
            {
                title: "✅ Tools Knowledge Check",
                type: "tools-quiz",
                completed: false
            }
        ],
        stepContent: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Day 1: Safety & Tools/Equipment Introduction 🛡️🔧</h3>
                        <div class="welcome-message">
                            <p><strong>Welcome to your FRC robotics journey!</strong> Today we build the foundation that separates championship teams from the rest. Every successful robot starts with safe practices and precise tool work!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Master These Skills Today</h4>
                            <p><strong>By the end of this 4-6 hour intensive, you'll be ready to contribute to any FRC team:</strong></p>
                            
                            <div class="objective-section safety">
                                <h5>🛡️ Safety Excellence</h5>
                                <ul>
                                    <li>Execute all FRC workshop safety protocols without supervision</li>
                                    <li>Identify and prevent common workshop hazards</li>
                                    <li>Respond appropriately to emergency situations</li>
                                    <li>Maintain organized, professional workspace standards</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section tools">
                                <h5>🔧 Tool Mastery</h5>
                                <ul>
                                    <li>Identify 25+ essential tools by sight and explain their uses</li>
                                    <li>Demonstrate proper technique for measuring tools (ruler, tape, calipers)</li>
                                    <li>Handle all basic hand tools safely and effectively</li>
                                    <li>Select the right tool for specific robotics tasks</li>
                                    <li>Achieve measurement accuracy within 1/32" tolerance</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section application">
                                <h5>🤖 FRC Application</h5>
                                <ul>
                                    <li>Connect every tool to real robot construction scenarios</li>
                                    <li>Understand precision requirements for competition-ready robots</li>
                                    <li>Apply quality control standards used by winning teams</li>
                                    <li>Work efficiently in team-based build environments</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="lesson-timeline">
                            <h4>📅 Today's Schedule</h4>
                            <div class="timeline">
                                <div class="timeline-item">
                                    <h5>Hours 1-3: Safety Fundamentals</h5>
                                    <p>Safety rules, protective equipment, group safety practice</p>
                                </div>
                                <div class="timeline-item">
                                    <h5>Hours 4-6: Tools & Equipment</h5>
                                    <p>Tool identification, measuring practice, hands-on activities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            1: { // Notes of the Day
                content: `
                    <div class="lesson-section">
                        <h3>📝 Daily Notes: Safety & Tools Fundamentals</h3>
                        
                        <div class="daily-overview">
                            <h4>🎯 Today's Focus</h4>
                            <p>Building a strong foundation in workshop safety and basic tool knowledge - essential skills for every FRC robotics team member!</p>
                        </div>
                        
                        <div class="note-section">
                            <h4>🛡️ Critical Safety Rules</h4>
                            <div style="background: #ffebee; padding: 15px; border-left: 4px solid #f44336; margin: 15px 0;">
                                <ul>
                                    <li><strong>Eye Protection:</strong> Safety glasses ALWAYS - no exceptions!</li>
                                    <li><strong>Clean Workspace:</strong> Organized tools = safe work environment</li>
                                    <li><strong>Emergency Procedures:</strong> Know where exits, first aid, and fire extinguishers are located</li>
                                    <li><strong>Tool Respect:</strong> Every tool has a purpose and proper technique</li>
                                    <li><strong>Ask Questions:</strong> Better to ask than to get injured</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="note-section">
                            <h4>🔧 Tool Categories We'll Explore</h4>
                            <div class="tool-preview-grid">
                                <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>📏 Measuring Tools:</strong> Ruler, tape measure, calipers
                                </div>
                                <div style="background: #f3e5f5; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>🔨 Hand Tools:</strong> Hammer, screwdrivers, wrenches  
                                </div>
                                <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>⚡ Power Tools:</strong> Safety observation only!
                                </div>
                            </div>
                        </div>
                        
                        <div class="robotics-connection">
                            <h4>🤖 Why This Matters in FRC</h4>
                            <p style="background: #fff3cd; padding: 10px; border-radius: 5px;">
                                Professional FRC teams like 254 "The Cheesy Poofs" and 1678 "Citrus Circuits" win championships because they master these fundamentals first. Safety prevents injuries that could sideline team members, and proper tool use ensures robot parts fit perfectly!
                            </p>
                        </div>
                    </div>
                `
            },
            2: { // Video Presentation
                content: `
                    <div class="lesson-section">
                        <h3>📺 FRC Safety Training Video</h3>
                        
                        <div class="video-intro">
                            <p><strong>Essential viewing for all FRC participants!</strong> This official safety training covers everything you need to know to work safely in any FRC workshop environment.</p>
                            
                            <div class="video-highlights">
                                <h4>🎯 Key Topics Covered:</h4>
                                <ul>
                                    <li>Personal Protective Equipment (PPE) requirements</li>
                                    <li>Workshop hazard identification and prevention</li>
                                    <li>Safe tool handling and machine operation protocols</li>
                                    <li>Emergency procedures and first aid basics</li>
                                    <li>FRC-specific safety standards and best practices</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="video-section">
                            <button onclick="openYouTubeVideo('cyknxL-lIKo', 'FRC Safety Training')" class="btn btn-primary btn-large">
                                ▶️ Watch Official FRC Safety Video (15 minutes)
                            </button>
                            
                            <div class="video-notes">
                                <h4>📝 While Watching - Note These Critical Points:</h4>
                                <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 10px;">
                                    <ul>
                                        <li>What PPE is required for different workshop activities?</li>
                                        <li>How do you properly handle cutting tools and sharp objects?</li>
                                        <li>What are the steps for safe power tool operation?</li>
                                        <li>Where should emergency equipment be located?</li>
                                        <li>What's the proper response to workshop accidents?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="post-video-action">
                            <p><em>After watching, we'll discuss these safety protocols and how they apply to our specific workshop setup!</em></p>
                        </div>
                    </div>
                `
            },
            3: { // Group Assignment
                content: `
                    <div class="lesson-section">
                        <h3>👥 Group Assignment: Safety Practice</h3>
                        <p>Work in groups to practice safety procedures and identify basic tools.</p>
                    </div>
                `
            },
            4: { // Knowledge Check
                content: `
                    <div class="lesson-section">
                        <h3>✅ Knowledge Check</h3>
                        <p>Review what you've learned about safety and tools.</p>
                    </div>
                `
            },
            5: { // Simple Quiz
                content: `
                    <div class="lesson-section">
                        <h3>🧠 Simple Quiz</h3>
                        <div class="quiz-container">
                            <div class="question">
                                <h5>What should you ALWAYS wear in the workshop?</h5>
                                <div class="quiz-options">
                                    <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Baseball cap</div>
                                    <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Safety glasses</div>
                                    <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Headphones</div>
                                </div>
                            </div>
                        </div>
                        <button onclick="checkQuizAnswers()" class="btn btn-primary">Check Answers</button>
                        <div id="quiz-score"></div>
                    </div>
                `
            },
            6: { // Introduction to Basic Tools
                content: `
                    <div class="lesson-section">
                        <h3>🔧 Master the Tools That Build Champions</h3>
                        
                        <div class="tools-intro">
                            <h4>🛠️ From Caveman to Championship Robot</h4>
                            <p><strong>Did you know?</strong> Humans first used tools 2.6 million years ago. Today, FRC teams like Team 254 "The Cheesy Poofs" use these same fundamental tool principles to build championship-winning robots!</p>
                            
                            <div class="tool-philosophy">
                                <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #2196F3; margin: 15px 0; font-style: italic;">
                                    "The right tool for the right job makes all the difference between a robot that works and a robot that wins." 
                                    <br><em>- Dean Kamen, FIRST Founder</em>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="tool-categories">
                            <div class="tool-category" style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 15px 0;">
                                <h4>📏 Precision Measuring Tools - The Foundation of Excellence</h4>
                                <p><em>"Measure twice, cut once" - The golden rule that separates pros from amateurs!</em></p>
                                
                                <div class="tool-grid">
                                    <div class="tool-item" style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h5>🚀 Ruler (12"/30cm)</h5>
                                        <p><strong>Mission:</strong> Quick measurements up to 12 inches</p>
                                        <p><strong>FRC Use:</strong> Layout sketches, small bracket dimensions</p>
                                        <p><strong>Pro Tip:</strong> Metal rulers cut straighter lines than plastic!</p>
                                        <p><strong>Accuracy:</strong> ±1/16" (1.5mm)</p>
                                    </div>
                                    <div class="tool-item" style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h5>📏 Tape Measure (25'+)</h5>
                                        <p><strong>Mission:</strong> Long distance measurements, room layouts</p>
                                        <p><strong>FRC Use:</strong> Field measurements, robot dimension checks</p>
                                        <p><strong>Pro Tip:</strong> The metal hook moves slightly - this is intentional for inside/outside measurements!</p>
                                        <p><strong>Accuracy:</strong> ±1/32" over 10 feet</p>
                                    </div>
                                    <div class="tool-item" style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h5>⚡ Calipers (Digital/Dial)</h5>
                                        <p><strong>Mission:</strong> Ultra-precise measurements of parts</p>
                                        <p><strong>FRC Use:</strong> Bearing fits, shaft diameters, thickness checks</p>
                                        <p><strong>Pro Tip:</strong> Zero the calipers before each use session!</p>
                                        <p><strong>Accuracy:</strong> ±0.001" (0.025mm) - That's thinner than paper!</p>
                                    </div>
                                </div>
                                
                                <div class="measurement-challenge">
                                    <h5>🎯 Precision Challenge</h5>
                                    <p style="background: #fff3cd; padding: 10px; border-radius: 5px;">
                                        <strong>Real FRC Scenario:</strong> Your robot's wheel needs to fit precisely in a 0.5000" bearing. If your shaft is 0.5010" (too big) or 0.4985" (too small), your robot won't work! Can you measure accurately enough?
                                    </p>
                                </div>
                            </div>
                            
                            <div class="tool-category" style="background: #f3e5f5; padding: 20px; border-radius: 10px; margin: 15px 0;">
                                <h4>🔨 Essential Hand Tools - Your Robot-Building Arsenal</h4>
                                <p><em>These tools have built everything from the pyramids to Mars rovers!</em></p>
                                
                                <div class="tool-grid">
                                    <div class="tool-item" style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h5>🔨 Hammer (16oz Claw)</h5>
                                        <p><strong>Mission:</strong> Driving nails, shaping metal, assembly/disassembly</p>
                                        <p><strong>FRC Use:</strong> Frame adjustments, pin removal, emergency repairs</p>
                                        <p><strong>Safety Rule:</strong> Eye protection always! Grip firmly near handle end</p>
                                        <p><strong>Pro Technique:</strong> Let the hammer do the work - swing from shoulder, not wrist</p>
                                    </div>
                                    <div class="tool-item" style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h5>🪚 Screwdriver Set</h5>
                                        <p><strong>Mission:</strong> Installing/removing screws of all types</p>
                                        <p><strong>FRC Arsenal:</strong> Phillips (#1, #2, #3), Flathead (multiple sizes), Torx (T10-T40), Hex (2-10mm)</p>
                                        <p><strong>Golden Rule:</strong> Match the driver to the screw exactly - wrong size damages both!</p>
                                        <p><strong>Speed Tip:</strong> Magnetic tips hold screws = faster assembly</p>
                                    </div>
                                    <div class="tool-item" style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h5>🔧 Wrench Set (Box-End/Open-End)</h5>
                                        <p><strong>Mission:</strong> Tightening/loosening nuts and bolts</p>
                                        <p><strong>FRC Standard:</strong> Metric (8-19mm) and SAE (5/16"-3/4")</p>
                                        <p><strong>Remember:</strong> "Righty tighty, lefty loosey" + box-end for power, open-end for speed</p>
                                        <p><strong>Torque Secret:</strong> Consistent pressure prevents stripped fasteners</p>
                                    </div>
                                </div>
                                
                                <div class="tool-safety-reminder">
                                    <h5>⚠️ Hand Tool Safety Code</h5>
                                    <div style="background: #ffebee; padding: 10px; border-radius: 5px; border-left: 4px solid #f44336;">
                                        <ul>
                                            <li><strong>Inspect before use:</strong> Cracked handles = dangerous tools</li>
                                            <li><strong>Right tool, right job:</strong> Using a wrench as a hammer breaks both</li>
                                            <li><strong>Clean after use:</strong> Oil and dirt make tools slip</li>
                                            <li><strong>Store properly:</strong> Organized tools = efficient work</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="robotics-connection">
                            <h4>🤖 From Tools to Championship Trophies</h4>
                            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
                                <h5>Real FRC Success Stories:</h5>
                                <div class="success-stories">
                                    <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
                                        <strong>🏆 Team 254 "The Cheesy Poofs"</strong>
                                        <p>Uses precision calipers to ensure every bearing fits perfectly - helping them win 3 World Championships!</p>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
                                        <strong>🥇 Team 1678 "Citrus Circuits"</strong>
                                        <p>Their tool organization system allows for 30-second robot repairs during matches!</p>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
                                        <strong>🎯 Team 148 "Robowranglers"</strong>
                                        <p>Teaches every new member these exact same tools - building both robots and careers!</p>
                                    </div>
                                </div>
                                
                                <h5>Your Robot-Building Journey:</h5>
                                <p><strong>Week 1:</strong> Learn these tools safely<br>
                                <strong>Week 3:</strong> Help build practice robot<br>
                                <strong>Week 6:</strong> Lead your own subsystem build<br>
                                <strong>Competition:</strong> Make crucial repairs under pressure!</p>
                            </div>
                        </div>
                    </div>
                `
            },
            7: { // Tools & Equipment Video
                content: `
                    <div class="lesson-section">
                        <h3>📺 Tools & Equipment Video</h3>
                        
                        <div class="video-section">
                            <h4>🎬 Watch: Basic Workshop Tools</h4>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                                <p>Let's watch how professionals use basic workshop tools!</p>
                                
                                <button onclick="openBasicToolsVideo()" class="btn btn-primary" style="margin: 10px;">
                                    ▶️ Play Tools Video
                                </button>
                                
                                <div class="video-info" style="margin-top: 15px;">
                                    <p><strong>Duration:</strong> 8 minutes</p>
                                    <p><strong>Focus:</strong> Safe tool handling and proper techniques</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="watch-for">
                            <h4>👀 What to Watch For:</h4>
                            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <ul>
                                    <li>How to hold each tool properly</li>
                                    <li>Safety equipment being worn</li>
                                    <li>Different techniques for different jobs</li>
                                    <li>How tools are stored and organized</li>
                                    <li>Common mistakes to avoid</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="video-notes">
                            <h4>📝 Take Notes While Watching:</h4>
                            <textarea placeholder="Write down interesting things you notice about tool usage..." 
                                     style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin: 10px 0;"></textarea>
                            
                            <h5>Quick Questions:</h5>
                            <div style="background: #e8f5e8; padding: 10px; border-radius: 4px;">
                                <p>1. Which safety equipment was used most often? ________________</p>
                                <p>2. What surprised you about tool techniques? ________________</p>
                                <p>3. Which tool would you like to try first? ________________</p>
                            </div>
                        </div>
                    </div>
                `
            },
            7: { // Tools & Equipment Video
                content: `
                    <div class="lesson-section">
                        <h3>📺 Tools & Equipment Video</h3>
                        
                        <div class="video-section">
                            <h4>🎬 Watch: Basic Workshop Tools</h4>
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                                <p>Let's watch how professionals use basic workshop tools!</p>
                                
                                <button onclick="openBasicToolsVideo()" class="btn btn-primary" style="margin: 10px;">
                                    ▶️ Play Tools Video
                                </button>
                                
                                <div class="video-info" style="margin-top: 15px;">
                                    <p><strong>Duration:</strong> 8 minutes</p>
                                    <p><strong>Focus:</strong> Safe tool handling and proper techniques</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="watch-for">
                            <h4>👀 What to Watch For:</h4>
                            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <ul>
                                    <li>How to hold each tool properly</li>
                                    <li>Safety equipment being worn</li>
                                    <li>Different techniques for different jobs</li>
                                    <li>How tools are stored and organized</li>
                                    <li>Common mistakes to avoid</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="video-notes">
                            <h4>📝 Take Notes While Watching:</h4>
                            <textarea placeholder="Write down interesting things you notice about tool usage..." 
                                     style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin: 10px 0;"></textarea>
                            
                            <h5>Quick Questions:</h5>
                            <div style="background: #e8f5e8; padding: 10px; border-radius: 4px;">
                                <p>1. Which safety equipment was used most often? ________________</p>
                                <p>2. What surprised you about tool techniques? ________________</p>
                                <p>3. Which tool would you like to try first? ________________</p>
                            </div>
                        </div>
                    </div>
                `
            },
            8: { // Hands-On Tool Identification
                content: `
                    <div class="lesson-section">
                        <h3>🛠️ Real Tools Challenge - Can You Identify Them All?</h3>
                        
                        <div class="challenge-intro">
                            <p><strong>🎯 The Ultimate Tool Test!</strong> Your instructor has 15 real tools laid out. Can you identify them all and explain what they do? This is the same challenge given to new members of championship FRC teams!</p>
                            
                            <div class="scoring-system">
                                <h4>🏆 Scoring System</h4>
                                <ul style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                                    <li><strong>Expert Level (13-15 correct):</strong> Ready for advanced projects!</li>
                                    <li><strong>Intermediate (10-12 correct):</strong> Good foundation, keep learning!</li>
                                    <li><strong>Beginner (7-9 correct):</strong> Great start, review and try again!</li>
                                    <li><strong>Learning Mode (0-6 correct):</strong> Perfect time to ask questions!</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="activity-section">
                            <h4>📝 Professional Tool Identification Chart</h4>
                            <p style="background: #fff3cd; padding: 10px; border-radius: 5px;"><strong>Instructions:</strong> For each tool, write its name, primary function, and one safety consideration.</p>
                            
                            <table border="1" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr style="background: #f8f9fa;">
                                    <th style="padding: 12px; width: 10%;">Tool #</th>
                                    <th style="padding: 12px; width: 25%;">Tool Name</th>
                                    <th style="padding: 12px; width: 35%;">Primary Function</th>
                                    <th style="padding: 12px; width: 30%;">Safety Consideration</th>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">1</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">2</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">3</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">4</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">5</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">6</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">7</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px; text-align: center; font-weight: bold;">8</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                    <td style="padding: 10px;">_________________</td>
                                </tr>
                            </table>
                            
                            <div class="bonus-challenge">
                                <h4>🌟 Bonus Challenge</h4>
                                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                    <p><strong>FRC Team Captain Question:</strong> If you were building a robot drivetrain and needed to install motors, which 3 tools from this collection would be most essential? Explain why.</p>
                                    <div style="margin-top: 10px;">
                                        <p><strong>Your Answer:</strong></p>
                                        <textarea style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Write your reasoning here..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            9: { // Basic Measuring Practice
                content: `
                    <div class="lesson-section">
                        <h3>📏 Precision Measuring Lab - FRC Accuracy Challenge</h3>
                        
                        <div class="lab-intro">
                            <p><strong>🎯 Mission:</strong> Achieve the measurement accuracy required by championship FRC teams! In real robot building, a difference of 1/32" can mean the difference between a working mechanism and a broken one.</p>
                            
                            <div class="accuracy-standards">
                                <h4>🏆 FRC Measurement Standards</h4>
                                <ul style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                                    <li><strong>Structural measurements:</strong> ±1/16" (1.5mm) tolerance</li>
                                    <li><strong>Bearing fits:</strong> ±0.005" (0.13mm) tolerance</li>
                                    <li><strong>Critical alignments:</strong> ±0.001" (0.025mm) tolerance</li>
                                    <li><strong>Field positioning:</strong> ±1/4" (6mm) tolerance</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="measuring-activity">
                            <h4>📐 Professional Measuring Exercise</h4>
                            <p style="background: #fff3cd; padding: 10px; border-radius: 5px;"><strong>Instructions:</strong> Measure each object using the specified tool. Record measurements in both inches and millimeters where indicated. Check your work by measuring twice!</p>
                            
                            <table border="1" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr style="background: #f8f9fa;">
                                    <th style="padding: 12px;">Object to Measure</th>
                                    <th style="padding: 12px;">Your Measurement</th>
                                    <th style="padding: 12px;">Required Tool</th>
                                    <th style="padding: 12px;">Target Accuracy</th>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;"><strong>Pencil length</strong></td>
                                    <td style="padding: 10px;">_____ inches / _____ cm</td>
                                    <td style="padding: 10px;">Ruler</td>
                                    <td style="padding: 10px;">±1/16"</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px;"><strong>Workbench width</strong></td>
                                    <td style="padding: 10px;">_____ feet _____ inches</td>
                                    <td style="padding: 10px;">Tape measure</td>
                                    <td style="padding: 10px;">±1/8"</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;"><strong>Bolt diameter</strong> (if available)</td>
                                    <td style="padding: 10px;">_____ inches / _____ mm</td>
                                    <td style="padding: 10px;">Calipers</td>
                                    <td style="padding: 10px;">±0.001"</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px;"><strong>Textbook thickness</strong></td>
                                    <td style="padding: 10px;">_____ inches / _____ mm</td>
                                    <td style="padding: 10px;">Calipers</td>
                                    <td style="padding: 10px;">±0.005"</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px;"><strong>Door height</strong></td>
                                    <td style="padding: 10px;">_____ feet _____ inches</td>
                                    <td style="padding: 10px;">Tape measure</td>
                                    <td style="padding: 10px;">±1/4"</td>
                                </tr>
                                <tr style="background: #f9f9f9;">
                                    <td style="padding: 10px;"><strong>Coin thickness</strong> (quarter)</td>
                                    <td style="padding: 10px;">_____ inches / _____ mm</td>
                                    <td style="padding: 10px;">Calipers</td>
                                    <td style="padding: 10px;">±0.001"</td>
                                </tr>
                            </table>
                            
                            <div class="measurement-challenges">
                                <h4>🧠 Real-World Application Challenges</h4>
                                
                                <div class="challenge-scenario" style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                    <h5>Challenge 1: Robot Frame Calculation</h5>
                                    <p>Your robot needs to fit within a 28" x 38" x 42" frame perimeter. If your aluminum extrusion is 1.5" x 1.5" and you want 1" of clearance on all sides, what are the maximum internal dimensions you can work with?</p>
                                    <p><strong>Length:</strong> _______ inches</p>
                                    <p><strong>Width:</strong> _______ inches</p>
                                    <p><strong>Height:</strong> _______ inches</p>
                                </div>
                                
                                <div class="challenge-scenario" style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                    <h5>Challenge 2: Precision Bearing Fit</h5>
                                    <p>You have a bearing with an inner diameter of 0.5000". Your shaft measures 0.4995". Will this fit properly?</p>
                                    <p><strong>Answer:</strong> ____________ <strong>Reason:</strong> ________________________</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            10: { // Tools Knowledge Check
                content: `
                    <div class="lesson-section">
                        <h3>✅ Final Challenge: FRC Team Member Certification</h3>
                        
                        <div class="certification-intro">
                            <h4>🏆 Congratulations! Time for Your Official Assessment</h4>
                            <p>You've completed the safety training and tool introduction. This final quiz determines if you're ready to work safely and effectively as an FRC team member!</p>
                            
                            <div class="certification-standards">
                                <h5>📋 Certification Requirements</h5>
                                <ul style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                    <li><strong>Safety Knowledge:</strong> Must score 100% on safety questions</li>
                                    <li><strong>Tool Identification:</strong> Must identify 8/10 tools correctly</li>
                                    <li><strong>Practical Application:</strong> Must solve 2/3 scenarios correctly</li>
                                    <li><strong>Overall Score:</strong> Must achieve 85% or higher</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="tools-quiz">
                            <h4>🧠 Comprehensive Knowledge Assessment</h4>
                            
                            <div class="quiz-section safety-section">
                                <h5 style="color: #d32f2f;">🛡️ Critical Safety Questions (Must get 100%)</h5>
                                
                                <div class="question" style="background: #ffebee; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>1. When working in the shop, you must ALWAYS wear:</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Closed-toe shoes only</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Safety glasses at all times</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Gloves when handling wood</div>
                                    </div>
                                </div>
                                
                                <div class="question" style="background: #ffebee; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>2. If you see a fire in the workshop, your FIRST action should be:</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Try to put it out yourself</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Alert others and evacuate if necessary</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Continue working if it's small</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="quiz-section tool-section">
                                <h5 style="color: #1976d2;">🔧 Tool Mastery Questions</h5>
                                
                                <div class="question" style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>3. For measuring the thickness of a sheet of aluminum (0.063"), which tool provides the best accuracy?</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Ruler</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">B) Tape measure</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">C) Calipers</div>
                                    </div>
                                </div>
                                
                                <div class="question" style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>4. You need to tighten a 10mm bolt. The best tool to use is:</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Adjustable wrench</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) 10mm box-end wrench</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Phillips screwdriver</div>
                                    </div>
                                </div>
                                
                                <div class="question" style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>5. The golden rule "measure twice, cut once" means:</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Always cut in two passes</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Verify measurements before cutting to avoid waste</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Use two different measuring tools</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="quiz-section scenario-section">
                                <h5 style="color: #388e3c;">🤖 FRC Application Scenarios</h5>
                                
                                <div class="question" style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>6. Your robot's arm needs to extend exactly 48 inches from the base. Which measurement approach is most appropriate?</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Estimate by eye</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Use tape measure and verify with second measurement</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Use multiple rulers end-to-end</div>
                                    </div>
                                </div>
                                
                                <div class="question" style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;">
                                    <h6>7. During competition, you need to quickly replace a stripped screw. What information do you need?</h6>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Just the screw color</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Thread size, length, and head type</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Only the length</div>
                                    </div>
                                </div>
                            </div>
                            
                            <button onclick="checkQuizAnswers()" class="btn btn-primary btn-large" style="margin: 20px 0; padding: 15px 30px;">🏆 Submit for Certification</button>
                            
                            <div id="quiz-score" style="margin-top: 20px; font-weight: bold;"></div>
                        </div>
                        
                        <div class="lesson-summary">
                            <h4>🎯 Your Journey from Beginner to FRC Team Member</h4>
                            <div style="background: #e8f5e8; padding: 25px; border-radius: 10px; margin: 20px 0;">
                                <h5>🏆 Congratulations! You've Mastered:</h5>
                                <div class="achievement-grid">
                                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h6>🛡️ Safety Excellence</h6>
                                        <ul>
                                            <li>FRC workshop safety protocols</li>
                                            <li>Personal protective equipment (PPE)</li>
                                            <li>Emergency response procedures</li>
                                            <li>Hazard identification and prevention</li>
                                        </ul>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h6>📏 Precision Measuring</h6>
                                        <ul>
                                            <li>Ruler techniques for short measurements</li>
                                            <li>Tape measure for long distances</li>
                                            <li>Calipers for precision work (±0.001")</li>
                                            <li>Measurement accuracy standards</li>
                                        </ul>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h6>🔧 Essential Hand Tools</h6>
                                        <ul>
                                            <li>Hammer techniques and safety</li>
                                            <li>Screwdriver types and applications</li>
                                            <li>Wrench selection and proper use</li>
                                            <li>Tool maintenance and storage</li>
                                        </ul>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px;">
                                        <h6>🤖 FRC Applications</h6>
                                        <ul>
                                            <li>Robot construction requirements</li>
                                            <li>Competition precision standards</li>
                                            <li>Quality control processes</li>
                                            <li>Team collaboration principles</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="next-steps">
                                    <h5>🚀 Your Next Steps in FRC:</h5>
                                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                        <p><strong>Week 2:</strong> Advanced measuring and marking techniques</p>
                                        <p><strong>Week 3:</strong> Introduction to power tools (observation)</p>
                                        <p><strong>Week 4:</strong> Materials science and fasteners</p>
                                        <p><strong>Week 5:</strong> Your first robot subsystem project!</p>
                                        <p><strong>Competition Season:</strong> Apply these skills under pressure!</p>
                                    </div>
                                </div>
                                
                                <div class="inspiration">
                                    <h5>💡 Remember:</h5>
                                    <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #2196F3; font-style: italic; margin: 15px 0;">
                                        "Every championship robot started with someone learning to use a ruler safely. Today, you joined the ranks of builders, creators, and innovators. The only limit now is your imagination!"
                                        <br><br><em>- Welcome to the FIRST Robotics Community</em>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    },
    
    2: {
        title: "Week 2: Measurement & CAD Basics",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "📏 Advanced Measuring Techniques",
                type: "practical",
                completed: false
            },
            {
                title: "💻 CAD Software Introduction",
                type: "video",
                completed: false
            },
            {
                title: "🛠️ Hands-On CAD Practice",
                type: "practical",
                completed: false
            },
            {
                title: "📐 Precision & Tolerance Workshop",
                type: "practical",
                completed: false
            },
            {
                title: "✅ CAD & Measurement Assessment",
                type: "knowledge",
                completed: false
            }
        ],
        content: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Week 2: Precision Measurement & CAD Fundamentals 📏💻</h3>
                        <div class="welcome-message">
                            <p><strong>Welcome to the world of precision!</strong> Today we master the measurement accuracy and digital design skills that separate amateur builders from championship FRC teams. Every successful robot starts with precise dimensions and professional CAD models!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Master These Critical Skills Today</h4>
                            <p><strong>By the end of this intensive session, you'll think and work like a professional engineer:</strong></p>
                            
                            <div class="objective-section measurement">
                                <h5>📏 Advanced Measurement Mastery</h5>
                                <ul>
                                    <li>Achieve sub-millimeter accuracy with precision tools</li>
                                    <li>Understand and apply engineering tolerances</li>
                                    <li>Master coordinate measurement systems</li>
                                    <li>Apply GD&T (Geometric Dimensioning & Tolerancing) basics</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section cad">
                                <h5>💻 CAD Software Proficiency</h5>
                                <ul>
                                    <li>Navigate CAD interface like a professional</li>
                                    <li>Create precise 2D sketches and 3D models</li>
                                    <li>Apply parametric modeling principles</li>
                                    <li>Generate technical drawings with proper dimensions</li>
                                    <li>Understand file management and version control</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section application">
                                <h5>🤖 FRC Design Integration</h5>
                                <ul>
                                    <li>Model actual FRC components with competition accuracy</li>
                                    <li>Understand design intent and parametric relationships</li>
                                    <li>Create assemblies that reflect real robot constraints</li>
                                    <li>Apply manufacturing considerations in digital design</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="lesson-timeline">
                            <h4>📅 Today's Intensive Schedule</h4>
                            <div class="timeline-grid">
                                <div class="timeline-item">
                                    <strong>Hour 1:</strong> Advanced measuring tool mastery
                                </div>
                                <div class="timeline-item">
                                    <strong>Hour 2:</strong> CAD software introduction & navigation
                                </div>
                                <div class="timeline-item">
                                    <strong>Hour 3:</strong> 2D sketching and constraint application
                                </div>
                                <div class="timeline-item">
                                    <strong>Hour 4:</strong> 3D modeling and feature creation
                                </div>
                                <div class="timeline-item">
                                    <strong>Hour 5:</strong> Assembly design and motion simulation
                                </div>
                                <div class="timeline-item">
                                    <strong>Hour 6:</strong> Technical drawings and documentation
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            1: { // Notes of the Day
                content: `
                    <div class="lesson-section">
                        <h3>📝 Daily Notes: Precision & Digital Design Excellence</h3>
                        
                        <div class="daily-overview">
                            <h4>🎯 Today's Mission</h4>
                            <p>Transforming from basic tool users to precision engineers! Today you'll develop the measurement accuracy and CAD skills that championship teams like 1678 Citrus Circuits use to dominate competitions.</p>
                        </div>
                        
                        <div class="note-section">
                            <h4>📏 Precision Measurement Principles</h4>
                            <div style="background: #e3f2fd; padding: 15px; border-left: 4px solid #2196F3; margin: 15px 0;">
                                <ul>
                                    <li><strong>Repeatability:</strong> Can you get the same measurement multiple times?</li>
                                    <li><strong>Accuracy:</strong> How close to the true value are you?</li>
                                    <li><strong>Resolution:</strong> What's the smallest change you can detect?</li>
                                    <li><strong>Tolerance:</strong> What variation is acceptable for function?</li>
                                    <li><strong>Calibration:</strong> Are your tools giving true readings?</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="note-section">
                            <h4>💻 CAD Fundamental Concepts</h4>
                            <div class="cad-concepts-grid">
                                <div style="background: #f3e5f5; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>🎯 Parametric Modeling:</strong> Dimensions drive geometry
                                </div>
                                <div style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>🔗 Constraints:</strong> Relationships between elements
                                </div>
                                <div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>📐 Design Intent:</strong> Why, not just what
                                </div>
                                <div style="background: #ffebee; padding: 10px; border-radius: 5px; margin: 5px;">
                                    <strong>🏗️ Feature Tree:</strong> Building history matters
                                </div>
                            </div>
                        </div>
                        
                        <div class="industry-connection">
                            <h4>🏭 Industry Standards We Follow</h4>
                            <p style="background: #e8f5e8; padding: 15px; border-radius: 5px;">
                                <strong>ASME Y14.5 (GD&T):</strong> Professional dimensioning standards<br>
                                <strong>ISO 286 (Fits & Tolerances):</strong> International precision standards<br>
                                <strong>FIRST Design Standards:</strong> Competition-specific requirements<br>
                                <strong>NASA Standards:</strong> Because some FRC alumni work there!
                            </p>
                        </div>
                    </div>
                `
            },
            2: { // Video Presentation
                content: `
                    <div class="lesson-section">
                        <h3>📺 Professional CAD & Measurement Training</h3>
                        
                        <div class="video-intro">
                            <p><strong>Learn from the pros!</strong> This comprehensive training covers advanced measurement techniques and CAD fundamentals used by championship FRC teams and professional engineers.</p>
                            
                            <div class="video-highlights">
                                <h4>🎯 Video Series Coverage:</h4>
                                <ul>
                                    <li>Advanced caliper techniques and measurement best practices</li>
                                    <li>CAD software interface and navigation</li>
                                    <li>Parametric modeling fundamentals</li>
                                    <li>Professional drawing standards and documentation</li>
                                    <li>Real FRC part modeling demonstrations</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="video-section">
                            <button onclick="openYouTubeVideo('dgs_Rz9zfBQ', 'Advanced Measurement Techniques')" class="btn btn-primary btn-large">
                                ▶️ Watch: Advanced Measurement Techniques (12 minutes)
                            </button>
                            
                            <button onclick="openYouTubeVideo('LflX6h_5UvQ', 'CAD Fundamentals for Robotics')" class="btn btn-primary btn-large" style="margin-left: 10px;">
                                ▶️ Watch: CAD Fundamentals for Robotics (18 minutes)
                            </button>
                            
                            <div class="video-notes">
                                <h4>📝 Critical Learning Points:</h4>
                                <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 10px;">
                                    <ul>
                                        <li>How do professionals ensure measurement accuracy?</li>
                                        <li>What are the key CAD workflow principles?</li>
                                        <li>How do design constraints affect robot performance?</li>
                                        <li>What documentation standards do winning teams use?</li>
                                        <li>How does CAD integrate with manufacturing processes?</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="post-video-action">
                            <p><em>After watching, we'll apply these techniques hands-on with real FRC components!</em></p>
                        </div>
                    </div>
                `
            }
        }
    },

    3: {
        title: "Week 3: Fasteners & Hardware",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "🔩 Fastener Identification Lab",
                type: "practical",
                completed: false
            },
            {
                title: "📺 Hardware Selection Video",
                type: "video",
                completed: false
            },
            {
                title: "🛠️ Assembly Practice Workshop",
                type: "practical",
                completed: false
            },
            {
                title: "📐 Torque & Preload Testing",
                type: "practical",
                completed: false
            },
            {
                title: "✅ Fastener Selection Challenge",
                type: "knowledge",
                completed: false
            }
        ],
        content: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Week 3: Fasteners & Hardware Mastery 🔩⚙️</h3>
                        <div class="welcome-message">
                            <p><strong>The foundation of every great robot!</strong> Today we master the mechanical connections that hold championship robots together. From tiny screws to massive bolts, every fastener choice impacts performance, reliability, and competition success!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Fastener Expertise Goals</h4>
                            <p><strong>Master the connections that win competitions:</strong></p>
                            
                            <div class="objective-section identification">
                                <h5>🔍 Complete Fastener Identification</h5>
                                <ul>
                                    <li>Identify 50+ fastener types by sight and specifications</li>
                                    <li>Understand thread pitch, grade, and material properties</li>
                                    <li>Master metric vs imperial fastener systems</li>
                                    <li>Select appropriate fasteners for specific applications</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section application">
                                <h5>⚙️ Professional Assembly Techniques</h5>
                                <ul>
                                    <li>Apply proper torque specifications and techniques</li>
                                    <li>Understand preload, tension, and joint mechanics</li>
                                    <li>Use thread locking compounds appropriately</li>
                                    <li>Implement proper assembly sequences</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section robotics">
                                <h5>🤖 FRC-Specific Hardware Knowledge</h5>
                                <ul>
                                    <li>Apply FIRST hardware rules and regulations</li>
                                    <li>Select fasteners for weight optimization</li>
                                    <li>Design for rapid field repairs and adjustments</li>
                                    <li>Understand failure modes and safety factors</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    },

    4: {
        title: "Week 4: Mechanisms & Motion",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "⚙️ Gear Systems Workshop",
                type: "practical",
                completed: false
            },
            {
                title: "📺 Motion Control Video",
                type: "video",
                completed: false
            },
            {
                title: "🛠️ Mechanism Building Lab",
                type: "practical",
                completed: false
            },
            {
                title: "📐 Mechanical Advantage Calculations",
                type: "practical",
                completed: false
            },
            {
                title: "✅ Mechanism Design Challenge",
                type: "knowledge",
                completed: false
            }
        ],
        content: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Week 4: Mechanisms & Motion Systems ⚙️🎯</h3>
                        <div class="welcome-message">
                            <p><strong>Bring robots to life with motion!</strong> Today we master the gear trains, linkages, and motion systems that transform motor power into championship-winning robot actions. Every great FRC robot starts with brilliantly designed mechanisms!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Motion Mastery Goals</h4>
                            <p><strong>Design mechanisms that outperform the competition:</strong></p>
                            
                            <div class="objective-section theory">
                                <h5>📚 Mechanical Engineering Fundamentals</h5>
                                <ul>
                                    <li>Master gear ratios, mechanical advantage, and efficiency</li>
                                    <li>Understand torque, speed, and power relationships</li>
                                    <li>Apply principles of linkages and cam mechanisms</li>
                                    <li>Calculate system dynamics and loading</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section practical">
                                <h5>⚙️ Hands-On Mechanism Design</h5>
                                <ul>
                                    <li>Build and test various gear train configurations</li>
                                    <li>Design belt and chain drive systems</li>
                                    <li>Create linkage mechanisms for specific motions</li>
                                    <li>Optimize mechanisms for FRC constraints</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section robotics">
                                <h5>🤖 FRC Mechanism Applications</h5>
                                <ul>
                                    <li>Design drivetrains for speed and control</li>
                                    <li>Create manipulator mechanisms for game pieces</li>
                                    <li>Develop climbing and positioning systems</li>
                                    <li>Apply motion control for autonomous functions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    },

    5: {
        title: "Week 5: Structural Design & Materials",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "🏗️ Structural Analysis Lab",
                type: "practical",
                completed: false
            },
            {
                title: "📺 Materials Engineering Video",
                type: "video",
                completed: false
            },
            {
                title: "🛠️ Frame Design Workshop",
                type: "practical",
                completed: false
            },
            {
                title: "📐 Load Testing & Analysis",
                type: "practical",
                completed: false
            },
            {
                title: "✅ Structural Design Project",
                type: "knowledge",
                completed: false
            }
        ],
        content: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Week 5: Structural Design & Materials Engineering 🏗️📐</h3>
                        <div class="welcome-message">
                            <p><strong>Build frames that withstand competition forces!</strong> Today we master structural analysis and materials selection that ensure your robot survives the most intense FRC matches. Learn the engineering principles behind championship-winning robot frames!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Structural Engineering Mastery</h4>
                            <p><strong>Design structures that outperform under pressure:</strong></p>
                            
                            <div class="objective-section analysis">
                                <h5>📊 Structural Analysis Skills</h5>
                                <ul>
                                    <li>Calculate stress, strain, and safety factors</li>
                                    <li>Analyze beam bending and deflection</li>
                                    <li>Understand buckling and failure modes</li>
                                    <li>Apply finite element analysis (FEA) basics</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section materials">
                                <h5>🔬 Materials Engineering Knowledge</h5>
                                <ul>
                                    <li>Select optimal materials for weight and strength</li>
                                    <li>Understand aluminum alloys and their properties</li>
                                    <li>Apply composite materials in robot design</li>
                                    <li>Balance cost, weight, and performance</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section design">
                                <h5>🏗️ Professional Design Methods</h5>
                                <ul>
                                    <li>Create robust frame architectures</li>
                                    <li>Design for manufacturing and assembly</li>
                                    <li>Implement design for testability</li>
                                    <li>Apply aerospace design principles to FRC</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    },

    6: {
        title: "Week 6: Manufacturing & Assembly",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "🏭 Manufacturing Process Lab",
                type: "practical",
                completed: false
            },
            {
                title: "📺 Advanced Manufacturing Video",
                type: "video",
                completed: false
            },
            {
                title: "🛠️ Assembly Techniques Workshop",
                type: "practical",
                completed: false
            },
            {
                title: "📐 Quality Control & Inspection",
                type: "practical",
                completed: false
            },
            {
                title: "✅ Manufacturing Project Challenge",
                type: "knowledge",
                completed: false
            }
        ],
        content: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Week 6: Manufacturing & Assembly Excellence 🏭⚙️</h3>
                        <div class="welcome-message">
                            <p><strong>Transform designs into championship robots!</strong> Today we master the manufacturing processes and assembly techniques that bring CAD models to life. Learn the production methods used by top FRC teams to build winning robots!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Manufacturing Mastery Goals</h4>
                            <p><strong>Master the processes that build champions:</strong></p>
                            
                            <div class="objective-section processes">
                                <h5>🏭 Manufacturing Process Expertise</h5>
                                <ul>
                                    <li>Master CNC machining principles and applications</li>
                                    <li>Understand 3D printing technologies and materials</li>
                                    <li>Apply sheet metal forming and joining techniques</li>
                                    <li>Implement lean manufacturing principles</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section assembly">
                                <h5>🔧 Advanced Assembly Techniques</h5>
                                <ul>
                                    <li>Design and implement assembly sequences</li>
                                    <li>Apply torque specifications and joint integrity</li>
                                    <li>Understand fit tolerances and clearances</li>
                                    <li>Master alignment and adjustment procedures</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section quality">
                                <h5>📊 Quality Control & Testing</h5>
                                <ul>
                                    <li>Implement inspection and measurement protocols</li>
                                    <li>Apply statistical process control methods</li>
                                    <li>Design test fixtures and validation procedures</li>
                                    <li>Create documentation and traceability systems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    },

    7: {
        title: "Week 7: Integration, Testing & Competition",
        duration: "4-6 hours",
        steps: [
            {
                title: "🎯 Objectives & Lesson Notes",
                type: "objectives",
                completed: false
            },
            {
                title: "📝 Notes of the Day",
                type: "notes",
                completed: false
            },
            {
                title: "📺 Video Presentation",
                type: "video",
                completed: false
            },
            {
                title: "👥 Group Assignment (Practical)",
                type: "group",
                completed: false
            },
            {
                title: "✅ Knowledge Check",
                type: "knowledge",
                completed: false
            },
            {
                title: "🧠 Simple Quiz",
                type: "quiz",
                completed: false
            },
            {
                title: "🤖 System Integration Lab",
                type: "practical",
                completed: false
            },
            {
                title: "📺 Competition Strategy Video",
                type: "video",
                completed: false
            },
            {
                title: "🛠️ Field Testing Workshop",
                type: "practical",
                completed: false
            },
            {
                title: "📐 Performance Optimization",
                type: "practical",
                completed: false
            },
            {
                title: "✅ Final Championship Project",
                type: "knowledge",
                completed: false
            }
        ],
        content: {
            0: { // Objectives
                content: `
                    <div class="lesson-section">
                        <h3>Week 7: Integration, Testing & Competition Mastery 🏆🤖</h3>
                        <div class="welcome-message">
                            <p><strong>The culmination of your FRC engineering journey!</strong> Today we integrate all systems, test for peak performance, and prepare for competition success. Transform from student to championship-level FRC engineer!</p>
                        </div>
                        
                        <div class="objectives-card">
                            <h4>🎯 Championship Preparation Goals</h4>
                            <p><strong>Complete your transformation into an FRC champion:</strong></p>
                            
                            <div class="objective-section integration">
                                <h5>🔗 Systems Integration Mastery</h5>
                                <ul>
                                    <li>Integrate mechanical, electrical, and software systems</li>
                                    <li>Resolve interface conflicts and compatibility issues</li>
                                    <li>Optimize system-level performance metrics</li>
                                    <li>Implement fail-safe and redundancy strategies</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section testing">
                                <h5>🧪 Professional Testing Protocols</h5>
                                <ul>
                                    <li>Design comprehensive test plans and procedures</li>
                                    <li>Analyze performance data and identify improvements</li>
                                    <li>Validate robot performance against requirements</li>
                                    <li>Document test results and design modifications</li>
                                </ul>
                            </div>
                            
                            <div class="objective-section competition">
                                <h5>🏆 Competition Excellence</h5>
                                <ul>
                                    <li>Develop match strategy and autonomous programs</li>
                                    <li>Master pit procedures and rapid repairs</li>
                                    <li>Apply scouting data and alliance selection</li>
                                    <li>Lead team coordination and communication</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="graduation-message">
                            <h4>🎓 Your Engineering Journey Complete</h4>
                            <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 20px; border-radius: 10px; color: #8B4513; margin: 20px 0;">
                                <p><strong>Congratulations, Engineer!</strong></p>
                                <p>You've mastered the complete FRC mechanical engineering curriculum. You're now equipped with the knowledge, skills, and confidence to:</p>
                                <ul>
                                    <li>✅ Lead robot design and construction projects</li>
                                    <li>✅ Mentor new team members with expertise</li>
                                    <li>✅ Make critical engineering decisions under pressure</li>
                                    <li>✅ Pursue advanced engineering education and careers</li>
                                </ul>
                                <p><em>Welcome to the ranks of FRC Champions! The future of robotics is in your hands.</em></p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }
};

// Interactive lesson functionality
let currentLessonId = null;
let currentStepIndex = 0;

function openInteractiveLesson(lessonId) {
    console.log('Opening lesson:', lessonId);
    currentLessonId = lessonId;
    currentStepIndex = 0;
    
    const lesson = lessonData[lessonId];
    if (!lesson) {
        console.error('Lesson not found:', lessonId);
        alert('Lesson not found: ' + lessonId);
        return;
    }
    
    // Hide all content sections first
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show lesson viewer section
    const lessonViewerSection = document.getElementById('lesson-viewer');
    if (lessonViewerSection) {
        lessonViewerSection.classList.add('active');
        console.log('Lesson viewer section shown');
    } else {
        console.error('Lesson viewer section not found');
        alert('Lesson viewer section not found in HTML');
        return;
    }
    
    // Show lesson container
    const lessonContainer = document.querySelector('.lesson-container');
    if (lessonContainer) {
        lessonContainer.style.display = 'block';
        console.log('Lesson container shown');
    } else {
        console.error('Lesson container not found');
        alert('Lesson container not found in HTML');
        return;
    }
    
    // Update lesson header
    document.getElementById('lesson-title').textContent = lesson.title;
    // Note: lesson-duration element doesn't exist in HTML, but that's okay
    
    // Build step navigation
    buildStepNavigation(lesson);
    
    // Show first step
    showStep(0);
}

function buildStepNavigation(lesson) {
    const stepsContainer = document.getElementById('lesson-steps');
    stepsContainer.innerHTML = '';
    
    lesson.steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'lesson-step';
        stepElement.onclick = () => showStep(index);
        
        const icon = step.completed ? '✅' : '⭕';
        stepElement.innerHTML = `${icon} ${step.title}`;
        
        if (index === currentStepIndex) {
            stepElement.classList.add('active');
        }
        
        stepsContainer.appendChild(stepElement);
    });
}

function showStep(stepIndex) {
    currentStepIndex = stepIndex;
    const lesson = lessonData[currentLessonId];
    
    if (!lesson || !lesson.stepContent[stepIndex]) {
        document.getElementById('lesson-main-content').innerHTML = '<p>Content not available for this step.</p>';
        return;
    }
    
    // Update content
    document.getElementById('lesson-main-content').innerHTML = lesson.stepContent[stepIndex].content;
    
    // Update navigation
    document.querySelectorAll('.lesson-step').forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    
    // Update progress
    document.getElementById('lesson-progress-text').textContent = `Step ${stepIndex + 1} of ${lesson.steps.length}`;
    const progressPercent = ((stepIndex + 1) / lesson.steps.length) * 100;
    document.getElementById('lesson-progress-fill').style.width = progressPercent + '%';
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const completeBtn = document.getElementById('complete-lesson-btn');
    
    if (prevBtn) {
        prevBtn.disabled = stepIndex === 0;
    }
    
    if (nextBtn && completeBtn) {
        if (stepIndex === lesson.steps.length - 1) {
            // Last step - show complete button
            nextBtn.style.display = 'none';
            completeBtn.style.display = 'inline-block';
        } else {
            // Not last step - show next button
            nextBtn.style.display = 'inline-block';
            completeBtn.style.display = 'none';
        }
    }
}

function nextStep() {
    const lesson = lessonData[currentLessonId];
    if (currentStepIndex < lesson.steps.length - 1) {
        showStep(currentStepIndex + 1);
    }
}

function previousStep() {
    if (currentStepIndex > 0) {
        showStep(currentStepIndex - 1);
    }
}

function completeLessonFromViewer() {
    const lesson = lessonData[currentLessonId];
    if (lesson) {
        // Mark lesson as completed
        completeLesson(currentLessonId);
        
        // Show completion message
        document.getElementById('lesson-main-content').innerHTML = `
            <div class="lesson-section">
                <div style="text-align: center; padding: 40px;">
                    <h2>🎉 Lesson Complete!</h2>
                    <p>Congratulations! You've completed "${lesson.title}"</p>
                    <p>You've successfully learned about safety and basic tools!</p>
                    <button onclick="closeLessonViewer()" class="btn btn-primary" style="margin: 20px;">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        `;
        
        // Hide navigation buttons
        document.getElementById('prev-step-btn').style.display = 'none';
        document.getElementById('next-step-btn').style.display = 'none';
        document.getElementById('complete-lesson-btn').style.display = 'none';
    }
}

function closeLessonViewer() {
    // Hide lesson viewer section
    const lessonViewerSection = document.getElementById('lesson-viewer');
    if (lessonViewerSection) {
        lessonViewerSection.classList.remove('active');
    }
    
    const lessonContainer = document.querySelector('.lesson-container');
    if (lessonContainer) {
        lessonContainer.style.display = 'none';
    }
    
    // Use showSection to properly display dashboard
    showSection('dashboard');
}

// Additional tool video function
function openBasicToolsVideo() {
    openYouTubeVideo('VNwhQkAyRHk', 'Basic Hand Tools Every Beginner Should Know');
}

// Quick access function
function startCurrentLesson() {
    console.log('startCurrentLesson called');
    // Start with lesson 1 (first available lesson)
    openInteractiveLesson(1);
}

// Debug function to test lesson container
function testLessonContainer() {
    const lessonContainer = document.querySelector('.lesson-container');
    console.log('Lesson container found:', lessonContainer);
    if (lessonContainer) {
        lessonContainer.style.display = 'block';
        lessonContainer.style.background = 'red'; // Make it visible for testing
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('video-modal');
    if (event.target == modal) {
        closeVideoModal();
    }
}