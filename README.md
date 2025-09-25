# FutureFeed UI

A modern, type-safe React UI component library built with Material-UI, TypeScript, and comprehensive tooling for professional development workflows.

## ✨ Features

- 🎨 **Material-UI Foundation**: Built on top of Material-UI v5 for consistent design
- 🔒 **TypeScript First**: Fully typed components with excellent IntelliSense support
- 📚 **Storybook Integration**: Interactive component documentation and development
- 🧪 **Comprehensive Testing**: Unit tests with Vitest, E2E tests with Playwright
- 🚀 **Modern Build System**: Lightning-fast builds with tsup and Vite
- 📦 **Semantic Versioning**: Automated releases with Changesets
- 🔍 **Code Quality**: ESLint, Prettier, and pre-commit hooks
- 📱 **Cross-browser Support**: Tested across modern browsers
- 🌐 **SSR Ready**: Compatible with Next.js and other SSR frameworks

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components](#components)
- [Development](#development)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Contributing](#contributing)
- [Scripts](#scripts)
- [Browser Support](#browser-support)

## 🚀 Installation

```bash
# npm
npm install futurefeed-ui @mui/material @emotion/react @emotion/styled

# yarn
yarn add futurefeed-ui @mui/material @emotion/react @emotion/styled

# pnpm
pnpm add futurefeed-ui @mui/material @emotion/react @emotion/styled
```

### Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@mui/material": "^5.0.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0"
}
```

## 🏃 Quick Start Guide

### 1. **Clone and Setup** (for contributors)

```bash
# Clone the repository
git clone https://github.com/your-username/futurefeed-ui.git
cd futurefeed-ui

# Install dependencies with pnpm
pnpm install

# MSW is already configured - just start Storybook!
pnpm storybook

# In another terminal, run tests (MSW auto-starts)
pnpm test
```

**✅ MSW Setup Complete**: The service worker (`public/mockServiceWorker.js`) is already generated and configured. No additional setup needed!

### 2. **Explore Interactive Examples**

Once Storybook is running at `http://localhost:6006`, you'll see:

- **📚 Component Gallery**: All components with live examples
- **🎮 Interactive Controls**: Modify props in real-time
- **🔄 Real API Scenarios**: Stories with MSW-powered API calls
- **📖 Auto-generated Docs**: TypeScript props documentation

### 3. **Try Real-World Examples**

Navigate to **Modal → Real-World Examples** in Storybook to see:

- **Delete User Confirmation**: Shows loading states, success/error handling
- **Contact Form Submission**: Form validation with realistic API responses
- **Notification Alerts**: Dynamic content loading from mock APIs
- **Error Scenarios**: How components handle various failure cases

## 🎯 Quick Start

### Basic Setup

```tsx
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Modal, theme } from 'futurefeed-ui'

function App() {
  const [open, setOpen] = React.useState(false)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <button onClick={() => setOpen(true)}>Open Modal</button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title='Welcome'
          variant='success'
          primaryAction={{
            label: 'Get Started',
            onClick: () => setOpen(false),
          }}
        >
          Welcome to FutureFeed UI! This is a success modal example.
        </Modal>
      </div>
    </ThemeProvider>
  )
}

export default App
```

### With Custom Theme

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Modal } from 'futurefeed-ui'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    // ... your theme customizations
  },
})

function App() {
  return <ThemeProvider theme={customTheme}>{/* Your app components */}</ThemeProvider>
}
```

## 🧩 Components

### Modal

A flexible modal component with multiple variants and customizable actions.

#### Props

| Prop                   | Type                                                       | Default     | Description                                |
| ---------------------- | ---------------------------------------------------------- | ----------- | ------------------------------------------ |
| `open`                 | `boolean`                                                  | -           | Whether the modal is open                  |
| `onClose`              | `() => void`                                               | -           | Callback fired when the modal should close |
| `title`                | `string`                                                   | -           | Modal title                                |
| `variant`              | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Visual variant                             |
| `children`             | `ReactNode`                                                | -           | Modal content                              |
| `primaryAction`        | `ActionProps`                                              | -           | Primary action button                      |
| `secondaryAction`      | `ActionProps`                                              | -           | Secondary action button                    |
| `showCloseButton`      | `boolean`                                                  | `true`      | Show close button in header                |
| `maxWidth`             | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                     | `'sm'`      | Maximum width                              |
| `disableBackdropClick` | `boolean`                                                  | `false`     | Disable backdrop click to close            |

#### Examples

```tsx
// Success Modal
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Success!"
  variant="success"
  primaryAction={{ label: 'Continue', onClick: handleContinue }}
