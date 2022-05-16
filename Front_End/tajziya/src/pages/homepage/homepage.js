import { useState } from "react";
import { Stack } from "react-bootstrap";
import Cluster from "../../components/cluster";
import Header from "../../components/header";
import Tab from "../../components/tab";
import TagCloudPage from "../../components/tagcloud";
import Help from "../../components/help";
import Media from "../../components/media";

const HomePage = () => {
    const [selectedTab, setSelectedTab] = useState("cluster");

    return (
        <Stack className="h-100">
            <Header></Header>

            <Tab setSelectedTab={setSelectedTab}></Tab>
            <div className={selectedTab == "media" ? "flex-grow-1 overflow-hidden" : "flex-grow-1 overflow-auto"}>
                <TagCloudPage display={selectedTab === "tagcloud"}></TagCloudPage>
                <Cluster display={selectedTab === "cluster"}></Cluster>
                <Help display={selectedTab === "help"}></Help>
                <Media display={selectedTab === "media"}></Media>
            </div>
        </Stack>
    );
};

export default HomePage;
