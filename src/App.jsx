import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StudentCard from './components/StudentCard';
import MatchingResults from './components/MatchingResults';
import Statistics from './components/Statistics';
import { findBestMatches, generateMatchingReport } from './utils/matchmaking';

// Import des données
import tutorsData from './data/tutors.json';
import studentsData from './data/students.json';

function App() {
  const [students] = useState(studentsData);
  const [tutors] = useState(tutorsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchingReport, setMatchingReport] = useState([]);
  const [activeTab, setActiveTab] = useState('matching'); // 'matching' ou 'statistics'

  // Génération du rapport complet au chargement
  useEffect(() => {
    const report = generateMatchingReport(students, tutors);
    setMatchingReport(report);
  }, [students, tutors]);

  // Mise à jour des matches quand un élève est sélectionné
  useEffect(() => {
    if (selectedStudent) {
      const studentMatches = findBestMatches(selectedStudent, tutors);
      setMatches(studentMatches);
    } else {
      setMatches([]);
    }
  }, [selectedStudent, tutors]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation par onglets */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('matching')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matching'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Système de Matchmaking
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'statistics'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Statistiques
            </button>
          </nav>
        </div>

        {activeTab === 'matching' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des élèves */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Élèves ({students.length})
                </h2>
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {students.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      onSelectStudent={handleSelectStudent}
                      isSelected={selectedStudent?.id === student.id}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Résultats du matchmaking */}
            <div className="lg:col-span-2">
              <MatchingResults student={selectedStudent} matches={matches} />
            </div>
          </div>
        ) : (
          <Statistics 
            students={students} 
            tutors={tutors} 
            matchingReport={matchingReport} 
          />
        )}
      </main>

      {/* Résumé rapide en bas de page */}
      {activeTab === 'matching' && (
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">{students.length}</div>
                <div className="text-sm text-gray-600">Élèves</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">{tutors.length}</div>
                <div className="text-sm text-gray-600">Tuteurs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success-600">
                  {matchingReport.filter(r => r.hasMatches).length}
                </div>
                <div className="text-sm text-gray-600">Élèves avec matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success-600">
                  {matchingReport.reduce((acc, r) => acc + r.matches.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Matches totaux</div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;