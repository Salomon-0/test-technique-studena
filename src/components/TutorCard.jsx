import React from 'react';

const TutorCard = ({ tutor, matchData = null }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      );
    }
    
    return stars;
  };

  const getMatchLevelColor = (level) => {
    switch (level) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMatchLevelLabel = (level) => {
    switch (level) {
      case 'excellent': return 'Excellent match';
      case 'good': return 'Bon match';
      case 'fair': return 'Match correct';
      default: return 'Match faible';
    }
  };

  return (
    <div className={`card ${matchData ? 'border-l-4' : ''} ${
      matchData?.matchLevel === 'excellent' ? 'border-l-green-500' :
      matchData?.matchLevel === 'good' ? 'border-l-blue-500' :
      matchData?.matchLevel === 'fair' ? 'border-l-yellow-500' : 'border-l-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{tutor.fullName}</h3>
        {matchData && (
          <div className="text-right">
            <div className={`badge ${getMatchLevelColor(matchData.matchLevel)} mb-1`}>
              {getMatchLevelLabel(matchData.matchLevel)}
            </div>
            <div className="text-lg font-bold text-primary-600">
              {matchData.totalScore}%
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-600">Matières enseignées:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {tutor.subjects.map((subject, index) => (
              <span 
                key={index} 
                className={`badge ${
                  matchData?.breakdown.subjects.matchedSubjects.includes(subject) 
                    ? 'badge-success' 
                    : 'badge-gray'
                }`}
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Niveaux:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {tutor.levels.map((level, index) => (
              <span 
                key={index} 
                className={`badge ${
                  matchData?.breakdown.level.isMatch 
                    ? 'badge-success' 
                    : 'badge-gray'
                }`}
              >
                {level}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-gray-600">Expérience:</span>
            <span className="ml-2 text-sm text-gray-900">{tutor.experience} ans</span>
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(tutor.rating)}
            <span className="text-sm text-gray-600 ml-1">({tutor.rating})</span>
          </div>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Tarif:</span>
          <span className="ml-2 text-sm font-medium text-gray-900">{tutor.hourlyRate}€/h</span>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Disponibilités:</span>
          <div className="mt-1 space-y-1">
            {tutor.availability.map((slot, index) => (
              <div key={index} className="text-sm text-gray-700">
                <span className="font-medium">{slot.day}</span>: {slot.startTime} - {slot.endTime}
              </div>
            ))}
          </div>
        </div>
        
        {matchData?.breakdown.availability.commonSlots.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-sm font-medium text-green-800">Créneaux communs:</span>
            <div className="mt-1 space-y-1">
              {matchData.breakdown.availability.commonSlots.map((slot, index) => (
                <div key={index} className="text-sm text-green-700">
                  <span className="font-medium">{slot.day}</span>: {slot.startTime} - {slot.endTime}
                  <span className="text-xs text-green-600 ml-2">({slot.duration} min)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorCard;
