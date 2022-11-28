import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SharedFile from './files/SharedFile';



const SharedFiles = (props) => {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (props.userId !== '' && props.userId !== undefined) {
      axios.get(`${process.env.REACT_APP_API_HOST}/share/${props.userId}`).then(res => {
        setUserFiles(res.data)
      })
    }
  }, [props.userId])

  return (
    <div>
      <h1>Shared with me</h1>
      {userFiles.map((file) => (
        <SharedFile key={file.id} file={file.id} name={file.name}/>
      ))}
    </div>
  )
}

export default SharedFiles
