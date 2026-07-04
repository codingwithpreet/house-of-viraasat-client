function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
          House of Virasaat
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-medium">
          Frontend client environment configured with React, TypeScript, and Tailwind CSS v4.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-md">
            <div className="text-amber-400 font-bold text-lg">Routing</div>
            <div className="text-sm text-slate-400 mt-1">react-router-dom</div>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-md">
            <div className="text-amber-400 font-bold text-lg">State</div>
            <div className="text-sm text-slate-400 mt-1">zustand</div>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-md">
            <div className="text-amber-400 font-bold text-lg">Icons</div>
            <div className="text-sm text-slate-400 mt-1">lucide-react</div>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-md">
            <div className="text-amber-400 font-bold text-lg">HTTP Client</div>
            <div className="text-sm text-slate-400 mt-1">axios</div>
          </div>
        </div>
        <div className="pt-6 text-sm text-slate-500">
          Scaffolding generated successfully. Feature-first modules ready.
        </div>
      </div>
    </div>
  );
}

export default App;
