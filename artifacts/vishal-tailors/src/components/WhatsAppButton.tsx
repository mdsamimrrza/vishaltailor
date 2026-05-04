export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9779804833357"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 md:bottom-8 md:right-8"
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 md:block">
        Chat with us
      </span>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
        <path d="M20.52 3.48A11.58 11.58 0 0 0 12.07 0C5.41 0 .02 5.39.01 12.05c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6a11.94 11.94 0 0 0 5.95 1.52h.01c6.66 0 12.05-5.39 12.05-12.05 0-3.23-1.26-6.26-3.59-8.39Zm-8.45 18.5h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.62.95.97-3.53-.23-.36a9.86 9.86 0 0 1-1.52-5.23C2.25 6.62 6.78 2.1 12.06 2.1c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.28-4.53 10-10.88 10Zm5.96-7.76c-.34-.17-2.02-1-2.33-1.12-.31-.11-.53-.17-.75.17-.22.34-.86 1.12-1.05 1.35-.19.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.69-1-.89-1.68-1.99-1.88-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.41.51-.61.17-.2.23-.34.34-.57.11-.22.06-.42-.03-.59-.09-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.59.08-.9.42s-1.18 1.15-1.18 2.79 1.2 3.22 1.36 3.44c.17.22 2.36 3.6 5.72 5.05.8.35 1.42.56 1.91.72.8.25 1.53.21 2.11.13.64-.1 2.02-.83 2.31-1.64.29-.8.29-1.48.2-1.64-.08-.16-.31-.25-.65-.42Z" />
      </svg>
    </a>
  );
}