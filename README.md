# Studena - Système de Matchmaking Tuteurs-Élèves

Un système intelligent de mise en relation entre tuteurs et élèves basé sur les matières, niveaux scolaires et disponibilités.

## 🚀 Fonctionnalités

### ✅ Fonctionnalités Principales

- **Algorithme de matchmaking avancé** avec score de compatibilité (0-100%)
- **Interface utilisateur moderne** avec React et Tailwind CSS
- **Gestion complète des données** tuteurs et élèves
- **Système de scoring multi-critères** :
  - Matières enseignées/demandées (30 points)
  - Niveau scolaire (20 points)
  - Disponibilités communes (40 points)
  - Bonus expérience/note/prix (10 points)

### 🎯 Fonctionnalités Bonus

- **Score de compatibilité détaillé** avec breakdown par critère
- **Gestion des cas sans match** avec messages informatifs
- **Interface responsive** et intuitive
- **Statistiques complètes** du système
- **Optimisation de l'algorithme** avec calcul de créneaux communs
- **Système de notation visuelle** avec étoiles et badges colorés

## 🛠️ Technologies Utilisées

- **React 18** avec Vite pour le développement rapide
- **Tailwind CSS** pour le styling moderne
- **JavaScript ES6+** pour la logique métier
- **JSON** pour le stockage des données
- **Algorithmes optimisés** pour le matchmaking

## 📦 Installation et Lancement

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd studena-matchmaking

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour la production
npm run build
```

### Accès à l'application

- **Développement** : http://localhost:5173
- **Production** : Déployé sur Vercel

## 🏗️ Architecture du Projet

```
src/
├── components/           # Composants React réutilisables
│   ├── Header.jsx       # En-tête avec navigation
│   ├── StudentCard.jsx  # Carte d'affichage élève
│   ├── TutorCard.jsx    # Carte d'affichage tuteur avec score
│   ├── MatchingResults.jsx # Résultats du matchmaking
│   └── Statistics.jsx   # Tableau de bord statistiques
├── data/                # Données JSON
│   ├── students.json    # Base de données élèves
│   └── tutors.json      # Base de données tuteurs
├── utils/               # Utilitaires et logique métier
│   └── matchmaking.js   # Algorithme de matchmaking
├── App.jsx              # Composant principal
├── index.css            # Styles Tailwind
└── main.jsx             # Point d'entrée
```

## 🧮 Algorithme de Matchmaking

### Critères de Scoring

1. **Matières (30 points max)**

   - Correspondance exacte ou partielle des matières
   - Ratio : matches / total demandé

2. **Niveau Scolaire (20 points max)**

   - Correspondance exacte du niveau
   - Tout ou rien (20 ou 0 points)

3. **Disponibilités (40 points max)**

   - Calcul des créneaux horaires communs
   - 10 points par heure de chevauchement

4. **Bonus (10 points max)**
   - Expérience du tuteur (max 3 pts)
   - Note/évaluation (max 4 pts)
   - Adéquation prix/budget (max 3 pts)

### Niveaux de Match

- **Excellent** : 80%+ (vert)
- **Bon** : 60-79% (bleu)
- **Correct** : 40-59% (jaune)
- **Faible** : <40% (gris)

## 📊 Modèle de Données

### Tuteur

```json
{
  "id": "tutor_1",
  "fullName": "Ahmed Benali",
  "subjects": ["Mathématiques", "Physique"],
  "levels": ["Collège", "Lycée"],
  "availability": [
    {
      "day": "Lundi",
      "startTime": "18:00",
      "endTime": "20:00"
    }
  ],
  "experience": 5,
  "rating": 4.8,
  "hourlyRate": 25
}
```

### Élève

```json
{
  "id": "student_1",
  "fullName": "Ali Moussaoui",
  "requestedSubjects": ["Mathématiques"],
  "level": "Lycée",
  "availability": [
    {
      "day": "Lundi",
      "startTime": "18:00",
      "endTime": "20:00"
    }
  ],
  "budget": 30,
  "urgency": "high"
}
```

## 🎨 Interface Utilisateur

### Onglet Matchmaking

- **Liste des élèves** : Sélection interactive avec badges d'urgence
- **Résultats détaillés** : Tuteurs classés par score avec breakdown
- **Créneaux communs** : Affichage visuel des disponibilités partagées
- **Indicateurs visuels** : Couleurs et badges selon la qualité du match

### Onglet Statistiques

- **Métriques globales** : Nombre d'élèves, tuteurs, taux de succès
- **Répartition qualité** : Distribution des niveaux de match
- **Matières populaires** : Top 3 des matières les plus demandées
- **Tableaux de bord** : Visualisation claire des KPIs

## 🔧 Choix Techniques

### Pourquoi React + Vite ?

- **Performance** : Hot reload ultra-rapide
- **Écosystème** : Large communauté et outils
- **Composants** : Architecture modulaire et réutilisable

### Pourquoi Tailwind CSS ?

- **Productivité** : Classes utilitaires rapides
- **Consistance** : Design system intégré
- **Responsive** : Mobile-first par défaut

### Algorithme de Matchmaking

- **Multi-critères** : Scoring pondéré pour précision
- **Optimisé** : Complexité O(n\*m) acceptable
- **Extensible** : Facile d'ajouter de nouveaux critères

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Build Manuel

```bash
npm run build
# Servir le dossier dist/
```

## 📈 Améliorations Possibles

### Court Terme

- [ ] Filtres avancés (prix, expérience, note)
- [ ] Sauvegarde des préférences utilisateur
- [ ] Export des résultats en PDF/CSV
- [ ] Notifications de nouveaux matches

### Long Terme

- [ ] Base de données persistante (PostgreSQL/MongoDB)
- [ ] Authentification utilisateur
- [ ] Système de réservation de créneaux
- [ ] Chat intégré tuteur-élève
- [ ] Évaluations et commentaires
- [ ] Machine Learning pour améliorer l'algorithme
- [ ] API REST pour intégrations tierces

## 🧪 Tests et Validation

### Cas de Test Validés

- ✅ Match parfait : Ali → Ahmed (100% compatibilité)
- ✅ Match partiel : Emma → Marie (matières multiples)
- ✅ Aucun match : Cas gérés avec messages informatifs
- ✅ Calculs de créneaux : Chevauchements précis
- ✅ Responsive design : Mobile et desktop

### Données de Test

- **5 tuteurs** avec profils variés
- **5 élèves** avec besoins différents
- **Scénarios réels** : urgence, budget, disponibilités

## 👥 Contribution

1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou suggestion :

- Créer une issue sur GitHub
- Contact : [votre-email@exemple.com]

---

**Développé avec ❤️ pour améliorer l'éducation et faciliter l'apprentissage.**
