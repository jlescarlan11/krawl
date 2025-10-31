# Design Components: Krawl

> **Purpose:** UI component specifications for the Krawl design system, including buttons, forms, cards, and interactive elements.

**Version:** 2.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active

---

## Quick Reference

| Component | Implementation | File Location |
|-----------|----------------|---------------|
| Buttons | React components | `frontend/src/components/ui/` |
| Forms | React Hook Form + Zod | `frontend/src/components/forms/` |
| Cards | Reusable components | `frontend/src/components/cards/` |
| Modals | Headless UI | `frontend/src/components/modals/` |

---

## Buttons

### Primary Button

**Usage:** Main call-to-action, primary actions.

**Appearance:**
- Background: `verde-500`
- Text: White
- Padding: `px-4 py-2`
- Border radius: `rounded`
- Hover: `verde-600`

**Code:**
```tsx
<button className="bg-verde-500 hover:bg-verde-600 text-white font-medium px-4 py-2 rounded transition-colors">
  Pin Gem
</button>
```

---

### Secondary Button

**Usage:** Secondary actions, cancel buttons.

**Appearance:**
- Background: `neutral-100`
- Text: `neutral-700`
- Border: `1px solid neutral-300`
- Hover: `neutral-200`

**Code:**
```tsx
<button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium px-4 py-2 rounded border border-neutral-300">
  Cancel
</button>
```

---

### Ghost Button

**Usage:** Tertiary actions, less emphasis.

**Code:**
```tsx
<button className="text-verde-600 hover:bg-verde-50 font-medium px-4 py-2 rounded">
  Learn More
</button>
```

---

### Icon Button

**Usage:** Icon-only actions (close, menu, etc.).

**Code:**
```tsx
<button className="p-2 hover:bg-neutral-100 rounded-full">
  <XMarkIcon className="w-5 h-5" />
</button>
```

---

### Button States

| State | Appearance | Class Modifiers |
|-------|------------|-----------------|
| Default | Full opacity | - |
| Hover | Darker background | `hover:bg-verde-600` |
| Active | Pressed appearance | `active:scale-95` |
| Disabled | 50% opacity | `disabled:opacity-50 disabled:cursor-not-allowed` |
| Loading | Spinner + disabled | `opacity-70` + spinner |

---

### Floating Action Button (FAB)

**Usage:** Primary action on map view (+ Add Gem).

**Appearance:**
- Size: 56px × 56px
- Background: `verde-500`
- Icon: Plus sign (white)
- Shadow: `shadow-lg`
- Position: Fixed bottom-right

**Code:**
```tsx
<button className="fixed bottom-20 right-4 w-14 h-14 bg-verde-500 hover:bg-verde-600 rounded-full shadow-lg flex items-center justify-center">
  <PlusIcon className="w-6 h-6 text-white" />
</button>
```

---

## Form Elements

### Text Input

**Appearance:**
- Border: `1px solid neutral-300`
- Padding: `px-3 py-2`
- Border radius: `rounded`
- Focus: Blue ring (`ring-2 ring-verde-500`)

**Code:**
```tsx
<input 
  type="text"
  className="w-full px-3 py-2 border border-neutral-300 rounded focus:ring-2 focus:ring-verde-500 focus:border-transparent"
  placeholder="Enter gem name..."
/>
```

---

### Textarea

**Code:**
```tsx
<textarea 
  className="w-full px-3 py-2 border border-neutral-300 rounded focus:ring-2 focus:ring-verde-500 resize-none"
  rows={4}
  placeholder="Describe your gem..."
/>
```

---

### Select Dropdown

**Code:**
```tsx
<select className="w-full px-3 py-2 border border-neutral-300 rounded focus:ring-2 focus:ring-verde-500">
  <option>Select category...</option>
  <option>Food & Drinks</option>
  <option>Nature & Parks</option>
</select>
```

---

### Checkbox

**Code:**
```tsx
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="checkbox" className="w-4 h-4 text-verde-500 rounded focus:ring-verde-500" />
  <span className="text-sm">I agree to terms</span>
</label>
```

---

### Radio Button

**Code:**
```tsx
<label className="flex items-center space-x-2 cursor-pointer">
  <input type="radio" name="visibility" className="w-4 h-4 text-verde-500 focus:ring-verde-500" />
  <span className="text-sm">Public</span>
</label>
```

---

### Toggle Switch

**Code:**
```tsx
<button 
  role="switch"
  aria-checked={enabled}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-verde-500' : 'bg-neutral-300'}`}
>
  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
</button>
```

---

### Search Input

**Code:**
```tsx
<div className="relative">
  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
  <input 
    type="search"
    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-full focus:ring-2 focus:ring-verde-500"
    placeholder="Search gems..."
  />
</div>
```

---

## Cards

### Basic Card

**Usage:** Container for grouped content.

**Code:**
```tsx
<div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-neutral-600">Card content...</p>
</div>
```

---

### Gem Card

**Usage:** Display Gem in list/grid views.

**Structure:**
- Image (if available)
- Name
- Rating + vouch count
- Distance (if relevant)
- Tags

**Code:**
```tsx
<div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
  <img src={gem.photoUrl} alt={gem.name} className="w-full h-40 object-cover" />
  <div className="p-4">
    <h3 className="font-semibold text-lg mb-1">{gem.name}</h3>
    <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-2">
      <div className="flex items-center">
        <StarIcon className="w-4 h-4 text-mango-400 fill-current" />
        <span className="ml-1">{gem.averageRating}</span>
      </div>
      <span>•</span>
      <span>{gem.vouchCount} vouches</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {gem.tags.map(tag => (
        <span key={tag} className="px-2 py-1 bg-verde-50 text-verde-700 text-xs rounded-full">
          {tag}
        </span>
      ))}
    </div>
  </div>
