import axios from "axios";
import { Bubble } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Button, Container, Col, Row, ListGroup, Accordion, Placeholder, Card, Spinner, Form, Modal } from "react-bootstrap";

const Clustering = (props) => {
    const [clusterData, setClusterData] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [file, setFile] = useState({ selectedFile: null });
    const [live, setLive] = useState(true);
    const [show, setShow] = useState(false);
    // const [liveFetch, setLiveFetch] = useState(true);

    useEffect(() => {
        Chart.register(...registerables);
    });

    const onFileChange = (event) => {
        setFile({ selectedFile: event.target.files[0] });
    };

    const onFileUpload = () => {
        props.setFetchData(false);
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
                    props.setFetchType("file");
                    props.setFetchData(true);
                })
                .catch((error) => {
                    setShow(true);
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (props.fetchType == "search") {
            setLive(false);
            setClusterData([]);
            setKeywords([]);
        }
        if (live == true || props.fetchType == "search") {
            console.log("Cluster fetching");
            axios
                .post("http://localhost:8000/cluster/" + props.fetchType, {})
                .then((res) => {
                    setClusterData(res.data.data);
                    setKeywords(res.data.keywords);
                    let temp = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        temp.push({
                            label: res.data.data[i].label,
                            color: res.data.data[i].backgroundColor,
                        });
                    }
                    props.setClusterLabelColor(temp);
                    props.setFetchData(true);
                })
                .catch((error) => {
                    setShow(true);
                    console.log(error);
                });
        }
    }, [live, props.toggle]);

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
                            color: ${clusterData[i].backgroundColor} !important;
                            font-weight: bold;
                            }
                            `}
                    </style>
                    <h2 className="accordion-header">
                        <Accordion.Button className={"custom-header-" + i}>{"Cluster " + keywords[i].cluster}</Accordion.Button>
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
        scales: {
            y: {
                ticks: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";

                        if (label) {
                            return keywords[parseInt(label)].words;
                        }
                        return label;
                    },
                },
            },
        },
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
                                        setClusterData([]);
                                        setKeywords([]);
                                        props.setFetchType("");
                                        props.setFetchData(false);
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
