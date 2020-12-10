import React, { Component } from 'react';
import {withAuth} from './../context/auth-context'
import apiService from './../lib/api-service'
import OngoingProjectCard from './../components/OngoingProjectCard'
import JoinedProjectCard from './../components/JoinedProjectCard'
import LikedMusicianCard from './../components/LikedMusicianCard'

 class Dashboard extends Component {
     state={
         ongoingProjects:[],
         joinedProjects:[],
         likedUser:[]
     }
     componentDidMount(){
         apiService.getAllOfOneUser(this.props.user._id)
          .then((response)=>{
              console.log("getAll",response.data)
              const allInfo = response.data;
              this.setState({
                ongoingProjects:allInfo.projectsOwned,
                joinedProjects:allInfo.projectsJoined,
                likedUser:allInfo.likedUsers
              })
          })
     }
    render() {
        return (
            <div>

            {this.state.ongoingProjects.map((project)=>{
                return <OngoingProjectCard key={project._id} project={project}/>
            })}

            <div>



            </div>

            <div>

            </div>
                
            </div>
        )
    }
}

export default withAuth(Dashboard)
