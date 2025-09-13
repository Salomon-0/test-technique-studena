import React from 'react';

const Statistics = ({ students, tutors, matchingReport }) => {
  // Calcul des statistiques
  const totalStudents = students.length;
  const totalTutors = tutors.length;
  const studentsWithMatches = matchingReport.filter(report => report.hasMatches).length;
  const totalMatches = matchingReport.reduce((acc, report) => acc + report.matches.length, 0);
  const averageMatches = totalStudents > 0 ? (totalMatches / totalStudents).toFixed(1) : 0;
  const matchSuccessRate = totalStudents > 0 ? ((studentsWithMatches / totalStudents) * 100).toFixed(1) : 0;

  // Répartition par niveau de match
  const matchLevels = { excellent: 0, good: 0, fair: 0, poor: 0 };
  matchingReport.forEach(report => {
    report.matches.forEach(match => {
      matchLevels[match.matchLevel]++;
    });
  });

  // Matières les plus demandées
  const subjectDemand = {};
  students.forEach(student => {
    student.requestedSubjects.forEach(subject => {
      subjectDemand[subject] = (subjectDemand[subject] || 0) + 1;
    });
  });
  const topSubjects = Object.entries(subjectDemand)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const StatCard = ({ title, value, subtitle, icon, color = "primary" }) => (
    <div className="card">
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Statistiques du système</h2>
      
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Élèves"
          value={totalStudents}
          subtitle="Total inscrits"
          icon={
            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.197m3 2.197V9a3 3 0 00-6 0v2.197m0 0a6 6 0 105.196 3.803M9 10h6m-3 0V7"/>
            </svg>
          }
        />
        
        <StatCard
          title="Tuteurs"
          value={totalTutors}
          subtitle="Disponibles"
          icon={
            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          }
        />
        
        <StatCard
          title="Taux de succès"
          value={`${matchSuccessRate}%`}
          subtitle={`${studentsWithMatches}/${totalStudents} élèves`}
          color="success"
          icon={
            <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          }
        />
        
        <StatCard
          title="Matches moyens"
          value={averageMatches}
          subtitle="Par élève"
          icon={
            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          }
        />
      </div>

      {/* Répartition des matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Qualité des matches</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Excellents (80%+)</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{matchLevels.excellent}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Bons (60-79%)</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{matchLevels.good}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Corrects (40-59%)</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{matchLevels.fair}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Faibles (&lt;40%)</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{matchLevels.poor}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Matières les plus demandées</h3>
          <div className="space-y-3">
            {topSubjects.map(([subject, count], index) => (
              <div key={subject} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white mr-3 ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-600">{subject}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{count} demande{count > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
