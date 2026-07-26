import ShoppingList from './components/ShoppingList';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-600 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-overlay blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-fuchsia-400/20 rounded-full mix-blend-overlay blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-400/15 rounded-full mix-blend-overlay blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-400/15 rounded-full mix-blend-overlay blur-3xl animate-blob [animation-delay:3s]" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-10 max-w-4xl">
        <Header />
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
