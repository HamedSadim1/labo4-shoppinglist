# 🛒 Shopping List App

[![React](https://img.shields.io/badge/React-19.2.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.6-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, beautiful shopping list application built with React 19, TypeScript, and Vite. Features a stunning glasmorfisme UI design with smooth animations and local storage persistence.

## ✨ Features

- **✨ Modern UI**: Beautiful glasmorfisme design with glassmorfisme effects, backdrop blur, and smooth animations
- **📱 Responsive**: Fully responsive design that works perfectly on desktop, tablet, and mobile devices
- **🔄 Real-time Updates**: Instant updates with smooth transitions and animations
- **💾 Persistent Storage**: All your shopping lists are automatically saved to local storage
- **🎯 Smart Filtering**: Filter items by category or completion status
- **✏️ Edit Items**: Easily edit item names, quantities, and categories
- **🗑️ Bulk Actions**: Clear completed items with one click
- **📊 Progress Tracking**: Visual progress indicators showing completed vs total items
- **🎨 Custom Categories**: Organize items with predefined categories (Fruits, Vegetables, Dairy, etc.)
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.6
- **Styling**: Tailwind CSS 4.1.17
- **Form Handling**: Formik 2.4.9
- **Validation**: Yup 1.7.1
- **State Management**: React Hooks + Immer 11.0.1
- **ID Generation**: ShortID 2.2.17

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/HamedSadim1/labo4-shoppinglist.git
   cd labo4-shoppinglist
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173) to see the app running!

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📖 Usage

### Adding Items

- Click the "Add Item" button or use the input field at the top
- Enter the item name, select a category, and set quantity
- Press Enter or click "Add Item" to save

### Managing Items

- **Complete Items**: Click the checkbox next to any item
- **Edit Items**: Click the edit icon (✏️) to modify item details
- **Delete Items**: Click the delete icon (🗑️) to remove items
- **Filter Items**: Use the filter buttons to show all, active, or completed items

### Categories

Choose from predefined categories:

- 🥬 Vegetables
- 🍎 Fruits
- 🥛 Dairy
- 🍞 Bakery
- 🥩 Meat
- 🧊 Frozen
- 🧹 Household
- 💊 Pharmacy
- 🎯 Other

## 📁 Project Structure

```text
labo4-shoppinglist/
├── public/
│   ├── favicon.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── AddItemForm.tsx    # Form for adding new items
│   │   ├── EditItem.tsx       # Form for editing items
│   │   ├── Header.tsx         # App header with title
│   │   ├── Item.tsx           # Individual shopping item
│   │   ├── ItemFilters.tsx    # Filter buttons
│   │   ├── ItemList.tsx       # List container
│   │   ├── ItemStats.tsx      # Progress statistics
│   │   └── ShoppingList.tsx   # Main shopping list component
│   ├── hooks/
│   │   └── useLocalStorage.ts # Custom hook for localStorage
│   ├── types.ts               # TypeScript interfaces
│   ├── App.css                # Additional styles
│   ├── App.tsx                # Main app component
│   ├── index.css              # Global styles & Tailwind imports
│   └── main.tsx               # App entry point
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # Node TypeScript config
└── vite.config.ts             # Vite configuration
```

## 🎨 Design Philosophy

This app features a modern **glasmorfisme** design approach:

- **Glass-like Effects**: Semi-transparent backgrounds with backdrop blur
- **Subtle Borders**: Soft, barely visible borders for depth
- **Layered Shadows**: Multiple shadow layers for dimensionality
- **Smooth Animations**: Fluid transitions and hover effects
- **Color Harmony**: Carefully chosen color palette with opacity variations
- **Typography**: Clean, readable fonts with proper contrast

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Use TypeScript for all new code
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design works on all screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Formik](https://formik.org/) - Build forms in React, without the tears
- [Immer](https://immerjs.github.io/immer/) - Create the next immutable state tree

---

**Made with ❤️ by [HamedSadim1](https://github.com/HamedSadim1)**

⭐ Star this repo if you found it helpful!

[⬆️ Back to top](#-shopping-list-app)
