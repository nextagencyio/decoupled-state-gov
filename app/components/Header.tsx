'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, Landmark, Search } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Agencies', href: '/agencies' },
  { name: 'Officials', href: '/officials' },
  { name: 'Programs', href: '/programs' },
  { name: 'Press Releases', href: '/press-releases' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    const banner = document.querySelector('[class*="bg-amber-500"]')
    if (banner) {
      setBannerHeight(banner.getBoundingClientRect().height)
      const observer = new MutationObserver(() => {
        if (!document.querySelector('[class*="bg-amber-500"]')) setBannerHeight(0)
      })
      observer.observe(document.body, { childList: true, subtree: true })
      return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll) }
    }
  }, [handleScroll])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) {
        return item.name
      }
    }
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header
      className={clsx(
        'sticky z-50 transition-shadow duration-200',
        isScrolled && 'shadow-md'
      )}
      style={{ top: bannerHeight }}
    >
      {/* Top official banner bar */}
      <div className="bg-primary-900 text-white text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="font-medium">Official Website of the State of Cascadia</span>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#main-content" className="hover:text-accent-300 transition-colors underline">
              Skip to Content
            </a>
            <span className="text-primary-400">|</span>
            <button className="hover:text-accent-300 transition-colors" aria-label="Increase text size">
              A+
            </button>
            <button className="hover:text-accent-300 transition-colors" aria-label="Decrease text size">
              A-
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="bg-white border-b-2 border-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-800 rounded flex items-center justify-center">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-primary-900 hidden sm:block">
                State of Cascadia
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-0">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'px-4 py-5 text-sm font-medium transition-colors border-b-2 -mb-[2px]',
                    activeTab === item.name
                      ? 'text-primary-800 border-primary-600 font-bold bg-primary-50'
                      : 'text-gray-600 border-transparent hover:text-primary-800 hover:border-primary-300'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                className="hidden sm:flex items-center justify-center w-9 h-9 text-gray-500 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center bg-primary-700 text-white px-4 py-2 rounded hover:bg-primary-800 transition-colors duration-200 font-bold text-sm"
              >
                Contact Us
              </Link>

              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center p-2 rounded text-gray-600 hover:text-primary-800 hover:bg-primary-50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'px-4 py-3 text-sm font-medium transition-colors border-l-4',
                      activeTab === item.name
                        ? 'bg-primary-50 text-primary-800 border-primary-600 font-bold'
                        : 'text-gray-600 border-transparent hover:text-primary-800 hover:bg-gray-50 hover:border-primary-300'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 mt-2 text-center bg-primary-700 text-white px-4 py-2 rounded hover:bg-primary-800 transition-colors font-bold text-sm"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
