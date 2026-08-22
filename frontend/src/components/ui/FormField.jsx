export default function FormField({
  label,
  required = false,
  hint,
  children
}) {
  return (
    <div>
      <label className="gov-label">
        {label} {required && <span className="text-red-700">*</span>}
      </label>

      {children}

      {hint && (
        <p className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
