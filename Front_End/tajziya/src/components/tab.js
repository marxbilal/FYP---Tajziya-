import { Container, Nav, Navbar } from "react-bootstrap";

const Tab = (props) => {
    return (
        <div className="py-3">
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="cluster"
                onSelect={(eventKey) => {
                    props.setSelectedTab(eventKey);
                }}
            >
                <Nav.Item>
                    <Nav.Link eventKey="cluster">Cluster</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="tagcloud">Tag Cloud</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="media">Media</Nav.Link>
                </Nav.Item>
                <Nav.Link eventKey="help">Help</Nav.Link>
            </Nav>
        </div>
    );
};

export default Tab;
