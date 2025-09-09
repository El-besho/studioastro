
import Image from 'next/image';
import { ShieldCheck, Star, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  {
    name: 'عبدالله القحطاني',
    role: 'المؤسس والرئيس التنفيذي',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'قائد ذو رؤية وشغف لتبسيط الخدمات المنزلية في المملكة.',
  },
  {
    name: 'سارة العتيبي',
    role: 'رئيسة العمليات',
    avatar: 'https://i.pravatar.cc/150?img=6',
    bio: 'تضمن سارة أن تعمل جميع عملياتنا بسلاسة وكفاءة لتقديم أفضل خدمة.',
  },
  {
    name: 'محمد الغامدي',
    role: 'المدير التقني',
    avatar: 'https://i.pravatar.cc/150?img=7',
    bio: 'يقود محمد فريق التكنولوجيا لدينا لبناء منصة قوية وسهلة الاستخدام.',
  },
];

const values = [
    {
        icon: Star,
        title: "الجودة",
        description: "نحن ملتزمون بتقديم أعلى معايير الجودة في كل خدمة نقدمها. نحن نختار فقط المهنيين الأكثر مهارة وخبرة."
    },
     {
        icon: ShieldCheck,
        title: "الثقة",
        description: "الثقة هي أساس كل ما نقوم به. يتم فحص جميع مزودي الخدمة لدينا والتحقق منهم لضمان راحة بالك."
    },
     {
        icon: Users,
        title: "التركيز على العميل",
        description: "عملاؤنا هم في صميم أعمالنا. نحن نسعى جاهدين لتجاوز توقعاتك في كل تفاعل."
    },
     {
        icon: Briefcase,
        title: "الاحترافية",
        description: "من الحجز إلى إتمام الخدمة، نضمن تجربة احترافية وسلسة في كل خطوة على الطريق."
    }
]

export default function AboutUsPage() {
  return (
    <div className="text-right">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-24 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            من نحن
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-foreground/80 md:text-xl">
            نحن نربط أصحاب المنازل والشركات في المملكة العربية السعودية بأفضل مزودي الخدمات المحليين الموثوق بهم. مهمتنا هي جعل العناية بالممتلكات سهلة وموثوقة ومريحة.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter">قصتنا</h2>
              <p className="text-muted-foreground">
                تأسست "إنقاذ" من فكرة بسيطة: لماذا يجب أن يكون العثور على فني محترف وموثوق به أمراً صعباً؟ لقد شهد مؤسسونا، الذين يتمتعون بخبرة سنوات في قطاعي التكنولوجيا والخدمات، بشكل مباشر الإحباط الذي يواجهه الناس.
              </p>
              <p className="text-muted-foreground">
                من هنا، وُلدت رؤية لإنشاء منصة مركزية لا تجمع فقط أفضل مقدمي الخدمات ولكنها تضمن أيضًا الجودة والسلامة ورضا العملاء. اليوم، نحن فخورون بأننا المنصة الرائدة التي يثق بها الآلاف في جميع أنحاء المملكة لتلبية جميع احتياجاتهم من الخدمات المنزلية والتجارية.
              </p>
            </div>
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="https://picsum.photos/600/400"
                    alt="فريق عمل إنقاذ يناقش الأفكار في المكتب"
                    fill
                    className="object-cover"
                    data-ai-hint="team collaboration"
                />
            </div>
          </div>
        </div>
      </section>
      
        {/* Values Section */}
      <section id="values" className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                قيمنا الأساسية
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                هذه هي المبادئ التي توجه كل قرار نتخذه وكل خدمة نقدمها.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12 py-12">
            {values.map((value, index) => (
                <div key={index} className="grid gap-2 text-center">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20 mb-4">
                    <value.icon className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter">
              تعرف على فريقنا
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
              نحن فريق من الأفراد المتحمسين الملتزمين بتحقيق رؤيتنا.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-headline font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              انضم إلى منصتنا
            </h2>
            <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             هل أنت مزود خدمة محترف تبحث عن تنمية عملك؟ انضم إلى شبكتنا من المهنيين الموثوق بهم.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Button
              type="submit"
              size="lg"
              className="w-full font-headline"
              asChild
            >
              <Link href="/join-provider">انضم كمزود خدمة</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
