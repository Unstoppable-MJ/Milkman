# Component Library — Milk Delivery Service

This library follows a modified Atomic Design methodology, optimized for React and Tailwind.

## Atoms (Base Elements)

### Button
- **Variants**: `primary` (blue), `secondary` (green), `outline`, `ghost`, `danger`.
- **Props**: `size` (sm, md, lg), `isLoading`, `iconLeft`, `iconRight`, `fullWidth`.
- **Specs**: 
  - Radius: `radius.lg` (16px)
  - Shadow: `shadow.soft` on hover
  - Transition: `motion.duration.base` (200ms)

### Badge
- **Variants**: `success`, `warning`, `info`, `neutral`.
- **Style**: Pill-shaped, light background tint with high-contrast text.

### Typography
- **Heading**: Inter Bold, tight leading.
- **Body**: Inter Regular/Medium, normal leading.

---

## Molecules (UI Patterns)

### ProductCard
- **Composition**: `Image` + `Badge` (Category) + `Heading` (Name) + `Text` (Price/Qty) + `QuantitySelector` + `Button`.
- **Style**: Glassmorphism border, soft shadow, hover lift (translateY: -4px).

### NavItem
- **Composition**: `Icon` + `Label`.
- **States**: `active` (brand color + glow), `inactive` (muted), `hover`.

### StatCard (Dashboard)
- **Composition**: `IconContainer` + `Label` + `Value` + `TrendIndicator`.

---

## Organisms (Complex Components)

### GlobalHeader (Sticky)
- **Layout**: `Logo` | `Navigation` | `UserBadge` + `CartTrigger`.
- **Style**: Glassmorphism (`bg-white/70`, `backdrop-blur-md`), thin bottom border.

### SidebarFilter
- **Composition**: `SearchInput` + `CategoryList` + `PriceRangeSlider` + `SortDropdown`.
- **Responsive**: Hidden on mobile, accessible via drawer.

### CalendarDeliveryControl
- **Composition**: `MonthNavigator` + `DateGrid` + `StatusLegend`.
- **Interaction**: Click date to toggle pause/resume or edit qty.

---

## Layouts

### AppLayout
- **Structure**: `Header` + `MainContent` + `Footer`.
- **Width**: `container.xl` (1280px) centered.

### DashboardLayout
- **Structure**: `SidebarNavigation` (Mobile: BottomNav) + `DashboardHeader` + `ScrollingContent`.
