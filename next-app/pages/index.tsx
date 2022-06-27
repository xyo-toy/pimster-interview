import {gql, useQuery} from "@apollo/client";
import type {GetStaticProps, NextPage} from "next";
import HomePageHead from "../components/head/homePageHead";
import MissionGrid from "../components/body/missionGrid"
import {initializeApollo} from "../lib/apolloClient";
import styles from "../styles/Home.module.css";

const MISSIONS_QUERY = gql`
  query missionsQuery {
    launchesPast {
      id
      mission_name
      launch_date_local
      links {
        mission_patch
        flickr_images
      }
      rocket {
        rocket_name
      }
    }
}
`;

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

const Home: NextPage = (props: any) => {

  return (
    <div className={styles.container}>
      <HomePageHead />
      {/* Your code goes here */}
      <MissionGrid missions={props.missions}/>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log("SERVER SIDE")
  const apolloClient = initializeApollo();

  const {data} = await apolloClient.query({query: MISSIONS_QUERY});

  return {
    props: {
      missions: data.launchesPast
    },
  };
};

export default Home;
