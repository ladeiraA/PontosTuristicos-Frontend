import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  termo: string;
  onTermoChange: (termo: string) => void;
  onBuscar: () => void;
  onCadastrar: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ termo, onTermoChange, onBuscar, onCadastrar }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={termo}
          onChange={(e) => onTermoChange(e.target.value)}
          placeholder="Buscar por nome, cidade, estado..."
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
        <button type="button" onClick={onCadastrar} className="btn btn-success">
          Cadastrar um ponto turístico
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
