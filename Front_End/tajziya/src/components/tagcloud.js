import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Modal, Placeholder, Row, Spinner } from "react-bootstrap";
import ReactWordcloud from "react-wordcloud";

const TagCloudPage = (props) => {
    const [data, setData] = useState([]);
    const [cluster, setCluster] = useState(0);
    const [activeTab, setActiveTab] = useState("#0&");
    const [localRerun, setLocalRerun] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (props.fetchData) {
            console.log(props.fetchType);
            axios
                .post("http://localhost:8000/tagcloud/" + props.fetchType, {})
                .then((res) => {
                    if (res.data) {
                        setData(res.data);
                    }
                })
                .catch((error) => {
                    setShow(true);
                    console.log(error);
                });
        } else {
            setData([]);
        }
    }, [props.fetchData, props.toggle, localRerun]);

    const ClusterNames = () => {
        let ListItem = [];
        for (let i = 0; i < data.length; i++) {
            let color = "black";
            for (let j = 0; j < props.clusterLabelColor.length; j++) {
                if (props.clusterLabelColor[j].label == data[i].label.split(" ")[1]) {
                    color = props.clusterLabelColor[j].color;
                }
            }

            ListItem.push(
                <div>
                    <style type="text/css">
                        {`
                            .${"tagcloud-header-" + i} {
                            color: ${color} !important;
                            font-weight: bold;
                            }
                            `}
                    </style>
                    <ListGroup.Item action href={"#" + i + "&"} key={i + "labelmediakey"} className={"tagcloud-header-" + i}>
                        {data[i].label}
                    </ListGroup.Item>
                </div>
            );
        }
        return ListItem;
    };

    const LeftMenu = () => {
        const content =
            data.length === 0 ? (
                <div>
                    <Card>
                        <Card.Body>
                            <Placeholder as="p" animation="glow" className="my-1">
                                <Placeholder xs={8} /> <Placeholder xs={3} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                    <Card className="my-1">
                        <Card.Body>
                            <Placeholder as="p" animation="glow" className="my-1">
                                <Placeholder xs={8} /> <Placeholder xs={3} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                    <Card className="my-1">
                        <Card.Body>
                            <Placeholder as="p" animation="glow" className="my-1">
                                <Placeholder xs={8} /> <Placeholder xs={3} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <ListGroup
                    defaultActiveKey={activeTab}
                    onSelect={(key) => {
                        setActiveTab(key);
                        setCluster(parseInt(key.substring(1, 2)));
                    }}
                >
                    <ClusterNames></ClusterNames>
                </ListGroup>
            );
        return content;
    };

    const Body = () => {
        const content =
            data.length === 0 ? (
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <Spinner animation="border" style={{ width: "20rem", height: "20rem", borderWidth: "1rem" }} />
                </div>
            ) : (
                <ReactWordcloud
                    options={{
                        direction: "rtl",
                        dir: "rtl",
                        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
                        enableTooltip: false,
                        deterministic: true,
                        fontFamily: "courier new",
                        fontSizes: [40, 60],
                        fontStyle: "normal",
                        fontWeight: "normal",
                        padding: 2,
                        rotations: 0,
                        scale: "sqrt",
                        spiral: "archimedean",
                    }}
                    direction="rtl"
                    dir="rtl"
                    words={data[cluster].data}
                ></ReactWordcloud>
            );
        return content;
    };

    return (
        <div className={props.display ? "h-100" : "h-100 d-none"}>
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error Occured</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please refresh page</Modal.Body>
            </Modal>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col md={2}>
                        <LeftMenu></LeftMenu>
                    </Col>
                    <Col md={10} className="d-flex align-items-center justify-content-center">
                        <Body></Body>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TagCloudPage;
