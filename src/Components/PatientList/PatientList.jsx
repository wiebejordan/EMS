import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import axios from 'axios';
import '../../styles/style.scss'



const useSortableData = (items, config = null, props) => {
  const [sortConfig, setSortConfig] = useState(config),
    [searchVal, setSearchVal] = useState(""),
    [english, setEnglish] = useState(true),
    [patientList, setPatientList] = useState([]),
    [loading, setLoading] = useState(true);
    console.log(patientList)
    console.log(loading)

  useEffect(() => {
    
    getPatients()
  
  }, [])

  useEffect(() => {
    if(patientList.length > 0){
      setTimeout(() => {

        setLoading(false)
      }, 1000)
    }
  }, [patientList])

  


  const getPatients = () => {
    let isCurrent = true
    axios.get('/api/patients')

    .then(res => {
      if(isCurrent){
        setPatientList(res.data) 
      }
    })
    return () => {
      isCurrent = false
    }
    
  }

  const handleEnglish = () => {
    setEnglish(!english);
  };

  const handleSearch = (e) => {
    setSearchVal(e);
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...patientList];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return {
    items: sortedItems,
    requestSort,
    sortConfig,
    handleSearch,
    searchVal,
    patientList,
    english,
    handleEnglish,
    loading
  };
};

const ProductTable = (patientList, props) => {
  const {
    items,
    requestSort,
    sortConfig,
    handleSearch,
    searchVal,
    english,
    handleEnglish,
  } = useSortableData(patientList);
  

  const state = useSelector(state => state.languageReducer),
        user = useSelector(state => state.authReducer),
        history = useHistory();
  
  
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  
  return (
    <div className='patientlist-container'>
      
      <div>
        {state.english === true ? (
          <div className='searchbar'>
            <h4>Search:</h4>
            <input
              name="searchVal"
              value={searchVal}
              placeholder="search by name, DOB, patient #"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        ) : (
          <div className='searchbar'>
            <h4>Buscar:</h4>
            <input
              name="searchVal"
              value={searchVal}
              placeholder="buscar por nombre, edad..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {state.english === true ? (
      <>
      <h1>Patient List</h1>
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("id")}
                className={getClassNamesFor("id")}
              >
                Patient ID
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Name
              </button>
            </th>
            {/* <th>
              <button
                type="button"
                onClick={() => requestSort("age")}
                className={getClassNamesFor("age")}
              >
                Age
              </button>
            </th> */}
            <th>
              <button
                type="button"
                onClick={() => requestSort("dob")}
                className={getClassNamesFor("dob")}
              >
                D.O.B.
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) => {
              let objString = JSON.stringify(item);
              return objString.toLowerCase().includes(searchVal.toLowerCase());
            })
            .map((item) => (
              <tr key={item.patientid}>
                <td>{item.patientid}</td>
                <Link style={{textDecoration: 'none'}} to={`/patient/${item.patientid}`}>
             <td className='patient-name'>{item.lastnm}, {item.firstnm}</td>
                </Link>
                {/* <td>{item.age}</td> */}
                <td>{item.birthdts}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </>)
    : (
      <>
      <h1>Lista de Pacientes</h1>
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("id")}
                className={getClassNamesFor("id")}
              >
                Paciente ID
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Nombre
              </button>
            </th>
            {/* <th>
              <button
                type="button"
                onClick={() => requestSort("age")}
                className={getClassNamesFor("age")}
              >
                Años
              </button>
            </th> */}
            <th>
              <button
                type="button"
                onClick={() => requestSort("dob")}
                className={getClassNamesFor("dob")}
              >
                D.O.B.
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) => {
              let objString = JSON.stringify(item);
              return objString.toLowerCase().includes(searchVal.toLowerCase());
            })
            .map((item) => (
              <tr key={item.patientid}>
                <td>{item.patientid}</td>
                <Link to={`/patient/${item.patientid}`}>
            <td>{item.lastnm}, {item.firstnm}</td>
                </Link>
                {/* <td>{item.age}</td> */}
                <td>{item.birthdts}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </>)}
    </div>
  );
};

function PatientTable(patientList) {
  const state = useSelector(state => state.languageReducer),
        user = useSelector(state => state.authReducer),
        history = useHistory();
        const {
          items,
          requestSort,
          sortConfig,
          handleSearch,
          searchVal,
          english,
          handleEnglish,
          loading,
        } = useSortableData(patientList);

  useEffect(() => {
    if(!user.user.username){
      history.push('/')}
  })

  return (
    <div className="App">
      {/* {loading === true 
      ? <div>hey</div>
      : */}
      <ProductTable />
      {/* } */}
    </div>
  );
}

export default (PatientTable);
