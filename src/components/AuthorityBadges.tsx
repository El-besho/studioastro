'use client';

import { Badge } from './ui/badge';
import { Shield, Award, CheckCircle, Building2 } from 'lucide-react';

interface AuthorityBadgesProps {
  className?: string;
}

export function AuthorityBadges({ className = '' }: AuthorityBadgesProps) {
  const badges = [
    {
      icon: Shield,
      text: "معتمد من وزارة التجارة",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      href: "https://mci.gov.sa"
    },
    {
      icon: Award,
      text: "مواصفات SASO",
      color: "bg-green-100 text-green-800 border-green-200",
      href: "https://saso.gov.sa"
    },
    {
      icon: CheckCircle,
      text: "معايير ASHRAE",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      href: "https://ashrae.org"
    },
    {
      icon: Building2,
      text: "شركات مرخصة",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      href: "#"
    }
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <a
            key={index}
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors hover:opacity-80"
          >
            <Icon className="h-3 w-3" />
            <span>{badge.text}</span>
          </a>
        );
      })}
    </div>
  );
}