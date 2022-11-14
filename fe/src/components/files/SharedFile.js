import axios from 'axios'
import Button from 'react-bootstrap/Button';


const SharedFile = (props) => {

  const downloadFile = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/files/${props.file}`, {responseType: 'blob'}).then(res => {
      const data = new Blob([res.data]);
      const fileURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = fileURL;
      tempLink.setAttribute('download', 'file');
      tempLink.click();
    })
  }

  return (
    <Button variant='primary' onClick={downloadFile}>file</Button>
  )
}

export default SharedFile
