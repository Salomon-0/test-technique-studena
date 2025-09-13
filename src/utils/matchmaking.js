/**
 * Algorithme de matchmaking entre tuteurs et élèves
 * Calcule un score de compatibilité basé sur plusieurs critères
 */

/**
 * Vérifie si deux créneaux horaires se chevauchent
 * @param {Object} slot1 - Premier créneau {day, startTime, endTime}
 * @param {Object} slot2 - Deuxième créneau {day, startTime, endTime}
 * @returns {boolean} - True si les créneaux se chevauchent
 */
function doTimeSlotsOverlap(slot1, slot2) {
  if (slot1.day !== slot2.day) return false;

  const start1 = timeToMinutes(slot1.startTime);
  const end1 = timeToMinutes(slot1.endTime);
  const start2 = timeToMinutes(slot2.startTime);
  const end2 = timeToMinutes(slot2.endTime);

  return start1 < end2 && start2 < end1;
}

/**
 * Convertit une heure au format HH:MM en minutes depuis minuit
 * @param {string} time - Heure au format "HH:MM"
 * @returns {number} - Minutes depuis minuit
 */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Calcule la durée de chevauchement entre deux créneaux en minutes
 * @param {Object} slot1 - Premier créneau
 * @param {Object} slot2 - Deuxième créneau
 * @returns {number} - Durée de chevauchement en minutes
 */
function getOverlapDuration(slot1, slot2) {
  if (!doTimeSlotsOverlap(slot1, slot2)) return 0;

  const start1 = timeToMinutes(slot1.startTime);
  const end1 = timeToMinutes(slot1.endTime);
  const start2 = timeToMinutes(slot2.startTime);
  const end2 = timeToMinutes(slot2.endTime);

  const overlapStart = Math.max(start1, start2);
  const overlapEnd = Math.min(end1, end2);

  return overlapEnd - overlapStart;
}

/**
 * Calcule le score de compatibilité des disponibilités
 * @param {Array} tutorAvailability - Disponibilités du tuteur
 * @param {Array} studentAvailability - Disponibilités de l'élève
 * @returns {Object} - {score: number, commonSlots: Array, totalOverlap: number}
 */
function calculateAvailabilityScore(tutorAvailability, studentAvailability) {
  let totalOverlap = 0;
  const commonSlots = [];

  for (const tutorSlot of tutorAvailability) {
    for (const studentSlot of studentAvailability) {
      const overlap = getOverlapDuration(tutorSlot, studentSlot);
      if (overlap > 0) {
        totalOverlap += overlap;
        commonSlots.push({
          day: tutorSlot.day,
          startTime: Math.max(
            timeToMinutes(tutorSlot.startTime),
            timeToMinutes(studentSlot.startTime)
          ),
          endTime: Math.min(
            timeToMinutes(tutorSlot.endTime),
            timeToMinutes(studentSlot.endTime)
          ),
          duration: overlap,
        });
      }
    }
  }

  // Score basé sur le temps de chevauchement total (max 40 points)
  const availabilityScore = Math.min(40, (totalOverlap / 60) * 10); // 10 points par heure

  return {
    score: availabilityScore,
    commonSlots,
    totalOverlap,
  };
}

/**
 * Calcule le score de compatibilité des matières
 * @param {Array} tutorSubjects - Matières enseignées par le tuteur
 * @param {Array} studentSubjects - Matières demandées par l'élève
 * @returns {Object} - {score: number, matchedSubjects: Array}
 */
function calculateSubjectScore(tutorSubjects, studentSubjects) {
  const matchedSubjects = studentSubjects.filter((subject) =>
    tutorSubjects.some(
      (tutorSubject) =>
        tutorSubject.toLowerCase().includes(subject.toLowerCase()) ||
        subject.toLowerCase().includes(tutorSubject.toLowerCase())
    )
  );

  const matchRatio = matchedSubjects.length / studentSubjects.length;
  const subjectScore = matchRatio * 30; // Max 30 points pour les matières

  return {
    score: subjectScore,
    matchedSubjects,
  };
}

/**
 * Calcule le score de compatibilité du niveau scolaire
 * @param {Array} tutorLevels - Niveaux pris en charge par le tuteur
 * @param {string} studentLevel - Niveau de l'élève
 * @returns {number} - Score du niveau (0-20)
 */