>
  Your action was completed successfully.
</Modal>

// Confirmation Modal
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Delete"
  variant="warning"
  primaryAction={{
    label: 'Delete',
    onClick: handleDelete,
    color: 'error'
  }}
  secondaryAction={{
    label: 'Cancel',
    onClick: () => setOpen(false)
  }}
>
  Are you sure you want to delete this item?
</Modal>
```

## 🛠️ Development

### Prerequisites

- Node.js 18 or later
- pnpm 8 or later

### Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd futurefeed-ui
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start development**

```bash
# Start Storybook for component development
pnpm storybook

# Run tests in watch mode
pnpm test

# Build the package
pnpm build
```

## 🎭 Mock Service Worker (MSW) Integration

This library uses [MSW](https://mswjs.io/) for realistic API mocking in Storybook and tests.

### **How MSW Works Here**

```typescript
// Real API calls in your components work seamlessly
const response = await fetch('/api/users/1', { method: 'DELETE' })
const result = await response.json()

// MSW intercepts and returns mock data automatically
// No need to change component code for testing!
```

### **Available Mock Endpoints**

| Endpoint             | Method | Purpose             | Demo Story          |
| -------------------- | ------ | ------------------- | ------------------- |
| `/api/users`         | GET    | Load user list      | User Management     |
| `/api/users/:id`     | DELETE | Delete user         | Delete Confirmation |
| `/api/contact`       | POST   | Submit contact form | Form Submission     |
| `/api/notifications` | GET    | Load notifications  | Alert Modal         |
| `/api/projects/:id`  | DELETE | Archive project     | Project Management  |

### **Mock Data Scenarios**

- ✅ **Success responses** with realistic data
- ⚠️ **Validation errors** with field-specific messages
- 🚫 **Server errors** with user-friendly messages
- ⏱️ **Network delays** to test loading states
- 📊 **Different data states** (empty, populated, error cases)

### **Testing with MSW**

```typescript
// MSW automatically runs in all tests
test('handles delete confirmation', async () => {
  render(<DeleteUserModal userId="1" />)

  // Click delete - MSW intercepts the API call
  await user.click(screen.getByText('Delete User'))

  // Assert on the mocked response
  await waitFor(() => {
    expect(screen.getByText('User deleted successfully')).toBeInTheDocument()
  })
})

// Override default handlers for specific test cases
test('handles delete error', async () => {
  server.use(
    http.delete('/api/users/:id', () => {
      return HttpResponse.json({ error: 'Cannot delete user' }, { status: 400 })
    })
  )

  // Test error scenario...
})
```

## 📚 Storybook Features

### **Component Development**

- **🔧 Props Controls**: Interactive knobs for all component props
- **📱 Responsive Preview**: Test components on different screen sizes
- **🎨 Theme Switcher**: Preview components with different Material-UI themes
- **♿ Accessibility Testing**: Built-in a11y checks and color contrast validation

### **Real-World Stories**

Our Storybook goes beyond basic examples:

```typescript
// Stories demonstrate real usage patterns
export const DeleteUserConfirmation: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
      setLoading(true)
      // Real fetch call - MSW handles the response
      const response = await fetch('/api/users/1', { method: 'DELETE' })
      // Component shows real loading/success/error states
    }

    return (
      <Modal
        loading={loading}
        onConfirm={handleDelete}
        // ... realistic props
      />
    )
  }
}
```

### **API Integration Examples**

- **Form Validation**: See how components handle validation errors
- **Loading States**: Watch spinners and disabled states in action
- **Success/Error Flows**: Complete user journeys with realistic feedback
- **Data Loading**: Components that fetch and display dynamic content

### **Documentation Generation**

- **📋 Props Tables**: Auto-generated from TypeScript interfaces
- **📝 Usage Examples**: Copy-paste ready code snippets
- **🔗 Component Relationships**: See how components work together
- **📚 Design System Guidelines**: Consistent usage patterns

### Project Structure

```
futurefeed-ui/
├── .github/workflows/     # CI/CD workflows
├── .storybook/           # Storybook configuration
├── src/
│   ├── components/       # Component source code
│   │   └── Modal/
│   │       ├── Modal.tsx
│   │       ├── Modal.test.tsx
│   │       ├── Modal.stories.tsx
│   │       └── index.ts
│   ├── theme/           # Theme configuration
│   ├── utils/           # Utility functions
│   ├── mocks/           # MSW mocks for testing
│   └── index.ts         # Main export file
├── tests/e2e/           # Playwright E2E tests
├── dist/                # Built package (generated)
└── docs/                # Documentation
```

## 📏 Code Standards

### TypeScript

- **Strict Mode**: All code uses TypeScript strict mode
- **Type Exports**: Export types alongside components
- **Prop Interfaces**: Define clear interfaces for all component props
- **Generic Types**: Use generics for reusable type definitions

```tsx
// ✅ Good
export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  variant?: ModalVariant
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, ...props }) => {
  // Implementation
}

