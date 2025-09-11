'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, Phone, Mail, MapPin, Clock, User } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: 'message' | 'phone' | 'mail' | 'location' | 'user';
  label?: string;
  className?: string;
  agentName?: string;
  showAgentInfo?: boolean;
}

export function WhatsAppButton({
  phoneNumber,
  message = "مرحباً! أريد الاستفسار عن خدماتكم",
  variant = 'default',
  size = 'default',
  icon = 'message',
  label = 'تواصل عبر WhatsApp',
  className = '',
  agentName,
  showAgentInfo = false
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const getIcon = () => {
    switch (icon) {
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'mail': return <Mail className="h-4 w-4" />;
      case 'location': return <MapPin className="h-4 w-4" />;
      case 'user': return <User className="h-4 w-4" />;
      case 'clock': return <Clock className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return 'border-green-500 text-green-500 hover:bg-green-50 rounded-xl';
      case 'ghost':
        return 'text-green-500 hover:bg-green-50 rounded-xl';
      case 'link':
        return 'text-green-500 hover:underline p-0 h-auto rounded-xl';
      default:
        return 'bg-green-500 hover:bg-green-600 text-white rounded-xl';
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        variant={variant}
        size={size}
        className={`${getVariantStyles()} ${className} aspect-square min-w-[48px] min-h-[48px] flex items-center justify-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {getIcon()}
        {size !== 'icon' && (
          <span className="mr-2">{label}</span>
        )}
      </Button>

      {/* Agent Info Tooltip */}
      {showAgentInfo && agentName && isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
          {agentName}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}