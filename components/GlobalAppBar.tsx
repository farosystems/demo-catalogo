'use client'

import Link from "next/link"
import { Menu, ShoppingBag, X, Home, Star } from "lucide-react"
import ProductSearch from "./ProductSearch"
import CategoriesDropdown from "./CategoriesDropdown"
import ShoppingListModal from "./ShoppingListModal"
import { useState, useEffect } from "react"
import { useShoppingList } from "@/hooks/use-shopping-list"

export default function GlobalAppBar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useShoppingList()
  
  // Cerrar menú móvil al cambiar el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-gradient-to-r from-violet-700 via-violet-600 to-violet-700 shadow-lg border-b border-violet-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header principal */}
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo - responsive */}
            <div className="flex-shrink-0 ml-14">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <img 
                   src="/logo.png" 
                    alt="TuCatalogo" 
                    className="h-32 w-auto scale-125 sm:scale-150 lg:scale-175 transition-transform duration-300 group-hover:scale-190"
                  />
                  <div className="absolute inset-0 bg-violet-400 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Buscador desktop */}
            <div className="flex-1 max-w-4xl mx-4 hidden lg:block">
              <ProductSearch />
            </div>

            {/* Controles de la derecha - solo en móvil */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:hidden">
              {/* Indicador de estado - oculto en móvil */}
              <div className="hidden sm:flex items-center space-x-2 bg-violet-800/30 rounded-full px-2 sm:px-3 py-1 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-violet-200 text-xs font-medium">En línea</span>
              </div>
              
              {/* Botón hamburguesa */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-violet-200 transition-colors duration-300 p-2 rounded-full bg-violet-800/30"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Navegación desktop */}
          <div className="hidden lg:flex items-center justify-between py-3 border-t border-violet-800/30 px-6">
            {/* Categorías */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="text-white hover:text-violet-200 transition-colors duration-300 font-bold text-lg flex items-center">
                <Menu className="mr-2 size-6" />
                Categorías
              </button>
              
              <div className="absolute top-full left-0 pt-2">
                <CategoriesDropdown 
                  isOpen={isCategoriesOpen}
                  onClose={() => setIsCategoriesOpen(false)}
                />
              </div>
            </div>
            
            {/* Navegación central */}
            <nav className="flex items-center space-x-12">
              <Link 
                href="/" 
                className="text-white hover:text-violet-200 transition-colors duration-300 font-bold text-lg underline underline-offset-4"
              >
                Inicio
              </Link>
              
              <Link 
                href="/#destacados" 
                className="text-white hover:text-violet-200 transition-colors duration-300 font-bold text-lg"
              >
                Destacados
              </Link>
            </nav>
            
            {/* Mi Lista a la derecha - desktop */}
            <div className="flex items-center">
              <button
                onClick={() => setIsShoppingListOpen(true)}
                className="text-white hover:text-violet-200 transition-colors duration-300 font-bold text-lg flex items-center gap-2"
                title="Mi Lista de Compra"
              >
                <ShoppingBag size={20} />
                Mi Lista ({itemCount})
              </button>
            </div>
          </div>

          {/* Buscador móvil */}
          <div className="lg:hidden pb-3 px-2">
            <ProductSearch />
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-violet-800/95 backdrop-blur-sm border-t border-violet-700">
            <div className="px-4 py-4 space-y-1">
              {/* Navegación principal */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 text-white hover:bg-violet-700/50 rounded-lg transition-colors font-medium"
              >
                <Home className="mr-3" size={20} />
                Inicio
              </Link>
              
              <Link
                href="/#destacados"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 text-white hover:bg-violet-700/50 rounded-lg transition-colors font-medium"
              >
                <Star className="mr-3" size={20} />
                Destacados
              </Link>
              
              {/* Mi Lista móvil */}
              <button
                onClick={() => {
                  setIsShoppingListOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center px-4 py-3 text-white hover:bg-violet-700/50 rounded-lg transition-colors font-medium"
              >
                <ShoppingBag className="mr-3" size={20} />
                Mi Lista ({itemCount})
              </button>
              
              {/* Categorías móvil */}
              <button
                onClick={() => {
                  setIsCategoriesOpen(!isCategoriesOpen)
                }}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-violet-700/50 rounded-lg transition-colors font-medium"
              >
                <div className="flex items-center">
                  <Menu className="mr-3" size={20} />
                  Categorías
                </div>
                <span className={`transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {/* Dropdown de categorías móvil */}
              {isCategoriesOpen && (
                <div className="pl-8 pb-2">
                  <CategoriesDropdown 
                    isOpen={true}
                    onClose={() => {
                      setIsCategoriesOpen(false)
                      setIsMobileMenuOpen(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de Mi Lista */}
      <ShoppingListModal 
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
      />
    </>
  )
} 