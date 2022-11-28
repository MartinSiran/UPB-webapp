import axios from 'axios'
import {Buffer} from 'buffer';
import Button from 'react-bootstrap/Button';


const SharedFile = (props) => {

  const downloadFile = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/files/${props.file}`).then(res => {
      const data = new Blob([Buffer.from(res.data.file)]);
      const fileURL = window.URL.createObjectURL(data);
      const tempLink = document.createElement('a');
      tempLink.href = fileURL;
      tempLink.setAttribute('download', res.data.fileName);
      tempLink.click();
    })
  }

  return (
    <Button variant='primary' onClick={downloadFile}>{props.name}</Button>
  )
}

export default SharedFile
