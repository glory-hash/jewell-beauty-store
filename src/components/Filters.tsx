import { useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '../types'

interface FiltersProps {
  products: Product[]
  onPriceChange: (min: number, max: number) => void
}

export default function Filters({ products, onPriceChange }: FiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [priceRange, setPriceRange] = useState({ min: '0', max: '100000' })

  // Valeurs min/max globales
  const allPrices = products.map(p => p.price)
  const globalMin = Math.min(...allPrices)
  const globalMax = Math.max(...allPrices)

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newRange = { ...priceRange, [name]: value }
    setPriceRange(newRange)
    onPriceChange(Number(newRange.min), Number(newRange.max))
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      searchParams.set('q', value)
    } else {
      searchParams.delete('q')
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="space-y-6">
      {/* Recherche */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-luxury-black">
          Rechercher
        </label>
        <input
          type="search"
          id="search"
          placeholder="Nom du produit..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                   focus:border-luxury-gold focus:ring-luxury-gold sm:text-sm"
          value={searchParams.get('q') || ''}
          onChange={handleSearch}
        />
      </div>

      {/* Filtres de prix */}
      <div>
        <h3 className="text-sm font-medium text-luxury-black">Prix</h3>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min" className="block text-xs text-gray-500">
              Min
            </label>
            <input
              type="number"
              id="min"
              name="min"
              min={globalMin}
              max={globalMax}
              value={priceRange.min}
              onChange={handlePriceChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                     focus:border-luxury-gold focus:ring-luxury-gold sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="max" className="block text-xs text-gray-500">
              Max
            </label>
            <input
              type="number"
              id="max"
              name="max"
              min={globalMin}
              max={globalMax}
              value={priceRange.max}
              onChange={handlePriceChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                     focus:border-luxury-gold focus:ring-luxury-gold sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
