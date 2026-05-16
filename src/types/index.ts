// Shared TypeScript interfaces for Strohm Partners

export interface ServicePillar {
  id: string;
  icon: string;
  title: string;
  description: string;
  symptoms: string[];
  deliverables: string[];
  idealClient: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SystemNode {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export interface ContactFormData {
  // Step 1: Project
  serviceType: string;
  projectDescription: string;
  // Step 2: Budget
  budgetRange: string;
  // Step 3: Details
  name: string;
  email: string;
  company: string;
  phone?: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface FlowchartNode {
  id: string;
  label: string;
  x: number;
  y: number;
  connectedTo: string[];
}

export interface Lead {
  name: string;
  email: string;
  company: string;
}

export interface ContentOutput {
  topic: string;
  voice: string;
  platform: 'linkedin' | 'twitter' | 'instagram';
  content: string;
}