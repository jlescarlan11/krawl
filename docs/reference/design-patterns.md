# Design Patterns: Krawl

> **Purpose:** Layout patterns, responsive behavior, and interaction guidelines for the Krawl PWA.

**Version:** 2.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active

---

## Layout Patterns

### Map View Layout

**Structure:**
```
┌─────────────────────────────┐
│         Header              │
├─────────────────────────────┤
│      Search Bar             │
├─────────────────────────────┤
│                             │
│                             │
│        Map Canvas           │
│     (Full width/height)     │
│                             │
│         [FAB +]             │
├─────────────────────────────┤
│    Bottom Navigation        │
└─────────────────────────────┘
```

**Key Features:**
- Map takes maximum available space
- Header: Fixed, minimal height
- Search: Absolute positioned over map
- FAB: Fixed bottom-right (above nav)
- Bottom Nav: Fixed, always visible

---

### List/Grid View Pattern

**Responsive Behavior:**

**Mobile (< 768px):** Single column list
```tsx
<div className="space-y-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

**Tablet (768px - 1024px):** 2-column grid
```tsx
<div className="grid grid-cols-2 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

**Desktop (> 1024px):** 3-column grid
```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

### Detail View Pattern

**Mobile:** Full-screen bottom drawer
- Slides up from bottom
- Draggable handle
- Can be dismissed by swipe down

**Desktop:** Side panel (40% width) or centered modal
- Map stays visible (60%)
- Panel overlays map
- Close with X button or ESC key

---

### Form Layout Pattern

**Standard Form:**
```tsx
<form className="space-y-4 max-w-md mx-auto">
  <div>
    <label className="block text-sm font-medium mb-1">Name</label>
    <input className="w-full" />
  </div>
  <div>
    <label className="block text-sm font-medium mb-1">Description</label>
    <textarea className="w-full" />
  </div>
  <div className="flex justify-end space-x-3">
    <button type="button">Cancel</button>
    <button type="submit">Submit</button>
  </div>
</form>
```

**Multi-step Form:**
- Progress indicator at top
- One step visible at a time
- Previous/Next navigation at bottom
- Can save and resume later

---

## Responsive Design

### Breakpoint Strategy

| Screen Size | Approach | Navigation |
|-------------|----------|------------|
| Mobile (< 768px) | Stack vertically | Bottom tabs |
| Tablet (768-1024px) | Hybrid (grid + stacked) | Bottom tabs or side nav |
| Desktop (> 1024px) | Multi-column layouts | Top nav or side nav |

### Container Widths

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Content */}
</div>
```

**Padding by breakpoint:**
- Mobile: 16px (px-4)
- Tablet: 24px (sm:px-6)
- Desktop: 32px (lg:px-8)

---

### Typography Scaling

**Responsive font sizes:**

```tsx
/* Headings scale up on larger screens */
<h1 className="text-2xl sm:text-3xl lg:text-4xl">Page Title</h1>
<h2 className="text-xl sm:text-2xl lg:text-3xl">Section Title</h2>

/* Body text remains consistent */
<p className="text-base">Body content...</p>
```

---

## Interaction Patterns

### Click/Tap Targets

**Minimum size:** 44px × 44px (mobile)

```tsx
/* Good: Large enough tap target */
<button className="p-3 min-h-[44px] min-w-[44px]">
  <Icon className="w-5 h-5" />
</button>

/* Bad: Too small */
<button className="p-1">
  <Icon className="w-3 h-3" />
</button>
```

---

### Hover & Active States

**Standard pattern:**

```tsx
<button className="
  bg-verde-500
  hover:bg-verde-600
  active:bg-verde-700
  active:scale-95
  transition-all duration-150
">
  Click me
</button>
```

**Card hover:**
```tsx
<div className="
  shadow-sm
  hover:shadow-md
  hover:-translate-y-1
  transition-all duration-200
  cursor-pointer
">
  Card content
</div>
```

---

### Loading States