// ❌ Avoid
export const Modal = (props: any) => {
  // Implementation
}
```

### ESLint Rules

Our ESLint configuration enforces:

- **React Hooks Rules**: Proper hook usage
- **TypeScript Rules**: Type safety and best practices
- **Import/Export Rules**: Consistent module patterns
- **Code Style**: Consistent formatting and patterns

Key rules:

- `@typescript-eslint/no-unused-vars: error`
- `@typescript-eslint/no-explicit-any: warn`
- `react-hooks/rules-of-hooks: error`
- `react-hooks/exhaustive-deps: warn`

### Prettier Configuration

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### EditorConfig Standards

```ini
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.{js,jsx,ts,tsx}]
indent_size = 2
quote_type = single
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `Modal.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useModal.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `ModalProps`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`)

### Component Development Guidelines

1. **Component Structure**

```tsx
// Imports
import React from 'react'
import { ComponentProps } from '@mui/material'

// Types
export interface MyComponentProps {
  // Props definition
}

// Component
export const MyComponent: React.FC<MyComponentProps> = (
  {
    // Props destructuring
  }
) => {
  // Implementation
}
```

2. **Export Pattern**

```tsx
// Component file (Modal.tsx)
export const Modal = () => {
  /* ... */
}
export type { ModalProps }

// Index file (index.ts)
export { Modal } from './Modal'
export type { ModalProps } from './Modal'
```

3. **Story Structure**

```tsx
// Modal.stories.tsx
export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    /* ... */
  },
  argTypes: {
    /* ... */
  },
}

export const Default: Story = {
  /* ... */
}
export const Success: Story = {
  /* ... */
}
```

## 🧪 Testing

### Unit Testing with Vitest

- **Framework**: Vitest with jsdom environment
- **Testing Library**: React Testing Library
- **Coverage**: Minimum 80% coverage required
- **Mocking**: MSW for API mocking

