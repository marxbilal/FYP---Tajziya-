import { Container, Col, Row, Navbar, Nav } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="light">
            <Container fluid>
                <Navbar.Brand>Tajziya</Navbar.Brand>
                <Nav>
                    <Nav.Link>Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
