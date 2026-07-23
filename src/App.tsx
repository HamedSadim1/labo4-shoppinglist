import ShoppingList from './components/ShoppingList';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header title="🛒 Shopping List" subtitle="Organize your shopping efficiently" />
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
