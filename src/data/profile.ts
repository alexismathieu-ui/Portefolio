const GITHUB = 'https://github.com/alexismathieu-ui'
const LINKEDIN = 'https://www.linkedin.com/in/alexis-mathieu-a05ab238b'

export const profile = {
  name: 'Alexis MATHIEU',
  /** Marque affichée en en-tête (prénom + nom). */
  brandName: 'Alexis Mathieu',
  title: 'Développeur & passionné 3D',
  tagline:
    "Grand passionné d'internet depuis mon plus jeune âge. Je travaille beaucoup sur de la modélisation 3D et du code, avec grande passion !",
  /** Sous-titre court pour le hero. */
  heroIntro:
    'Projets open source sur GitHub : intégration web, langages, jeux et expérimentations — toujours en apprentissage.',
  /** Extrait des métadonnées du CV PDF — vérifie l’orthographe si besoin. */
  email: 'alexis.mathieupro45170@gmail.com',
  bio: [
    "Sur GitHub, je partage des projets variés : HTML, JavaScript, PHP, Python, C… J'aime expérimenter, apprendre en construisant et progresser sur la qualité du code.",
    'La modélisation 3D et le développement se complètent pour moi : créer des visuels, des interactions et des petits jeux ou outils utiles.',
  ],
  social: [
    { label: 'GitHub', href: GITHUB, icon: 'github' as const },
    { label: 'LinkedIn', href: LINKEDIN, icon: 'linkedin' as const },
  ],
  timeline: [
    {
      year: 'Aujourd’hui',
      role: 'Projets personnels & veille',
      org: 'GitHub — alexismathieu-ui',
      detail:
        'Dépôts publics (jeux, cours, expérimentations) et poursuite des apprentissages web & logiciel.',
    },
    {
      year: 'Formation & pratique',
      role: 'Développement & 3D',
      org: 'Autonomie & curiosité',
      detail:
        'Modélisation 3D, langages multiples, renforcement des bases algorithmiques et bonnes pratiques.',
    },
  ],
  skills: [
    { name: 'HTML / CSS / intégration', value: 88 },
    { name: 'JavaScript', value: 82 },
    { name: 'PHP', value: 78 },
    { name: 'Python', value: 76 },
    { name: 'C / algorithmes', value: 74 },
    { name: 'Modélisation 3D (Blender, etc.)', value: 90 },
    { name: 'Git / GitHub', value: 85 },
    { name: 'Bases de données & SQL', value: 70 },
    { name: 'Linux & ligne de commande', value: 72 },
    { name: 'Structure de code & MVC', value: 75 },
    { name: 'Veille & autonomie', value: 92 },
    { name: 'Anglais technique (lecture)', value: 68 },
  ],
  /** Étiquettes complémentaires sous les barres. */
  skillTags: [
    'VS Code / Cursor',
    'Responsive design',
    'Debugging',
    'Jeux & logique métier',
    'Open source',
    'Documentation',
    'Veille techno',
    'Travail en autonomie',
  ],
} as const
