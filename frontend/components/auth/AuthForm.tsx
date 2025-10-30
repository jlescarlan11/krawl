'use client';

import { useMemo, useState } from 'react';
import { LuMail, LuLock, LuEye, LuEyeOff, LuUser, LuCheck } from 'react-icons/lu';

/**
 * Supported field input types for the generic AuthForm.
 */
type FieldType = 'text' | 'email' | 'password' | 'checkbox';

/**
 * Generic field configuration for AuthForm.
 * @template TValues - The shape of the form values object (e.g., { email: string; password: string })
 * @property name - Key in TValues this field binds to
 * @property label - Optional visible label for the field
 * @property type - Input type to render (text, email, password, checkbox)
 * @property placeholder - Optional input placeholder text
 * @property autoComplete - Native autocomplete hint (e.g., "email", "new-password")
 * @property showToggle - When type is "password", show an eye icon to toggle visibility
 */
export type FieldConfig<TValues> = {
  name: keyof TValues & string;
  label?: string;
  type: FieldType;
  placeholder?: string;
  autoComplete?: string;
  showToggle?: boolean; // for password visibility toggle
  rightAccessory?: React.ReactNode; // renders at right for checkbox rows
  helperText?: React.ReactNode;
};

/**
 * Props for the reusable AuthForm component.
 * @template TValues - The shape of the form values object (e.g., { email: string; password: string })
 * @property title - Optional form title heading
 * @property initialValues - Initial values object matching TValues
 * @property fields - Array of field configs that renders the form UI
 * @property validate - Synchronous validator returning a map of field errors
 * @property onSubmit - Submit handler; can be async; AuthForm handles disabling while pending
 * @property submitLabel - Button label when not submitting
 * @property submittingLabel - Optional button label while submitting (defaults to `${submitLabel}...`)
 * @property secondaryRow - Optional area under fields (e.g., remember/forgot row)
 * @property footer - Optional footer (e.g., link to login/signup)
 */
export type AuthFormProps<TValues> = {
  title?: string;
  initialValues: TValues;
  fields: FieldConfig<TValues>[];
  validate: (values: TValues) => Partial<Record<keyof TValues & string, string>>;
  onSubmit: (values: TValues) => Promise<void> | void;
  submitLabel: string;
  submittingLabel?: string;       // optional label while submitting
  secondaryRow?: React.ReactNode; // e.g., remember + forgot
  footer?: React.ReactNode;       // e.g., link to signup
};

export default function AuthForm<TValues extends Record<string, any>>(props: AuthFormProps<TValues>) {
  const {
    title,
    initialValues,
    fields,
    validate,
    onSubmit,
    submitLabel,
    submittingLabel,
    secondaryRow,
    footer,
  } = props;

  const [values, setValues] = useState<TValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const errors = useMemo(() => validate(values), [values, validate]);
  const hasErrors = Object.keys(errors).length > 0;

  const setField = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [name]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(fields.map((f) => [f.name, true]));
    setTouched(allTouched);
    if (!hasErrors) {
      setSubmitting(true);
      try {
        await onSubmit(values);
      } catch {
        // Errors are typically surfaced by toasts in apiFetch; no-op here
      } finally {
        setSubmitting(false);
      }
    }
  };

  const renderIcon = (type: FieldType) => {
    if (type === 'email') return <LuMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />;
    if (type === 'password') return <LuLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />;
    if (type === 'text') return <LuUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />;
    return null;
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6 shadow-md md:p-8">
        {title ? <h2 className="mb-6 text-xl font-semibold text-neutral-800">{title}</h2> : null}
        <form onSubmit={handleSubmit} noValidate>
          {fields.map((f) => {
            const err = touched[f.name] && errors[f.name];
            const isValid = touched[f.name] && !errors[f.name];
            const isCheckbox = f.type === 'checkbox';
            const isPassword = f.type === 'password';
            const inputType = isPassword && show[f.name] ? 'text' : f.type;

           return (
              <div key={f.name} className={isCheckbox ? 'mb-6 mt-2' : 'mb-6'}>
                {!isCheckbox && f.label ? (
                  <label htmlFor={f.name} className="text-label text-neutral-700">
                    {f.label}
                  </label>
                ) : null}

                <div className={`relative ${!isCheckbox ? 'mt-2' : ''}`}>
                  {isCheckbox ? (
                    <div className="flex items-center justify-between">
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          id={f.name}
                          name={f.name}
                          type="checkbox"
                          checked={!!values[f.name]}
                          onChange={setField(f.name)}
                          onBlur={() => setTouched((t) => ({ ...t, [f.name]: true }))}
                          className="h-4 w-4 rounded border-neutral-300 text-verde-600 focus:ring-verde-600"
                          disabled={submitting}
                        />
                        <span className="text-sm text-neutral-600">{f.label}</span>
                      </label>
                      {f.rightAccessory ?? null}
                    </div>
                  ) : (
                    <>
                      {renderIcon(f.type)}
                      <input
                        id={f.name}
                        name={f.name}
                        type={inputType}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={values[f.name] ?? ''}
                        onChange={setField(f.name)}
                        onBlur={() => setTouched((t) => ({ ...t, [f.name]: true }))}
                        aria-invalid={!!err}
                        aria-describedby={`${f.name}-error`}
                        className={`w-full rounded-md border bg-white px-10 py-2 text-base text-neutral-800 placeholder-neutral-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-verde-600 ${err ? 'border-error' : isValid ? 'border-verde-600' : 'border-neutral-300'}`}
                        disabled={submitting}
                      />
                      {isValid && !isPassword ? (
                        <LuCheck
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-verde-700"
                          size={18}
                        />
                      ) : null}
                      {isPassword && f.showToggle ? (
                        <button
                          type="button"
                          onClick={() => setShow((s) => ({ ...s, [f.name]: !s[f.name] }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                          aria-label={show[f.name] ? 'Hide password' : 'Show password'}
                          disabled={submitting}
                        >
                          {show[f.name] ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                        </button>
                      ) : null}
                    </>
                  )}
                </div>

                {err ? (
                  <p id={`${f.name}-error`} className="mt-2 text-xs text-error">
                    {errors[f.name]}
                  </p>
                ) : f.helperText ? (
                  <p id={`${f.name}-helper`} className="mt-2 text-xs text-neutral-500">
                    {f.helperText}
                  </p>
                ) : null}
              </div>
            );
          })}

          {secondaryRow ? <div className="mb-6 mt-2 flex items-center justify-between">{secondaryRow}</div> : null}

          <button
            type="submit"
            disabled={hasErrors || submitting}
            aria-busy={submitting}
            className="w-full rounded-md bg-verde-700 px-4 py-3 text-center text-white shadow-md transition-colors hover:bg-verde-800 focus:outline-none focus:ring-2 focus:ring-verde-600 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {submitting ? (submittingLabel ?? `${submitLabel}...`) : submitLabel}
          </button>

          {footer ? <div className="mt-6 text-center">{footer}</div> : null}
        </form>
      </div>
    </div>
  );
}
