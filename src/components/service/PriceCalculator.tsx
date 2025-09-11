'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calculator, DollarSign, Clock, MapPin } from 'lucide-react';

interface PriceCalculatorProps {
  serviceName: string;
  cityName: string;
  serviceType: string;
  basePrice?: number;
}

export function PriceCalculator({
  serviceName,
  cityName,
  serviceType,
  basePrice = 100
}: PriceCalculatorProps) {
  const [formData, setFormData] = useState({
    area: '',
    complexity: 'medium',
    urgency: 'normal',
    materials: 'included'
  });

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    let price = basePrice;

    // Area multiplier
    const area = parseInt(formData.area) || 0;
    if (area > 0) {
      price += area * 2; // 2 SAR per square meter
    }

    // Complexity multiplier
    const complexityMultipliers = {
      low: 1,
      medium: 1.2,
      high: 1.5
    };
    price *= complexityMultipliers[formData.complexity as keyof typeof complexityMultipliers];

    // Urgency multiplier
    const urgencyMultipliers = {
      normal: 1,
      urgent: 1.3,
      emergency: 1.5
    };
    price *= urgencyMultipliers[formData.urgency as keyof typeof urgencyMultipliers];

    // Materials
    if (formData.materials === 'separate') {
      price *= 0.8; // 20% discount if materials are separate
    }

    setCalculatedPrice(Math.round(price));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle class="font-headline text-lg flex items-center gap-2">
          <Calculator class="h-5 w-5" />
          حاسبة الأسعار
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <Label htmlFor="area">المساحة (متر مربع)</Label>
          <Input
            id="area"
            type="number"
            placeholder="أدخل المساحة"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
        </div>

        <div class="space-y-2">
          <Label htmlFor="complexity">مستوى الصعوبة</Label>
          <Select value={formData.complexity} onValueChange={(value) => setFormData({ ...formData, complexity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="اختر مستوى الصعوبة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">سهل</SelectItem>
              <SelectItem value="medium">متوسط</SelectItem>
              <SelectItem value="high">صعب</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label htmlFor="urgency">الاستعجال</Label>
          <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="اختر مستوى الاستعجال" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">عادي</SelectItem>
              <SelectItem value="urgent">عاجل</SelectItem>
              <SelectItem value="emergency">طوارئ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label htmlFor="materials">المواد</Label>
          <Select value={formData.materials} onValueChange={(value) => setFormData({ ...formData, materials: value })}>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع المواد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="included">مشمولة في السعر</SelectItem>
              <SelectItem value="separate">منفصلة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculatePrice} class="w-full">
          <Calculator class="h-4 w-4 ml-2" />
          احسب السعر
        </Button>

        {calculatedPrice && (
          <div class="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div class="flex items-center gap-2 mb-2">
              <DollarSign class="h-5 w-5 text-primary" />
              <span class="font-semibold">السعر المقدر</span>
            </div>
            <div class="text-2xl font-bold text-primary">
              {calculatedPrice.toLocaleString()} ريال
            </div>
            <div class="text-sm text-muted-foreground mt-1">
              * السعر تقريبي وقد يختلف حسب التفاصيل الفعلية
            </div>
          </div>
        )}

        <div class="text-xs text-muted-foreground">
          <div class="flex items-center gap-1 mb-1">
            <MapPin class="h-3 w-3" />
            <span>الخدمة متاحة في {cityName}</span>
          </div>
          <div class="flex items-center gap-1">
            <Clock class="h-3 w-3" />
            <span>وقت الاستجابة: 30 دقيقة</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}