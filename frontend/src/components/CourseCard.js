import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.imageUrl} alt={course.title} />
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <p className="course-level">{course.level}</p>
        <p className="course-description">{course.description}</p>
        <Link to={`/courses/${course.id}`} className="learn-more-btn">
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default CourseCard; 