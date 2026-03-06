'use client'

import { DrupalHomepage } from '@/lib/types'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const stats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || []
  if (!stats || stats.length === 0) return null

  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center divide-x divide-primary-200">
          {stats.map((stat: any, i: number) => (
            <div key={stat.id || i} className="px-8 py-4 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-800">{stat.value || stat.number || stat.statValue}</div>
              <div className="text-gray-600 mt-1 text-sm">{stat.label || stat.statLabel || stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
