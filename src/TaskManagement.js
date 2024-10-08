import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import './TaskManagement.css';
import { fetchTasks, addTask } from './Api'; // Importez vos fonctions d'API

const TaskManagement = () => {
  const [expanded, setExpanded] = useState({
    'Nouvelles tâches': true,
    'À faire aujourd\'hui': true,
    'À faire plus tard': true,
  });

  const [tasks, setTasks] = useState({
    'Nouvelles tâches': [],
    'À faire aujourd\'hui': [],
    'À faire plus tard': [],
  });

  const [newTask, setNewTask] = useState({
    name: '',
    deadline: '',
    project: '',
    visibility: '',
  });

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const newTasks = fetchedTasks.filter(task => task.statut === 'nouvelle');
        const todayTasks = fetchedTasks.filter(task => task.statut === 'à faire aujourd\'hui');
        const laterTasks = fetchedTasks.filter(task => task.statut === 'à faire plus tard');

        setTasks({
          'Nouvelles tâches': newTasks,
          'À faire aujourd\'hui': todayTasks,
          'À faire plus tard': laterTasks,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchAllTasks();
  }, []);

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field, value) => {
    setNewTask({ ...newTask, [field]: value });
  };

  const handleAddTask = async () => {
    if (newTask.name.trim() && newTask.deadline.trim() && newTask.project.trim() && newTask.visibility.trim()) {
      const taskToAdd = {
        titre: newTask.name,
        date_echeance: newTask.deadline,
        projet_id: newTask.project,
        visibility: newTask.visibility,
      };
      try {
        const addedTask = await addTask(taskToAdd); // Ajoutez la tâche via l'API
        setTasks((prevTasks) => ({
          ...prevTasks,
          'Nouvelles tâches': [...prevTasks['Nouvelles tâches'], addedTask], // Ajoutez la tâche à l'état
        }));

        // Réinitialiser les champs d'entrée
        setNewTask({ name: '', deadline: '', project: '', visibility: '' });
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
      }
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Mes tâches</h1>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Liste</span>
            <ChevronDown />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold">Ajouter une nouvelle tâche</h2>
          <div className="flex flex-col mb-4">
            <input
              type="text"
              placeholder="Nom de la tâche"
              value={newTask.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Projet"
              value={newTask.project}
              onChange={(e) => handleInputChange('project', e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Visibilité"
              value={newTask.visibility}
              onChange={(e) => handleInputChange('visibility', e.target.value)}
              className="border p-2 mb-2"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddTask}>
            <Plus className="mr-2" />
            Ajouter la tâche
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Nom de la tâche</th>
              <th className="text-left pb-2">Echéance</th>
              <th className="text-left pb-2">Projets</th>
              <th className="text-left pb-2">Visibilité des tâches</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tasks).map((section) => (
              <React.Fragment key={section}>
                <tr className="bg-gray-200">
                  <td colSpan="4" className="py-2">
                    <button onClick={() => toggleExpand(section)} className="flex items-center">
                      <ChevronDown className={`mr-2 ${expanded[section] ? '' : 'transform rotate-180'}`} />
                      {section}
                    </button>
                  </td>
                </tr>
                {expanded[section] && (
                  <>
                    {tasks[section].map((task, index) => (
                      <tr key={index}>
                        <td className="py-2">{task.titre}</td>
                        <td className="py-2 text-blue-500">{task.date_echeance}</td>
                        <td className="py-2">{task.projet_id}</td>
                        <td className="py-2">{task.visibility}</td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagement;
