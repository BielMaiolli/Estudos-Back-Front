import React, { useEffect, useState } from 'react';
import './ProjetosList.css';
import type { CreateProjetosDto, Projetos, UpdateProjetosDto } from '../../types/projetos';
import type { Owner } from '../../types/owner';
import { ownerService, projetosService } from '../../services/apiService';
import { Loading } from '../../components/atoms/Loading';
import { Button } from '../../components/atoms/Button';
import { ProjetosForm } from '../../components/molecules/ProjetosForm';
import { ProjetosCard } from '../../components/molecules/ProjetosCard';

export const ProjetosList: React.FC = () => {
  const [projetos, setProjetos] = useState<Projetos[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState<Projetos | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Carregar lista de Projetos
  const loadProjetos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projetosService.getAll();
      setProjetos(data);
    } catch (error) {
      console.error('Erro ao carregar Projetos:', error);
      setError('Erro ao carregar a lista de projetos');
    } finally {
      setLoading(false);
    }
  };

  // Carregar lista de Owners (para o select do form)
  const loadOwners = async () => {
    try {
      const data = await ownerService.getAll();
      setOwners(data);
    } catch (error) {
      console.error('Erro ao carregar Owners:', error);
      setError('Erro ao carregar a lista de proprietários');
    }
  };

  // Carregar dados no mount
  useEffect(() => {
    Promise.all([loadProjetos(), loadOwners()]);
  }, []);

  // Criar Projeto
  const handleCreate = async (data: CreateProjetosDto) => {
    try {
      setSubmitting(true);
      const newProjeto = await projetosService.create(data);
      setProjetos(prev => [newProjeto, ...prev]);
      setShowForm(false);
      alert('Projeto criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar Projeto:', error);
      alert('Erro ao criar projeto');
    } finally {
      setSubmitting(false);
    }
  };

  // Editar Projeto
  const handleEdit = (projeto: Projetos) => {
    setEditingProjeto(projeto);
    setShowForm(true);
  };

  const handleUpdate = async (data: UpdateProjetosDto) => {
    if (!editingProjeto) return;
    
    try {
      setSubmitting(true);
      const updatedProjeto = await projetosService.update(editingProjeto.id, data);
      setProjetos(prev => 
        prev.map(projeto => 
          projeto.id === editingProjeto.id ? updatedProjeto : projeto
        )
      );
      setShowForm(false);
      setEditingProjeto(null);
      alert('Projeto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar Projeto:', error);
      alert('Erro ao atualizar projeto');
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar Projeto
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      setDeletingId(id);
      await projetosService.delete(id);
      setProjetos(prev => prev.filter(projeto => projeto.id !== id));
      alert('Projeto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar Projeto:', error);
      alert('Erro ao excluir projeto');
    } finally {
      setDeletingId(null);
    }
  };

  // Cancelar formulário
  const handleCancel = () => {
    setShowForm(false);
    setEditingProjeto(null);
  };

  if (loading) {
    return (
      <div className="page-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gerenciar Projetos</h1>
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
          disabled={showForm || owners.length === 0}
        >
          Novo Projeto
        </Button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {owners.length === 0 && !loading && (
        <div className="warning-message">
          <p>⚠️ É necessário ter pelo menos um proprietário cadastrado para criar projetos.</p>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/owners'} // ou usar navegação do React Router
          >
            Ir para Proprietários
          </Button>
        </div>
      )}

      {showForm && owners.length > 0 && (
        <div className="form-section">
          <h2>{editingProjeto ? 'Editar' : 'Novo'} Projeto</h2>
          <ProjetosForm
            projetos={editingProjeto || undefined}
            owners={owners}
            onSubmit={editingProjeto ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            isSubmitting={submitting}
          />
        </div>
      )}

      <div className="list-section">
        <h2>Lista de Projetos ({projetos.length})</h2>
        
        {projetos.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum projeto encontrado.</p>
            {owners.length > 0 && (
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
              >
                Criar primeiro projeto
              </Button>
            )}
          </div>
        ) : (
          <div className="cards-grid">
            {projetos.map((projeto) => (
              <ProjetosCard
                key={projeto.id}
                projetos={projeto}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deletingId === projeto.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};