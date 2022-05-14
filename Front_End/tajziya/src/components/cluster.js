import axios from "axios";
import { Bubble } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Button, Container, Col, Row, ListGroup, Accordion } from "react-bootstrap";
import styles from "./cluster.module.css";
Chart.register(...registerables);

const Clustering = (props) => {
    const [clusterData, setClusterData] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [file, setFile] = useState({ selectedFile: null });
    const [live, setLive] = useState(true);

    const onFileChange = (event) => {
        setFile({ selectedFile: event.target.files[0] });
    };

    const onFileUpload = () => {
        const formData = new FormData();
        if (file.selectedFile == null) alert("No file Selected");
        else {
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
        axios
            .post("http://localhost:8000/cluster", {})
            .then((res) => {
                setClusterData(res.data.data);
                setKeywords(res.data.keywords);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [live]);

    console.log(clusterData);

    const Labels = () => {
        let AccordianList = [];
        for (let i = 0; i < keywords.length; i++) {
            let ItemList = [];
            for (let j = 0; j < keywords[i].words.length; j++) {
                ItemList.push(<ListGroup.Item>{keywords[i].words[j]}</ListGroup.Item>);
            }
            AccordianList.push(
                <Accordion.Item eventKey={"cluster" + keywords[i].cluster}>
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

    // const options = {
    //     scales: {
    //         display: false,
    //         showLabelBackdrop: false,
    //     },
    // };

    return (
        <div className={props.display ? "" : " d-none"}>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Accordion>
                            <Labels></Labels>
                        </Accordion>
                    </Col>
                    {/*  */}
                    <Col md={10}>
                        <div className="">
                            <h2>Upload file</h2>
                            <input type="file" onChange={onFileChange} />
                            <button onClick={onFileUpload}>Upload!</button>
                            <Button onClick={() => setLive(true)} variant={live ? "success" : "outline-success"} disabled={live ? true : false}>
                                Default
                            </Button>
                            <Bubble data={{ datasets: clusterData }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Clustering;
