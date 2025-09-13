# CLO-SET CONNECT Store

## Features

### Required Features ✅
- **Content Filtering**: Filter by pricing options (Paid, Free, View Only)
- **Keyword Search**: Search through creator names and item titles
- **Responsive Grid**: Adaptive layout (4→3→2→1 columns based on screen size)
- **Infinite Scroll**: Load more items as user scrolls
- **URL Persistence**: Filters and search persist across page reloads
- **Reset Functionality**: Clear all filters

### Optional Features ✅
- **Price Range Slider**: Filter paid items by price range ($0-$999)
- **Sorting Options**: Sort by Item Name, Higher Price, Lower Price
- **Loading Skeleton**
- **TypeScript**
- **Test Coverage**

## Tech Stack
- **React 19**
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast development server and build tool

### State Management
- **Redux Toolkit** - Predictable state management
  - *Why*: Complex filter combinations and shared state across components
- **React Redux** - React bindings for Redux

### Routing & Persistence  
- **React Router DOM** - Client-side routing and URL state management
  - *Why*: Enables URL-based filter persistence without localStorage

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
  - *Why*: Rapid responsive design development and consistent styling
- **clsx** - Conditional className utility
  - *Why*: Clean conditional styling logic

### Performance & UX
- **React Intersection Observer** - Infinite scroll implementation
  - *Why*: Efficient scroll detection with minimal performance impact

### Testing
- **Vitest** - Fast unit test runner
  - *Why*: Native Vite integration and modern testing features
- **React Testing Library** - Component testing utilities
  - *Why*: Focus on user behavior rather than implementation details

## Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd clo-store

# Install dependencies
npm install

# Start development server
npm run start

# Run tests
npm run test


## Testing
Tests cover:
- Component rendering and user interactions
- Redux state management and actions  
- Filter logic and combinations
- Search functionality
- Integration between components