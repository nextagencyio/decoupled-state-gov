'use client'

import Link from 'next/link'
import { DrupalHomepage, DrupalAgency } from '@/lib/types'
import { ArrowRight, Building, User } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface AgenciesPreviewProps {
  homepageContent?: DrupalHomepage | null
  featuredAgencies?: any[]
}

export default function AgenciesPreview({ homepageContent, featuredAgencies = [] }: AgenciesPreviewProps) {
  const agencies = featuredAgencies
  const sectionTitle = homepageContent?.featuredAgenciesTitle || 'Key State Agencies'

  if (agencies.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore the agencies and departments serving the people of Cascadia.
            </p>
          </div>
          <Link
            href="/agencies"
            className="hidden md:flex items-center text-primary-700 hover:text-primary-800 font-medium"
          >
            View All Agencies
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map((agency: any) => (
            <Link
              key={agency.id}
              href={agency.path || `/agencies/${agency.id}`}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="h-1 bg-primary-600" />
              <div className="relative h-48 bg-primary-100">
                {agency.image?.url ? (
                  <ResponsiveImage
                    src={agency.image.url}
                    alt={agency.image.alt || agency.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    variations={agency.image.variations}
                    targetWidth={400}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building className="w-16 h-16 text-primary-300" />
                  </div>
                )}
                {agency.agencyType && agency.agencyType.length > 0 && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-primary-900 px-3 py-1 rounded text-sm font-bold">
                    {agency.agencyType[0].name}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {agency.title}
                </h3>

                {agency.headOfficial && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4" />
                    <span>Led by {agency.headOfficial}</span>
                  </div>
                )}

                <div className="flex items-center text-primary-700 font-medium text-sm group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="/agencies"
            className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
          >
            View All Agencies
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
