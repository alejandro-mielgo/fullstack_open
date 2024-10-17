import { useState } from 'react'

const Form = ({handleSubmit,handleNameInput,handleTelephoneInput }) => {


    return(
        <form onSubmit={handleSubmit}>
        <div>
          Name: <input onChange={handleNameInput}/>
        </div>
        <div>
          Telephone: <input onChange={handleTelephoneInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      <br/><hr />
      </form>
    )
}

export default Form