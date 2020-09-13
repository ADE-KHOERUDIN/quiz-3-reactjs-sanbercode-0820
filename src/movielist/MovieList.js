import React, {useState, useEffect} from "react"
import axios from "axios"
import "./style.css"

const MovieList = () => {  
  const [daftarMovie, setdaftarMovie] =  useState(null)
  const [cari, setCari] = useState("");
  const [pencarianMovie, setPencarianMovie] = useState([]);
  const [input, setInput]  =  useState({
    title: "", 
    description: "", 
    year: 2020, 
    duration: 120, 
    genre: "", 
    rating: 0, 
    image_url: "", 
    id: null
  })

  useEffect( () => {
    if (daftarMovie === null){
      axios.get(`http://backendexample.sanbercloud.com/api/movies`)
      .then(res => {
        setdaftarMovie(res.data.map(dataMovie=>{ 
          return {
            id: dataMovie.id, 
            title: dataMovie.title,
            description: dataMovie.description,
            year: dataMovie.year, 
            duration: dataMovie.duration, 
            genre: dataMovie.genre, 
            rating: dataMovie.rating, 
            image_url: dataMovie.image_url
          }
        } ))
      })
    }
  }, [daftarMovie])

 /* Pencarian berdasarkan nama title */
  useEffect(() => {
    if (daftarMovie !== null){
      setPencarianMovie(
        daftarMovie.filter((mov) => 
          (mov.title !== null) ?      
            mov.title.toLowerCase().includes(cari.toLowerCase()) 
            : null
            // || mov.description.toLowerCase().includes(cari.toLocaleLowerCase())
            // || mov.genre.toLowerCase().includes(cari.toLocaleLowerCase())
          )
      );
    }
  }, [cari, daftarMovie]);
  
  const handleDelete = (event) => {
    let ID_MOVIES = parseInt(event.target.value)
    let newdaftarMovie = daftarMovie.filter(dataMovie => dataMovie.id !== ID_MOVIES)
    axios.delete(`http://backendexample.sanbercloud.com/api/movies/${ID_MOVIES}`)
    .then(res => {
      console.log(res)
    })          
    setdaftarMovie([...newdaftarMovie])    
  }
  
  const handleEdit = (event) => {
    let ID_MOVIES = parseInt(event.target.value)
    let dataMovie = daftarMovie.find(x=> x.id === ID_MOVIES)
    if (daftarMovie.find(x => x.id === ID_MOVIES)) {
      setInput({
        title: dataMovie.title,
        description: dataMovie.description,
        year: dataMovie.year, 
        duration: dataMovie.duration, 
        genre: dataMovie.genre, 
        rating: dataMovie.rating, 
        image_url: dataMovie.image_url,
        id: ID_MOVIES
      })
    }
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
         setInput({...input, duration: event.target.value});
         break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
          break
      }
      case "rating":
      {
          setInput({...input, rating: event.target.value});
          break
      }
      case "image_url":
      {
        setInput({...input, image_url: event.target.value});
          break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    let title = input.title
    let description = input.description
    let year = input.year
    let duration = input.duration
    let genre = input.genre
    let rating = input.rating
    let image_url = input.image_url

    if (input.id === null){        
      axios.post(`http://backendexample.sanbercloud.com/api/movies`, {
        title, description, year, duration, genre, rating, image_url
      })
      .then(res => {
        var data = res.data
          setdaftarMovie([...daftarMovie, {
            id: data.id, 
            title,
            description, 
            year, 
            duration, 
            genre, 
            rating, 
            image_url
          }])
        console.log(data)
       })
    }else{
      axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, {
        title, description, year, duration, genre, rating, image_url
      })
      .then(() => {
          let dataMovie = daftarMovie.find(xy=> xy.id === input.id)
          dataMovie.title = title
          dataMovie.description = description
          dataMovie.year = year
          dataMovie.duration = duration
          dataMovie.genre = genre
          dataMovie.rating = rating
          dataMovie.image_url = image_url
          setdaftarMovie([...daftarMovie])
      })
    }

    setInput({
      title: "", 
      description: "", 
      year: 2020, 
      duration: 120, 
      genre: "", 
      rating:0, 
      image_url: "", 
      id: null
    })
  }


  return(
    <>
    <div>
      <center>
        <input
          type="text" style={{width:"50%",marginTop:"20px",height:"20px",textAlign:"center", borderRadius:"10px"}}
          placeholder="Search Your Favorite Movies"
          onChange={(e) => setCari(e.target.value)}
        />
      </center>    
      </div>
   
      <h1>Daftar Film</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Year</th>
            <th>Duration</th>            
            <th>Genre</th>            
            <th>Rating</th>            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              daftarMovie !== null && pencarianMovie.map((item, index)=>{
               const rangkum = item.description.substring(0,30);
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{rangkum}...</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td>
                      <button onClick={handleEdit} value={item.id}>Edit</button>
                      &nbsp;
                      <button onClick={handleDelete} value={item.id}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>

      <h1>Movies Form</h1>

      <div style={{width: "40%", margin: "0 auto", display: "block"}}>
        <div style={{boxShadow:"0 4px 9px 6px rgba(0,0,0,.15)", borderRadius:"10px",padding: "20px", marginBottom:"30px"}}>
          <form onSubmit={handleSubmit}>
            <table>
              <tbody style={{boxShadow:"none"}}>
                  <tr>
                    <td>
                        <label style={{float: "left"}}>
                          Title :
                        </label>
                        <input style={{float: "right"}} 
                        type="text" required name="title" 
                        value={input.title} onChange={handleChange}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label style={{float: "left"}}>
                          Description:
                        </label>
                        <textarea style={{float: "right"}} 
                        required name="description" 
                        value={input.description} onChange={handleChange}/>
                    </td>
                </tr>
                  <tr>
                    <td>
                        <label style={{float: "left"}}>
                          Year :
                        </label>
                        <input style={{float: "right"}} 
                        type="number" required min="1980" name="year"
                        value={input.year} onChange={handleChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                          <label style={{float: "left"}}>
                            Duration :
                          </label>
                          <input style={{float: "right"}} 
                          type="number" required name="duration" 
                          value={input.duration} onChange={handleChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style={{float: "left"}}>
                        Genre :
                      </label>
                      <input style={{float: "right"}} 
                      type="text" required name="genre" 
                      value={input.genre} onChange={handleChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <label style={{float: "left"}}>
                          Rating :
                        </label>
                        <input style={{float: "right"}} 
                        type="number" required min="1" max="10" name="rating" 
                        value={input.rating} onChange={handleChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                          <label style={{float: "left"}}>
                          Image_url :
                          </label>
                          <textarea style={{float: "right"}} 
                          required name="image_url" 
                          value={input.image_url} onChange={handleChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <div style={{width: "100%", paddingBottom: "20px"}}>
                      <button style={{ float: "right"}}>submit</button>
                    </div>
                    </td>
                  </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  )
}

export default MovieList