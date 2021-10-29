import React from 'react';
import Button from 'react-bootstrap/Button';


const Delete = ({ params, handleDelete }) => (
  <Button variant="outlined" className="btn btn-danger" onClick={handleDelete(params.value)}>Delete</Button>
);

export default Delete;