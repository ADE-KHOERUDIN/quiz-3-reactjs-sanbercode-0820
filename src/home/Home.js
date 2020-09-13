import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  state = {
    movies: []
  }

  componentDidMount() {
    axios.get(`http://backendexample.sanbercloud.com/api/movies`)
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
      })
  }

  render() {
    return (
        <>
        <div style={{width: "70vw", margin: "0 auto"}}>
          <h1 style={{textAlign:"center", margin:"15px 0 15px 0"}}>Daftar Film Terbaik</h1>
                {
                  this.state.movies.map((item)=>{
                    let jam = item.duration/60;
                    let durasi = Math.round(jam);
                    return(                    
                      <div key={item.id}>
                        <h3>{item.title}</h3>
                          <div style={{textAlign:"justify",width:"75%",padding:"8px" }} >
                            <img src={item.image_url} alt={item.title} style={{borderRadius:"8px", float:"left", margin: "0 8px 4px 0", width:"500px",height:"350px"}}/>
                            <h3>
                              Rating {item.rating} <br/>
                              Duration : {durasi} Jam<br/>
                              Genre : {item.genre}
                            </h3>                            
                          </div>
                          <div style={{display:"inline-table"}}>
                             <p><strong>DESKRIPSI: </strong>{item.description}</p>
                          </div>                 
                       </div>
                    )
                  })
                }
        </div>
      </>
    )
  }
}

export default Home;