import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Col, Row, Navbar, Form, FormControl } from "react-bootstrap";

const Header = (props) => {
    const [loading, setLoading] = useState(false);
    const [word, setWord] = useState();

    const handleClick = () => {
        setLoading(true);
        props.setShow(true);
        props.setFetchData(false);
        if (word) {
            axios
                .post("http://localhost:8000/search/", { keyword: word })
                .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    props.setToggle(!props.toggle);
                    props.setFetchType("search");
                    props.setShow(false);
                })
                .catch((error) => {
                    setLoading(false);
                    props.setShow(false);
                    alert("Error occured");
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (!props.fetchData) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [props.fetchData]);

    return (
        <Navbar bg="light">
            <Container fluid>
                <Row className="w-100">
                    <Col md={4}>
                        <Navbar.Brand>Tajziya</Navbar.Brand>
                    </Col>
                    <Col md={8} className="d-flex justify-content-start align-content-center">
                        <Form className="d-flex w-100">
                            <FormControl
                                disabled={loading}
                                type="search"
                                placeholder="Search"
                                className="me-2 w-50"
                                aria-label="Search"
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setWord(e.target.value);
                                }}
                            />
                            <Button variant="outline-success" disabled={loading} onClick={handleClick}>
                                {loading ? "Loading.." : "Search"}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Header;
