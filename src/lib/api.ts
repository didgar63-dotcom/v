import { generateJobId } from './utils';

// Mock API responses for development
export const api = {
  // Upload video
  uploadVideo: async (formData: FormData) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const jobId = generateJobId();
    return {
      success: true,
      jobId,
      message: 'ویدئو با موفقیت آپلود شد',
    };
  },

  // Get processing status
  getProcessingStatus: async (jobId: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      jobId,
      status: 'processing',
      progress: Math.floor(Math.random() * 100),
      currentStep: 'asr',
      estimatedTime: '5 minutes',
    };
  },

  // Get video report
  getVideoReport: async (videoId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: videoId,
      title: 'محاسبات دیفرانسیل - جلسه ۱',
      instructor: 'دکتر محمد احمدی',
      duration: '45:32',
      metrics: {
        accuracy: 92,
        clarity: 88,
        engagement: 85,
        overall: 89,
      },
      segments: [
        {
          id: '1',
          startTime: 0,
          endTime: 45,
          type: 'concept',
          title: 'معرفی مفهوم مشتق',
          description: 'تعریف اولیه مشتق و کاربردهای آن',
          confidence: 95,
        },
      ],
      formulas: [
        {
          id: '1',
          latex: 'f\'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}',
          description: 'تعریف مشتق با استفاده از حد',
          timestamp: 85,
          confidence: 94,
        },
      ],
    };
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      totalVideos: 125,
      averageAccuracy: 92,
      processingTime: 3.2,
      activeInstitutions: 18,
      weeklyTrend: [
        { date: '2024-01-01', videos: 12, accuracy: 91 },
        { date: '2024-01-02', videos: 15, accuracy: 93 },
        { date: '2024-01-03', videos: 8, accuracy: 89 },
        { date: '2024-01-04', videos: 18, accuracy: 94 },
        { date: '2024-01-05', videos: 22, accuracy: 92 },
        { date: '2024-01-06', videos: 14, accuracy: 90 },
        { date: '2024-01-07', videos: 19, accuracy: 95 },
      ],
    };
  },

  // Submit correction
  submitCorrection: async (correction: {
    id: string;
    correctedText: string;
    notes: string;
  }) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      message: 'تصحیح با موفقیت ثبت شد',
      correctionId: `corr-${Date.now()}`,
    };
  },
};

// WebSocket mock for real-time updates
export class MockWebSocket {
  private callbacks: { [key: string]: Function[] } = {};
  private connected = false;

  connect() {
    this.connected = true;
    // Simulate connection
    setTimeout(() => {
      this.emit('connected', {});
    }, 100);
  }

  on(event: string, callback: Function) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  emit(event: string, data: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(data));
    }
  }

  disconnect() {
    this.connected = false;
  }
}

// Export singleton instance
export const ws = new MockWebSocket();