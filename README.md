
# Fake NFE Generator

<div align="center">
  <img src="./src/assets/img/nfse.png" alt="NFE Generator Logo" width="200"/>
  <h3>A modern electronic invoice generator built with React and TypeScript</h3>
  
  ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC?style=flat-square&logo=tailwind-css)
</div>

## 📋 Overview

**Fake NFE Generator** is a modern web application designed to quickly and efficiently generate Brazilian Electronic Invoice (NFS-e) documents. This tool helps businesses create and download professional electronic invoice PDFs in just a few clicks.

Created by **Jair Costa**

## ✨ Features

- **Complete Invoice Form**: Generate detailed electronic invoices with comprehensive information
- **Form Validation**: Built-in validation for CPF/CNPJ and other required fields
- **Automatic Address Lookup**: ZIP code validation with automatic address completion
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **PDF Generation**: Download invoices as PDF documents ready for sharing
- **Modern UI**: Clean, intuitive interface built with React and TailwindCSS

## 🛠️ Technologies & Architecture

- **Frontend**: React 19, TypeScript
- **Styling**: TailwindCSS, SASS
- **State Management**: React Context API, React Hooks
- **Form Handling**: React Hook Form, validation with Zod
- **API Integration**: Axios
- **Build Tool**: Vite
- **UI Components**: Radix UI
- **Icons**: lucide-react
- **Animations**: tw-animate-css
- **Testing**: Vitest, Testing Library
- **Code Quality**: ESLint, TypeScript-ESLint
- **Internationalization**: react-i18next

### Architecture

- Separation between container components (`*.controller.tsx`) and presentational components (`*.view.tsx`)
- Component-oriented modularization, scalability, and testability
- Responsive and high-performance design for mobile webviews
- Accessibility best practices (WCAG)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher, recommended v22)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jayr2011/fake-nfe-generetor.git
cd fake-nfe-generetor
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. To preview the production build:
```bash
npm run preview
# or
yarn preview
```

5. Open your browser at `http://localhost:5173`

## 🏗️ Project Structure & Patterns

```
src/
├── assets/            # Images and static assets
├── components/        # Reusable UI components
├── context/           # React context providers
├── interfaces/        # TypeScript interfaces
├── lib/               # Utility functions and helpers
├── pages/             # Application pages
│   ├── *.controller.tsx   # Container components (logic, integration, state)
│   ├── *.view.tsx         # Presentational components (UI, animations, skeletons)
├── services/          # API services
└── main.tsx           # Application entry point
```

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

This will generate the production build in the `dist` folder.

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

> Tests are run with coverage using Vitest.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Jair Costa - [GitHub](https://github.com/jayr2011)

---

<div align="center">
  <sub>Built with ❤️ by Jair Costa</sub>
</div>


