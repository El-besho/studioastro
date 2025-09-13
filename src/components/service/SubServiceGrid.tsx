import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Check, Clock, Banknote, Star, Zap } from 'lucide-react';

interface SubService {
  id: string;
  ar_name: string;
  urgency: string;
  avg_price_range: [number, number];
  skill_requirements: string[];
  tools_required: string[];
  seasonal_multiplier: number;
  seo: {
    summary: string;
    primary_keywords: string[];
    secondary_keywords: string[];
    long_tail_keywords: string[];
    faq: Array<{ question: string; answer: string }>;
  };
}

interface SubServiceGridProps {
  subServices: SubService[];
  serviceSlug: string;
  serviceName: string;
}

export function SubServiceGrid({ subServices, serviceSlug, serviceName }: SubServiceGridProps) {
  const skillsMap: { [key: string]: string } = {
      hvac_certified: 'فني تكييف معتمد',
      hvac_technician: 'فني تكييف',
      central_ac_expert: 'خبير تكييف مركزي',
      duct_cleaning_specialist: 'متخصص تنظيف دكت',
      hvac_certified_master: 'فني تكييف رئيسي معتمد',
      licensed_plumber: 'سباك معتمد',
      master_electrician: 'كهربائي رئيسي',
      licensed_electrician: 'كهربائي معتمد',
      certified_electrician: 'كهربائي معتمد',
      electrician: 'كهربائي',
      professional_cleaner: 'عامل نظافة محترف',
      cleaner: 'عامل نظافة',
      gardener: 'بستاني',
      it_support_specialist: 'متخصص دعم تقني',
      data_recovery_expert: 'خبير استعادة البيانات',
      network_technician: 'فني شبكات',
      security_specialist: 'متخصص أمن سيبراني',
      printer_technician: 'فني طابعات',
      smart_home_integrator: 'متخصص أنظمة المنزل الذكي',
      landscape_architect: 'مهندس تنسيق حدائق',
      irrigation_specialist: 'متخصص ري',
      arborist: 'متخصص أشجار',
      landscaper: 'متخصص تنسيق حدائق',
      landscape_designer: 'مصمم حدائق',
      pool_technician: 'فني مسابح',
      leak_detection_specialist: 'متخصص كشف تسريبات',
      pool_mechanic: 'ميكانيكي مسابح',
      pool_construction_specialist: 'متخصص بناء مسابح',
      pool_water_treatment_specialist: 'متخصص معالجة مياه المسابح',
      washing_machine_technician: 'فني غسالات',
      refrigerator_technician: 'فني ثلاجات',
      marble_specialist: 'متخصص رخام',
      tile_specialist: 'متخصص بلاط',
      construction_specialist: 'متخصص بناء',
      renovation_specialist: 'متخصص تجديد',
      painter: 'رسام',
      decorator: 'مصمم ديكور',
      mover: 'عامل نقل',
      automotive_technician: 'فني سيارات',
      event_planner: 'منظم فعاليات',
      pest_control_specialist: 'متخصص مكافحة آفات',
      security_installer: 'فني تركيب أمني',
      maintenance_specialist: 'متخصص صيانة',
      repair_specialist: 'متخصص إصلاح'
  }

  const toolsMap: { [key: string]: string } = {
      drill: 'مثقاب',
      freon_gauge: 'مقياس الفريون',
      recovery_machine: 'جهاز استرداد الفريون',
      level: 'ميزان ماء',
      duct_cleaner: 'منظف دكت',
      pressure_washer: 'غسالة ضغط عالي',
      coil_cleaner: 'منظف ملفات',
      leak_detector: 'كاشف تسريبات',
      refrigerant_scale: 'ميزان غاز التبريد',
      gauge_manifold: 'مجمع مقاييس',
      negative_air_machine: 'جهاز شفط هواء',
      rotary_brushes: 'فرش دوارة',
      brazing_kit: 'طقم لحام',
      vibration_analyzer: 'محلل اهتزاز',
      lubricants: 'مواد تشحيم',
      drain_snake: 'سلك تنظيف مجاري',
      pressure_pump: 'مضخة ضغط',
      ladder: 'سلم',
      wire_stripper: 'قاطع أسلاك',
      wire_cutter: 'قاطع أسلاك',
      multimeter: 'مقياس متعدد',
      circuit_tester: 'اختبار دوائر',
      breaker_puller: 'سحب قواطع',
      torque_wrench: 'مفتاح عزم',
      insulation_tester: 'اختبار عزل',
      thermal_camera: 'كاميرا حرارية',
      transfer_switch: 'مفتاح تحويل',
      heavy_gauge_cable: 'كابل ثقيل',
      diagnostic_software: 'برنامج تشخيص',
      anti_static_wrist_strap: 'سوار مضاد للكهرباء الساكنة',
      clean_room: 'غرفة نظيفة',
      specialized_software: 'برنامج متخصص',
      cable_tester: 'اختبار كابلات',
      wifi_analyzer: 'محلل واي فاي',
      antivirus_software: 'برنامج مكافحة فيروسات',
      firewall_setup: 'إعداد جدار حماية',
      printer_diagnostic_tools: 'أدوات تشخيص طابعات',
      spare_parts: 'قطع غيار',
      smart_hub_configurator: 'مكون مركز ذكي',
      device_linker: 'ربط أجهزة',
      cad_software: 'برنامج تصميم',
      surveying_tools: 'أدوات مساحة',
      trencher: 'حفار خنادق',
      pipe_fitter: 'معد أنابيب',
      chainsaw: 'منشار كهربائي',
      pruning_saw: 'منشار تقليم',
      turf_cutter: 'قاطع عشب',
      seaming_tape: 'شريط لاصق',
      rake: 'مشط',
      leaf_blower: 'منفاخ أوراق',
      low_voltage_transformer: 'محول جهد منخفض',
      wire_strippers: 'قواطع أسلاك',
      pump: 'مضخة',
      waterproofing_materials: 'مواد عزل مائي',
      pool_vacuum: 'مكنسة مسبح',
      water_testing_kit: 'طقم اختبار مياه',
      pressure_test_kit: 'طقم اختبار ضغط',
      underwater_camera: 'كاميرا تحت الماء',
      pump_seal_kit: 'طقم أختام مضخة',
      pool_construction_tools: 'أدوات بناء مسابح',
      water_treatment_chemicals: 'مواد معالجة مياه',
      washing_machine_tools: 'أدوات غسالات',
      refrigerator_tools: 'أدوات ثلاجات',
      marble_tools: 'أدوات رخام',
      tile_tools: 'أدوات بلاط',
      construction_tools: 'أدوات بناء',
      painting_tools: 'أدوات دهان',
      moving_tools: 'أدوات نقل',
      automotive_tools: 'أدوات سيارات',
      event_tools: 'أدوات فعاليات',
      pest_control_tools: 'أدوات مكافحة آفات',
      security_tools: 'أدوات أمنية',
      maintenance_tools: 'أدوات صيانة',
      repair_tools: 'أدوات إصلاح'
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'maintenance':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'طوارئ';
      case 'urgent':
        return 'عاجل';
      case 'scheduled':
        return 'مجدول';
      case 'maintenance':
        return 'صيانة';
      default:
        return urgency;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter mb-4">
          خدمات {serviceName} المتاحة
        </h2>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          اختر من بين مجموعة شاملة من خدمات {serviceName} المتخصصة
        </p>
      </div>
      
      <div className="grid-subservice">
        {subServices.map((subService) => (
          <Card key={subService.id} className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getUrgencyColor(subService.urgency)}>
                  {getUrgencyLabel(subService.urgency)}
                </Badge>
                {subService.seasonal_multiplier > 1 && (
                  <Badge variant="outline" className="text-xs">
                    موسمي
                  </Badge>
                )}
              </div>
              <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                {subService.ar_name}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {subService.seo.summary}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">
                  {subService.avg_price_range[0]} - {subService.avg_price_range[1]} ريال
                </span>
                {subService.seasonal_multiplier > 1 && (
                  <span className="text-xs text-muted-foreground">
                    (موسمي: {Math.round(subService.avg_price_range[0] * subService.seasonal_multiplier)} - {Math.round(subService.avg_price_range[1] * subService.seasonal_multiplier)} ريال)
                  </span>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">المهارات المطلوبة:</h4>
                <div className="flex flex-wrap gap-1">
                  {subService.skill_requirements.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skillsMap[skill] || skill}
                    </Badge>
                  ))}
                  {subService.skill_requirements.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{subService.skill_requirements.length - 3} أخرى
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">الأدوات المطلوبة:</h4>
                <div className="flex flex-wrap gap-1">
                  {subService.tools_required.slice(0, 2).map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {toolsMap[tool] || tool}
                    </Badge>
                  ))}
                  {subService.tools_required.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{subService.tools_required.length - 2} أخرى
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  asChild
                  className="w-full"
                >
                  <a href={`/services/${serviceSlug}/${subService.slug}`}>
                    عرض التفاصيل
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <a href="/contact">
                    اطلب عرض سعر
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}