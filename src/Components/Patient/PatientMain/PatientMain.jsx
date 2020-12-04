import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Loader, Menu, Segment, Grid, Container} from 'semantic-ui-react';
import PatientOverview from '../PatientOverview/PatientOverview';
import PatientHistory from '../PatientHistory/PatientHistory';
import Medications from '../Medications/Medications';
import Immunizations from '../Immunizations/Immunizations';
import Visualization from '../Visualization/Visualization';
import ActiveProblems from '../ActiveProblems/ActiveProblems';





 const PatientMain = (props) => {
  const [item, setItem] = useState('overview'),
        [patient, setPatient] = useState({}),
  user = useSelector(state => state.authReducer),
  lang = useSelector(state => state.languageReducer.english);
  
  

  useEffect(() => {
    if(props.match.params.patientid){
      axios.get(`/api/patient/${props.match.params.patientid}`)

      .then(res => {
        setPatient(res.data[0])
      })
    }
  }, [])

  const handleItemClick = (e, { name }) => setItem(name);

  
  
  
  return(
    <div>
      <h1 style={{textAlign: 'center'}}>{patient.lastnm}, {patient.firstnm}</h1>
      <div className='patient-grid-container'>
      <Grid stackable  padded>
      <Grid.Row>
      <Grid.Column width={3} >
      {lang === true
      ?
      <Menu compact vertical>
        
        <Menu.Item
          name='overview'
          active={item === 'overview' || item === 'visión de conjunto'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='patient history'
          active={item === 'patient history' || item === 'historial del paciente'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='active problems'
          active={item === 'active problems' || item === 'problemas activos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='medications'
          active={item === 'medications' || item === 'medicamentos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='immunizations'
          active={item === 'immunizations' || item === 'inmunizaciones'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='visualization'
          active={item === 'visualization' || item === 'visualizaciones'}
          onClick={handleItemClick}
          />
      </Menu>
          
      // ////////////////////////////spanish menu////////////////////////////////////
      :
      
      <Menu compact vertical>
        <Menu.Item
          name='visión de conjunto'
          active={item === 'overview' || item === 'visión de conjunto'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='historial del paciente'
          active={item === 'patient history' || item === 'historial del paciente'}
          onClick={handleItemClick}
        />
          <Menu.Item
            name='problemas activos'
            active={item === 'active problems' || item === 'problemas activos'}
            onClick={handleItemClick}
          />
        <Menu.Item
          name='medicamentos'
          active={item === 'medications' || item === 'medicamentos'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='inmunizaciones'
          active={item === 'immunizations' || item === 'inmunizaciones'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='visualizaciones'
          active={item === 'visualization' || item === 'visualizaciones'}
          onClick={handleItemClick}
        />
      </Menu>
      }
      </Grid.Column>

      <Grid.Column  width={11}>
      <Segment>
        {item === 'overview' || item === 'visión de conjunto'
        ? <PatientOverview patient={patient}/>
        : null}

        {item === 'patient history' || item === 'historial del paciente'
        ? <PatientHistory patient={patient}/>
        : null}

        {item === 'active problems' || item === 'problemas activos'
        ? <ActiveProblems patient={patient}/>
        : null}

        {item === 'medications' || item === 'medicamentos'
        ? <Medications patient={patient}/>
        : null}

        {item === 'immunizations' || item === 'inmunizaciones'
        ? <Immunizations patient={patient}/>
        : null}

        {item === 'visualization' || item === 'visualizaciones'
        ? <Visualization patient={patient}/>
        : null}
      </Segment>
      </Grid.Column>
      </Grid.Row>
    
      </Grid>
      
      </div>
      </div>
  )
}

export default PatientMain