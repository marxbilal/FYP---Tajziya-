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
    const [fetchData, setFetchData] = useState(false);
    const [fetchType, setFetchType] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [clusterLabelColor, setClusterLabelColor] = useState([]);

    return (
        <Stack className="h-100">
            <Header setFetchType={setFetchType} setSearchKeyword={setSearchKeyword} setFetchData={setFetchData} fetchData={fetchData}></Header>

            <Tab setSelectedTab={setSelectedTab}></Tab>
            <div className={selectedTab === "media" ? "flex-grow-1 overflow-hidden" : "flex-grow-1 overflow-auto"}>
                <Cluster
                    display={selectedTab === "cluster"}
                    setFetchData={setFetchData}
                    setClusterLabelColor={setClusterLabelColor}
                    setFetchType={setFetchType}
                    fetchType={fetchType}
                    searchKeyword={searchKeyword}
                ></Cluster>
                <TagCloudPage
                    display={selectedTab === "tagcloud"}
                    fetchData={fetchData}
                    fetchType={fetchType}
                    clusterLabelColor={clusterLabelColor}
                    searchKeyword={searchKeyword}
                ></TagCloudPage>
                <Media
                    display={selectedTab === "media"}
                    fetchData={fetchData}
                    fetchType={fetchType}
                    clusterLabelColor={clusterLabelColor}
                    searchKeyword={searchKeyword}
                ></Media>
                <Help display={selectedTab === "help"}></Help>
            </div>
        </Stack>
    );
};

export default HomePage;
