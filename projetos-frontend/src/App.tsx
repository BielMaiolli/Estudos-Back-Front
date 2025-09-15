import React, { useState } from 'react';
import { OwnerList } from './pages/OwnerList/OwnerList';
import { ProjetosList } from './pages/ProjetosList/ProjetosList';
import './App.css';

type ActivePage = 'owners' | 'projetos';

function App() {
  const [activePage, setActivePage] = useState<ActivePage>('owners');

  const renderPage = () => {
    switch (activePage) {
      case 'owners':
        return <OwnerList />;
      case 'projetos':
        return <ProjetosList />;
      default:
        return <OwnerList />;
    }
  };

  return (
    <div className="app">
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Sistema de Gestão</h1>
          <nav className="app-nav">
            <button
              className={`nav-button ${activePage === 'owners' ? 'active' : ''}`}
              onClick={() => setActivePage('owners')}
            >
              Proprietários
            </button>
            <button
              className={`nav-button ${activePage === 'projetos' ? 'active' : ''}`}
              onClick={() => setActivePage('projetos')}
            >
              Projetos
            </button>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="app-main">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Sistema de Gestão - Proprietários & Projetos</p>
      </footer>
    </div>
  );
}

export default App;