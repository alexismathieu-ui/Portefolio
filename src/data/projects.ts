const USER = 'alexismathieu-ui'
const repo = (name: string) => `https://github.com/${USER}/${name}`

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl: string
  repoUrl: string
}

/** Dépôts publics listés sur le profil GitHub d’Alexis. */
export const projects: Project[] = [
  {
    id: 'html-project',
    title: 'HTML-Project-And-Test',
    description:
      'Projet HTML : structure, tests et mise en pratique des bases du front statique.',
    tags: ['HTML'],
    image: '/projects/html-project.png',
    demoUrl: repo('HTML-Project-And-Test'),
    repoUrl: repo('HTML-Project-And-Test'),
  },
  {
    id: 'lab-o',
    title: "Lab'O",
    description:
      "Projet d'entreprise en HTML/CSS/JS avec approche produit, interface soignée et structure collaborative.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/lab-o.png',
    demoUrl: repo('Lab-O---Projet-Entreprise'),
    repoUrl: repo('Lab-O---Projet-Entreprise'),
  },
  {
    id: 'bataille-remade',
    title: 'Bataille-Naval_Remade',
    description: 'Version retravaillée du projet navale : logique métier et PHP.',
    tags: ['PHP'],
    image: '/projects/bataille-navale.png',
    demoUrl: repo('Bataille-Naval_Remade'),
    repoUrl: repo('Bataille-Naval_Remade'),
  },
  {
    id: 'pixfarm',
    title: 'PixFarm',
    description:
      'Projet orienté application avec logique métier, architecture plus complète et travail sur les fonctionnalités.',
    tags: ['Java', 'Application'],
    image: '/projects/pixfarm.png',
    demoUrl: repo('Projet_PixFarm'),
    repoUrl: repo('Projet_PixFarm'),
  },
  {
    id: 'js-arena',
    title: 'js-arena',
    description: 'Terrain de jeu / expérimentations autour de JavaScript.',
    tags: ['JavaScript'],
    image: '/projects/js-arena.png',
    demoUrl: repo('js-arena'),
    repoUrl: repo('js-arena'),
  },
  {
    id: 'end-of-dungeon',
    title: 'End of Dungeon',
    description:
      "Jeu JavaScript avec mécaniques de progression, interactions et mise en scène d'univers.",
    tags: ['JavaScript', 'Game'],
    image: '/projects/end-of-dungeon.png',
    demoUrl: repo('End-of-Dungeons'),
    repoUrl: repo('End-of-Dungeons'),
  },
]
