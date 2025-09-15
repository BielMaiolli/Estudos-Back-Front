import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './ProjetosForm.css';
import type { CreateProjetosDto, Projetos } from '../../../types/projetos';
import type { Owner } from '../../../types/owner';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

// Schema para o formulário (dados brutos do form)
const projetosFormSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  cost: z.string()
    .min(1, 'Custo é obrigatório')
    .refine((val) => {
      const normalized = val.replace(',', '.').trim();
      const parsed = Number(normalized);
      return !Number.isNaN(parsed) && parsed >= 0;
    }, 'Custo deve ser um número válido maior ou igual a 0'),
  ownerId: z.string()
    .min(1, 'Proprietário é obrigatório'),
});

// Tipo inferido do schema do formulário
type ProjetosFormData = z.infer<typeof projetosFormSchema>;

interface ProjetosFormProps {
  projetos?: Projetos;
  owners: Owner[];
  onSubmit: (data: CreateProjetosDto) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ProjetosForm: React.FC<ProjetosFormProps> = ({
  projetos,
  owners,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjetosFormData>({
    resolver: zodResolver(projetosFormSchema),
    defaultValues: projetos
      ? { 
          name: projetos.name, 
          cost: projetos.cost.toString(), // Convertendo number para string para o form
          ownerId: projetos.ownerId 
        }
      : { name: '', cost: '', ownerId: '' },
  });

  const handleFormSubmit: SubmitHandler<ProjetosFormData> = async (data) => {
    try {
      // Convertendo os dados do formulário para o formato esperado pela API
      const submitData: CreateProjetosDto = {
        name: data.name,
        cost: Number(data.cost.replace(',', '.').trim()), // Convertendo string para number
        ownerId: data.ownerId,
      };

      await onSubmit(submitData);
      
      if (!projetos) {
        reset({ name: '', cost: '', ownerId: '' });
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="projetos-form">
      <div className="form-group">
        <Input 
          name="name"
          placeholder="Nome do projeto"
          error={errors.name?.message}
          register={register}
        />
      </div>

      <div className="form-group">
        <Input 
          name="cost"
          type="text"
          placeholder="Custo do projeto (ex: 1000.50)"
          error={errors.cost?.message}
          register={register}
        />
      </div>

      <div className="form-group">
        <select 
          {...register('ownerId')} 
          className={`select-input ${errors.ownerId ? 'error' : ''}`}
        >
          <option value="">Selecione um proprietário</option>
          {owners.map(owner => (
            <option key={owner.id} value={owner.id}>
              {owner.name} ({owner.email})
            </option>
          ))}
        </select>
        {errors.ownerId && (
          <span className="error-message">{errors.ownerId.message}</span>
        )}
      </div>

      <div className="form-actions">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel} 
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          loading={isSubmitting} 
          disabled={isSubmitting}
        >
          {projetos ? 'Atualizar' : 'Criar'} Projeto
        </Button>
      </div>
    </form>
  );
};