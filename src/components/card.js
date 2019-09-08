import React from 'react'

const Card = (props) => {
    return <div>
                <img src={props.img} />
                <p>{props.name}</p>
            </div>
}

export default Card