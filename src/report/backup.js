
// this is the code for general stats. the frontend is done, just need to weave in back end
<div style={{ display: 'flex', flexDirection: 'row' }}>
    <div className="generalsub">
        <div className="textbox">
            <Hourglass className="icons" style={{
                top: '5vh'
            }} />
            <h1> TIME PLAYED: </h1>
            <p> You clocked an everage of 20 minutes per day.</p>
        </div>
    </div>
    <div className="generalsub">
        {Object.keys(data).map((val) => {
            return (
                <div className="textbox">
                    <img src={pics[val]} className='icons' alt='icon' />
                    <p>{general[val].header}</p>
                    <h1>{data[val]}{general[val].units}</h1>
                </div>)
        })}
    </div>
</div>
