import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '../../styles/Home.module.css'
import {initializeApollo} from "../../lib/apolloClient";
import {gql, useQuery} from "@apollo/client";

type modalParam = {
    isShowing: boolean,
    id: string,
    toggle: any
}

const Modal = (props: modalParam) => {
    console.log("client SIDE")
    const MISSION_QUERY = gql`
  query missionsQuery {
    launch(id: "${props.id}") {
      mission_name
      launch_date_local
      launch_site {
        site_name
      }
      details
    }
  }
`;

    if (props.isShowing) {

        // fetch client-side data
        const {loading, error, data} = useQuery(MISSION_QUERY);

        if (error) return <>{"An error occured fetching data"}</>;
        if (loading) return <>{"Loading"}</>;

        // Pretty launch date
        const baseDate = new Date(data.launch.launch_date_local);
        const launchDate = baseDate.getDate() + '/' + (baseDate.getMonth() + 1) + '/' + baseDate.getFullYear();

        return (
            <div className={styles.modal}>
                <div className={styles.modal_content}>
                    <h1>Mission name: {data.launch.mission_name}</h1>
                    <p>Launch date: {launchDate}</p>
                    <p>Launch site: {data.launch.launch_site.site_name}</p>
                    <p>Mission description: {data.launch.details}</p>
                    <button onClick={props.toggle}/>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Modal