import React, { Component } from 'react'
import {withAuth} from './../context/auth-context'

class ProjectList extends Component {
    render() {
        return (
            <div>
                <h1>ProjectList</h1>
            </div>
        )
    }
}

export default withAuth(ProjectList)
