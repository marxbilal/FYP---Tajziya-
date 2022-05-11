import React, { useState } from "react";

const TagCloud = () => {
    const [objectURL, setUrl] = useState();

    fetch("http://localhost:8000/tagcloud")
        .then((res) => res.blob())
        .then(function (myBlob) {
            setUrl(URL.createObjectURL(myBlob));
            //console.log(myBlob);
        });

    return (
        <div>
            <img src={objectURL} alt="Tag Cloud"></img>
            Tag Cloud
        </div>
    );
};

export default TagCloud;
