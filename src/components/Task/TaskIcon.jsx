import React from 'react';
import styled from 'styled-components';
import alter from '../../assets/img/task/icons/alter.png';
import manger from '../../assets/img/task/icons/manger.png';
import crayon from '../../assets/img/task/icons/crayon.png';
import achat from '../../assets/img/task/icons/achat.png';
import call from '../../assets/img/task/icons/call.png';
import listen from '../../assets/img/task/icons/listen.png';
import see from '../../assets/img/task/icons/see.png';
import drink from '../../assets/img/task/icons/drink.png';
import note from '../../assets/img/task/icons/note.png';

const TaskImage = styled.img`
  width: 30px;
  height: 30px;
  border: 3px solid #0002;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 8px;
`;


const getImageForTask = (title) => {
  if (title.match(/sport|pompes|abdos/i)) {
    return alter;
  } else if (title.match(/repas|cuisiner|manger/i)) {
    return manger;
  } else if (title.match(/lire|écrire|ecrire|dessin|code/i)) {
    return crayon;
  } else if (title.match(/acheter|course/i)) {
    return achat;
  } else if (title.match(/appel|telephone|téléphone/i)) {
    return call;
  } else if (title.match(/ecoute|écouter|poadcast|musique/i)) {
    return listen;
  } else if (title.match(/voir|regarder/i)) {
    return see;
  } else if (title.match(/boire| eau/i)) {
    return drink;
  } else {
    return note;
  }
};

const TaskIcon = ({ title }) => {
  const imageSrc = getImageForTask(title);
  return <TaskImage src={imageSrc} alt="Task icon" style={{ width: '30px', height: '30px', borderRadius: '25px' }} />;
};

export default TaskIcon;