import React from "react";


export default function Meme() {

    React.useEffect(() => {
        async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const mdata = await res.json();
        setUrl(mdata);
        }
        getMemes();
    }
    , [])

    const [data, setUrl] = React.useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/1g8my4.jpg",
    });

    function randMeme(){
        let x = Math.floor(Math.random() * (data.data.memes.length)) ;
        setUrl({...data, randomImg: data.data.memes[x].url});
    }

    function handleChange(event){
        const {name, value} = event.target;
        setUrl(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    return (
        <>
        <div className="form">
            <input className="form-input" type="text" placeholder="Top" name="topText" onChange={handleChange} />
            <input className="form-input" type="text" placeholder="Bottom" name="bottomText" onChange={handleChange} />
            <button onClick={randMeme} className="form-button">Get a new meme image</button>
        </div>
            <section className="meme-container">
                
                <img src={data.randomImg} className="meme-img" />
                <h2 className="text top">{data.topText}</h2>
                <h2 className="text bottom">{data.bottomText}</h2>
            </section>

        </>
    )
}