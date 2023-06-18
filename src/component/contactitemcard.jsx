import React from 'react'
import Contactresitem from './contactresitem'
const contactitemcard = ({ element }) => {
    if (!element) {
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
    // const workdata = element;
    return (
        <div className='container-fluid'>
            <div className="column">
                {element.map((datu) =>
                    <div key={datu.contactresid} className='row '>
                        <Contactresitem
                            id={datu.contactresid}
                            name={datu.name}
                            email={datu.email}
                            message={datu.message}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default contactitemcard