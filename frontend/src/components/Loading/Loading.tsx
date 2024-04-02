import React from 'react';
import Styles from './Loading.module.css';
import gif1 from '../../assets/img/RGv5qDO9hu.gif'


const Loading: React.FC = () => {
  return (
    <div className={Styles.errorContainer}>
      <img src={gif1} alt="Loading" />
    </div>
  );
}

export default Loading;
