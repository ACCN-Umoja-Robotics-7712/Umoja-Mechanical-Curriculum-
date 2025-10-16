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
    lessonCards.forEach(card => {
        card.addEventListener('click', function() {
            const lessonId = this.getAttribute('data-lesson');
            if (lessonId) {
                openInteractiveLesson(parseInt(lessonId));
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
                        <p>Welcome to the world of robotics! Today we'll learn workshop safety AND get hands-on with basic tools and equipment.</p>
                        
                        <div class="objectives-card">
                            <h4>🎯 Learning Objectives</h4>
                            <p>By the end of this 4-6 hour lesson, you will be able to:</p>
                            <ul>
                                <li>Identify and follow essential workshop safety protocols</li>
                                <li>Name and use basic measuring tools (ruler, tape measure, calipers)</li>
                                <li>Identify common hand tools and their purposes</li>
                                <li>Practice safe tool handling techniques</li>
                                <li>Make accurate measurements for simple projects</li>
                                <li>Connect tool usage to robotics applications</li>
                            </ul>
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
            6: { // Introduction to Basic Tools
                content: `
                    <div class="lesson-section">
                        <h3>🔧 Introduction to Basic Tools</h3>
                        
                        <div class="tools-intro">
                            <h4>🛠️ Why Do We Need Tools?</h4>
                            <p>Tools help us work faster, safer, and more accurately. Every mechanic, engineer, and robot builder uses tools to create amazing things!</p>
                        </div>
                        
                        <div class="tool-categories">
                            <div class="tool-category">
                                <h4>📏 Measuring Tools</h4>
                                <div class="tool-grid">
                                    <div class="tool-item">
                                        <h5>Ruler</h5>
                                        <p><strong>What it does:</strong> Measures short distances (up to 12 inches)</p>
                                        <p><strong>When to use:</strong> Small objects, drawing lines</p>
                                        <p><strong>Fun fact:</strong> Ancient rulers were made from bones!</p>
                                    </div>
                                    <div class="tool-item">
                                        <h5>Tape Measure</h5>
                                        <p><strong>What it does:</strong> Measures long distances</p>
                                        <p><strong>When to use:</strong> Room sizes, wood lengths</p>
                                        <p><strong>Fun fact:</strong> Can extend up to 25 feet or more!</p>
                                    </div>
                                    <div class="tool-item">
                                        <h5>Calipers</h5>
                                        <p><strong>What it does:</strong> Very precise measurements</p>
                                        <p><strong>When to use:</strong> Small parts, thickness</p>
                                        <p><strong>Fun fact:</strong> Can measure to 0.001 inches!</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="tool-category">
                                <h4>🔨 Hand Tools</h4>
                                <div class="tool-grid">
                                    <div class="tool-item">
                                        <h5>Hammer</h5>
                                        <p><strong>What it does:</strong> Hits nails, shapes metal</p>
                                        <p><strong>When to use:</strong> Building, breaking things apart</p>
                                        <p><strong>Safety tip:</strong> Always hit straight down!</p>
                                    </div>
                                    <div class="tool-item">
                                        <h5>Screwdriver</h5>
                                        <p><strong>What it does:</strong> Turns screws in and out</p>
                                        <p><strong>When to use:</strong> Assembly, repairs</p>
                                        <p><strong>Types:</strong> Flathead, Phillips, Torx</p>
                                    </div>
                                    <div class="tool-item">
                                        <h5>Wrench</h5>
                                        <p><strong>What it does:</strong> Turns nuts and bolts</p>
                                        <p><strong>When to use:</strong> Mechanical work</p>
                                        <p><strong>Remember:</strong> Righty tighty, lefty loosey!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="robotics-connection">
                            <h4>🤖 Tools in Robotics</h4>
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <p>In FRC robotics, teams use these same tools to:</p>
                                <ul>
                                    <li>Build robot frames (measuring and cutting)</li>
                                    <li>Attach motors and sensors (screwdrivers and wrenches)</li>
                                    <li>Make precise adjustments (calipers for perfect fits)</li>
                                    <li>Repair robots during competitions (all tools together!)</li>
                                </ul>
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
            10: { // Tools Knowledge Check
                content: `
                    <div class="lesson-section">
                        <h3>✅ Tools Knowledge Check</h3>
                        
                        <div class="tools-quiz">
                            <h4>🧠 Test Your Tool Knowledge!</h4>
                            <p>Let's see how much you learned about tools and measuring!</p>
                            
                            <div class="quiz-container">
                                <div class="question">
                                    <h5>Question: Which tool is best for measuring a pencil?</h5>
                                    <div class="quiz-options">
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">A) Tape measure</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, true)">B) Ruler</div>
                                        <div class="quiz-option" onclick="selectQuizOption(this, false)">C) Calipers</div>
                                    </div>
                                </div>
                            </div>
                            
                            <button onclick="checkQuizAnswers()" class="btn btn-primary" style="margin: 20px 0;">Check My Answers</button>
                            
                            <div id="quiz-score" style="margin-top: 20px; font-weight: bold;"></div>
                        </div>
                        
                        <div class="lesson-summary">
                            <h4>🎯 What We Learned Today</h4>
                            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h5>Safety & Tools Summary:</h5>
                                <ul>
                                    <li>✅ Workshop safety rules and protective equipment</li>
                                    <li>✅ Basic measuring tools: ruler, tape measure, calipers</li>
                                    <li>✅ Hand tools: hammer, screwdriver, wrench</li>
                                    <li>✅ Proper tool handling and safety practices</li>
                                    <li>✅ Hands-on measuring practice</li>
                                    <li>✅ How tools are used in robotics</li>
                                </ul>
                                
                                <h5>Ready for Next Time:</h5>
                                <p>You now know the basics of workshop safety and common tools. Next lesson, we'll learn about more advanced measuring techniques and precision in robotics!</p>
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
    currentLessonId = lessonId;
    currentStepIndex = 0;
    
    const lesson = lessonData[lessonId];
    if (!lesson) {
        console.error('Lesson not found:', lessonId);
        return;
    }
    
    // Show lesson container
    document.getElementById('lesson-container').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    
    // Update lesson header
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-duration').textContent = lesson.duration;
    
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
        document.getElementById('lesson-content').innerHTML = '<p>Content not available for this step.</p>';
        return;
    }
    
    // Update content
    document.getElementById('lesson-content').innerHTML = lesson.stepContent[stepIndex].content;
    
    // Update navigation
    document.querySelectorAll('.lesson-step').forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    
    // Update progress
    document.getElementById('lesson-progress-text').textContent = `Step ${stepIndex + 1} of ${lesson.steps.length}`;
    const progressPercent = ((stepIndex + 1) / lesson.steps.length) * 100;
    document.getElementById('lesson-progress-fill').style.width = progressPercent + '%';
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

function closeLessonViewer() {
    document.getElementById('lesson-container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

// Additional tool video function
function openBasicToolsVideo() {
    openYouTubeVideo('basic-tools-demo', 'Basic Workshop Tools');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('video-modal');
    if (event.target == modal) {
        closeVideoModal();
    }
}