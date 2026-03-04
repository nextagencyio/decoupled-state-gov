import Link from 'next/link'
import { DrupalAgency } from '@/lib/types'
import ResponsiveImage from './ResponsiveImage'
import { ArrowRight } from 'lucide-react'

interface AgencyCardProps {
  item: DrupalAgency
}

export default function AgencyCard({ item }: AgencyCardProps) {
  return (
    <Link
      href={item.path || '#'}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
    >
      <div className="h-1 bg-primary-600" />
      <div className="relative h-48 bg-primary-100">
        {(item as any).image?.url ? (
          <ResponsiveImage
            src={(item as any).image.url}
            alt={(item as any).image.alt || item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={(item as any).image.variations}
            targetWidth={400}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 text-primary-300 text-4xl font-bold flex items-center justify-center">{item.title?.charAt(0)}</div>
          </div>
        )}
      </div>

      <div className="p-6">
          {(item as any).headOfficial && (
            <p className="text-xs text-primary-600 font-bold uppercase tracking-wide mb-2">{(item as any).headOfficial}</p>
          )}
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
          {item.title}
        </h3>

        {(item as any).body?.processed && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {(item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 150)}
          </p>
        )}

        <div className="flex items-center text-primary-700 font-medium text-sm group-hover:gap-2 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
