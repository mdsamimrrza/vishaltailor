import type { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  webpSrc?: string;
  placeholderSrc?: string;
}

export function OptimizedImage({ src, webpSrc, placeholderSrc, alt, loading = "lazy", fetchPriority, ...props }: OptimizedImageProps) {
  const effectiveWebp = webpSrc;

  return (
    <picture>
      {effectiveWebp ? <source srcSet={effectiveWebp} type="image/webp" /> : null}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        {...props}
        style={{
          ...(placeholderSrc ? { backgroundImage: `url(${placeholderSrc})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
          ...(props.style ?? {}),
        }}
      />
    </picture>
  );
}
