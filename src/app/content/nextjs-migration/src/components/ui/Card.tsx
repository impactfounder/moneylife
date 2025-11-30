import React from 'react'
import type { CardProps } from '@/types'

export function Card({
  children,
  className = '',
  title,
  subtitle,
}: CardProps) {
  return (
    <div className={`card p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {children}
    </div>
  )
}