function calculateLevelScore(tutorLevels, studentLevel) {
  const levelMatch = tutorLevels.some(
    (level) => level.toLowerCase() === studentLevel.toLowerCase()
  );

  return levelMatch ? 20 : 0; // 20 points si le niveau correspond exactement
}

/**
 * Calcule le score bonus basé sur l'expérience, la note et le prix
 * @param {Object} tutor - Données du tuteur
 * @param {Object} student - Données de l'élève
 * @returns {number} - Score bonus (0-10)
 */
function calculateBonusScore(tutor, student) {
  let bonusScore = 0;

  // Bonus pour l'expérience (max 3 points)
  bonusScore += Math.min(3, tutor.experience / 3);

  // Bonus pour la note (max 4 points)
  bonusScore += Math.min(4, (tutor.rating - 4) * 8);

  // Bonus/malus pour le prix par rapport au budget (max 3 points)
  if (tutor.hourlyRate <= student.budget) {
    const priceRatio = tutor.hourlyRate / student.budget;
    bonusScore += 3 * (1 - priceRatio); // Plus c'est abordable, plus le bonus est élevé
  } else {
    bonusScore -= 2; // Pénalité si trop cher
  }

  return Math.max(0, Math.min(10, bonusScore));
}

/**
 * Calcule le score de compatibilité total entre un tuteur et un élève
 * @param {Object} tutor - Données du tuteur
 * @param {Object} student - Données de l'élève
 * @returns {Object} - Résultat détaillé du matching
 */
export function calculateCompatibilityScore(tutor, student) {
  // Calcul des scores par critère
  const subjectResult = calculateSubjectScore(
    tutor.subjects,
    student.requestedSubjects
  );
  const levelScore = calculateLevelScore(tutor.levels, student.level);
  const availabilityResult = calculateAvailabilityScore(
    tutor.availability,
    student.availability
  );
  const bonusScore = calculateBonusScore(tutor, student);

  // Score total sur 100
  const totalScore =
    subjectResult.score + levelScore + availabilityResult.score + bonusScore;

  // Détermination du niveau de match
  let matchLevel = "poor";
  if (totalScore >= 80) matchLevel = "excellent";
  else if (totalScore >= 60) matchLevel = "good";
  else if (totalScore >= 40) matchLevel = "fair";

  return {
    tutor,
    student,
    totalScore: Math.round(totalScore * 10) / 10,
    matchLevel,
    breakdown: {
      subjects: {
        score: Math.round(subjectResult.score * 10) / 10,
        matchedSubjects: subjectResult.matchedSubjects,
      },
      level: {
        score: levelScore,
        isMatch: levelScore > 0,
      },
      availability: {
        score: Math.round(availabilityResult.score * 10) / 10,
        commonSlots: availabilityResult.commonSlots.map((slot) => ({
          day: slot.day,
          startTime: `${Math.floor(slot.startTime / 60)}:${(slot.startTime % 60)
            .toString()
            .padStart(2, "0")}`,
          endTime: `${Math.floor(slot.endTime / 60)}:${(slot.endTime % 60)
            .toString()
            .padStart(2, "0")}`,
          duration: slot.duration,
        })),
        totalOverlap: availabilityResult.totalOverlap,
      },
      bonus: {
        score: Math.round(bonusScore * 10) / 10,
        factors: {
          experience: tutor.experience,
          rating: tutor.rating,
          priceMatch: tutor.hourlyRate <= student.budget,
        },
      },
    },
  };
}

/**
 * Trouve les meilleurs tuteurs pour un élève donné
 * @param {Object} student - Données de l'élève
 * @param {Array} tutors - Liste des tuteurs disponibles
 * @param {number} maxResults - Nombre maximum de résultats (défaut: 5)
 * @returns {Array} - Liste des matches triés par score décroissant
 */
export function findBestMatches(student, tutors, maxResults = 5) {
  const matches = tutors
    .map((tutor) => calculateCompatibilityScore(tutor, student))
    .filter((match) => match.totalScore > 0) // Éliminer les matches avec score 0
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, maxResults);

  return matches;
}

/**
 * Génère un rapport de matchmaking pour tous les élèves
 * @param {Array} students - Liste des élèves
 * @param {Array} tutors - Liste des tuteurs
 * @returns {Array} - Rapport complet de matchmaking
 */
export function generateMatchingReport(students, tutors) {
  return students.map((student) => ({
    student,
    matches: findBestMatches(student, tutors),
    hasMatches: findBestMatches(student, tutors).length > 0,
  }));
}