#### Writing Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders when open', () => {
    render(<Modal open={true} onClose={vi.fn()} title='Test' />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose} title='Test' />)

    fireEvent.click(screen.getByLabelText('close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
```

### E2E Testing with Playwright

- **Framework**: Playwright
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Target**: Storybook stories as test scenarios

#### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test'

test('Modal should open and close correctly', async ({ page }) => {
  await page.goto('/story/modal--default')

  // Test modal interaction
  await page.click('[data-testid="open-modal"]')
  await expect(page.locator('[role="dialog"]')).toBeVisible()

  await page.click('[aria-label="close"]')
  await expect(page.locator('[role="dialog"]')).not.toBeVisible()
})
```

### Test Commands

```bash
# Unit tests
pnpm test                    # Run tests once
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Run with coverage report
pnpm test:ui                # Run with UI interface

# E2E tests
pnpm test:e2e               # Run E2E tests
pnpm test:e2e --ui          # Run with UI interface
pnpm test:e2e --debug       # Run in debug mode
```

## 🤝 Contributing

### Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes following our code standards
4. **Test** your changes: `pnpm test && pnpm test:e2e`
5. **Lint** your code: `pnpm lint`
6. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
7. **Push** to the branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding or updating tests
- `chore:` maintenance tasks

### Adding New Components

1. **Create component directory** in `src/components/`
2. **Implement component** with TypeScript
3. **Add comprehensive tests** with Vitest
4. **Create Storybook stories** for documentation
5. **Add E2E tests** if needed
6. **Export from index files**
7. **Update documentation**

### Changeset Workflow

For version management, we use Changesets:

```bash
# Add a changeset
pnpm changeset

# Version packages (maintainers only)
pnpm changeset version

# Publish packages (maintainers only)
pnpm release
```

## 🚀 Development Workflow

### **Day-to-Day Development**

```bash
# Start your development environment
pnpm storybook          # Launch component playground
pnpm test              # Run tests in watch mode (in another terminal)
pnpm lint              # Check code quality

# Build and verify
pnpm build             # Build the package
pnpm test:coverage     # Ensure good test coverage
```

### **Component Development Workflow**

1. **📝 Create Component**: Write your component in `src/components/`
2. **🧪 Add Tests**: Write comprehensive tests with Vitest + React Testing Library
3. **📚 Create Stories**: Build interactive Storybook stories with MSW integration
4. **🔍 Document**: TypeScript types auto-generate documentation
5. **✅ Verify**: Run linting, tests, and build checks

### **Using MSW in Your Development**

```bash
# MSW is automatically configured - just write fetch calls!

# 1. Start Storybook (MSW service worker loads automatically)
pnpm storybook

# 2. In your component stories - just use real fetch calls:
const handleSubmit = async (data) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  // MSW provides realistic responses with delays and errors!
}

# 3. In Tests: MSW server runs automatically (no service worker needed)
# 4. No configuration needed - everything just works! 🎉
```

**🔧 MSW Status Indicators:**

- **✅ Storybook**: Look for "[MSW] Mocking enabled" in browser console
- **✅ Tests**: MSW server starts automatically via `src/test/setup.ts`
- **🌐 Stories**: Real API calls show loading states, then mock responses
- **🚫 Infinite Loading**: Means service worker isn't registered (run `pnpm storybook` fresh)

## 📜 Scripts Reference

### **Development Commands**

| Command          | Description                  | When to Use           |
| ---------------- | ---------------------------- | --------------------- |
| `pnpm storybook` | Start Storybook dev server   | Component development |
| `pnpm test`      | Run unit tests in watch mode | Active development    |
| `pnpm test:ui`   | Run tests with UI interface  | Visual test debugging |
| `pnpm dev`       | Build in watch mode          | Package development   |

### **Quality Assurance**

| Command              | Description               | When to Use              |
| -------------------- | ------------------------- | ------------------------ |
| `pnpm lint`          | Lint code with ESLint     | Pre-commit checks        |
| `pnpm lint:fix`      | Auto-fix linting issues   | Code cleanup             |
| `pnpm format`        | Format code with Prettier | Code consistency         |
| `pnpm typecheck`     | Run TypeScript checks     | Type safety verification |
| `pnpm test:coverage` | Run tests with coverage   | Quality metrics          |

### **Build & Release**

| Command                | Description                   | When to Use              |
| ---------------------- | ----------------------------- | ------------------------ |
| `pnpm build`           | Build package for production  | Pre-publish              |
| `pnpm build-storybook` | Build Storybook static site   | Documentation deployment |
| `pnpm test:e2e`        | Run E2E tests with Playwright | Full integration testing |
| `pnpm changeset`       | Create changeset for release  | Version management       |
| `pnpm release`         | Publish to NPM                | Package release          |

### **Maintenance**

| Command             | Description           | When to Use    |
| ------------------- | --------------------- | -------------- |
| `pnpm clean`        | Clean build artifacts | Fresh start    |
| `pnpm format:check` | Check code formatting | CI/CD pipeline |

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 90+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** 14+
- **Mobile Chrome** 90+

## 📄 License

MIT © [Your Name]

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the component foundation
- [Storybook](https://storybook.js.org/) for component documentation
- [Changesets](https://github.com/changesets/changesets) for release management
- [Vitest](https://vitest.dev/) for lightning-fast testing
- [Playwright](https://playwright.dev/) for reliable E2E testing

---

**Built with ❤️ for modern React applications**
