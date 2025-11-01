# Signup Forms Documentation

## Overview

There are two signup form implementations in the codebase:

1. **`SignupForm.tsx`** - Uses the `AuthForm` component pattern (recommended)
2. **`SignupFormRHF.tsx`** - Uses `react-hook-form` directly with additional features

## Current Status

**Neither form is currently used in the application.**

The actual signup flow uses:
- **`RegisterVerifyForm.tsx`** - The primary signup form that sends a verification email first
- Used in `/signup` and `/register-start` routes

## Differences

### SignupForm.tsx (AuthForm Pattern)
- ✅ Follows the recommended `AuthForm` pattern
- ✅ Uses centralized validation via Zod schemas
- ✅ Consistent with other auth forms (LoginForm, etc.)
- ✅ Simpler, more maintainable code
- ❌ Lacks password strength indicator
- ❌ No "send verification link instead" option

### SignupFormRHF.tsx (React Hook Form)
- ✅ Has `PasswordStrength` component integration
- ✅ Includes "Send verification link instead" button (routes to `/register-start`)
- ✅ More detailed form styling
- ❌ Doesn't follow the `AuthForm` pattern
- ❌ Duplicates form logic already in `AuthForm`
- ❌ More code to maintain

## Recommendation

### Option 1: Enhance SignupForm.tsx (Recommended)
Add the missing features from `SignupFormRHF.tsx` to `SignupForm.tsx`:
1. Add `PasswordStrength` component support to `AuthForm`
2. Add optional "secondary action" prop for "Send verification link instead"
3. Remove `SignupFormRHF.tsx` after migration

### Option 2: Keep Both (If Needed)
If you need both implementations for different use cases:
1. Document when to use each
2. Consider renaming to indicate their purpose
3. Ensure they both stay in sync with validation schemas

### Option 3: Remove SignupFormRHF.tsx
Since neither form is currently used and `RegisterVerifyForm` handles signup:
1. Remove `SignupFormRHF.tsx`
2. Keep `SignupForm.tsx` for potential future use (direct signup without email verification)

## Implementation Notes

If you want to add password strength to `AuthForm`:

```tsx
// In AuthForm.tsx, add optional passwordStrength prop
export type AuthFormProps<TValues> = {
  // ... existing props
  showPasswordStrength?: boolean; // Show PasswordStrength for password fields
  secondaryAction?: { label: string; onClick: () => void }; // For "Send verification link instead"
};
```

Then use it in `SignupForm.tsx`:

```tsx
<AuthForm<SignupFormValues>
  // ... existing props
  showPasswordStrength={true}
  secondaryAction={{
    label: "Send verification link instead",
    onClick: () => router.push(`/register-start?username=${username}&email=${email}`)
  }}
/>
```

---

*Last updated: 2024-12-19*

