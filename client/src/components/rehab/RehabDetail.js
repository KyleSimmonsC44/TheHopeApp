import React, {useContext, useEffect, useState, useRef} from "react"
import { Link } from "react-router-dom"
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
            <a href={rehab.website}>{rehab.website}</a>
            <div>{rehab.treatment_programs}</div>
            <div>{rehab.program_length}</div>
            <div>{rehab.licensed ? "This facility is fully licensced for therapeutic recovery" : "This facility is not fully licensced for therapeutic recovery"}</div>
            <div>{rehab.dietian ? "This facility has a dietian on staff" : "This facility does not have a dietian on staff"}</div>
            <div>{rehab.aftercare ? "This facility provides aftercare" : "This facility does not provide aftercare"}</div>
            <div>{rehab.twelve_step ? "This facility strongly encourages 12-step work" : "This facility supports 12-step"}</div>
        </section>
    )
}