import ShoppingList from './components/ShoppingList';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 relative overflow-hidden">
      {/* Animated gradient orbs - consistent with purple/pink/rose theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-overlay blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-300/30 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-rose-300/20 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-fuchsia-300/20 rounded-full mix-blend-overlay blur-3xl animate-blob animation-delay-3000" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-10 max-w-4xl">
        <Header />
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
