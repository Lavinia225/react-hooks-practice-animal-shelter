import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilter(value){
    setFilters({type: value})
  }

  function handleFind(){
    let url;
    console.log(filters)
    if (filters.type === 'all'){
      url = ''
    }
    if (filters.type === 'dog'){
      url = '?type=dog'
    }
    if(filters.type === 'cat'){
      url = '?type=cat'
    }
    if(filters.type === 'micropig'){
      url = '?type=micropig'
    }

    fetch(`http://localhost:3001/pets${url}`)
    .then(res => res.json())
    .then(pets => setPets(pets))
  }

  function handleAdopt(id){
    setPets(pets.map(pet =>{
      if (pet.id === id){
        pet.isAdopted = true
        return pet
      }
      else{
        return pet
      }
    }))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleFilter} onFindPetsClick={handleFind}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser onAdoptPet={handleAdopt} pets={pets}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
