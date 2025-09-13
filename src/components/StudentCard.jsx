import React from 'react';

const StudentCard = ({ student, onSelectStudent, isSelected }) => {
  const urgencyColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const urgencyLabels = {
    high: 'Urgent',
    medium: 'Modéré',
    low: 'Pas urgent'
  };

  return (
    <div 
      className={`card cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
      }`}
      onClick={() => onSelectStudent(student)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{student.fullName}</h3>
        <span className={`badge ${urgencyColors[student.urgency]}`}>
          {urgencyLabels[student.urgency]}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-600">Matières demandées:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {student.requestedSubjects.map((subject, index) => (
              <span key={index} className="badge badge-primary">
                {subject}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Niveau:</span>
          <span className="ml-2 badge badge-gray">{student.level}</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Budget:</span>
          <span className="ml-2 text-sm text-gray-900 font-medium">{student.budget}€/h</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Disponibilités:</span>
          <div className="mt-1 space-y-1">
            {student.availability.map((slot, index) => (
              <div key={index} className="text-sm text-gray-700">
                <span className="font-medium">{slot.day}</span>: {slot.startTime} - {slot.endTime}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
