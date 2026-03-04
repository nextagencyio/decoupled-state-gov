'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import AgenciesPreview from './AgenciesPreview'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import {
  Car,
  Building2,
  Receipt,
  HeartPulse,
  GraduationCap,
  Scale,
  Landmark,
  Shield,
  TreePine,
  Briefcase,
  Globe,
  FileText,
  ArrowRight,
  Megaphone,
  Info,
} from 'lucide-react'
import Image from 'next/image'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const quickLinks = [
  { title: 'Driver Services', description: 'Licenses, vehicle registration, and driving records', icon: Car, href: '/agencies', color: 'bg-primary-600' },
  { title: 'Business Registration', description: 'Start and register a business in Cascadia', icon: Building2, href: '/programs', color: 'bg-primary-700' },
  { title: 'Taxes', description: 'File taxes, check refund status, and payment options', icon: Receipt, href: '/agencies', color: 'bg-primary-800' },
  { title: 'Health Services', description: 'Healthcare programs, insurance, and public health', icon: HeartPulse, href: '/programs', color: 'bg-accent-600' },
  { title: 'Education', description: 'Schools, higher education, and workforce training', icon: GraduationCap, href: '/programs', color: 'bg-primary-900' },
  { title: 'Courts', description: 'Court records, jury duty, and legal resources', icon: Scale, href: '/agencies', color: 'bg-primary-600' },
]

const stateAgencies = [
  { title: 'Department of Revenue', description: 'Tax collection and financial oversight', icon: Receipt },
  { title: 'Public Safety', description: 'Law enforcement and emergency management', icon: Shield },
  { title: 'Natural Resources', description: 'Parks, forests, and environmental protection', icon: TreePine },
  { title: 'Labor & Industry', description: 'Workers rights and employment services', icon: Briefcase },
  { title: 'Foreign Trade', description: 'International trade and economic development', icon: Globe },
  { title: 'Administrative Services', description: 'Government operations and procurement', icon: FileText },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&fit=crop', alt: 'State capitol building', caption: 'State Capitol' },
  { src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80&fit=crop', alt: 'Cascadia landscape', caption: 'Cascadia Landscapes' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop', alt: 'State government office', caption: 'State Services' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&fit=crop', alt: 'Community event', caption: 'Community Engagement' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Alert / Announcement Banner */}
      <div className="bg-accent-50 border-b border-accent-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Megaphone className="w-5 h-5 text-accent-700" />
            </div>
            <p className="text-sm text-accent-900 font-medium">
              <span className="font-bold">State Notice:</span> Property tax filing deadline extended to April 30.{' '}
              <a href="/agencies" className="underline hover:text-accent-700">View details and filing options</a>
            </p>
          </div>
        </div>
      </div>

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Quick Links Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Quick Links</h2>
            <p className="text-gray-600 mt-1">Access key state services and resources</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-1 bg-primary-600" />
                <div className="p-6 flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${link.color} rounded-lg flex items-center justify-center`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{link.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Featured Agencies */}
      <ErrorBoundary>
        <AgenciesPreview homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* State Agencies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">State Agencies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the departments and agencies serving the people of Cascadia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateAgencies.map((agency) => (
              <div
                key={agency.title}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-1 bg-primary-600" />
                <div className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <agency.icon className="w-7 h-7 text-primary-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{agency.title}</h3>
                  <p className="text-sm text-gray-500">{agency.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/agencies"
              className="inline-flex items-center px-6 py-3 bg-primary-700 text-white rounded hover:bg-primary-800 transition-colors font-bold"
            >
              View All Agencies
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our State</h2>
            <p className="text-gray-600">Inside the State of Cascadia</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img) => (
              <div key={img.caption} className="relative group overflow-hidden rounded-lg">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Official Multi-Column Footer */}
      <footer className="bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* About */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-primary-800" />
                </div>
                <span className="text-lg font-bold text-white">State of Cascadia</span>
              </div>
              <p className="text-primary-300 text-sm mb-4">
                The State of Cascadia is committed to delivering essential services, protecting public welfare, and building a stronger future for all residents.
              </p>
              <div className="text-primary-400 text-sm space-y-1">
                <p>100 Capitol Way, Olympia, CS 98501</p>
                <p>(360) 555-0100</p>
                <p>info@cascadia.gov</p>
              </div>
            </div>

            {/* Government */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Government</h4>
              <ul className="space-y-2 text-primary-300 text-sm">
                <li><a href="/agencies" className="hover:text-accent-400 transition-colors">State Agencies</a></li>
                <li><a href="/officials" className="hover:text-accent-400 transition-colors">Elected Officials</a></li>
                <li><a href="/press-releases" className="hover:text-accent-400 transition-colors">Press Releases</a></li>
                <li><a href="/programs" className="hover:text-accent-400 transition-colors">State Programs</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Services</h4>
              <ul className="space-y-2 text-primary-300 text-sm">
                <li><a href="/agencies" className="hover:text-accent-400 transition-colors">Driver Services</a></li>
                <li><a href="/agencies" className="hover:text-accent-400 transition-colors">Business Filing</a></li>
                <li><a href="/programs" className="hover:text-accent-400 transition-colors">Health Programs</a></li>
                <li><a href="/agencies" className="hover:text-accent-400 transition-colors">Tax Information</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Connect</h4>
              <ul className="space-y-2 text-primary-300 text-sm">
                <li><a href="/contact" className="hover:text-accent-400 transition-colors">Contact Us</a></li>
                <li><a href="/agencies" className="hover:text-accent-400 transition-colors">Public Records</a></li>
                <li><a href="/press-releases" className="hover:text-accent-400 transition-colors">Newsroom</a></li>
                <li><a href="/contact" className="hover:text-accent-400 transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar with accessibility statement */}
        <div className="border-t border-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-400">
              <p>&copy; {new Date().getFullYear()} State of Cascadia. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <Info className="w-3 h-3" />
                <span>An official website of the State of Cascadia</span>
              </div>
              <div className="flex gap-4">
                <a href="/accessibility" className="hover:text-accent-400 transition-colors">Accessibility</a>
                <a href="/privacy" className="hover:text-accent-400 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-accent-400 transition-colors">Terms of Use</a>
                <a href="/sitemap" className="hover:text-accent-400 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
