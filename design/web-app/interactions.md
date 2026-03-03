# Interaction & Motion — Milk Delivery Service

## Motion Principles
- **Fluidity**: All transitions should feel organic, reflecting the "liquid" nature of the product.
- **Responsiveness**: Immediate visual feedback for every user action.
- **Elevation**: Use subtle lift on hover to indicate interactability.

## Key Animations

### Splash Screen
- **Action**: App Init.
- **Effect**: A milk droplet falls from the top, creating a "splash" ripple that expands to reveal the Logo.
- **Duration**: 800ms.

### Page Transitions
- **Action**: Route change.
- **Effect**: Gentle slide-up and fade-in for the incoming container.
- **Easing**: `emphasized`.

### Button States
- **Hover**: Scale 1.02, increase shadow.
- **Active**: Scale 0.98, decrease shadow.
- **Loading**: Spinner replaces text, button width remains constant.

### Dashboard Timeline
- **Interaction**: Scroll.
- **Effect**: Staggered entrance for delivery items (fade-in + slide-left).

## Micro-Interactions
- **Add to Cart**: Small "+1" badge floats upwards and fades out.
- **Pause Toggle**: Smooth color slide from Green to Grey with a springy switch.
- **Calendar Selection**: Ripple effect on date click.
- **Cart Badge**: Pulse animation when an item is added.

## Haptics (Mobile Web)
- **Light Tap**: Item selection, tab change.
- **Medium Tap**: Primary action (Order, Pay).
- **Error Shake**: Form validation failure.
