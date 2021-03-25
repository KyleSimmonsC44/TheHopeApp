import React, { useContext, useEffect } from "react";
import { RehabContext } from "./RehabProvider";
import { Link, useHistory } from "react-router-dom";
import "./Rehab.css";

// This module populates theRehabs page by returning the individualRehab cards fromRehab.js
export const RehabList = ({ props }) => {
  const { rehabs, getRehabs } = useContext(RehabContext);

  useEffect(() => {
    getRehabs();
  }, []);
  console.log(rehabs);

  const history = useHistory()
  return (
    <main className="rehabBody">

      <div className="emergencyContactInfo">
        <div className="leftDiv">

        If you are in a crisis: <br />
        National Suicide Prevention Lifeline | 1-800-273-TALK (8255) <br />
        Call one of the helplines listed below, or call 911.
        <br /> Find mental and/or substance use disorder treatment: Call the
        National Helpline,
        <br /> SAMHSA’s Treatment Referral and Routing Service, at
        1-800-662-HELP (4357).
        </div>

        <div className="middleDiv">
        Substance Use Agency Tennessee Department of Mental Health and Substance
        Abuse Services
        <br />
        500 Deaderick Street
        <br />
        Andrew Jackson Building, 5th Floor
        <br />
        Nashville, TN 37243
        <br />
        Phone Number: (800)-560-5767
        <br />
        Fax Number: (615)-532-2419
        <br />
        Web Site:
        https://www.tn.gov/behavioral-health/substance-abuse-services.html
        </div>

        <div className="rightDiv">
        Mental Health Agency
        <br />
        Tennessee Department of Mental Health and Substance Abuse Services
        <br />
        500 Deaderick Street
        <br />
        Andrew Jackson Building, 5th Floor
        <br />
        Nashville, TN 37243
        <br />
        Phone Number: (800)-560-5767
        <br />
        Fax Number: (615)-532-2419
        <br />
        Web Site:
        https://www.tn.gov/behavioral-health/mental-health-services.html
        <br />
        </div>
      </div>

      <h3 className="rehabH3">Rehabilitation Facilities in Nashville</h3>
      <div className="rehabFlex">
        {rehabs.map((r) => {
          return (
            <Link className="rehabLink" to={`/rehab/${r.id}`} key={r.id}>
              {r.name}
            </Link>
          );
        })}
      </div>
      <button className="rehabBack-button" onClick={()=>{history.push("/login")}}>Back</button>
      </main>
  );
};