</div>
```

---

### Krawl Card

**Usage:** Display Krawl in discover/list views.

**Structure:**
- Title
- Creator info
- Stats (stops, rating)
- Preview map/route

**Code:**
```tsx
<div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200 hover:shadow-md transition-shadow cursor-pointer">
  <h3 className="font-semibold text-lg mb-2">{krawl.title}</h3>
  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{krawl.description}</p>
  <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-3">
    <span>🚶 {krawl.stopCount} stops</span>
    <span>⭐ {krawl.averageRating}</span>
    <span>by @{krawl.creatorUsername}</span>
  </div>
</div>
```

---

## Badges & Pills

### Status Badge

**Usage:** Gem lifecycle status, approval status.

| Status | Color | Example |
|--------|-------|---------|
| Open | `verde-500` | <code>bg-verde-100 text-verde-700</code> |
| Closed | `neutral-500` | <code>bg-neutral-100 text-neutral-700</code> |
| Pending | `warning` | <code>bg-mango-100 text-mango-700</code> |
| Flagged | `error` | <code>bg-red-100 text-red-700</code> |

**Code:**
```tsx
<span className="px-2 py-1 bg-verde-100 text-verde-700 text-xs font-medium rounded-full">
  Open
</span>
```

---

### Tag Pill

**Usage:** Category tags for Gems.

**Code:**
```tsx
<span className="px-2 py-1 bg-sand-100 text-sand-800 text-xs rounded-full">
  Food & Drinks
</span>
```

---

## Modals & Overlays

### Modal Structure

**Code:**
```tsx
<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
  {/* Backdrop */}
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  
  {/* Modal */}
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <Dialog.Title className="text-lg font-semibold mb-4">
        Modal Title
      </Dialog.Title>
      
      <div className="mb-6">
        {/* Modal content */}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 text-neutral-700">Cancel</button>
        <button className="px-4 py-2 bg-verde-500 text-white rounded">Confirm</button>
      </div>
    </Dialog.Panel>
  </div>
</Dialog>
```

---

### Bottom Drawer (Mobile)

**Usage:** Gem details, add forms on mobile.

**Code:**
```tsx
<div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl max-h-[80vh] overflow-y-auto">
  <div className="p-4">
    {/* Drawer content */}
  </div>
</div>
```

---

### Toast Notification

**Usage:** Success/error feedback.

**Code:**
```tsx
<div className="fixed top-4 right-4 bg-verde-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
  <CheckCircleIcon className="w-5 h-5" />
  <span>Gem pinned successfully!</span>
</div>
```

---

## Navigation

### Bottom Navigation Bar

**Usage:** Primary navigation on mobile.

**Code:**
```tsx
<nav className="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 flex justify-around py-2">
  <button className="flex flex-col items-center space-y-1 text-verde-500">
    <MapIcon className="w-6 h-6" />
    <span className="text-xs">Map</span>
  </button>
  <button className="flex flex-col items-center space-y-1 text-neutral-500">
    <SparklesIcon className="w-6 h-6" />
    <span className="text-xs">Discover</span>
  </button>
  {/* More tabs... */}
</nav>
```

---

### Header

**Code:**
```tsx
<header className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
  <div className="flex items-center space-x-2">
    <img src="/logo.svg" alt="Krawl" className="w-8 h-8" />
    <span className="font-bold text-verde-600">Krawl</span>
  </div>
  <button className="p-2">
    <UserCircleIcon className="w-6 h-6 text-neutral-600" />
  </button>
</header>
```

---

## Loading States

### Skeleton Loader

**Usage:** Content placeholder while loading.

**Code:**
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
</div>
```

---

### Spinner

**Code:**
```tsx
<div className="inline-block w-5 h-5 border-2 border-neutral-300 border-t-verde-500 rounded-full animate-spin" />
```

---

## Icons

**Library:** Heroicons v2

**Size Guide:**
- `w-4 h-4` (16px) - Small, inline with text
- `w-5 h-5` (20px) - Default, buttons
- `w-6 h-6` (24px) - Large, standalone
- `w-8 h-8` (32px) - Extra large, featured

**Usage:**
```tsx
import { MapIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
```

---

## Accessibility

### Focus States

All interactive elements must have visible focus:

```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-verde-500 focus:ring-offset-2;
}
```

### ARIA Labels

```tsx
<button aria-label="Close modal">
  <XMarkIcon className="w-5 h-5" />
</button>
```

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Modal traps focus within
- Skip links for main content

---

## Best Practices

### Component Usage

✅ **Do:**
- Use semantic HTML (`<button>`, `<nav>`, `<header>`)
- Keep components focused and reusable
- Apply consistent spacing and sizing
- Include loading and error states

❌ **Don't:**
- Use `<div>` with `onClick` instead of `<button>`
- Inline styles (use Tailwind classes)
- Hardcode colors (use design tokens)
- Forget disabled states

---

## 📚 Related Documents

- [Design Tokens](./design-tokens.md) - Colors, typography, spacing
- [Design Patterns](./design-patterns.md) - Layout and interaction patterns
- [Brand Guidelines](./brand-guidelines.md) - Voice and style
- [Wireframes](../design/wireframes/README.md) - UI mockups

---

*Components maintained by Design & Development Team • Last reviewed: 2025-10-31*

