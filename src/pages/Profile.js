import React, { Component } from 'react'
import {withAuth} from './../context/auth-context'

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Profile</h1>
            </div>
        )
    }
}

export default  withAuth(Profile)
