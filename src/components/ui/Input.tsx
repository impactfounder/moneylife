import React from 'react'
import type { InputProps } from '@/types'

export function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  unit,
  required = false,
  min,
  max,
  step,
  helpText,
  error,
}: Partial<InputProps> & { onChange: (value: string) => void; value: string | number }) { 
  // InputProps를 Partial로 만들고 필수값만 재정의하여 유연성 확보

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2">
          <span className="text-gray-700 font-semibold flex items-center gap-1">
            {label}
            {required && <span className="text-danger">*</span>}
          </span>
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`input-base ${error ? 'border-danger focus:ring-danger' : ''} ${
            unit ? 'pr-12' : ''
          }`}
        />
        
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {unit}
          </span>
        )}
      </div>
      
      {helpText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1.5 text-sm text-danger">{error}</p>
      )}
    </div>
  )
}