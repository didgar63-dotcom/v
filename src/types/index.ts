// Core types for the educational video analysis platform

export interface VideoFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

export interface VideoMetadata {
  courseName: string;
  instructor: string;
  language: string;
  description: string;
  useForTraining: boolean;
  tags?: string[];
}

export interface ProcessingJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  steps: ProcessingStep[];
  estimatedTime: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  description: string;
  estimatedTime: string;
}

export interface VideoReport {
  id: string;
  videoId: string;
  title: string;
  instructor: string;
  duration: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  metrics: AnalysisMetrics;
  segments: TimelineSegment[];
  formulas: Formula[];
  transcript: TranscriptSegment[];
  summary: string;
  recommendations: string[];
}

export interface AnalysisMetrics {
  accuracy: number;
  clarity: number;
  engagement: number;
  overall: number;
  scientificAccuracy: number;
  presentationClarity: number;
  contentStructure: number;
  audienceEngagement: number;
}

export interface TimelineSegment {
  id: string;
  startTime: number;
  endTime: number;
  type: 'formula' | 'concept' | 'example' | 'warning' | 'definition' | 'theorem';
  title: string;
  description: string;
  confidence: number;
  tags?: string[];
  relatedFormulas?: string[];
}

export interface Formula {
  id: string;
  latex: string;
  description: string;
  timestamp: number;
  confidence: number;
  context: string;
  relatedConcepts?: string[];
  validationStatus?: 'valid' | 'invalid' | 'needs_review';
}

export interface TranscriptSegment {
  id: string;
  start: number;
  end: number;
  text: string;
  speaker?: string;
  confidence: number;
  words: Word[];
}

export interface Word {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

export interface Correction {
  id: string;
  segmentId: string;
  originalText: string;
  correctedText: string;
  notes?: string;
  timestamp: number;
  userId: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  institution?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalVideos: number;
  averageAccuracy: number;
  processingTime: number;
  activeInstitutions: number;
  weeklyTrend: Array<{
    date: string;
    videos: number;
    accuracy: number;
  }>;
  subjectDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  recentVideos: Array<{
    id: string;
    title: string;
    instructor: string;
    status: string;
    accuracy: number;
    date: string;
    duration: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  jobId: string;
  message: string;
}

export interface ProcessingStatus {
  jobId: string;
  status: string;
  progress: number;
  currentStep: string;
  estimatedTime: string;
}

// Form types
export interface UploadFormData {
  courseName: string;
  instructor: string;
  language: string;
  description: string;
  useForTraining: boolean;
}

export interface VideoLinkForm {
  url: string;
  metadata: VideoMetadata;
}

// Chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TimelineChartData {
  time: number;
  confidence: number;
  type: string;
}

// WebSocket message types
export interface WsMessage {
  type: string;
  payload: any;
  timestamp: number;
}

export interface ProcessingUpdate extends WsMessage {
  type: 'processing_update';
  payload: {
    jobId: string;
    progress: number;
    currentStep: string;
    status: string;
  };
}

export interface CorrectionUpdate extends WsMessage {
  type: 'correction_update';
  payload: {
    segmentId: string;
    correction: Correction;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError extends AppError {
  code: 'VALIDATION_ERROR';
  field: string;
  value: any;
}

export interface ProcessingError extends AppError {
  code: 'PROCESSING_ERROR';
  jobId: string;
  step: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}