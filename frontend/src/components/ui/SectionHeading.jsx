export default function SectionHeading({
  eyebrow,
  title,
  description
}) {
  return (
    <div className="mb-6">
      {eyebrow && <div className="gov-eyebrow mb-2">{eyebrow}</div>}
      <h2 className="gov-section-title">{title}</h2>
      {description && (
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}
