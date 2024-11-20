import { describe, it, expect } from 'vitest'
import { cn } from '../index'

// testing done by AI

describe('cn utility', () => {
  it('should merge basic classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo bar', 'baz')).toBe('foo bar baz')
  })

  it('should handle conditional classes via objects', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar')
    expect(cn('foo', { bar: false, baz: true })).toBe('foo baz')
  })

  it('should handle arrays of classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz')
  })

  it('should handle falsy values', () => {
    expect(cn('foo', null, undefined, false, 'bar')).toBe('foo bar')
    expect(cn('foo', 0, '', 'bar')).toBe('foo bar')
  })

  it('should merge Tailwind classes correctly', () => {
    // Basic utility merging
    expect(cn('px-2 py-1', 'px-3')).toBe('py-1 px-3')
    
    // Responsive variants
    expect(cn('sm:px-2', 'sm:px-3')).toBe('sm:px-3')
    
    // Color and opacity utilities
    expect(cn('text-blue-500', 'text-red-500')).toBe('text-red-500')
    
    // Arbitrary values
    expect(cn('grid-cols-[1fr,2fr]', 'grid-cols-[1fr,1fr]')).toBe('grid-cols-[1fr,1fr]')
  })

  it('should handle complex combinations', () => {
    const result = cn(
      'base-class',
      {
        'conditional-true': true,
        'conditional-false': false
      },
      ['array-item-1', 'array-item-2'],
      undefined,
      null,
      'tailwind-class',
      'md:flex md:items-center',
      'md:flex-col'
    )

    // Split the result into parts and check each part exists
    const parts = [
      'base-class',
      'conditional-true',
      'array-item-1',
      'array-item-2',
      'tailwind-class',
      'md:flex',
      'md:items-center',
      'md:flex-col'
    ]

    parts.forEach(part => {
      expect(result).toContain(part)
    })
  })

  it('should handle nested arrays and objects', () => {
    expect(cn(
      'foo',
      [
        'bar',
        { baz: true, qux: false },
        ['nested-1', 'nested-2']
      ],
      { 'complex-true': true }
    )).toBe('foo bar baz nested-1 nested-2 complex-true')
  })

  it('should properly merge conflicting Tailwind classes', () => {
    // Padding conflicts
    expect(cn('p-4 px-2', 'p-3')).toBe('p-3')
    expect(cn('p-4 px-2', 'px-3')).toBe('p-4 px-3')

    // Margin conflicts
    expect(cn('m-4 mx-2', 'm-3')).toBe('m-3')
    expect(cn('m-4 mx-2', 'mx-3')).toBe('m-4 mx-3')

    // Color conflicts
    const colorResult = cn('text-red-500 text-opacity-50', 'text-blue-500')
    expect(colorResult).toContain('text-blue-500')
    expect(colorResult).toContain('text-opacity-50')

    const bgResult = cn('bg-red-500 bg-opacity-50', 'bg-blue-500')
    expect(bgResult).toContain('bg-blue-500')
    expect(bgResult).toContain('bg-opacity-50')

    // Display and layout conflicts
    const displayResult = cn('flex flex-col', 'grid')
    expect(displayResult).toContain('flex-col')
    expect(displayResult).toContain('grid')

    // Grid columns
    expect(cn('grid-cols-2', 'grid-cols-3')).toBe('grid-cols-3')
  })
})
