import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'


const SideBar = () => {
  const [Extended, setExtended] = useState(false)
  const { onSent, prevPrompt, setRecentPrompt ,newChat} = useContext(Context)

  const loadPrompt = async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
        <div className="new-chat" onClick={()=>newChat()}>
          <img src={assets.plus_icon} alt="" />
          {Extended ? <p> New Chat </p> : null}
        </div>
        {Extended ? <div className="recent">
          <p className="recent-title"> Recent</p>
              {prevPrompt.map((item, index) => {
                return (
                  <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index} >
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)} ...</p>
                  </div>
                )
              })}

        </div> : null}

      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {Extended ? <p> Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {Extended ? <p> Acitivity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {Extended ? <p> Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default SideBar