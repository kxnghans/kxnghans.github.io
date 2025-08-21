
import { projectData } from '../data/projects';
import { skillsData } from '../data/skills';
import { workData } from '../data/work';
import { educationData } from '../data/education';
import { certificationsData } from '../data/certifications';
import { communityData } from '../data/community';
import { honors } from '../data/honors';

export const searchableData = [
  ...projectData.map((item, index) => ({
    id: `project-${index}`,
    title: item.title,
    description: item.details.challenge || '',
    page: 'Projects',
    type: 'Project',
  })),
  ...skillsData.map((item, index) => ({
    id: `skill-${index}`,
    title: item.title,
    description: item.details.join(', ') || '',
    page: 'Skills',
    type: 'Skill',
  })),
  ...workData.map((item, index) => ({
    id: `work-${index}`,
    title: item.title,
    description: item.details.details.join(' ') || '',
    page: 'Work Experience',
    type: 'Work',
  })),
  ...educationData.map((item, index) => ({
    id: `education-${index}`,
    title: item.title,
    description: item.details.subtitle || '',
    page: 'Education',
    type: 'Education',
  })),
  ...certificationsData.map((item, index) => ({
    id: `certification-${index}`,
    title: item.title,
    description: item.details.subtitle || '',
    page: 'Certifications',
    type: 'Certification',
  })),
  ...communityData.map((item, index) => ({
    id: `community-${index}`,
    title: item.title,
    description: item.details.details.join(' ') || '',
    page: 'Community',
    type: 'Community',
  })),
  ...honors.map((item, index) => ({
    id: `honor-${index}`,
    title: item.title,
    description: item.details.subtitle || '',
    page: 'Honors',
    type: 'Honor',
  })),
];
