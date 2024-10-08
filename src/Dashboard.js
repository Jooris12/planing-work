// Dashboard.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbarr';
import Vector from './assets/Vector.png';
import imaage from './assets/imaage (1).png';
import ima from './assets/ima.png';
import './App.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/task-manager'); 
  };

  const handleTaskManagementNavigation = () => {
    navigate('/task-management'); // Change the path to the correct route for TaskManagement
  };
  
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <div className="cont">
          <h2>Accueil</h2>
        </div>

        <div className="container">
          <div className="div-mere">
            <div className="div-enfant">
              <h1>Ajouter une tâche</h1>
              <button className="mon-bouton">
                <Link to="/add-task">
                  <img src={Vector} alt="Ajouter une tâche" />
                </Link>
              </button>
            </div>

            <div className="div-enfant" onClick={handleNavigation} style={{ cursor: 'pointer' }}>
              <div className="div-enfant1">
                <h1>Gestion de tâche</h1>
              </div>
              <div className="task">
                <input type="text" value="Rédiger une ébauche de proposition de projet" readOnly />
                <button>
                  <img src={imaage} alt="imaage" />
                </button>
                <button>
                  <img src={ima} alt="ima" />
                </button>
              </div>
              <div className="task">
                <input type="text" value="Rédiger une ébauche de proposition de projet" readOnly />
                <button>
                  <img src={imaage} alt="imaage" />
                </button>
                <button>
                  <img src={ima} alt="ima" />
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="autre-div">
              <div className="task-list" onClick={handleTaskManagementNavigation} style={{ cursor: 'pointer' }}>
                <h1>Mes tâches</h1>
                <ul>
                  <li>
                    <h3>Nouvelles tâches</h3>
                    <ul>
                      <li>
                        <input type="text" className="task-input" placeholder="Ajouter une tâche..." />
                        <button className="add-button">Ajouter</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h3>À faire aujourd'hui</h3>
                    <ul>
                      <li>
                        <input type="text" className="task-input" placeholder="Ajouter une tâche..." />
                        <button className="add-button">Ajouter</button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h3>À faire plus tard</h3>
                    <ul>
                      <li>
                        <input type="text" className="task-input" placeholder="Ajouter une tâche..." />
                        <button className="add-button">Ajouter</button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
