interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  children,
  className,
}: SectionWrapperProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}