'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Clock, 
  User, 
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Agent {
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
      days: number[];
    };
  };
}

interface WhatsAppChatProps {
  phoneNumber: string;
  defaultMessage?: string;
  agents?: Agent[];
  showForm?: boolean;
  showAvailability?: boolean;
  gdprCompliant?: boolean;
  deviceSpecific?: 'all' | 'desktop' | 'mobile' | 'tablet';
  animation?: 'bounce' | 'pulse' | 'shake' | 'none';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export function WhatsAppChat({
  phoneNumber,
  defaultMessage = "مرحباً! أريد الاستفسار عن خدماتكم",
  agents = [],
  showForm = true,
  showAvailability = true,
  gdprCompliant = true,
  deviceSpecific = 'all',
  animation = 'bounce',
  position = 'bottom-right',
  className = ''
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAgentList, setShowAgentList] = useState(false);

  // Default agent if none provided
  const defaultAgent: Agent = {
    id: 'default',
    name: 'فريق الدعم',
    phone: phoneNumber,
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
  };

  const availableAgents = agents.length > 0 ? agents : [defaultAgent];
  const currentAgent = selectedAgent || availableAgents[0];

  // Check availability
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const timezone = currentAgent.availability.timezone;
      const localTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
      
      const currentDay = localTime.getDay();
      const currentTimeStr = localTime.toTimeString().slice(0, 5);
      
      const { start, end, days } = currentAgent.availability.workingHours;
      
      const isWorkingDay = days.includes(currentDay);
      const isWorkingTime = currentTimeStr >= start && currentTimeStr <= end;
      
      setIsAvailable(isWorkingDay && isWorkingTime);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentAgent]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Device detection
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const shouldShow = () => {
    switch (deviceSpecific) {
      case 'desktop': return isDesktop;
      case 'tablet': return isTablet;
      case 'mobile': return isMobile;
      default: return true;
    }
  };

  const getAnimationClass = () => {
    if (!isAvailable) return '';
    switch (animation) {
      case 'bounce': return 'animate-bounce';
      case 'pulse': return 'animate-pulse';
      case 'shake': return 'animate-pulse';
      default: return '';
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      default: return 'bottom-4 right-4';
    }
  };

  const handleSendMessage = () => {
    if (showForm && (!formData.name || !formData.message)) {
      return;
    }

    if (gdprCompliant && !gdprAccepted) {
      return;
    }

    const message = showForm 
      ? `مرحباً، أنا ${formData.name}\n\n${formData.message}`
      : defaultMessage;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${currentAgent.phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    
    // Reset form
    setFormData({ name: '', message: '' });
    setGdprAccepted(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      timeZone: currentAgent.availability.timezone,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!shouldShow()) return null;

  return (
    <div className={`fixed z-50 ${getPositionClass()} ${className}`}>
      {/* Chat Widget */}
      {isOpen && (
        <Card className="w-80 shadow-2xl border-0 bg-white mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {currentAgent.name}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-xs text-muted-foreground">
                      {isAvailable ? 'متاح الآن' : 'غير متاح'}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Agent Selection */}
            {availableAgents.length > 1 && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAgentList(!showAgentList)}
                  className="w-full justify-between rounded-lg"
                >
                  <span>اختر الممثل</span>
                  {showAgentList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                
                {showAgentList && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availableAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedAgent?.id === agent.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => {
                          setSelectedAgent(agent);
                          setShowAgentList(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{agent.name}</p>
                            <p className="text-xs text-muted-foreground">{agent.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Availability Status */}
            {showAvailability && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">ساعات العمل</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isAvailable ? (
                    `متاح الآن - ${formatTime(currentTime)}`
                  ) : (
                    `غير متاح - ${formatTime(currentTime)}`
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ساعات العمل: {currentAgent.availability.workingHours.start} - {currentAgent.availability.workingHours.end}
                </p>
              </div>
            )}

            {/* Contact Form */}
            {showForm && (
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="اسمك"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-right"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border rounded-md resize-none text-right"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* GDPR Compliance */}
            {gdprCompliant && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="gdpr"
                  checked={gdprAccepted}
                  onChange={(e) => setGdprAccepted(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="gdpr" className="text-xs text-muted-foreground">
                  أوافق على معالجة بياناتي الشخصية وفقاً لسياسة الخصوصية
                </label>
              </div>
            )}

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!isAvailable || (showForm && (!formData.name || !formData.message)) || (gdprCompliant && !gdprAccepted)}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Send className="h-4 w-4 ml-2" />
              إرسال عبر WhatsApp
            </Button>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${currentAgent.phone}`, '_self')}
                className="flex-1 rounded-lg"
              >
                <Phone className="h-4 w-4 ml-1" />
                اتصال
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`mailto:${currentAgent.email}`, '_self')}
                className="flex-1 rounded-lg"
              >
                <Mail className="h-4 w-4 ml-1" />
                إيميل
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${getAnimationClass()}`}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Availability Badge */}
      {!isAvailable && (
        <div className="absolute -top-2 -right-2">
          <Badge variant="secondary" className="text-xs">
            غير متاح
          </Badge>
        </div>
      )}
    </div>
  );
}