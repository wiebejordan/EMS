import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {useSelector} from 'react-redux';

const Medications = () => {
  const lang = useSelector(state => state.languageReducer.english)

  

  

    return (
      <div style={{height: '400px', width: '600px'}}>
      
      {lang === true
      ?
      <div>Medications</div>
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      <div>hola</div>
      }
      </div>
    )
  }


export default Medications;