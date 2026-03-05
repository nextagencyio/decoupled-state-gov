'use client'

import { DrupalHomepage } from '@/lib/types'
import { Landmark } from 'lucide-react'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Welcome'
  const subtitle = (homepageContent as any)?.heroSubtitle || ''
  const description = (homepageContent as any)?.heroDescription?.processed || ''

  return (
    <section id="main-content" className="relative overflow-hidden bg-primary-900 text-white py-16 md:py-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1472806679307-eab7abd1eb32?w=1800&q=80&fit=crop"
          alt="State capitol"
          className="h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/85 to-primary-800/75" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-8">
          <div className="hidden md:flex flex-shrink-0 w-24 h-24 bg-white rounded-full items-center justify-center">
            <Landmark className="w-12 h-12 text-primary-800" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">{title}</h1>
            {subtitle && <p className="text-xl text-primary-200 mb-4 max-w-3xl">{subtitle}</p>}
            {description && (
              <div className="text-primary-200 max-w-2xl" dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
