import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      
      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-600">
          Niveau: {course.level}
        </span>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-sm text-gray-600">
          {course.duration} heures
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {course.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600">
          {course.price} FCFA
        </span>
        <Link
          to={`/payment?course=${course.id}`}
          className="btn-secondary"
        >
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default CourseCard; 