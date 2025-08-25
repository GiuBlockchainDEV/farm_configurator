# Irrigation Pro – Advanced Irrigation & Fertigation Design Software

Professional React + Vite + TypeScript application for designing and engineering agricultural irrigation and fertigation systems. Includes AI assistance with Google Gemini, hydraulic/agronomic/economic calculations, project management, and reporting.

## Tech Stack
- React 18/19 + TypeScript + Vite
- Tailwind CSS
- Zustand for state
- React Query for server state
- React Hook Form + Zod for validation
- Recharts for visualization
- Dexie (IndexedDB) for autosave/versioning
- jsPDF/XLSX for reporting
- Google Gemini API integration

## Getting Started
1. Install deps:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   # set VITE_GEMINI_API_KEY
   ```
3. Run dev:
   ```bash
   npm run dev
   ```
4. Build:
   ```bash
   npm run build && npm run preview
   ```

## Project Structure
See `src/` for modules: `components/ui`, `components/irrigation`, `stores`, `services`, `utils`, `types`, `constants`.

## Security
- Keep your Gemini key in `.env` and never commit it.
- Network calls are wrapped with basic error handling.

## Notes
This is an initial scaffold. Extend calculations, component databases, validation schemas, and supplier/weather integrations as needed.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
