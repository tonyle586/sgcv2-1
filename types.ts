export type Language = 'vi' | 'en';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  result: string;
}

export interface ContentData {
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
  };
  about: {
    title: string;
    missionTitle: string;
    missionDesc: string;
    techTitle: string;
    techDesc: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: ProjectItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formMessage: string;
    submit: string;
    address: string;
  };
  footer: {
    copyright: string;
    terms: string;
    privacy: string;
  };
  thankYou: {
    title: string;
    message: string;
    backHome: string;
  };
  aiWidget: {
    title: string;
    placeholder: string;
    send: string;
    disclaimer: string;
  }
}