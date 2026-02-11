import type { Metadata } from 'next';

export const HOME_METADATA: Metadata = {
  title: 'FormBuilder — Manage Your Forms Easily',
  description:
    'Create, edit and manage forms with a clean interface. Role-based access, validation, and more.',
  openGraph: {
    title: 'FormBuilder — Manage Your Forms Easily',
    description: 'Create, edit and manage forms with a clean interface.',
    type: 'website',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'FormBuilder Hero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormBuilder — Manage Your Forms Easily',
    description: 'Create, edit and manage forms with a clean interface.',
    images: ['/images/hero.jpg'],
  },
};