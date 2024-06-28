import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(undefined);

  function setProject_2(newProject) {
    //iterate with key and value of data.scenes!!!!
    Object.keys(newProject?.scenes).forEach(key => {
      const scene = newProject?.scenes[key];
      Object.keys(scene.childChoices).forEach(key => {
        const event = scene.childChoices[key];
        Object.keys(event.event_characters).forEach(key => {

          event.event_characters[key] = {
            data: newProject?.characters.find(character => character.id === event.event_characters[key].id),
            EventCharacter: {...event.event_characters[key].EventCharacter}
          };
        });

        Object.keys(event.event_backgrounds).forEach(key => {
          event.event_backgrounds[key] = newProject?.backgrounds.find(background => background.id === event.event_backgrounds[key].id);
        });
      
        if(event.mugshot){
          event.mugshot = newProject?.characters.find(character => character.id === event.mugshot.id);
        }
      });
    });

    setProject(newProject);
  }

  function preprocess_incoming_project_data(data) {
    setProject_2(data);
  }

  function fetch_project_data(id) {
    axios.get(`http://localhost:8080/project/${id}`)
      .then(res => {
        preprocess_incoming_project_data(res.data);
      })
      // .catch(err => {
        
      //     console.error(err);
      //     setError('Failed to fetch project');
      // })
      // .finally();
  }

  // Fetch scenes from the backend 
  useEffect(() => {
    
      var idToUse = undefined;
      if (!project) {
          const urlParams = new URLSearchParams(window.location.search);
          idToUse = urlParams.get('project');
      } else {
          // if (project) return;
          idToUse = project.id;
      }
      if(!idToUse) return;

      fetch_project_data(idToUse);
  }, []);

  const saveScene = (scene) => {
    scene.childChoices = scene.childChoices.map((event, index) => {
      if(event.event_characters){
        event.event_characters = event?.event_characters.map(character => {
          return { ...character};
        });
      }
      if(event?.mugshot && typeof event.mugshot !== 'string'){
        event.mugshot = JSON.stringify(event.mugshot);
      }
      return event;
    });
    // Save scene to database
    axios.put(`http://localhost:8080/scene/${scene.id}`, {scene, project})
    .then(res => {
      console.log(res);
      if(res.status === 200) {
        alert(res.data.message);
      } else {
        alert("Error saving!");
      }
    })
  }

  return (
    <ProjectContext.Provider
      value={{
        project, setProject,
        saveScene,
        fetch_project_data
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