**Button loading:**
```tsx
<button disabled className="relative">
  <span className={loading ? 'opacity-0' : ''}>Submit</span>
  {loading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner />
    </div>
  )}
</button>
```

**Content loading:**
```tsx
{loading ? (
  <SkeletonLoader />
) : (
  <Content data={data} />
)}
```

---

### Empty States

**Pattern:**
```tsx
<div className="text-center py-12">
  <EmptyStateIcon className="w-16 h-16 mx-auto text-neutral-400 mb-4" />
  <h3 className="text-lg font-semibold text-neutral-700 mb-2">No gems yet</h3>
  <p className="text-neutral-500 mb-6">Start exploring by pinning your first gem!</p>
  <button className="bg-verde-500 text-white px-4 py-2 rounded">
    Pin a Gem
  </button>
</div>
```

---

### Error States

**Form field error:**
```tsx
<div>
  <input className={error ? 'border-error' : 'border-neutral-300'} />
  {error && <p className="text-error text-sm mt-1">{error.message}</p>}
</div>
```

**Page-level error:**
```tsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
  <XCircleIcon className="w-5 h-5 text-error flex-shrink-0" />
  <div>
    <h4 className="font-medium text-error">Error loading data</h4>
    <p className="text-sm text-red-700 mt-1">{error.message}</p>
    <button onClick={retry} className="text-sm text-error underline mt-2">
      Try again
    </button>
  </div>
</div>
```

---

## Navigation Patterns

### Bottom Navigation (Mobile)

**Best Practices:**
- 3-5 primary tabs
- Active state clearly visible
- Icons + labels for clarity
- Fixed position

**Code:**
```tsx
<nav className="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 safe-area-inset-bottom">
  <div className="flex justify-around py-2">
    {tabs.map(tab => (
      <Link
        key={tab.id}
        href={tab.href}
        className={`flex flex-col items-center space-y-1 px-3 py-1 ${
          isActive(tab) ? 'text-verde-500' : 'text-neutral-500'
        }`}
      >
        <tab.Icon className="w-6 h-6" />
        <span className="text-xs">{tab.label}</span>
      </Link>
    ))}
  </div>
</nav>
```

---

### Side Navigation (Desktop)

**Structure:**
```
┌──────────────┬─────────────────────────────┐
│              │                             │
│              │                             │
│   Sidebar    │        Main Content         │
│   (240px)    │          (flex-1)           │
│              │                             │
│              │                             │
└──────────────┴─────────────────────────────┘
```

---

### Breadcrumbs

**Usage:** Show navigation hierarchy.

```tsx
<nav className="flex items-center space-x-2 text-sm text-neutral-600">
  <Link href="/" className="hover:text-verde-600">Home</Link>
  <ChevronRightIcon className="w-4 h-4" />
  <Link href="/krawls" className="hover:text-verde-600">Krawls</Link>
  <ChevronRightIcon className="w-4 h-4" />
  <span className="text-neutral-900">Foodie's Night Out</span>
</nav>
```

---

## Modal & Overlay Patterns

### Modal Behavior

**Opening:**
- Fade in backdrop (200ms)
- Scale in modal (200ms)
- Focus trapped within modal
- Background content inert

**Closing:**
- Click backdrop
- Press ESC key
- Click close button
- Complete action (submit/cancel)

---

### Drawer Behavior (Mobile)

**Opening:**
- Slides up from bottom
- Can be partially or fully open
- Draggable handle at top

**Closing:**
- Swipe down gesture
- Tap backdrop
- Press close button

---

## Feedback Patterns

### Toast Notifications

**Position:** Top-right corner (desktop), top-center (mobile)

**Duration:**
- Success: 3 seconds
- Info: 4 seconds
- Warning: 5 seconds
- Error: Persistent until dismissed

**Code:**
```tsx
<Toast type="success">
  <CheckCircleIcon className="w-5 h-5" />
  <span>Gem pinned successfully!</span>
</Toast>
```

---

### Inline Validation

