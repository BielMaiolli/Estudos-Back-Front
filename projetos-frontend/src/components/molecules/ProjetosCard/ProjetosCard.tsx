import type { Projetos } from "../../../types/projetos";
import { Button } from "../../atoms/Button";

interface ProjetosCardProps {
    projetos: Projetos;
    onEdit: (projetos: Projetos) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const ProjetosCard: React.FC<ProjetosCardProps> = ({
    projetos,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="projetos-card">
            <div className="projetos-header">
                <h3 className="projetos-name">{projetos.name}</h3>
                <span className="projetos-cost">{projetos.cost}</span>
            </div>

            <div className="projetos-info">
                <p className="projetos-owner">
                    <strong>Pertence:</strong> {projetos.ownerId}
                </p>
                <p className="projetos-id">
                    <strong>ID:</strong> {projetos.id}
                </p>
            </div>

            <div className="projetos-actions">
                <Button
                    variant="secondary"
                    onClick={() => onEdit(projetos)}
                >Editar
                </Button>

                <Button
                    variant="danger"
                    onClick={() => onDelete(projetos.id)}
                    loading={isDeleting}
                    disabled={isDeleting}
                    >Excluir
                </Button>
            </div>
        </div>
    );
};