import { useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import Cluster from "../../components/cluster";
import Header from "../../components/header";
import Tab from "../../components/tab";

const ClusterPage = () => {
    const [clusterLabels, setClusterLabels] = useState([]);
    return (
        <div>
            <Stack gap={2}>
                <Header></Header>
                <Tab></Tab>
                <Cluster></Cluster>
            </Stack>
            {/* <Container fluid>
                <Row>
                    <Col>
                        <Header></Header>
                    </Col>s
                </Row>
                <Row>
                    <Col>
                        <Tab></Tab>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Cluster></Cluster>
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
};

export default ClusterPage;
