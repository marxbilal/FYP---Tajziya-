import { CacheProvider } from "@emotion/react";
import { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Placeholder, Row } from "react-bootstrap";

const Media = (props) => {
    const [expand, setExpand] = useState(false);
    const [clusterLabels, setClusterLabels] = useState([]);

    const ClusterNames = () => {
        // let ListItem = [];
        // for (let i = 0; i < clusterLabels.length; i++) {
        //     ListItem.append(<ListGroup.Item style={{ color: clusterLabels[i].color }}>{clusterLabels[i].label}</ListGroup.Item>);
        // }
        // return ListItem;
    };

    const Content = () => {
        return (
            <ListGroup className=" overflow-auto h-100">
                <ListGroup.Item>
                    <Container className="py-2">
                        <Row>
                            <Col md={11}>
                                <h2>Headline</h2>
                            </Col>
                            <Col md={1} className="d-flex align-items-center">
                                <strong className="font-weight-bolder m-0">Type</strong>
                            </Col>
                        </Row>
                        <Row>
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius turpis nec eros rutrum scelerisque. Curabitur
                                volutpat, sem in pellentesque ornare, dolor tellus feugiat nunc, eget convallis tellus arcu ac sem. Pellentesque a leo
                                efficitur massa scelerisque venenatis. Praesent aliquet ligula eget ligula ultrices, in tincidunt nulla condimentum.
                                Vivamus molestie elit ac erat ornare, vel tincidunt urna ullamcorper. Proin pharetra nunc id neque tincidunt sagittis.
                                Duis aliquam sollicitudin sapien eget elementum. Mauris ullamcorper dictum porta.<a href="#" onClick={() => {}}></a>
                                {}
                            </p>
                        </Row>
                    </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Container className="py-2">
                        <Row>
                            <Col md={11}>
                                <h2>Headline</h2>
                            </Col>
                            <Col md={1} className="d-flex align-items-center">
                                <strong className="font-weight-bolder m-0">Type</strong>
                            </Col>
                        </Row>
                        <Row>
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius turpis nec eros rutrum scelerisque. Curabitur
                                volutpat, sem in pellentesque ornare, dolor tellus feugiat nunc, eget convallis tellus arcu ac sem. Pellentesque a leo
                                efficitur massa scelerisque venenatis. Praesent aliquet ligula eget ligula ultrices, in tincidunt nulla condimentum.
                                Vivamus molestie elit ac erat ornare, vel tincidunt urna ullamcorper. Proin pharetra nunc id neque tincidunt sagittis.
                                Duis aliquam sollicitudin sapien eget elementum. Mauris ullamcorper dictum porta.
                            </p>
                        </Row>
                    </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Container className="py-2">
                        <Row>
                            <Col md={11}>
                                <h2>Headline</h2>
                            </Col>
                            <Col md={1} className="d-flex align-items-center">
                                <strong className="font-weight-bolder m-0">Type</strong>
                            </Col>
                        </Row>
                        <Row>
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius turpis nec eros rutrum scelerisque. Curabitur
                                volutpat, sem in pellentesque ornare, dolor tellus feugiat nunc, eget convallis tellus arcu ac sem. Pellentesque a leo
                                efficitur massa scelerisque venenatis. Praesent aliquet ligula eget ligula ultrices, in tincidunt nulla condimentum.
                                Vivamus molestie elit ac erat ornare, vel tincidunt urna ullamcorper. Proin pharetra nunc id neque tincidunt sagittis.
                                Duis aliquam sollicitudin sapien eget elementum. Mauris ullamcorper dictum porta.
                            </p>
                        </Row>
                    </Container>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Container className="py-2">
                        <Row>
                            <Col md={11}>
                                <h2>Headline</h2>
                            </Col>
                            <Col md={1} className="d-flex align-items-center">
                                <strong className="font-weight-bolder m-0">Type</strong>
                            </Col>
                        </Row>
                        <Row>
                            <p className="text-justify">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius turpis nec eros rutrum scelerisque. Curabitur
                                volutpat, sem in pellentesque ornare, dolor tellus feugiat nunc, eget convallis tellus arcu ac sem. Pellentesque a leo
                                efficitur massa scelerisque venenatis. Praesent aliquet ligula eget ligula ultrices, in tincidunt nulla condimentum.
                                Vivamus molestie elit ac erat ornare, vel tincidunt urna ullamcorper. Proin pharetra nunc id neque tincidunt sagittis.
                                Duis aliquam sollicitudin sapien eget elementum. Mauris ullamcorper dictum porta.
                            </p>
                        </Row>
                    </Container>
                </ListGroup.Item>
            </ListGroup>
        );
    };

    const Body = () => {
        const content =
            clusterLabels.length === 0 ? (
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
                <Content></Content>
            );
        return content;
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

    return (
        <div className={props.display ? " h-100" : "h-100 d-none"}>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col md={2}>
                        <LeftMenu></LeftMenu>
                    </Col>
                    <Col md={10} className=" h-100">
                        <Body></Body>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Media;
