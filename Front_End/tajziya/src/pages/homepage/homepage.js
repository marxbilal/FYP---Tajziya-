import { useState } from "react";
import { Modal, Stack } from "react-bootstrap";
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
    const [toggle, setToggle] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <Stack className="h-100">
            <Header
                setFetchType={setFetchType}
                setToggle={setToggle}
                toggle={toggle}
                setSearchKeyword={setSearchKeyword}
                setFetchData={setFetchData}
                fetchData={fetchData}
                //setShow={setShow}
            ></Header>

            <Tab setSelectedTab={setSelectedTab}></Tab>
            <div className={selectedTab === "media" ? "flex-grow-1 overflow-hidden" : "flex-grow-1 overflow-auto"}>
                <Cluster
                    toggle={toggle}
                    setToggle={setToggle}
                    display={selectedTab === "cluster"}
                    setFetchData={setFetchData}
                    setClusterLabelColor={setClusterLabelColor}
                    setFetchType={setFetchType}
                    fetchType={fetchType}
                    searchKeyword={searchKeyword}
                ></Cluster>
                <TagCloudPage
                    toggle={toggle}
                    display={selectedTab === "tagcloud"}
                    fetchData={fetchData}
                    fetchType={fetchType}
                    clusterLabelColor={clusterLabelColor}
                    searchKeyword={searchKeyword}
                ></TagCloudPage>
                <Media
                    toggle={toggle}
                    display={selectedTab === "media"}
                    fetchData={fetchData}
                    fetchType={fetchType}
                    clusterLabelColor={clusterLabelColor}
                    searchKeyword={searchKeyword}
                ></Media>
                <Help display={selectedTab === "help"}></Help>
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
                    <Modal.Header>
                        <Modal.Title>Please Wait</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Searching for tweets</Modal.Body>
                </Modal>
            </div>
        </Stack>
    );
};

export default HomePage;
