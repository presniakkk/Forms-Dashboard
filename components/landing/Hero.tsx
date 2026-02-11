import Image from 'next/image';

export function Hero() {
  return (
    <section className="max-w-4xl w-full text-center space-y-8">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        Build & Manage Forms
        <span className="text-blue-600"> Effortlessly</span>
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A lightweight tool to create, organize and track your forms.
        Role-based access, real-time validation, and a clean interface.
      </p>

      <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
          alt="Task management dashboard"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </section>
  );
}