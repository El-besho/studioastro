import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Check, Star, Clock, Shield } from 'lucide-react';

interface PricingCardProps {
  title: string;
  priceRange: [number, number];
  duration: number;
  features: string[];
  isPopular?: boolean;
  emergencyAvailable?: boolean;
  seasonalMultiplier?: number;
  onSelect: () => void;
}

export function PricingCard({
  title,
  priceRange,
  duration,
  features,
  isPopular = false,
  emergencyAvailable = false,
  seasonalMultiplier = 1,
  onSelect
}: PricingCardProps) {
  const basePrice = priceRange[0];
  const maxPrice = priceRange[1];
  const seasonalPrice = Math.round(basePrice * seasonalMultiplier);

  return (
    <Card className={`relative ${isPopular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Star className="h-3 w-3 mr-1" />
            الأكثر طلباً
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">
            {basePrice} - {maxPrice} ريال
          </div>
          {seasonalMultiplier > 1 && (
            <div className="text-sm text-muted-foreground">
              موسمي: {seasonalPrice} - {Math.round(maxPrice * seasonalMultiplier)} ريال
            </div>
          )}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {duration} ساعة
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {emergencyAvailable && (
          <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <Shield className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">
              خدمة طوارئ متاحة 24/7
            </span>
          </div>
        )}
        
        <Button 
          onClick={onSelect}
          className="w-full"
          variant={isPopular ? "default" : "outline"}
        >
          اختر هذه الخدمة
        </Button>
      </CardContent>
    </Card>
  );
}