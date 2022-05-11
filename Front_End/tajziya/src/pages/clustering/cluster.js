import axios from "axios";
import { Bubble } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
Chart.register(...registerables);

const Clustering = () => {
    const [mydata, setData] = useState([]);
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
                    setData(res.data.data);
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
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [live]);

    // const options = {
    //     scales: {
    //         display: false,
    //         showLabelBackdrop: false,
    //     },
    // };

    const cluster_data = {
        datasets: mydata,
    };
    return (
        <div>
            <div>
                <Button onClick={() => setLive(true)} variant={live ? "success" : "outline-success"} disabled={live ? true : false}>
                    Default
                </Button>{" "}
            </div>
            <div>
                <h2>Uplaod file</h2>
                <div>
                    <input type="file" onChange={onFileChange} />
                    <button onClick={onFileUpload}>Upload!</button>
                </div>
                {FileData()}
            </div>
            <Bubble data={cluster_data} />
        </div>
    );
};

export default Clustering;
