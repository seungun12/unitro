# Design System

## Design Philosophy
- **Minimalism**: Clean, uncluttered interfaces
- **Monochrome**: Using foreground/muted color palette exclusively
- **2025 Trends**: Modern typography, subtle animations, generous spacing
- **Professional**: Built for developers, not consumers

---

## Typography

### Font Weights
- **Bold**: Headings (font-bold)
- **Medium**: Badges, labels (font-medium)
- **Normal**: Default text
- **Light**: Body text, descriptions (font-light)

### Letter Spacing
- **Tighter**: Large headings (tracking-tighter)
- **Tight**: Card titles (tracking-tight)
- **Normal**: Default
- **Wide**: Small text, labels (tracking-wide)

### Line Heights
- **0.9**: Hero titles (leading-[0.9])
- **1.6**: Body text, descriptions (leading-[1.6])
- **Relaxed**: Default paragraphs (leading-relaxed)

### Text Sizes
```tsx
// Hero Section
h1: "text-7xl md:text-8xl"
p: "text-xl md:text-2xl"

// Page Headers
h1: "text-4xl"
p: "text-base" (centered, max-w-2xl)

// Card Content
title: "text-lg"
description: "text-sm"

// Small Text
badges: "text-sm"
labels: "text-sm"
```

---

## Colors

### Palette
```tsx
// Primary Colors
bg-foreground       // Main black/white
text-foreground     // Main text
text-muted-foreground // Secondary text

// Opacity Levels
/5   // Very subtle (icon backgrounds)
/10  // Subtle (hover states)
/20  // Visible (borders)
/30  // Moderate (backgrounds)
/40  // Medium (dots, indicators)
/50  // Half (overlays)
/70  // Strong (icons)
```

### Usage
- **Never use color gradients** for backgrounds (except subtle glow effects)
- **Use monochrome only**: foreground, muted-foreground, background, card
- **Opacity for depth**: Use /5, /10, /20 for layering

---

## Spacing

### Padding
```tsx
// Containers
pt-32 pb-24  // Hero sections
py-8         // Page sections
p-6          // Card content
p-12         // Footer CTA

// Inline
px-4 py-2    // Badges, buttons
px-4         // Containers
```

### Gaps
```tsx
gap-8   // Feature lists
gap-6   // Section spacing
gap-4   // Card grids
gap-2.5 // Inline elements
gap-2   // Tags, badges
```

### Margins
```tsx
mb-8    // Section titles
mb-12   // Hero text
mb-4    // Subtitles
mb-2    // Card titles
```

---

## Components

### Cards
```tsx
<Card className="
  h-full
  border
  hover:border-foreground/20
  transition-all duration-300
  hover:shadow-2xl
  hover:shadow-foreground/5
  bg-card/50
  backdrop-blur-sm
  group-hover:-translate-y-1
">
  <CardHeader className="space-y-4 p-6">
    {/* Icon Container */}
    <div className="p-2.5 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-all duration-300 group-hover:scale-110">
      <Icon className="h-5 w-5 text-foreground/70" strokeWidth={2} />
    </div>

    {/* Content */}
    <div>
      <CardTitle className="text-lg mb-2 group-hover:text-foreground transition-colors tracking-tight">
        Title
      </CardTitle>
      <CardDescription className="text-sm leading-[1.6] text-muted-foreground font-light">
        Description
      </CardDescription>
    </div>
  </CardHeader>
</Card>
```

### Badges
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 backdrop-blur-sm">
  <div className="h-2 w-2 rounded-full bg-foreground animate-pulse"></div>
  <span className="text-sm font-medium text-muted-foreground tracking-wide">
    Badge Text
  </span>
</div>
```

### Buttons/Tags
```tsx
<span className="px-4 py-2 rounded-lg border bg-background/50 text-muted-foreground backdrop-blur-sm font-light tracking-wide">
  Tag Text
</span>
```

### Icons
```tsx
// Tool cards
<Icon className="h-5 w-5 text-foreground/70" strokeWidth={2} />

// Arrows
<ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />

// Status indicators
<div className="h-2 w-2 rounded-full bg-foreground animate-pulse"></div>
<div className="h-1 w-1 rounded-full bg-foreground/40"></div>
```

---

## Effects

### Background Patterns
```tsx
// Grid Pattern
<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
```

### Glassmorphism
```tsx
backdrop-blur-sm  // Subtle blur
bg-card/50        // Semi-transparent background
```

### Glow Effects
```tsx
// Card hover glow
<div className="absolute -inset-[1px] bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

