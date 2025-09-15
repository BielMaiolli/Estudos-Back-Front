import React, { useEffect, useState } from 'react';
import './OwnerList.css';
import type { CreateOwnerDto, Owner, UpdateOwnerDto } from '../../types/owner';
import { ownerService } from '../../services/apiService';
import { Loading } from '../../components/atoms/Loading';
import { Button } from '../../components/atoms/Button';
import { OwnerForm } from '../../components/molecules/OwnerForm';
import { OwnerCard } from '../../components/molecules/OwnerCard';

export const OwnerList: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Carregar lista de Owners
  const loadOwners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ownerService.getAll();
      setOwners(data);
    } catch (error) {
      console.error('Erro ao carregar Owners:', error);
      setError('Erro ao carregar a lista de proprietários');
    } finally {
      setLoading(false);
    }
  };

  // Carregar Owners no mount
  useEffect(() => {
    loadOwners();
  }, []);

  // Criar Owner
  const handleCreate = async (data: CreateOwnerDto) => {
    try {
      setSubmitting(true);
      const newOwner = await ownerService.create(data);
      setOwners(prev => [newOwner, ...prev]);
      setShowForm(false);
      alert('Proprietário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar Owner:', error);
      alert('Erro ao criar proprietário');
    } finally {
      setSubmitting(false);
    }
  };

  // Editar Owner
  const handleEdit = (owner: Owner) => {
    setEditingOwner(owner);
    setShowForm(true);
  };

  const handleUpdate = async (data: UpdateOwnerDto) => {
    if (!editingOwner) return;
    
    try {
      setSubmitting(true);
      const updatedOwner = await ownerService.update(editingOwner.id, data);
      setOwners(prev => 
        prev.map(owner => 
          owner.id === editingOwner.id ? updatedOwner : owner
        )
      );
      setShowForm(false);
      setEditingOwner(null);
      alert('Proprietário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar Owner:', error);
      alert('Erro ao atualizar proprietário');
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar Owner
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este proprietário?')) return;

    try {
      setDeletingId(id);
      await ownerService.delete(id);
      setOwners(prev => prev.filter(owner => owner.id !== id));
      alert('Proprietário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar Owner:', error);
      alert('Erro ao excluir proprietário');
    } finally {
      setDeletingId(null);
    }
  };

  // Cancelar formulário
  const handleCancel = () => {
    setShowForm(false);
    setEditingOwner(null);
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
        <h1>Gerenciar Proprietários</h1>
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Novo Proprietário
        </Button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <div className="form-section">
          <h2>{editingOwner ? 'Editar' : 'Novo'} Proprietário</h2>
          <OwnerForm
            owner={editingOwner || undefined}
            onSubmit={editingOwner ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            isSubmitting={submitting}
          />
        </div>
      )}

      <div className="list-section">
        <h2>Lista de Proprietários ({owners.length})</h2>
        
        {owners.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum proprietário encontrado.</p>
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
            >
              Criar primeiro proprietário
            </Button>
          </div>
        ) : (
          <div className="cards-grid">
            {owners.map((owner) => (
              <OwnerCard
                key={owner.id}
                owner={owner}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deletingId === owner.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
