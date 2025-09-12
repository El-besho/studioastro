// WhatsApp Chat Configuration

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  avatar?: string;
  availability: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
      days: number[]; // 0 = Sunday, 1 = Monday, etc.
    };
  };
}

export interface WhatsAppConfig {
  defaultPhone: string;
  defaultMessage: string;
  agents: Agent[];
  settings: {
    showForm: boolean;
    showAvailability: boolean;
    gdprCompliant: boolean;
    deviceSpecific: 'all' | 'desktop' | 'mobile' | 'tablet';
    animation: 'bounce' | 'pulse' | 'shake' | 'none';
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  };
}

// Default agents configuration
export const defaultAgents: Agent[] = [
  {
    id: 'support',
    name: 'فريق الدعم',
    phone: '+966501234567',
    email: 'support@inqadh.com',
    role: 'دعم العملاء',
    availability: {
      timezone: 'Asia/Riyadh',
      workingHours: {
        start: '08:00',
        end: '22:00',
        days: [0, 1, 2, 3, 4, 5, 6] // All days
      }
    }
  },
  {
    id: 'sales',
    name: 'فريق المبيعات',
    phone: '+966501234568',
    email: 'sales@inqadh.com',
    role: 'استشارات المبيعات',
    availability: {
      timezone: 'Asia/Riyadh',
      workingHours: {
        start: '09:00',
        end: '18:00',
        days: [1, 2, 3, 4, 5] // Sunday to Thursday
      }
    }
  },
  {
    id: 'technical',
    name: 'الفريق التقني',
    phone: '+966501234569',
    email: 'technical@inqadh.com',
    role: 'الدعم التقني',
    availability: {
      timezone: 'Asia/Riyadh',
      workingHours: {
        start: '08:00',
        end: '20:00',
        days: [0, 1, 2, 3, 4, 5, 6] // All days
      }
    }
  },
  {
    id: 'emergency',
    name: 'خدمات الطوارئ',
    phone: '+966501234570',
    email: 'emergency@inqadh.com',
    role: 'خدمات الطوارئ 24/7',
    availability: {
      timezone: 'Asia/Riyadh',
      workingHours: {
        start: '00:00',
        end: '23:59',
        days: [0, 1, 2, 3, 4, 5, 6] // All days, 24/7
      }
    }
  }
];

// Default configuration
export const defaultWhatsAppConfig: WhatsAppConfig = {
  defaultPhone: '+966501234567',
  defaultMessage: 'مرحباً! أريد الاستفسار عن خدماتكم',
  agents: defaultAgents,
  settings: {
    showForm: true,
    showAvailability: true,
    gdprCompliant: true,
    deviceSpecific: 'all',
    animation: 'bounce',
    position: 'bottom-right'
  }
};

// Service-specific messages
export const serviceMessages = {
  'air-conditioning-maintenance': 'مرحباً! أريد الاستفسار عن خدمات صيانة مكيفات الهواء',
  'plumbing-services': 'مرحباً! أريد الاستفسار عن خدمات السباكة',
  'electrical-services': 'مرحباً! أريد الاستفسار عن خدمات الكهرباء',
  'cleaning-services': 'مرحباً! أريد الاستفسار عن خدمات التنظيف',
  'pest-control': 'مرحباً! أريد الاستفسار عن خدمات مكافحة الحشرات',
  'home-maintenance-repair': 'مرحباً! أريد الاستفسار عن خدمات الصيانة المنزلية',
  'emergency': 'مرحباً! أحتاج خدمة طوارئ فورية'
};

// Location-specific messages
export const locationMessages = {
  'riyadh': 'مرحباً! أريد الاستفسار عن الخدمات في الرياض',
  'jeddah': 'مرحباً! أريد الاستفسار عن الخدمات في جدة',
  'dammam': 'مرحباً! أريد الاستفسار عن الخدمات في الدمام',
  'makkah': 'مرحباً! أريد الاستفسار عن الخدمات في مكة المكرمة',
  'medina': 'مرحباً! أريد الاستفسار عن الخدمات في المدينة المنورة'
};

// Get message for specific service
export function getServiceMessage(serviceSlug: string): string {
  return serviceMessages[serviceSlug as keyof typeof serviceMessages] || defaultWhatsAppConfig.defaultMessage;
}

// Get message for specific location
export function getLocationMessage(citySlug: string): string {
  return locationMessages[citySlug as keyof typeof locationMessages] || defaultWhatsAppConfig.defaultMessage;
}

// Get agent by role
export function getAgentByRole(role: string): Agent | undefined {
  return defaultAgents.find(agent => agent.role === role);
}

// Get available agents at current time
export function getAvailableAgents(): Agent[] {
  const now = new Date();
  return defaultAgents.filter(agent => {
    const timezone = agent.availability.timezone;
    const localTime = new Date(now.toLocaleString("ar-SA", { timeZone: timezone }));
    
    const currentDay = localTime.getDay();
    const currentTimeStr = localTime.toTimeString().slice(0, 5);
    
    const { start, end, days } = agent.availability.workingHours;
    
    const isWorkingDay = days.includes(currentDay);
    const isWorkingTime = currentTimeStr >= start && currentTimeStr <= end;
    
    return isWorkingDay && isWorkingTime;
  });
}