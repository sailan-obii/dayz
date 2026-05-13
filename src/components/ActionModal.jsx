import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  color: #000;
  background: linear-gradient(to bottom, #f083ff, #ffb9b9);
  border: 1px solid #6C6A6D;
  padding: 30px;
  margin: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    font-size: 24px;
    
    text-align: center;
    margin-bottom: 15px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: #202020;
    text-align: center;
    margin-bottom: 10px;
  }

  ul {
    font-size: 14px;
    line-height: 1.8;
    color: #202020;
    margin: 15px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 25px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #00c642ab;
  

  &:hover {
    background-color: #47c600;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.2);
  
  border: 1px solid rgba(255, 255, 255, 0.4);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const DangerButton = styled(Button)`
  background-color: #ff4757;
  

  &:hover {
    background-color: #ff3838;
  }
`;

const ActionModal = ({
  isOpen,
  modalType,
  onClose,
  onConfirm,
  taskTitle,
}) => {
  if (!isOpen || !modalType) return null;

  const renderWelcome = () => (
    <ModalOverlay> 
        <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>📋 Bienvenue sur "Liste du jour"</h2>
        <p>
            Voici un guide rapide pour utiliser cette page au maximum de son potentiel :
        </p>
        <ul>
            <li>
            <strong>Ajouter une tâche :</strong> Cliquez sur le bouton "+" dans la barre supérieure
            </li>
            <li>
            <strong>Éditer une tâche :</strong> Double-cliquez sur une tâche pour la modifier
            </li>
            <li>
            <strong>Supprimer une tâche :</strong> Cliquez sur le "×" pour supprimer
            </li>
            <li>
            <strong>Réorganiser :</strong> Glissez-déposez vos tâches entre les colonnes
            </li>
            <li>
            <strong>Gérer le backlog :</strong> Affichez le backlog pour planifier vos futures tâches
            </li>
            <li>
            <strong>Sauvegarde automatique :</strong> Toutes vos modifications sont automatiquement enregistrées
            </li>
        </ul>
        <hr style={{ borderColor: '#7e00ff45'}} />
        <p>
            Aucune données n'est envoyée à un serveur, tout est stocké localement dans votre navigateur pour garantir votre confidentialité. Amusez-vous bien ! 🚀
        </p>
        <ButtonContainer>
            <PrimaryButton onClick={onClose}>
            ✓ Commencer
            </PrimaryButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  const renderConfirmDelete = () => (
    <ModalOverlay>
        <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>⚠️ Supprimer la tâche ?</h2>
        <p>
            {taskTitle ? `"${taskTitle}"` : "Cette tâche"}
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Cette action ne peut pas être annulée.
        </p>
        <ButtonContainer>
            <SecondaryButton onClick={onClose}>
            Annuler
            </SecondaryButton>
            <DangerButton onClick={() => {
            onConfirm();
            onClose();
            }}>
            Supprimer
            </DangerButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  const renderConfirmClear = () => (
    <ModalOverlay>
        <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>🗑️ Vider les tâches ?</h2>
        <p>
            Vous êtes sur le point de supprimer toutes les tâches du jour (ToDo, En cours, Terminé).
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Le backlog ne sera pas affecté. Cette action ne peut pas être annulée.
        </p>
        <ButtonContainer>
            <SecondaryButton onClick={onClose}>
            Annuler
            </SecondaryButton>
            <DangerButton onClick={() => {
            onConfirm();
            onClose();
            }}>
            Vider les tâches
            </DangerButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  const renderConfirmClearBacklog = () => (
    <ModalOverlay>
        <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>🗑️ Vider le backlog ?</h2>
        <p>
            Vous êtes sur le point de supprimer toutes les tâches du backlog.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Cette action ne peut pas être annulée.
        </p>
        <ButtonContainer>
            <SecondaryButton onClick={onClose}>
            Annuler
            </SecondaryButton>
            <DangerButton onClick={() => {
            onConfirm();
            onClose();
            }}>
            Vider le backlog
            </DangerButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  const renderSuccess = (message) => (
    <ModalOverlay>
        <ModalContainer>
            <CloseButton onClick={onClose}>×</CloseButton>
            <h2>✓ {message}</h2>
            <p>Vos modifications ont été enregistrées.</p>
            <ButtonContainer>
                <PrimaryButton onClick={onClose}>
            OK
            </PrimaryButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  const renderConfirmReset = () => (
    <ModalOverlay>
        <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>🔄 Réinitialiser les tâches ?</h2>
        <p>
            Vous êtes sur le point de réinitialiser toutes les tâches à leur état par défaut.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Le backlog ne sera pas affecté. Vos modifications actuelles seront perdues.
        </p>
        <ButtonContainer>
            <SecondaryButton onClick={onClose}>
            Annuler
            </SecondaryButton>
            <DangerButton onClick={() => {
            onConfirm();
            onClose();
            }}>
            Réinitialiser
            </DangerButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  const renderConfirmResetBacklog = () => (
    <ModalOverlay>
        <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>🔄 Réinitialiser le backlog ?</h2>
        <p>
            Vous êtes sur le point de réinitialiser le backlog à son état par défaut.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Vos modifications actuelles du backlog seront perdues.
        </p>
        <ButtonContainer>
            <SecondaryButton onClick={onClose}>
            Annuler
            </SecondaryButton>
            <DangerButton onClick={() => {
            onConfirm();
            onClose();
            }}>
            Réinitialiser le backlog
            </DangerButton>
        </ButtonContainer>
        </ModalContainer>
    </ModalOverlay>
  );

  switch (modalType) {
    case 'welcome':
      return renderWelcome();
    case 'confirm-delete':
      return renderConfirmDelete();
    case 'confirm-clear':
      return renderConfirmClear();
    case 'confirm-clear-backlog':
      return renderConfirmClearBacklog();
    case 'confirm-reset':
      return renderConfirmReset();
    case 'confirm-reset-backlog':
      return renderConfirmResetBacklog();
    case 'success':
      return renderSuccess('Parfait !');
    default:
      return null;
  }
};

export default ActionModal;
