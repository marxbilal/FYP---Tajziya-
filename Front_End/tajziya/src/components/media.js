import { CacheProvider } from "@emotion/react";
import { useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

const Media = (props) => {
    const [expand, setExpand] = useState(false);
    const Content = () => {
        return (
            <ListGroup className="m-1 overflow-auto h-100">
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
    return (
        <div className={props.display ? " h-100" : "h-100 d-none"}>
            <Container fluid className="h-100">
                <Row className="h-100">
                    <Col md={2} className="my-2">
                        <ListGroup>
                            {/* <ClusterNames></ClusterNames> */}
                            <ListGroup.Item style={{ color: "red" }}>Cluster 0</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={10} className="p-1 h-100">
                        <Content></Content>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Media;
