import {
  FaTools,
  FaBroom,
  FaTruckMoving,
  FaLeaf,
  FaDog,
  FaUserFriends,
  FaLaptop,
  FaCamera,
  FaSpa
} from 'react-icons/fa';
import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  icon: ReactNode;
  slug: string;
  description?: string;
}

const CATEGORIES: Category[] = [
  { 
    id: 'handwerk', 
    name: 'Handwerk & Reparaturen', 
    icon: <FaTools />, 
    slug: 'handwerk-reparaturen',
    description: 'Handwerker und Reparaturservices für dein Zuhause und Gewerbe'
  },
  { 
    id: 'haushalt', 
    name: 'Haushalt & Reinigungen', 
    icon: <FaBroom />, 
    slug: 'haushalt-reinigungen',
    description: 'Reinigungsservices und Haushaltshilfen für ein sauberes Zuhause'
  },
  { 
    id: 'umzug', 
    name: 'Umzug & Transport', 
    icon: <FaTruckMoving />, 
    slug: 'umzug-transport',
    description: 'Umzugshelfer und Transportservices für Möbel und Waren'
  },
  { 
    id: 'garten', 
    name: 'Garten & Außenbereich', 
    icon: <FaLeaf />, 
    slug: 'garten-aussenbereich',
    description: 'Gartenpflege, Landschaftsbau und Arbeiten im Außenbereich'
  },
  { 
    id: 'haustiere', 
    name: 'Haustiere', 
    icon: <FaDog />, 
    slug: 'haustiere',
    description: 'Tiersitter, Hundeausführer und Pflegeservices für deine Haustiere'
  },
  { 
    id: 'alltagshilfe', 
    name: 'Familien & Alltagshilfe', 
    icon: <FaUserFriends />, 
    slug: 'familien-alltagshilfe',
    description: 'Unterstützung im Alltag, Betreuung und Hilfe für Familien'
  },
  { 
    id: 'technik', 
    name: 'Technik & IT vor Ort', 
    icon: <FaLaptop />, 
    slug: 'technik-it',
    description: 'Technische Unterstützung und IT-Services bei dir vor Ort'
  },
  { 
    id: 'event', 
    name: 'Event & Medien', 
    icon: <FaCamera />, 
    slug: 'event-medien',
    description: 'Fotografen, Videografen und Services für deine Events'
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Wellness', 
    icon: <FaSpa />, 
    slug: 'beauty-wellness',
    description: 'Beauty-Services, Massage und Wellness-Angebote'
  },
];

export default CATEGORIES; 