import type { Owner } from "../../../types/owner";
import { Button } from "../../atoms/Button";

interface OwnerCardProps {
    owner: Owner;
    onEdit: (owner: Owner) => void;
    onDelete: (id: string) => void;
    isDeleting?: boolean;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({
    owner,
    onEdit,
    onDelete,
    isDeleting = false,
}) => {
    return (
        <div className="owner-card">
            <div className="owner-header">
                <h3 className="owner-name">{owner.name}</h3>
                <span className="owner-email">{owner.email}</span>
            </div>

            <div className="owner-info">
                <p className="owner-projetos">
                    <strong>Pertence:</strong> {" "}
                    {owner.projetos && owner.projetos.length > 0
                    ? owner.projetos?.map(p => p.name).join(', ') 
                    : 'Nenhum projeto'}
                </p>
                <p className="owner-id">
                    <strong>ID:</strong> {owner.id}
                </p>
            </div>

            <div className="owner-actions">
                <Button
                    variant="secondary"
                    onClick={() => onEdit(owner)}
                >Editar
                </Button>

                <Button
                    variant="danger"
                    onClick={() => onDelete(owner.id)}
                    loading={isDeleting}
                    disabled={isDeleting}
                    >Excluir
                </Button>
            </div>
        </div>
    );
};