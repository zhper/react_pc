import { func } from "prop-types"
import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import axios from 'axios'

import { observer } from "mobx-react-lite"
import { rootStore } from './store/index'




function App () {
    console.log(rootStore)
    const { counterStore } = rootStore
    return (

        <div>
            {counterStore.count}
            <button onClick={counterStore.addCount}></button>
        </div>

    )
}






export default observer(App)  
