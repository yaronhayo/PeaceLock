# replit.md

## Overview

Peace & Lock is a comprehensive business website for a professional garage door repair and installation company serving New Jersey. The application is built as a modern, SEO-optimized marketing site featuring service information, booking functionality, customer reviews, and service area coverage. The site emphasizes trust-building, clear service communication, and lead generation through prominent call-to-action elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with three main pages (Home, Booking, Thank You)
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system following the company's brand guidelines
- **State Management**: TanStack Query for server state and local React state for component state
- **Form Handling**: React Hook Form with Zod validation for type-safe form submissions

### Component Structure
- **Layout Components**: Header with sticky navigation, Footer with company information and links
- **Marketing Components**: Hero section, Services showcase, Service Areas coverage, Customer Reviews, FAQ section, About section
- **Interactive Components**: BookingForm with comprehensive service request fields, Contact form
- **Utility Components**: Complete UI component library from Shadcn/ui including buttons, cards, forms, dialogs, and navigation elements

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Development Setup**: Hot module reloading with Vite middleware integration
- **API Structure**: RESTful endpoints with `/api` prefix, comprehensive error handling middleware

### Data Layer
- **Database Schema**: User management with username/password authentication using Drizzle ORM
- **Validation**: Zod schemas for runtime type checking and form validation
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and PostgreSQL for production

### Design System
- **Color Palette**: Brand orange (primary), brand green (secondary), trust blue, with supporting neutral colors
- **Typography**: Inter font family with consistent weight hierarchy
- **Layout**: 8-unit grid system with mobile-first responsive breakpoints
- **Component Standards**: Consistent spacing, elevation effects, and interaction patterns

### SEO and Performance
- **Meta Tags**: Comprehensive SEO meta tags, Open Graph, and Twitter Card support
- **Structured Data**: JSON-LD schema for local business optimization
- **Performance**: Code splitting, lazy loading, and optimized asset delivery
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## External Dependencies

### Database and Infrastructure
- **Neon Database**: PostgreSQL hosting service for production database
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Session Store**: PostgreSQL-based session persistence

### UI and Styling
- **Shadcn/ui**: Complete component library built on Radix UI
- **Radix UI**: Headless UI primitives for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for typography

### Development and Build Tools
- **Vite**: Fast build tool with React plugin and development server
- **TypeScript**: Type safety across the entire application
- **React Hook Form**: Form state management and validation
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing solution

### Form and Validation
- **Zod**: Runtime type validation and schema definition
- **Hookform Resolvers**: Integration between React Hook Form and Zod
- **Date-fns**: Date manipulation and formatting utilities

### Utility Libraries
- **Class Variance Authority**: Type-safe CSS class composition
- **clsx & tailwind-merge**: Conditional CSS class utilities
- **Embla Carousel**: Touch-friendly carousel component
- **Nanoid**: Secure URL-friendly unique ID generation