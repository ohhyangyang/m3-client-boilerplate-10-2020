import React, { Component } from 'react'
import {withAuth} from './../context/auth-context'

class MusicianList extends Component {
    render() {
        return (
            <div>
                <h1>MusicianList</h1>
            </div>
        )
    }
}

export default withAuth(MusicianList)
