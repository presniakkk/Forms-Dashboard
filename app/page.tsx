import { Hero } from '@/components/landing/Hero';
import { Button } from '@/components/ui/Button';
import { HOME_METADATA } from '@/lib/constants/seo';

export const metadata = HOME_METADATA;

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-20">
      <Hero />
      <div className="mt-8">
        <Button href="/login">Get Started</Button>
      </div>
    </main>
  );
}