**Real-time validation pattern:**

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value) => {
  if (!value) {
    setEmailError('Email is required');
  } else if (!isValidEmail(value)) {
    setEmailError('Invalid email format');
  } else {
    setEmailError('');
  }
};

return (
  <div>
    <input
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }}
      className={emailError ? 'border-error' : ''}
    />
    {emailError && <p className="text-error text-sm">{emailError}</p>}
  </div>
);
```

---

### Confirmation Dialogs

**Usage:** Before destructive actions (delete, etc.).

```tsx
<Dialog>
  <Dialog.Title>Delete Gem?</Dialog.Title>
  <Dialog.Description>
    This action cannot be undone. The gem will be permanently removed.
  </Dialog.Description>
  
  <div className="flex justify-end space-x-3 mt-6">
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onConfirm} className="bg-error text-white">
      Delete
    </button>
  </div>
</Dialog>
```

---

## Accessibility Patterns

### Keyboard Navigation

**Tab order:**
1. Skip to main content link
2. Header elements
3. Main content (interactive elements)
4. Footer elements

**Shortcuts:**
- `Tab` - Next element
- `Shift+Tab` - Previous element
- `Enter` or `Space` - Activate button/link
- `ESC` - Close modal/drawer
- `/` - Focus search (common pattern)

---

### Screen Reader Support

**Semantic HTML:**
```tsx
<header>
  <nav aria-label="Main navigation">
    {/* Navigation links */}
  </nav>
</header>

<main>
  <h1>Page Title</h1>
  {/* Main content */}
</main>

<footer>
  {/* Footer content */}
</footer>
```

**ARIA labels:**
```tsx
<button aria-label="Add new gem">
  <PlusIcon />
</button>

<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

---

### Focus Management

**Modal opened:**
```tsx
useEffect(() => {
  if (isOpen) {
    // Save current focus
    previousFocus.current = document.activeElement;
    
    // Focus first element in modal
    firstFocusableElement.current?.focus();
  } else {
    // Restore previous focus
    previousFocus.current?.focus();
  }
}, [isOpen]);
```

---

## Animation Guidelines

### Timing

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Micro-interactions (hover) | 150ms | Ease-out |
| UI transitions (modal) | 200ms | Ease-in-out |
| Page transitions | 300ms | Ease-in-out |
| Complex animations | 400-500ms | Custom curve |

### Motion Principles

**✅ Do:**
- Use subtle motion
- Animate functional purpose (feedback, attention)
- Respect `prefers-reduced-motion`

**❌ Don't:**
- Gratuitous motion
- Slow, distracting animations
- Motion that causes nausea

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Patterns

### Image Optimization

```tsx
<Image
  src={gem.photoUrl}
  alt={gem.name}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL={gem.thumbnailUrl}
  loading="lazy"
/>
```

### Lazy Loading

**Components:**
```tsx
const KrawlBuilder = lazy(() => import('@/components/KrawlBuilder'));

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <KrawlBuilder />
    </Suspense>
  );
}
```

**Images:**
```tsx
<img loading="lazy" src={url} alt={alt} />
```

---

## Best Practices

### Layout

✅ **Do:**
- Use semantic HTML
- Maintain consistent spacing
- Apply responsive breakpoints
- Test on real devices

❌ **Don't:**
- Use fixed pixel widths
- Nest too many levels deep
- Forget mobile-first approach

### Interactions

✅ **Do:**
- Provide immediate feedback
- Show loading states
- Handle errors gracefully
- Support keyboard navigation

❌ **Don't:**
- Block UI without indication
- Hide errors
- Rely only on mouse/touch
- Forget disabled states

---

## 📚 Related Documents

- [Design Tokens](./design-tokens.md) - Foundation elements
- [Design Components](./design-components.md) - UI components
- [Wireframes](../design/wireframes/README.md) - Visual layouts
- [Brand Guidelines](./brand-guidelines.md) - Voice and style

---

*Design patterns maintained by Design & Development Team • Last reviewed: 2025-10-31*

