import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Modal, Placeholder, Row, Tab } from "react-bootstrap";
import "./leftmenu.css";

const Media = (props) => {
    const [expand, setExpand] = useState(false);
    const [data, setData] = useState([]);
    const [type, setType] = useState("live");
    const [show, setShow] = useState(false);
    // const [toggle, setToggle] = useState("#0&");

    useEffect(() => {
        if (props.fetchData) {
            console.log(" I AM RUNNING BEFORE CLUSTER");
            axios
                .post("http://localhost:8000/media/" + props.fetchType, {})
                .then((res) => {
                    setData(res.data);
                })
                .catch((error) => {
                    setShow(true);
                    console.log(error);
                });
        } else {
            setData([]);
        }
    }, [props.fetchData, props.toggle]);

    const ClusterNames = () => {
        let ListItem = [];
        for (let i = 0; i < data.length; i++) {
            let color = "black";
            for (let j = 0; j < props.clusterLabelColor.length; j++) {
                if (props.clusterLabelColor[j].label == data[i][0].label.split(" ")[1]) {
                    color = props.clusterLabelColor[j].color;
                }
            }
            ListItem.push(
                <div>
                    <style type="text/css">
                        {`
                            .${"media-header-" + i} {
                            color: ${color} !important;
                            font-weight: bold;
                            }
                            `}
                    </style>
                    <ListGroup.Item action href={"#" + i + "&"} key={i + "labelmediakey"} className={"media-header-" + i}>
                        {data[i][0].label}
                    </ListGroup.Item>
                </div>
            );
        }
        return ListItem;
    };

    const Content = () => {
        let ListItem = [];
        let ListContent = [];
        for (let i = 0; i < data.length; i++) {
            ListItem = [];
            for (let j = 0; j < data[i].length; j++) {
                ListItem.push(
                    <ListGroup.Item key={"media" + i + "&" + j + 5}>
                        <Container>
                            <Row>
                                <Col md={11}>{/* <h2>{data[i][j].tweet.split(" ").slice(0, 2).join(" ")}</h2> */}</Col>
                                <Col md={1} className="d-flex align-items-center">
                                    <strong className="font-weight-bolder m-0">{data[i][j].type}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <p className="text-justify">
                                    {data[i][j].tweet}
                                    <a href="#" onClick={() => {}}></a>
                                    {}
                                </p>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                );
            }
            ListContent.push([
                <Tab.Pane eventKey={"#" + i + "&"}>
                    <ListGroup>{ListItem}</ListGroup>
                </Tab.Pane>,
            ]);
        }
        return ListContent;
    };

    const Body = () => {
        const content =
            data.length === 0 ? (
                <div>
                    <Card>
                        <Card.Body>
                            <Placeholder as="h2" animation="glow">
                                <Placeholder xs={4} size="sm" />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={8} /> <Placeholder xs={3} />
                                <Placeholder xs={2} /> <Placeholder xs={8} /> <Placeholder xs={1} />
                                <Placeholder xs={5} /> <Placeholder xs={4} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Placeholder as="h2" animation="glow">
                                <Placeholder xs={4} size="sm" />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={8} /> <Placeholder xs={3} />
                                <Placeholder xs={2} /> <Placeholder xs={8} /> <Placeholder xs={1} />
                                <Placeholder xs={5} /> <Placeholder xs={4} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Placeholder as="h2" animation="glow">
                                <Placeholder xs={4} size="sm" />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={8} /> <Placeholder xs={3} />
                                <Placeholder xs={2} /> <Placeholder xs={8} /> <Placeholder xs={1} />
                                <Placeholder xs={5} /> <Placeholder xs={4} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <Tab.Content className="overflow-auto h-100">
                    <Content></Content>
                </Tab.Content>
            );
        return content;
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
                <ListGroup defaultActiveKey={"#" + 0 + "&"}>
                    <ClusterNames></ClusterNames>
                </ListGroup>
            );
        return content;
    };

    return (
        <div className={props.display ? " h-100" : "h-100 d-none"}>
            <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error Occured</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please refresh page</Modal.Body>
            </Modal>
            <Tab.Container id="media" defaultActiveKey="#0&" fluid className="h-100">
                <Row className="h-100">
                    <Col md={2} className="ms-2">
                        <LeftMenu></LeftMenu>
                    </Col>
                    <Col md={9} className=" h-100">
                        <Body></Body>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Media;
