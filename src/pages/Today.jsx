import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {FaTrash, FaRedo, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

import TopBar from '../components/Task/TopBar';
import EditableTask from '../components/Task/EditableTask.jsx';
import ActionModal from '../components/ActionModal';
import { Link } from '../components/atoms/index.jsx';

import {
  Container,
  TaskBoardContainer,
  Column,
  SectionHeader,
  ColumnBacklog,
  ColumnBacklogHeader,
  TaskList,
  StickyMenu,
} from '../components/Task/today.styles';


const initialTasks = [
  { id: 'task-0', title: 'Ranger le bureau', description: 'Trier les papiers et libérer l\'espace de travail.', status: 'terminé' },
  { id: 'task-1', title: 'Lire quelques pages', description: 'Lire au moins 15 pages du livre en cours.', status: 'todo' },
  { id: 'task-2', title: 'Apprendre quelque chose de nouveau', description: 'Passer 20 minutes sur un sujet que j\'aimerais mieux comprendre.', status: 'todo' },
  { id: 'task-4', title: 'Faire une séance de sport', description: 'Prévoir 30 à 45 minutes d\'activité physique.', status: 'todo' },
  { id: 'task-5', title: 'Avancer sur un projet personnel', description: 'Consacrer une heure à faire avancer un projet personnel.', status: 'en cours' },
  { id: 'task-6', title: 'Préparer une sortie en famille', description: 'Trouver une activité pour ce week-end.', status: 'backlog' },
  { id: 'task-7', title: 'Appeler un proche', description: 'Prendre quelques minutes pour appeler quelqu\'un que je n\'ai pas eu récemment.', status: 'backlog' },
  { id: 'task-8', title: 'Boire de l\'eau', description: 'Consommer au moins 8 verres d\'eau par jour.', status: 'en cours' },
  { id: 'task-9', title: 'Faire les courses', description: 'Acheter les produits nécessaires pour les prochains jours.', status: 'backlog' },
  { id: 'task-10', title: 'Faire une lessive', description: 'Lancer une machine et étendre le linge une fois terminé.', status: 'backlog' },

  
];



function Today() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskId, setNewTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [showBacklog, setShowBacklog] = useState(false);
  const toggleBacklogVisibility = () => {
    setShowBacklog((prev) => !prev);
  };

  // États pour gérer les modales
  const [modalType, setModalType] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  // Afficher la modale welcome à la première visite
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenTodayWelcome');
    if (!hasSeenWelcome) {
      setModalType('welcome');
      localStorage.setItem('hasSeenTodayWelcome', 'true');
    }
  }, []);

  // Sauvegarder les tâches dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const clearTasks = () => {
    setModalType('confirm-clear');
    setPendingAction('clear-tasks');
  };

  const confirmClearTasks = () => {
    const backlogTasks = tasks.filter(task => task.status === 'backlog');
    setTasks(backlogTasks);
    localStorage.setItem('tasks', JSON.stringify(backlogTasks));
  };

  const resetTasks = () => {
    setModalType('confirm-reset');
    setPendingAction('reset-tasks');
  };

  const confirmResetTasks = () => {
    const backlogTasks = tasks.filter(task => task.status === 'backlog');
    const nonBacklogTasks = initialTasks.filter(task => task.status !== 'backlog');
    const updatedTasks = [...backlogTasks, ...nonBacklogTasks];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTaskToBacklog = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: 'Nouvelle tâche',
      description: '',
      status: 'backlog',
    };
    setTasks([newTask, ...tasks]);
    setEditingTaskId(newTask.id); // Active le mode édition pour la nouvelle tâche
    setNewTaskId(newTask.id);
  };
  
  const clearBacklog = () => {
    setModalType('confirm-clear-backlog');
    setPendingAction('clear-backlog');
  };

  const confirmClearBacklog = () => {
    setTasks(tasks.filter(task => task.status !== 'backlog'));
  };
  
  const resetBacklog = () => {
    setModalType('confirm-reset-backlog');
    setPendingAction('reset-backlog');
  };

  const confirmResetBacklog = () => {
    const defaultBacklogTasks = initialTasks.filter(task => task.status === 'backlog');
    const otherTasks = tasks.filter(task => task.status !== 'backlog');
    setTasks([...otherTasks, ...defaultBacklogTasks]);
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskToMove = tasks.find(t => t.id === draggableId);
    const newTasks = tasks.filter(t => t.id !== draggableId);
    
    const updatedTask = {
      ...taskToMove,
      status: destination.droppableId
    };
    
    const destinationTasks = newTasks.filter(t => t.status === destination.droppableId);
    destinationTasks.splice(destination.index, 0, updatedTask);
    
    const finalTasks = [
      ...newTasks.filter(t => t.status !== destination.droppableId),
      ...destinationTasks
    ];
    
    setTasks(finalTasks);
  };

  const addNewTask = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: '',
      description: '',
      status: 'todo'
    };
    const tasksWithNewTask = [newTask, ...tasks];
    setTasks(tasksWithNewTask);
    setEditingTaskId(newTask.id);
    setNewTaskId(newTask.id);
  };

  const handleDoubleClick = (taskId) => {
    if (!editingTaskId) {
      setEditingTaskId(taskId);
    }
  };

  const handleSave = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTaskId(null);
    setNewTaskId(null);
  };

  const handleCancel = () => {
    if (newTaskId) {
      setTasks(tasks.filter(task => task.id !== newTaskId)); // Supprime le ticket récemment créé
      setNewTaskId(null); // Réinitialise l'ID du nouveau ticket
    }
    setEditingTaskId(null);
  };

  // Fonction pour gérer la suppression avec confirmation
  const handleDeleteClick = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setTaskToDelete(task);
    setModalType('confirm-delete');
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      if (editingTaskId === taskToDelete.id) {
        setEditingTaskId(null);
      }
      setTaskToDelete(null);
    }
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setModalType(null);
    setTaskToDelete(null);
    setPendingAction(null);
  };

  // Fonction de suppression directe (passée aux EditableTask)
  const handleDelete = (taskId) => {
    handleDeleteClick(taskId);
  };

  const scrollToColumn = (status) => {
    const columnElement = document.getElementById(`column-${status}`);
    if (columnElement) {
      columnElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Fonction pour afficher la modale welcome à la demande
  const showWelcome = () => {
    setModalType('welcome');
  };

  // Fonction pour filtrer les tâches selon le terme de recherche
  const matchesSearchTerm = (task) => {
    if (!searchTerm) return true;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowerSearchTerm) ||
      task.description.toLowerCase().includes(lowerSearchTerm)
    );
  };

  // Handlers pour la barre de recherche
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
  };

  // Gérer la confirmation des modales
  const handleConfirm = () => {
    if (pendingAction === 'clear-tasks') {
      confirmClearTasks();
    } else if (pendingAction === 'clear-backlog') {
      confirmClearBacklog();
    } else if (pendingAction === 'reset-tasks') {
      confirmResetTasks();
    } else if (pendingAction === 'reset-backlog') {
      confirmResetBacklog();
    } else if (modalType === 'confirm-delete') {
      confirmDelete();
    }
  };

  const columns = ['todo', 'en cours', 'terminé'];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ActionModal
        isOpen={modalType !== null}
        modalType={modalType}
        onClose={closeModal}
        onConfirm={handleConfirm}
        taskTitle={taskToDelete?.title}
      />
      
      <Container>
        <TopBar
          onAddTask={addNewTask}
          onClearTasks={clearTasks}
          onResetTasks={resetTasks}
          onShowHelp={showWelcome}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        
        <TaskBoardContainer>
          {columns.map(status => (
            <Column key={status} id={`column-${status}`}>
              <SectionHeader status={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SectionHeader>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {tasks
                      .filter(task => task.status === status && matchesSearchTerm(task))
                      .map((task, index) => (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div onDoubleClick={() => handleDoubleClick(task.id)}>
                              <EditableTask
                                task={task}
                                isEditing={editingTaskId === task.id}
                                onSave={handleSave}
                                onCancel={handleCancel}
                                onDelete={handleDelete}
                                provided={provided}
                                snapshot={snapshot}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </Column>
          ))}
          
        </TaskBoardContainer>
        <div style={{margin:'20px 10px 40px'}}>
            <Link onClick={toggleBacklogVisibility}>
              {showBacklog ? <FaEyeSlash /> : <FaEye />} {showBacklog ? 'Masquer le backlog' : 'Afficher le backlog'}
            </Link>         
        </div>
        
        <TaskBoardContainer>
          {/* Colonne Backlog */}
          {showBacklog && (
            <ColumnBacklog className={`backlog ${showBacklog ? 'show' : ''}`}>
              <ColumnBacklogHeader status="backlog">
                <span>Backlog</span>
                <div className="backlog-actions">
                  <Link onClick={addTaskToBacklog}>
                    <FaPlus /> Ajouter au Backlog
                  </Link>
                  <Link onClick={clearBacklog}>
                    <FaTrash /> Vider le Backlog
                  </Link>
                  <Link onClick={resetBacklog}>
                    <FaRedo /> Backlog par défaut
                  </Link>
                </div>
              </ColumnBacklogHeader>
              <Droppable droppableId="backlog">
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    className="backlog-task-list" // Classe spécifique pour le backlog
                  >
                    {tasks
                      .filter(task => task.status === 'backlog' && matchesSearchTerm(task))
                      .map((task, index) => (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div onDoubleClick={() => handleDoubleClick(task.id)} className="backlog-task">
                              <EditableTask
                                task={task}
                                isEditing={editingTaskId === task.id}
                                onSave={handleSave}
                                onCancel={handleCancel}
                                onDelete={handleDelete}
                                provided={provided}
                                snapshot={snapshot}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </ColumnBacklog>
          )}
        </TaskBoardContainer>
        <StickyMenu>
          <a className="todo" onClick={() => scrollToColumn('todo')}>ToDo</a>
          <a className="en-cours" onClick={() => scrollToColumn('en cours')}>En Cours</a>
          <a className="termine" onClick={() => scrollToColumn('terminé')}>Terminé</a>
        </StickyMenu>
      </Container>
    </DragDropContext>
  );
}

export default Today;