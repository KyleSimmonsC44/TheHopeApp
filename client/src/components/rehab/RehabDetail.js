import React, {useContext, useEffect, useState, useRef} from "react"
import {RehabContext} from "./RehabProvider"

export const RehabDetails = (props) =>{
    const {getRehabsById, rehab} = useContext(RehabContext)

    useEffect(()=>{
        getRehabsById(props.match.params.id)
    },[])
    console.log(rehab)
    return(
        
        <section className="rehabDetCard">
            <h3>{rehab.name}</h3>
            <div>{rehab.number}</div>
            <div>{rehab.website}</div>
            <div>{rehab.treatment_programs}</div>
            <div>{rehab.program_length}</div>
            <div>Booleans</div>
            <div>{rehab.licensced}</div>
            <div>{rehab.dietian}</div>
            <div>{rehab.aftercare}</div>
            <div>{rehab.twelve_step}</div>
        </section>
    )
}