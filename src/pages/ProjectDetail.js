import React, { Component } from 'react'
import {withAuth} from './../context/auth-context'

class ProjectDetail extends Component {
    render() {
        return (
            <div>
                <h1>ProjectDetail</h1>
            </div>
        )
    }
}

export default withAuth(ProjectDetail)