// Section glow
<div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 rounded-2xl blur-xl opacity-50"></div>
```

### Animations
```tsx
// Stagger animation (defined in globals.css)
style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both` }}

// Pulse
animate-pulse

// Hover transforms
group-hover:-translate-y-1
group-hover:translate-x-1
group-hover:scale-110
```

---

## Transitions

### Durations
```tsx
duration-200  // Quick (border changes)
duration-300  // Standard (most hover effects)
duration-500  // Slow (glow effects)
```

### Easing
```tsx
transition-all       // Default
transition-colors    // Text colors only
transition-opacity   // Opacity only
ease-out            // fadeInUp animation
```

---

## Borders & Radius

### Border Widths
```tsx
border      // Default 1px
border-2    // Thick (unused in current design)
```

### Border Radius
```tsx
rounded-full  // Pills, badges, dots
rounded-xl    // Cards, containers
rounded-2xl   // Large sections (CTA)
rounded-lg    // Small elements (icons, tags)
```

---

## Shadows

```tsx
// Cards
hover:shadow-lg            // Standard
hover:shadow-2xl           // Strong
hover:shadow-foreground/5  // Colored shadow
```

---

## Layout Patterns

### Container
```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Center Content
```tsx
<div className="max-w-5xl mx-auto">     // Hero
<div className="max-w-3xl mx-auto">     // CTA
<div className="max-w-2xl mx-auto">     // Descriptions
```

### Grid Layouts
```tsx
// Tool cards
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
```

---

## Page Structure

### Standard Page Template
```tsx
export default function PageName() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          Page Title
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Brief description of the tool and its purpose.
        </p>
      </section>

      {/* Main Content */}
      <section>
        <ComponentName />
      </section>
    </main>
  );
}
```

### Landing Page Template
```tsx
<div className="min-h-screen relative">
  {/* Grid Pattern Background */}
  <div className="absolute inset-0 bg-[linear-gradient(...)]"></div>

  {/* Hero Section */}
  <section className="container mx-auto px-4 pt-32 pb-24 text-center relative">
    {/* Badge + Title + Description + Features */}
  </section>

  {/* Content Section */}
  <section className="container mx-auto px-4 pb-24 relative">
    {/* Cards with stagger animation */}
  </section>

  {/* Footer CTA */}
  <section className="container mx-auto px-4 pb-32 relative">
    {/* Glow effect + content */}
  </section>
</div>
```

---

## Z-Index Hierarchy

```tsx
z-50   // Header (sticky)
z-10   // Overlays
z-0    // Default
relative // Context for absolute children
```

---

## Accessibility

- Always use semantic HTML (`<main>`, `<section>`, `<header>`)
- Maintain color contrast ratios
- Use `strokeWidth={2}` for better icon visibility
- Ensure keyboard navigation works

---

## Do's and Don'ts

### ✅ Do
- Use monochrome colors exclusively
- Apply `font-light` to body text
- Add `backdrop-blur-sm` to overlays
- Use consistent spacing (multiples of 4)
- Animate with `transition-all duration-300`
- Apply stagger animations to lists

### ❌ Don't
- Use colorful gradients on cards/backgrounds
- Mix font weights randomly
- Use emoji in production code
- Create custom animations without documenting
- Use `important` or inline styles (except animation delays)
- Skip hover states on interactive elements

---

## Quick Reference

```tsx
// Copy-paste ready snippets

// Page Header
<section className="mb-8">
  <h1 className="text-4xl font-bold text-center mb-4">Title</h1>
  <p className="text-center text-muted-foreground max-w-2xl mx-auto">
    Description
  </p>
</section>

// Feature List Item
<div className="flex items-center gap-2.5">
  <div className="h-1 w-1 rounded-full bg-foreground/40"></div>
  <span className="text-muted-foreground font-light tracking-wide">
    Feature text
  </span>
</div>

// Interactive Card
<Link href="/path" className="group">
  <div className="relative h-full">
    <div className="absolute -inset-[1px] bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
    <Card className="relative h-full border hover:border-foreground/20 transition-all duration-300 hover:shadow-2xl hover:shadow-foreground/5 bg-card/50 backdrop-blur-sm group-hover:-translate-y-1">
      {/* Card content */}
    </Card>
  </div>
</Link>
```
