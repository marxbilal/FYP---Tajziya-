import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Placeholder, Row, Spinner } from "react-bootstrap";
import ReactWordcloud from "react-wordcloud";
import words from "./words";

const TagCloudPage = (props) => {
    const [clusterLabels, setClusterLabels] = useState([]);
    const [objectURL, setUrl] = useState();

    // useEffect(() => {
    //     fetch("http://localhost:8000/tagcloud")
    //         .then((res) => res.blob())
    //         .then(function (myBlob) {
    //             setUrl(URL.createObjectURL(myBlob));
    //         });
    // }, []);

    const ClusterNames = () => {
        let ListItem = [];
        for (let i = 0; i < clusterLabels.length; i++) {
            ListItem.append(<ListGroup.Item style={{ color: clusterLabels[i].color }}>{clusterLabels[i].label}</ListGroup.Item>);
        }
        return ListItem;
    };

    const LeftMenu = () => {
        const content =
            clusterLabels.length === 0 ? (
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
                <ListGroup>
                    <ClusterNames></ClusterNames>
                </ListGroup>
            );
        return content;
    };

    const Body = () => {
        const content =
            clusterLabels.length === 0 ? (
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <Spinner animation="border" style={{ width: "20rem", height: "20rem", borderWidth: "1rem" }} />
                </div>
            ) : (
                <ReactWordcloud
                    options={{
                        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
                        enableTooltip: true,
                        deterministic: true,
                        fontFamily: "courier new",
                        fontSizes: [40, 60],
                        fontStyle: "normal",
                        fontWeight: "normal",
                        padding: 1,
                        rotations: 0,
                        scale: "sqrt",
                        spiral: "archimedean",
                    }}
                    words={words}
                ></ReactWordcloud>
            );
        return content;
    };

    return (
        <div className={props.display ? "h-100" : "h-100 d-none"}>
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
