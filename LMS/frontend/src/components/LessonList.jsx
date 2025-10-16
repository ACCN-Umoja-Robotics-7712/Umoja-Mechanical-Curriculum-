import React from 'react';
import PropTypes from 'prop-types';

function LessonList({ lessons, progress = [], onToggle }) {
  console.log('📚 LessonList received lessons:', lessons);
  console.log('🎥 First lesson resources:', lessons[0]?.resources);
  
  return (
    <div className="lessons">
      {lessons.map((lesson) => {
        const lessonId = lesson._id?.toString?.() ?? lesson._id;
        const lessonProgress = progress.find((item) => item.lessonId === lessonId) || {};
        
        console.log(`Lesson "${lesson.title}" has ${lesson.resources?.length || 0} resources`);
        
        return (
          <div key={lessonId} className={`lesson ${lessonProgress.completed ? 'lesson--completed' : ''}`}>
            <header className="lesson__header">
              <h4>{lesson.title}</h4>
              <span>{lesson.durationMinutes} min</span>
            </header>
            <p>{lesson.overview}</p>
            
            {/* Display Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="lesson__resources">
                <h5>📚 Resources:</h5>
                <ul>
                  {lesson.resources.map((resource, idx) => (
                    <li key={idx}>
                      {resource.type === 'video' && (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link resource-link--video">
                          🎥 {resource.label}
                        </a>
                      )}
                      {resource.type === 'link' && (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                          🔗 {resource.label}
                        </a>
                      )}
                      {resource.type === 'text' && (
                        <details>
                          <summary className="resource-link resource-link--text">📄 {resource.label}</summary>
                          <pre className="resource-content">{resource.content}</pre>
                        </details>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {(!lesson.resources || lesson.resources.length === 0) && (
              <div className="alert alert--error">No resources found for this lesson</div>
            )}
            
            <div className="lesson__actions">
              <button
                type="button"
                className="button button--ghost"
                onClick={() => onToggle(lessonId, !lessonProgress.completed)}
              >
                {lessonProgress.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

LessonList.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      durationMinutes: PropTypes.number,
    })
  ).isRequired,
  progress: PropTypes.arrayOf(
    PropTypes.shape({
      lessonId: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    })
  ),
  onToggle: PropTypes.func,
};

LessonList.defaultProps = {
  progress: [],
  onToggle: () => {},
};

export default LessonList;
