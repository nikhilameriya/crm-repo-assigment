# CRM Contacts Application

A dynamic React.js application for managing CRM contacts with config-driven UI rendering.

## Features

- **Dynamic Contact Details Page**: Modular and configurable contact information display
- **Config-Driven UI**: Layout and fields are dynamically rendered based on JSON configurations
- **Responsive Design**: Adapts to different screen sizes
- **Modern React**: Built with React 18 and functional components with hooks

## Tech Stack

- **Frontend**: React.js 18
- **Styling**: CSS3 with CSS Modules approach
- **State Management**: React useState and useEffect hooks
- **Build Tool**: Create React App

## Project Structure

```
crm-contacts-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ContactDetails/
│   │   │   ├── ContactDetails.jsx
│   │   │   └── ContactDetails.css
│   │   ├── FieldRenderer/
│   │   │   ├── FieldRenderer.jsx
│   │   │   └── FieldRenderer.css
│   │   ├── SectionRenderer/
│   │   │   ├── SectionRenderer.jsx
│   │   │   └── SectionRenderer.css
│   │   └── Layout/
│   │       ├── Layout.jsx
│   │       └── Layout.css
│   ├── data/
│   │   ├── layout.json
│   │   ├── contactFields.json
│   │   └── contactData.json
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```
## Architecture & Patterns

### 1. Higher-Order Components (HOCs)
- **`withLoading`**: Handles loading states for any component
- **`withErrorBoundary`**: Provides error boundary capabilities
- **`withDataFetching`**: Abstract data fetching logic
- **`withPermissions`**: Role-based access control

### 2. Compound Components
- **`Accordion`**: Expandable/collapsible content sections
- **`Modal`**: Complex modal with header, body, footer composition
- **`DataGrid`**: Advanced grid with sorting, filtering, pagination

### 3. Render Props Pattern
- **`DataProvider`**: Flexible data management
- **`FormProvider`**: Advanced form state management

### 4. Custom Hooks
- **`useAsync`**: Advanced async operations with state management
- **`useLocalStorage`**: Persistent local storage
- **`useDebounce`**: Performance optimization for inputs
- **`useFormValidation`**: Complex form validation


### 6. Performance Optimizations
- React.memo for pure components
- useMemo for expensive calculations
- useCallback for function optimization
- Virtual scrolling for large lists
- Code splitting with React.lazy

### 7. Accessibility (a11y)
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
## JSON Configuration Files

### layout.json
Defines which sections appear on the page and their order:
- Controls page layout structure
- Determines section visibility and positioning

### contactFields.json
Defines folders and fields within the Contact Details panel:
- Supports various field types (text, email, phone, date, etc.)
- Organizes fields into logical folders/groups
- Defines field properties and validation rules

### contactData.json
Provides actual values for the fields:
- Contains real contact information
- Maps to field definitions in contactFields.json
- Includes notes, activities, and other contact details

## How to Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm-contacts-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to http://localhost:3000)

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Features Implementation

### Dynamic Rendering
- All UI components are rendered based on JSON configurations
- Field types are dynamically determined and rendered accordingly
- Layout sections can be reordered or hidden via configuration

### Responsive Design
- Mobile-first approach
- Flexible grid system
- Adaptive typography and spacing

### Component Architecture
- **ContactDetails**: Main container component
- **SectionRenderer**: Renders different page sections
- **FieldRenderer**: Handles dynamic field rendering
- **Layout**: Overall page layout wrapper

## Known Issues

- No backend integration (as per requirements)
- Form submissions are simulated
- Some advanced field types may need additional implementation

## Future Enhancements

- Add form validation
- Implement real-time data updates
- Add search and filtering capabilities
- Integrate with backend API
- Add more field types and customization options

# crm-repo-assigment
