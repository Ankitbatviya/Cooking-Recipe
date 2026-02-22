
import React from 'react'
import { Route, Routes  } from 'react-router-dom'
import HomePage from '../pages/Home'
import RecipePage from '../pages/RecipePage'
import AboutUs from '../pages/About'
import AllRecipes from '../pages/allRecipes'

function MyRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/recipe/:id' element={<RecipePage/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/Recipes' element={<AllRecipes/>}/>

      </Routes>
    </div>
  )
}

export default MyRoutes
