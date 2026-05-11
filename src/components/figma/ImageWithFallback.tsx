import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  useEffect(() => {
    setDidError(false)
  }, [props.src])

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, width, height, sizes, loading, decoding } = props
  const numericWidth = typeof width === 'number' ? width : width ? Number(width) : undefined
  const numericHeight = typeof height === 'number' ? height : height ? Number(height) : undefined
  const resolved = useMemo(() => {
    const input = typeof src === 'string' ? src.trim() : ''
    if (!input) return ERROR_IMG_SRC
    return didError ? ERROR_IMG_SRC : input
  }, [didError, src])
  const resolvedAlt = typeof alt === 'string' && alt.trim() ? alt : ''
  const resolvedSizes = typeof sizes === 'string' && sizes.trim() ? sizes : '100vw'
  const resolvedStyle: React.CSSProperties | undefined =
    numericWidth && numericHeight ? style : { ...(style || {}), width: '100%', height: '100%' }

  return (
    <Image
      src={resolved}
      alt={didError ? 'Error loading image' : resolvedAlt}
      width={numericWidth || 1}
      height={numericHeight || 1}
      sizes={resolvedSizes}
      className={className}
      style={resolvedStyle}
      unoptimized
      onError={handleError}
      loading={loading as any}
      decoding={decoding as any}
    />
  )
}
