export default function Section({
    title,
    children,
    className = "",
  }: {
    title?: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {title}
            </h2>
          )}
          {children}
        </div>
      </section>
    );
  }