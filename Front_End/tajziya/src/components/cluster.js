import axios from "axios";
import { Bubble } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Button, Container, Col, Row, ListGroup, Accordion, Placeholder, Card, Spinner, Form } from "react-bootstrap";
Chart.register(...registerables);

const Clustering = (props) => {
    const [clusterData, setClusterData] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [file, setFile] = useState({ selectedFile: null });
    const [live, setLive] = useState(true);
    const [liveFetch, setLiveFetch] = useState(true);

    const onFileChange = (event) => {
        setFile({ selectedFile: event.target.files[0] });
    };

    const onFileUpload = () => {
        const formData = new FormData();
        if (file.selectedFile == null) alert("No file Selected");
        else {
            setClusterData([]);
            setKeywords([]);
            formData.append("file", file.selectedFile, file.selectedFile.name);

            axios
                .post("http://localhost:8000/cluster/file", formData)
                .then((res) => {
                    setClusterData(res.data.data);
                    setKeywords(res.data.keywords);
                    setLive(false);

                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const FileData = () => {
        if (file.selectedFile) {
            return (
                <div>
                    <h3>File Details:</h3>
                    <p>File Name: {file.selectedFile.name}</p>
                    <p>Last Modified: {file.selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    useEffect(() => {
        console.log("clusterData");
        axios
            .post("http://localhost:8000/cluster", {})
            .then((res) => {
                setClusterData(res.data.data);
                setKeywords(res.data.keywords);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [liveFetch]);

    const Labels = () => {
        let AccordianList = [];
        for (let i = 0; i < keywords.length; i++) {
            let ItemList = [];
            for (let j = 0; j < keywords[i].words.length; j++) {
                ItemList.push(<ListGroup.Item key={i + "&" + j}>{keywords[i].words[j]}</ListGroup.Item>);
            }
            AccordianList.push(
                <Accordion.Item key={i} eventKey={i}>
                    <style type="text/css">
                        {`
                            .${"custom-header-" + i} {
                            color: ${clusterData[i].backgroundColor};
                            }
                            `}
                    </style>
                    <h2 className="accordion-header">
                        <Accordion.Button className={"custom-header-" + i}>{"Cluster" + keywords[i].cluster}</Accordion.Button>
                    </h2>

                    <Accordion.Body>
                        <ListGroup variant="flush" dir="rtl">
                            {ItemList}
                        </ListGroup>
                    </Accordion.Body>
                    {/* <Accordion.Body>{keywords[i].words.toString()}</Accordion.Body> */}
                </Accordion.Item>
            );
        }
        return AccordianList;
    };

    const LeftMenu = () => {
        const content =
            keywords.length === 0 ? (
                <div>
                    <Card>
                        <Card.Body>
                            <Placeholder as="p" animation="glow" className="my-1">
                                <Placeholder xs={8} /> <Placeholder xxl={2} />
                                <Button disabled className="accordion-button collapsed p-0 m-0 ms-3 w-auto bg-white d-inline-flex"></Button>
                            </Placeholder>
                        </Card.Body>
                    </Card>
                    <Card className="my-1">
                        <Card.Body>
                            <Placeholder as="p" animation="glow" className="my-1">
                                <Placeholder xs={8} /> <Placeholder xxl={2} />
                                <Button disabled className="accordion-button collapsed p-0 m-0 ms-3 w-auto bg-white d-inline-flex"></Button>
                            </Placeholder>
                        </Card.Body>
                    </Card>
                    <Card className="my-1">
                        <Card.Body>
                            <Placeholder as="p" animation="glow" className="my-1">
                                <Placeholder xs={8} /> <Placeholder xxl={2} />
                                <Button disabled className="accordion-button collapsed p-0 m-0 ms-3 w-auto bg-white d-inline-flex"></Button>
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <Accordion alwaysOpen>
                    <Labels></Labels>
                </Accordion>
            );
        return content;
    };

    const Body = () => {
        const content =
            clusterData.length === 0 ? (
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <Spinner animation="border" style={{ width: "20rem", height: "20rem", borderWidth: "1rem" }} />
                </div>
            ) : (
                <Bubble options={options} data={{ datasets: clusterData }} />
            );
        return content;
    };

    const options = {
        responsive: true,
    };

    return (
        <div className={props.display ? "h-100" : "h-100 d-none"}>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col md={2}>
                        <LeftMenu></LeftMenu>
                    </Col>
                    <Col md={10} className="overflow-auto">
                        <div className="h-100 ">
                            <div>
                                <Form.Group as={Row} controlId="formFile" className="mb-3">
                                    <Form.Label column xs="2" className="text-nowrap pe-0">
                                        File Clustering
                                    </Form.Label>
                                    <Col xs="9">
                                        <Form.Control type="file" onChange={onFileChange} />
                                    </Col>
                                </Form.Group>
                                <Button onClick={onFileUpload} className="mx-1" disabled={clusterData.length === 0 ? true : false}>
                                    {clusterData.length === 0 ? "Loading.." : "Upload"}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setLive(true);
                                        setLiveFetch(true);
                                        setClusterData([]);
                                        setKeywords([]);
                                    }}
                                    variant={live ? "success" : "outline-success"}
                                    disabled={live ? true : false}
                                >
                                    {live ? "Live" : "View Live"}
                                </Button>
                            </div>

                            <Body></Body>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Clustering;
