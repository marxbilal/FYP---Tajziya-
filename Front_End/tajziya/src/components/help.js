import { useState } from "react";
import { Container, Row, Tab, Table, Tabs } from "react-bootstrap";

const Help = (props) => {
    const [key, setKey] = useState("cluster");

    console.log(key);

    const ClusterHelp = () => {
        return (
            <Container>
                <Row>
                    <div style={{ padding: 20 }}></div>
                    <h2>What are the features?</h2>
                    <p>
                        You can view clusters that are fetched live from twitter or you can upload your own file for to view its clusters. Each
                        cluster is color coded to make it easier to identify and at the left you can view the top keywords from each cluster. The
                        graph shows individual tweets and which cluster they fall into.
                    </p>
                    <div style={{ padding: 10 }}></div>
                    <h2>How to view clusters from a file?</h2>
                    <p>
                        You can upload your file by clicking on the file upload button and ensure that the file is in the following format. After
                        processing the clusters from the file will be visible. To switch back to live tweets you can click on the live button
                    </p>
                    <div style={{ padding: 10 }}></div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>tweets</th>
                                <th>timestamp(Optional)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <td> مثال کے طور پر میں ایک ٹویٹ ہوں۔ </td>
                                <td>Sun Apr 10 20:09:56 +0000 2022 </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    };

    const TagCloudHelp = () => {
        return (
            <Container>
                <Row>
                    <div style={{ padding: 20 }}></div>
                    <h2>What are the features?</h2>
                    <p>
                        You can view tag cloud of the clustered tweets to get better understanding of what the cluster is about. You can switch view
                        each cluster's tagcloud by clicking on the cluster name to switch.
                    </p>
                    <div style={{ padding: 10 }}></div>
                    <h2>How to view clusters from a file?</h2>
                    <p>
                        You can upload your file by clicking on the file upload button in the Cluster Page. To see more help on file upload view {""}
                        <a href="#" onClick={() => setKey("cluster")}>
                            Cluster Help
                        </a>
                    </p>
                    <div style={{ padding: 10 }}></div>
                </Row>
            </Container>
        );
    };

    const MediaHelp = () => {
        return (
            <Container>
                <Row>
                    <div style={{ padding: 20 }}></div>
                    <h2>What are the features?</h2>
                    <p>You can view all tweets and news</p>
                    <div style={{ padding: 10 }}></div>
                </Row>
            </Container>
        );
    };

    return (
        <div style={{ display: props.display ? "block" : "none" }}>
            <Container style={{ padding: 50 }}>
                <Tabs fill variant="pills" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="cluster" title="Cluster Page Help">
                        <ClusterHelp></ClusterHelp>
                    </Tab>
                    <Tab eventKey="tagcloud" title="TagCloud Page Help">
                        <TagCloudHelp></TagCloudHelp>
                    </Tab>
                    <Tab eventKey="media" title="Media Page Help">
                        <MediaHelp></MediaHelp>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default Help;
