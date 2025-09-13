import React from 'react';
import TutorCard from './TutorCard';

const MatchingResults = ({ student, matches }) => {
  if (!student) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.197m3 2.197V9a3 3 0 00-6 0v2.197m0 0a6 6 0 105.196 3.803M9 10h6m-3 0V7"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Sélectionnez un élève
        </h3>
        <p className="text-gray-600">
          Choisissez un élève dans la liste de gauche pour voir ses matches avec les tuteurs disponibles.
        </p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucun tuteur trouvé
        </h3>
        <p className="text-gray-600 mb-4">
          Malheureusement, aucun tuteur ne correspond aux critères de <strong>{student.fullName}</strong>.
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>Critères recherchés:</p>
          <p>• Matières: {student.requestedSubjects.join(', ')}</p>
          <p>• Niveau: {student.level}</p>
          <p>• Budget: {student.budget}€/h</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    if (score >= 40) return 'Correct';
    return 'Faible';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Tuteurs recommandés pour {student.fullName}
        </h2>
        <p className="text-gray-600">
          {matches.length} tuteur{matches.length > 1 ? 's' : ''} trouvé{matches.length > 1 ? 's' : ''} 
          {matches.length > 0 && (
            <span className="ml-2">
              • Meilleur score: 
              <span className={`font-semibold ml-1 ${getScoreColor(matches[0].totalScore)}`}>
                {matches[0].totalScore}% ({getScoreLabel(matches[0].totalScore)})
              </span>
            </span>
          )}
        </p>
      </div>

      <div className="space-y-6">
        {matches.map((match, index) => (
          <div key={match.tutor.id} className="relative">
            <div className="absolute -left-4 top-6 w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
            <TutorCard tutor={match.tutor} matchData={match} />
            
            {/* Détails du score */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Détail du score de compatibilité</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Matières:</span>
                  <div className="font-medium text-gray-900">
                    {match.breakdown.subjects.score}/30
                  </div>
                  <div className="text-xs text-gray-500">
                    {match.breakdown.subjects.matchedSubjects.length}/{student.requestedSubjects.length} matières
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Niveau:</span>
                  <div className="font-medium text-gray-900">
                    {match.breakdown.level.score}/20
                  </div>
                  <div className="text-xs text-gray-500">
                    {match.breakdown.level.isMatch ? 'Compatible' : 'Non compatible'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Disponibilité:</span>
                  <div className="font-medium text-gray-900">
                    {match.breakdown.availability.score}/40
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(match.breakdown.availability.totalOverlap / 60 * 10) / 10}h communes
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Bonus:</span>
                  <div className="font-medium text-gray-900">
                    {match.breakdown.bonus.score}/10
                  </div>
                  <div className="text-xs text-gray-500">
                    Exp. • Note • Prix
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingResults;
