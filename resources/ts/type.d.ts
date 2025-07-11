declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_API_URL?: string;
    VITE_APP_NAME?: string;
    VITE_APP_URL?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface Appointment {
  id: string;
  patient: string;
  specialty: string;
  professional: string;
  date: string;
  justifiedAbsences: number;
  unjustifiedAbsences: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
}

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  dob: string;
  companionId: string | null;
}

export interface Professional {
  id: string;
  name: string;
  crm: string | null;
  cpf: string;
  dob: string;
  specialty: string;
}

export interface Companion {
  id: string;
  name: string;
  cpf: string;
} 
