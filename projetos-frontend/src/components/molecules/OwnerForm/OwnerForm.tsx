import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './OwnerForm.css';
import type { CreateOwnerDto, Owner } from '../../../types/owner';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

// Schema de validação com Zod
const ownerSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ter um formato válido')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
});

interface OwnerFormProps {
  owner?: Owner;
  onSubmit: (data: CreateOwnerDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const OwnerForm: React.FC<OwnerFormProps> = ({
  owner,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOwnerDto>({
    resolver: zodResolver(ownerSchema),
    defaultValues: owner ? {
      name: owner.name,
      email: owner.email,
    } : {
      name: '',
      email: '',
    },
  });

  const handleFormSubmit = async (data: CreateOwnerDto) => {
    try {
      await onSubmit(data);
      if (!owner) { // Se não está editando, limpa o form
        reset();
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="owner-form">
      <div className="form-group">
        <Input
          name="name"
          placeholder="Nome do proprietário"
          error={errors.name?.message}
          register={register}
        />
      </div>

      <div className="form-group">
        <Input
          name="email"
          type="email"
          placeholder="Email do proprietário"
          error={errors.email?.message}
          register={register}
        />
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
          {owner ? 'Atualizar' : 'Criar'} Proprietário
        </Button>
      </div>
    </form>
  );
};