import React from "react";
import styles from "../../styles/Home.module.css";
import Modal from "./modal"

type Mission = {
    id : string,
    mission_name: string,
    launch_date_local: string,
    links: {
      mission_patch: string
      flickr_images: string[]
    }
    rocket: {
      rocket_name: string
    }
}


// Props interface for the grid
interface MissionsProps {
    missions: Mission[]
}

// Props interface for a mission card
interface MissionProps {
    mission: Mission
}

// State interfacer for a mission card
interface MissionState {
    showing: boolean
}

// Card to show a mission
class MissionCard extends React.Component<MissionProps, MissionState> {

    constructor(props: MissionProps) {
        super(props);
        this.state = {
            showing: false
        }
        this.setShowing = this.setShowing.bind(this)
    }

    setShowing() {
        console.log('update state')
        this.setState({
            showing: !this.state.showing
        })
    }

    render() {
        // Avoid props repetition
        const mission = this.props.mission

        // Image source setup
        let imageLink = mission.links.mission_patch
        if (imageLink === null && mission.links.flickr_images.length > 0) {
            imageLink = mission.links.flickr_images[0]
        }

        // Pretty launch date
        const baseDate = new Date(mission.launch_date_local);
        const launchDate = baseDate.getDate() + '/' + (baseDate.getMonth() + 1) + '/' + baseDate.getFullYear();

        return (
            <div className={styles.card} onClick={this.setShowing}>
                <div className={styles.card_img}>
                    {/*Image source check*/}
                    {imageLink != null ? <img src={imageLink} className={styles.mission_img}/> : <p>Unable to fetch an image</p>}   
                </div>
                <div className={styles.card_info}>
                    <p className={styles.card_rocket}>{mission.rocket.rocket_name}</p>
                    <p className={styles.card_date}>{launchDate}</p>
                </div>
                <p className={styles.card_title} >{mission.mission_name}</p>
                <Modal isShowing={this.state.showing} toggle={this.setShowing} id={mission.id}/>
            </div>
        )
    }
}


// Grid component for the missions' cards
export default class MissionGrid extends React.Component<MissionsProps> {
    render() {
        return (
            <div className={styles.grid}>
                {this.props.missions.map(elt => {
                    return <MissionCard mission={elt}/>
                })}
            </div>
        )
    }
}