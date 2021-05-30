import React from 'react'
import Progress from './../../assets/progress.svg'
 import './index.scss'


const Loading = () => {
  return (
    <div className="loading">

    <div className="loader">
      <img src={Progress}/>
    </div>
    </div>
  )
}

export default Loading
