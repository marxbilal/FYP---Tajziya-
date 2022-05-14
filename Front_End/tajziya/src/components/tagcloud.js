import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
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

    return (
        <div className={props.display ? "h-100" : "h-100 d-none"}>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col md={2}>
                        <ListGroup>
                            {/* <ClusterNames></ClusterNames> */}
                            <ListGroup.Item style={{ color: "red" }}>Cluster 0</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={10} className="d-flex align-items-center">
                        <style></style>
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
                        {/* <WordCloud></WordCloud> */}
                        {/* <WordCloud data={words} width={500} height={500} /> */}

                        {/* <img style={{ maxWidth: "100%" }} src={objectURL} alt="Tag Cloud"></img> */}
                        {/* <Image style={{ maxWidth: "100%", maxHeight: "100%" }} src={objectURL} alt="Tag Cloud"></Image> */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TagCloudPage;
