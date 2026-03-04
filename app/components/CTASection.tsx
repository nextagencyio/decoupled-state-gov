'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Get in Touch'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Contact Us'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'Learn More'

  return (
    <section className="bg-primary-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary-900 mb-4">{title}</h2>
        {description && (
          <div className="text-primary-800 mb-8 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/contact" className="px-8 py-3 bg-primary-700 text-white rounded hover:bg-primary-800 transition-colors font-bold">
            {primaryLabel}
          </a>
          <a href="/about" className="px-8 py-3 border-2 border-primary-700 text-primary-700 rounded hover:bg-primary-700 hover:text-white transition-colors font-bold">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
