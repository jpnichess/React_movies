import { useState } from "react";
import "./App.css";

function App() {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" />
      <header>
        <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]">
          Encontre <span className="text-gradient">filmes</span> para assistir
        </h1>
      </header>
    </main>
  );
}

export default App;
