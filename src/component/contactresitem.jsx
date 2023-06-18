import React from 'react'
import '../style/contactresitem.css'
const contactresitem = (props) => {
    return (
        <div className='contactmain'>
            <div className='card '>
                <div className='idedit'><b>Id : </b>{props.id}</div>
                <div className='nameedit'><b>Name : </b>{props.name}</div>
                <div className='emailedit'><b>Email : </b>{props.email}</div>
                <div className='msgedit'><b>Message : </b>{props.message}</div>
            </div>
        </div>
    )
}

export default contactresitem