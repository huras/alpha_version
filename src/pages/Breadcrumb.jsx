import React from 'react'
import { Button } from 'react-bootstrap';

function Breadcrumb({project = undefined,scene = undefined,event  = undefined}) {
  var breadcrump = undefined;
  if(project){
    breadcrump = <a href={`/project?id=${project.id}`}>
        Project: {project.title}
    </a>
  }
  if(scene){
    breadcrump = <div>
      <a variant="primary" href={`/project?id=${scene.parentProject.id}`}>
        Project: {scene.parentProject.title}
      </a>
      {` > `}
      <a variant="primary" href={`/scene?id=${scene.id}`}>
        Scene: {scene.title}
      </a>
    </div>
  }
  if(event){
    breadcrump = <div>
      <a variant="primary" href={`/project?id=${project.id}`}>
        Project: {event.scene.project.title}
      </a>
      {` > `}
      <a variant="primary" href={`/scene?id=${scene.id}`}>
        Scene: {event.scene.title}
      </a>
      {` > `}
      <a variant="primary" hreaf={`/event?id=${event.id}`}>
        Event: {event.order}
      </a>
    </div>
  }
  return breadcrump
}

export default Breadcrumb