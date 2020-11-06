import React, {useState, useEffect} from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getLang} from '../../Redux/languageReducer';


const mapStateToProps = (reduxState) => reduxState; 


const langOptions = [
  {
    key: 'English',
    text: 'English',
    value: 'true'
  },
  {
    key: 'Spanish',
    text: 'Spanish',
    value: 'false'
  }

]

const Nav = (props) => {
  const [isEnglish, setIsEnglish] = useState(true);

 const handleLang = () => {
    setIsEnglish(!isEnglish)
    getLang(!isEnglish)
  }

  useEffect(() => {
    console.log(isEnglish);
    console.log(props.languageReducer)
  });

  return(
    <div>
    <Menu text>
        <Menu.Item header>J.E.F.F. EMS</Menu.Item>
        <Menu.Item header>Wiebe, Cicely</Menu.Item>
        <Menu.Item
          name='Logout'
          
        />
        
      </Menu>
      <Dropdown
      placeholder='English'
      defaultValue='true'
      selection
      options={langOptions}
      onChange={handleLang}/>
      </div>
  )
}

export default connect(mapStateToProps, {getLang})(Nav);