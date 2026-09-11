export interface KeyConcept {
  term: string;
  definition: string;
  category: string;
}

export interface SubChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  overview: string;
  learningObjectives: string[];
  keyConcepts: KeyConcept[];
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    technicalDeepDive?: {
      title: string;
      description: string;
      codeExample?: string;
    };
    realWorldExample?: {
      title: string;
      description: string;
      contextInIndonesia: string;
    };
  }[];
  summary: string[];
  reflectionQuestions: string[];
}

export interface PracticalLab {
  id: string;
  number: number;
  title: string;
  focus: string;
  objective: string;
  toolsAndPlatforms: {
    name: string;
    type: 'online-browser' | 'google-colab' | 'cisco-packet-tracer' | 'phet' | 'python';
    url?: string;
    description: string;
  }[];
  duration: string;
  targetCompetency: string;
  prerequisites: string[];
  materialsNeeded: string[];
  steps: {
    stepNumber: number;
    stepTitle: string;
    instruction: string;
    expectedOutput?: string;
    proTip?: string;
  }[];
  reflectionAndAnalysis: {
    id: string;
    question: string;
    pedagogicalGoal: string;
    sampleAnswerGuide: string;
  }[];
  assessmentRubric: {
    criteria: string;
    score4: string;
    score3: string;
    score2: string;
  }[];
}

export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface QuizQuestion {
  id: number;
  number: number;
  stimulus?: string;
  question: string;
  options: QuizOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  bloomLevel: 'C4 (Analisis)' | 'C5 (Evaluasi)' | 'C6 (Kreasi)';
  competencyIndicator: string;
  subChapterRef: string;
  technicalRationale: string;
  distractorExplanation: {
    [key in 'A' | 'B' | 'C' | 'D' | 'E']?: string;
  };
}

export interface ModulAjarInfo {
  schoolLevel: string;
  subject: string;
  grade: string;
  semester: string;
  phase: string;
  chapter: string;
  chapterTitle: string;
  allocatedTime: string;
  profilPelajarPancasila: string[];
  learningOutcomes: string[];
  pedagogicalModel: string;
  assessmentMethods: string[];
}
